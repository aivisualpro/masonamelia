import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoImageOutline, IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaRegCirclePlay, FaPhone } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { CiUser } from "react-icons/ci";
import { ImLocation2 } from "react-icons/im";
import Tabs from "./Tabs";
import Card from "./Card";
import Modal from "react-modal";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { motion, AnimatePresence } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";
import DOMPurify from "dompurify";
import { PuffLoader } from "react-spinners";
import FullscreenSpinner from "./FullScreenSpinner";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

Modal.setAppElement("#root");

const DETAIL_URL = "http://localhost:5000/api/aircrafts/lists/";
const LIST_URL = "http://localhost:5000/api/aircrafts/lists/";

// helper: Title Case
const titleCase = (s = "") =>
  String(s)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());

// helper: extract <li> text[] from provided HTML (for your checkmark layout)
const extractItems = (html = "") => {
  try {
    const div = document.createElement("div");
    div.innerHTML = html;
    return Array.from(div.querySelectorAll("li"))
      .map((li) => li.textContent.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
};

const AircraftDetail = ({ onOpenModal, currentIndex, setCurrentIndex }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [aircraft, setAircraft] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const [related, setRelated] = useState([]);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // ─── Transition state for Next button animation ───
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ─── Navigate back to showroom preserving filters ───
  const handleBack = useCallback(() => {
    // Save the current aircraft id so the listing can highlight it
    try { sessionStorage.setItem('showroom_highlight_id', id); } catch {}
    navigate('/showroom', { state: { fromDetail: true } });
  }, [navigate, id]);

  // ─── Navigate to Next aircraft in filtered list ───
  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    try {
      const stored = sessionStorage.getItem('showroom_aircraft_ids');
      if (!stored) return;
      const ids = JSON.parse(stored);
      if (!Array.isArray(ids) || ids.length === 0) return;

      const currentIdx = ids.indexOf(id);
      const nextIdx = currentIdx === -1 ? 0 : (currentIdx + 1) % ids.length;
      const nextId = ids[nextIdx];

      if (nextId && nextId !== id) {
        setIsTransitioning(true);
        navigate(`/showroom/${nextId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Reset after animation completes
        setTimeout(() => setIsTransitioning(false), 600);
      }
    } catch {}
  }, [id, navigate, isTransitioning]);

  // ---- Fetch detail ----
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      setLoading(true);
      try {
        setErrMsg("");
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/aircrafts/${id}`,
          { signal: ac.signal }
        );
        if (!res.ok) throw new Error(`Detail ${res.status}`);
        const json = await res.json();
        setAircraft(json?.data || null);
        setLoading(false);
        setActiveImgIndex(0);
      } catch (e) {
        if (e.name !== "AbortError") setErrMsg(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [id]);

  // ---- Fetch related (simple: all except current) ----
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/aircrafts/relatedAircrafts?category=${aircraft?.category}&status=${aircraft?.status}`,
          { signal: ac.signal }
        );

        const json = await res.json();
        const rows = Array.isArray(json?.data) ? json.data : [];
        const mapped = rows
          .filter((r) => r._id !== id)
          .map((r) => ({
            _id: r._id,
            title: r.title,
            price: Number(r.price || 0),
            featuredImage: r.featuredImage,
            status: r?.status,
            overview: r.overview,
            images: Array.isArray(r.images) ? r.images : [],
            airframe: String(r.airframe ?? ""),
            engine: String(r.engine ?? ""),
            propeller: String(r.propeller ?? ""),
            category: r.category?.name, // Card expects string
          }));
        setRelated(mapped);
      } catch {
        // ignore related errors
      }
    })();
    return () => ac.abort();
  }, [id, aircraft]);



  const overviewHTML = useMemo(() => {
    const dirty = aircraft?.overview || "";
    return DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
  }, [aircraft?.overview]);

  const media = useMediaQuery("(max-width: 768px)");
  const gallery = useMemo(
    () => (aircraft?.images || []).filter(Boolean),
    [aircraft]
  );

  // ---- Tabs from backend sections ----
  const sections = aircraft?.description?.sections || {};
  const tabs = useMemo(
    () =>
      Object.keys(sections).map((k) => ({
        name: titleCase(k),
        slug: k,
      })),
    [sections]
  );

  const [activeTab, setActiveTab] = useState(tabs?.[0]?.slug || "airframe");
  useEffect(() => {
    // default to first available section when data changes
    setActiveTab(tabs?.[0]?.slug || "airframe");
  }, [tabs]);

  const activeItems = useMemo(() => {
    const sec = sections?.[activeTab];
    if (!sec) return [];
    if (Array.isArray(sec.items) && sec.items.length) return sec.items;
    if (sec.html) return extractItems(sec.html);
    return [];
  }, [sections, activeTab]);

  const handleThumbnailClick = (i) => {
    setActiveImgIndex(i);
    setShowVideo(false);
  };

  const getVideoSrc = (url) => {
    if (!url) return "";
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}autoplay=1&mute=1`;
  };

  const openVideoModal = () => setVideoModalOpen(true);
  const closeVideoModal = () => setVideoModalOpen(false);

  if (errMsg) {
    return (
      <section id="showroom" className="pb-20 pt-[150px] md:py-20">
        <div className="container px-5">
          <p className="text-red-400">Error: {errMsg || "Not found"}</p>
        </div>
      </section>
    );
  }

  const prevRef = useRef(null);
  const nextRef = useRef(null);



  return (
    <>
      {/* Spinner mounts into <body> via portal */}
      <FullscreenSpinner show={loading} text="Loading aircraft..." />

      {errMsg && (
        <div className="py-10 text-center text-red-400">
          Failed to load aircraft.
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          initial={{ opacity: 0, x: 60, scale: 0.98, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -60, scale: 0.97, filter: 'blur(6px)' }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            opacity: { duration: 0.35 },
            filter: { duration: 0.4 },
          }}
        >
      <section
        id="showroom"
        className="pb-20 pt-[98px] md:pb-20 md:pt-[calc(110px+76px)]"
      >
        <div className="md:hidden flex items-center justify-between bg-[#1777cb] px-2">
          <button onClick={handleBack} className="flex-shrink-0">
            <div className="showroom-redirect-icon flex items-center">
              <IoIosArrowBack size={16} color="white" />
            </div>
          </button>
          <h1 className="text-base md:text-3xl mx-auto font-bold mt-2 mb-2 lg:mt-0 lg:mb-8 text-white">
            {aircraft?.title}
          </h1>
          <button onClick={handleNext} className="flex-shrink-0" disabled={isTransitioning}>
            <div className="showroom-redirect-icon flex items-center">
              <IoIosArrowForward size={16} color="white" />
            </div>
          </button>
        </div>

        <div className="md:hidden flex flex-col gap-4">
          {/* Left: gallery */}
          <div className="lg:w-[60%]">
            {showVideo && aircraft?.videoUrl ? (
              <iframe
                src={getVideoSrc(aircraft.videoUrl)}
                title="Aircraft Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video lg:rounded-2xl"
              />
            ) : (
              <img
                src={gallery?.[activeImgIndex]}
                alt="Main Aircraft"
                className="w-full object-cover lg:rounded-2xl cursor-pointer"
                onClick={() => onOpenModal(activeImgIndex, gallery)}
              />
            )}
            <div className="lg:mt-4">
              <Swiper
                key={gallery?.length || 0} // re-init if gallery changes
                spaceBetween={12}
                slidesPerView={5}

                modules={[Navigation]}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                onInit={(swiper) => {
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
                className="relative"
              >
                {gallery?.map((src, i) => (
                  <SwiperSlide key={i} className="">
                    <img
                      src={src}
                      alt={`Thumb ${i}`}
                      className={`${activeImgIndex === i && !showVideo
                        ? "border-2 border-[#1777cb] opacity-70"
                        : ""
                        } cursor-pointer lg:h-full h-[70px] lg:object-contain object-cover w-full lg:rounded-2xl`}
                      onClick={() => handleThumbnailClick(i)}
                    />
                  </SwiperSlide>
                ))}

                {/* Custom arrows (outside look) */}
                <button
                  ref={prevRef}
                  className="thumb-prev absolute left-2 top-1/2 z-10 -translate-y-1/2 text-white p-3 rounded-full shadow-md"
                  aria-label="Previous"
                >
                  <IoIosArrowBack size={20} color="#fff" className="bg-[#111218cb] rounded-[50%] text-[8px] p-[3px]" />
                </button>
                <button
                  ref={nextRef}
                  className="thumb-next absolute right-2 top-1/2 z-10 -translate-y-1/2 text-white p-2 rounded-full shadow-md"
                  aria-label="Next"
                >
                  <IoIosArrowForward size={20} color="#fff" className="bg-[#111218cb] rounded-[50%] text-[8px] p-[3px]" />
                </button>
              </Swiper>
              <div className="flex mt-4 px-5">
                {/* <button
                    onClick={() => onOpenModal(currentIndex, gallery)}
                    className="bg-[#22242e] w-full md:w-1/2 md:mb-0 mb-4 hover:bg-[#22242e]/80 transition-all duration-300 flex items-center justify-center gap-2 text-white py-3 px-4 rounded-[30px] text-sm md:text-lg font-semibold"
                  >
                    <IoImageOutline size={media ? 18 : 22} />
                    <span>View More</span>
                  </button> */}
                {aircraft?.videoUrl && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className={`w-full md:mb-0 mb-4 transition-all duration-300 flex items-center justify-center gap-2 text-white py-3 px-4 rounded-[30px] text-sm md:text-lg font-semibold ${
                      showVideo 
                        ? "bg-[#1777cb] hover:bg-[#1777cb]/80" 
                        : "bg-[#22242e] hover:bg-[#22242e]/80"
                    }`}
                  >
                    <FaRegCirclePlay size={media ? 18 : 22} />
                    <span>{showVideo ? "Playing Video" : "Video"}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: specs & contact */}

          <div className="lg:w-[40%] px-5">
            <div className="jet_featured flex-row flex justify-between gap-4">
              <div className="flex flex-col items-center bg-[#171921] w-1/2 p-4 rounded-3xl">
                <div className="featured_value">
                  <h4 className="text-md md:text-2xl text-white">
                    {aircraft?.price ? (
                      `$${Number(aircraft?.price || 0).toLocaleString()}`
                    ) : (
                      <a href="tel:210-882-9658">Call For Price</a>
                    )}
                  </h4>
                </div>
                <div className="featured_text">
                  <h4 className="text-[#7C7C88] text-base md:text-lg mt-2 text-center">
                    Price
                  </h4>
                </div>
              </div>
              <div className="flex flex-col items-center bg-[#171921] w-1/2 p-4 rounded-3xl">
                <div className="featured_value">
                  <h4 className="text-md md:text-2xl text-white">
                    {aircraft?.year}
                  </h4>
                </div>
                <div className="featured_text">
                  <h4 className="text-[#7C7C88] text-base md:text-lg text-center mt-2">
                    Year
                  </h4>
                </div>
              </div>
            </div>

            <div className="md:flex items-start justify-between">
              <div className="contact-info py-8">
                <h2 className="mb-4 text-[1.2rem] bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                  Agent Details
                </h2>
                <div className="gap-4">
                  <p className="text-base mb-3 text-white flex items-center">
                    <CiUser
                      className="mr-2 bg-tertiary_color p-[6px] rounded-full"
                      size={28}
                    />
                    {aircraft?.contactAgent?.name || "—"}
                  </p>
                  <p className="text-base mb-3 text-white flex items-center">
                    <TfiEmail
                      className="mr-2 bg-tertiary_color p-[6px] rounded-full"
                      size={28}
                    />
                    {aircraft?.contactAgent?.email || "—"}
                  </p>
                  <p className="text-base mb-3 text-white flex items-center">
                    <FaPhone
                      className="mr-2 bg-tertiary_color p-[6px] rounded-full"
                      size={28}
                    />
                    <a href="tel:210-882-9658">
                      {aircraft?.contactAgent?.phone || "—"}
                    </a>
                  </p>
                </div>
              </div>

              <div className="aircraft-location pb-8">
                <h2 className="mb-4 text-[1.2rem] bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                  Aircraft Location
                </h2>
                <div className="gap-4">
                  <p className="text-base mb-3 text-white flex items-center">
                    <ImLocation2
                      className="mr-2 bg-tertiary_color p-[6px] rounded-full"
                      size={28}
                    />
                    {aircraft?.location || "—"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <div className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-[#1b1d25] to-[#111218] border border-white/5 shadow-[5px_5px_15px_rgba(0,0,0,0.5),-2px_-2px_10px_rgba(255,255,255,0.02)] transition-transform hover:scale-[1.02] duration-300">
                <span className="text-[#7C7C88] text-[10px] uppercase tracking-tighter font-semibold mb-1">Airframe</span>
                <span className="text-white text-xs font-bold text-center leading-tight whitespace-normal w-full">{aircraft?.airframe || "—"}</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-[#1b1d25] to-[#111218] border border-white/5 shadow-[5px_5px_15px_rgba(0,0,0,0.5),-2px_-2px_10px_rgba(255,255,255,0.02)] transition-transform hover:scale-[1.02] duration-300">
                <span className="text-[#7C7C88] text-[10px] uppercase tracking-tighter font-semibold mb-1">Engine</span>
                <span className="text-white text-xs font-bold text-center leading-tight whitespace-normal w-full">{aircraft?.engine || "—"}</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-[#1b1d25] to-[#111218] border border-white/5 shadow-[5px_5px_15px_rgba(0,0,0,0.5),-2px_-2px_10px_rgba(255,255,255,0.02)] transition-transform hover:scale-[1.02] duration-300">
                <span className="text-[#7C7C88] text-[10px] uppercase tracking-tighter font-semibold mb-1">Propeller</span>
                <span className="text-white text-xs font-bold text-center leading-tight whitespace-normal w-full">{aircraft?.propeller || "—"}</span>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden">
              <iframe
                src={`${aircraft?.latitude && aircraft?.longitude
                  ? `https://maps.google.com/maps?q=${aircraft?.latitude},${aircraft?.longitude}&z=12&output=embed`
                  : "https://maps.google.com/maps?q=34.7732102,-80.3917315&z=12&output=embed"
                  }`}
                className="w-full h-[180px] rounded"
                style={{ filter: "grayscale(1) invert(1) contrast(1.2)" }}
              />
            </div>
          </div>
        </div>

        <div className="container px-5">
          {/* Desktop Header Row - Back Ribbon | Title | Next Ribbon | Status Tag */}
          <div className="hidden md:flex items-center gap-4 mb-6">
            {/* Back Ribbon Button */}
            <button onClick={handleBack} className="flex-shrink-0 group/back">
              <div className="flex items-center">
                <div
                  className="tag-left-arrow transition-all duration-300"
                  style={{ borderRight: "16px solid #22242e" }}
                />
                <div className="flex items-center gap-2 px-4 py-2 bg-[#22242e] text-white text-sm font-semibold hover:bg-[#2a2d38] transition-all duration-300 group-hover/back:shadow-[0_0_20px_rgba(23,119,203,0.3)]">
                  <IoIosArrowBack size={18} className="transition-transform duration-300 group-hover/back:-translate-x-0.5" />
                  <span>Back</span>
                </div>
              </div>
            </button>

            {/* Next Ribbon Button */}
            <button onClick={handleNext} disabled={isTransitioning} className="flex-shrink-0 group/next">
              <div className="flex items-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#1777cb] text-white text-sm font-semibold hover:bg-[#1a8ae0] transition-all duration-300 group-hover/next:shadow-[0_0_20px_rgba(23,119,203,0.5)]">
                  <span>Next</span>
                  <IoIosArrowForward size={18} className="transition-transform duration-300 group-hover/next:translate-x-0.5" />
                </div>
                <div
                  className="tag-right-arrow transition-all duration-300"
                  style={{ borderLeft: "16px solid #1777cb" }}
                />
              </div>
            </button>

            {/* Title - Takes remaining space */}
            <h1 className="flex-1 text-[1.5rem] md:text-[2rem] xl:text-[2.5rem] 2xl:text-[3rem] leading-none font-bold text-white truncate">
              {aircraft?.title}
            </h1>

            {/* Status Tag */}
            <div className="tag-container flex-shrink-0">
              <div className="flex items-center">
                <div
                  className="tag-left-arrow"
                  style={{ borderRight: "16px solid #1777cb" }}
                />
                <div className="flex items-center gap-2 px-4 py-2 bg-[#1777cb] text-white text-sm font-semibold">
                  <span className="w-2 h-2 bg-[#fff] rounded-full" />
                  {titleCase(aircraft?.status || "")}
                </div>
              </div>
            </div>
          </div>

          <div className="md:block lg:flex hidden gap-4">
            {/* Left: gallery */}
            <div className="lg:w-[60%] w-full">
              {showVideo && aircraft?.videoUrl ? (
                <iframe
                  src={getVideoSrc(aircraft.videoUrl)}
                  title="Aircraft Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[400px] lg:rounded-2xl"
                />
              ) : (
                <img
                  src={gallery?.[activeImgIndex]}
                  alt="Main Aircraft"
                  className="w-full h-[400px] object-cover lg:rounded-2xl cursor-pointer"
                  onClick={() => onOpenModal(activeImgIndex, gallery)}
                />
              )}
              <div className="md:mt-4">
                <Swiper
                  key={gallery?.length || 0} // re-init if gallery changes
                  spaceBetween={12}
                  slidesPerView={5}

                  modules={[Navigation]}
                  onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }}
                  onInit={(swiper) => {
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  className="relative"
                >
                  {gallery?.map((src, i) => (
                    <SwiperSlide key={i} className="">
                      <img
                        src={src}
                        alt={`Thumb ${i}`}
                        className={`${activeImgIndex === i && !showVideo
                          ? "border-2 border-[#1777cb] opacity-70"
                          : ""
                          } cursor-pointer lg:h-full h-[70px] lg:object-contain object-cover w-full lg:rounded-2xl`}
                        onClick={() => handleThumbnailClick(i)}
                      />
                    </SwiperSlide>
                  ))}

                  {/* Custom arrows (outside look) */}
                  <button
                    ref={prevRef}
                    className="thumb-prev absolute left-2 top-1/2 z-10 -translate-y-1/2 text-white p-3 rounded-full shadow-md"
                    aria-label="Previous"
                  >
                    <IoIosArrowBack size={20} color="#fff" className="bg-[#111218cb] rounded-[50%] text-[8px] p-[3px]" />
                  </button>
                  <button
                    ref={nextRef}
                    className="thumb-next absolute right-2 top-1/2 z-10 -translate-y-1/2 text-white p-2 rounded-full shadow-md"
                    aria-label="Next"
                  >
                    <IoIosArrowForward size={20} color="#fff" className="bg-[#111218cb] rounded-[50%] text-[8px] p-[3px]" />
                  </button>
                </Swiper>
                <div className="flex mt-4">
                  {/* <button
                    onClick={() => onOpenModal(currentIndex, gallery)}
                    className="bg-[#22242e] w-full md:w-1/2 md:mb-0 mb-4 hover:bg-[#22242e]/80 transition-all duration-300 flex items-center justify-center gap-2 text-white py-3 px-4 rounded-[30px] text-sm md:text-lg font-semibold"
                  >
                    <IoImageOutline size={media ? 18 : 22} />
                    <span>View More</span>
                  </button> */}
                  {aircraft?.videoUrl && (
                    <button
                      onClick={() => setShowVideo(true)}
                      className={`w-full md:mb-0 mb-4 transition-all duration-300 flex items-center justify-center gap-2 text-white py-3 px-4 rounded-[30px] text-sm md:text-lg font-semibold ${
                        showVideo 
                          ? "bg-[#1777cb] hover:bg-[#1777cb]/80" 
                          : "bg-[#22242e] hover:bg-[#22242e]/80"
                      }`}
                    >
                      <FaRegCirclePlay size={media ? 18 : 22} />
                      <span>{showVideo ? "Playing Video" : "Video"}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: specs & contact */}
            <div className="lg:w-[40%] w-full flex flex-col gap-4">
              {/* Top Row: Price & Year */}
              <div className="jet_featured grid grid-cols-2 gap-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <div className="flex flex-col items-center p-5 rounded-2xl bg-gradient-to-br from-[#1b1d25] to-[#111218] border border-white/5 shadow-[5px_5px_15px_rgba(0,0,0,0.5),-2px_-2px_10px_rgba(255,255,255,0.02)] transition-transform hover:scale-[1.02] duration-300">
                  <div className="featured_value">
                    <h4 className="text-xl md:text-2xl text-white font-bold">
                      {aircraft?.price ? (
                        `$${Number(aircraft?.price || 0).toLocaleString()}`
                      ) : (
                        <a href="tel:210-882-9658">Call For Price</a>
                      )}
                    </h4>
                  </div>
                  <div className="featured_text">
                    <h4 className="text-[#7C7C88] text-xs uppercase tracking-wider font-semibold mt-1">
                      Price
                    </h4>
                  </div>
                </div>
                <div className="flex flex-col items-center p-5 rounded-2xl bg-gradient-to-br from-[#1b1d25] to-[#111218] border border-white/5 shadow-[5px_5px_15px_rgba(0,0,0,0.5),-2px_-2px_10px_rgba(255,255,255,0.02)] transition-transform hover:scale-[1.02] duration-300">
                  <div className="featured_value">
                    <h4 className="text-xl md:text-2xl text-white font-bold">
                      {aircraft?.year}
                    </h4>
                  </div>
                  <div className="featured_text">
                    <h4 className="text-[#7C7C88] text-xs uppercase tracking-wider font-semibold mt-1">
                      Year
                    </h4>
                  </div>
                </div>
              </div>

              {/* Middle Row: Agent & Location */}
              <div className="py-2 flex xl:flex-row lg:flex-col md:flex-row flex-col items-start justify-between">
                <div className="contact-info">
                  <h2 className="mb-3 text-[1.1rem] bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Agent Details
                  </h2>
                  <div className="gap-2">
                    <p className="text-sm mb-2 text-white flex items-center">
                      <CiUser
                        className="mr-2 bg-tertiary_color p-[4px] rounded-full"
                        size={22}
                      />
                      {aircraft?.contactAgent?.name || "—"}
                    </p>
                    <p className="text-sm mb-2 text-white flex items-center">
                      <TfiEmail
                        className="mr-2 bg-tertiary_color p-[4px] rounded-full"
                        size={22}
                      />
                      {aircraft?.contactAgent?.email || "—"}
                    </p>
                    <p className="text-sm text-white flex items-center">
                      <FaPhone
                        className="mr-2 bg-tertiary_color p-[4px] rounded-full"
                        size={22}
                      />
                      <a href="tel:210-882-9658">
                        {aircraft?.contactAgent?.phone || "—"}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="aircraft-location xl:pt-0 lg:pt-4 md:pt-0 pt-4">
                  <h2 className="mb-3 text-[1.1rem] bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Aircraft Location
                  </h2>
                  <div className="gap-2">
                    <p className="text-sm text-white flex items-center">
                      <ImLocation2
                        className="mr-2 bg-tertiary_color p-[4px] rounded-full"
                        size={22}
                      />
                      {aircraft?.location || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* New Specs Row: Airframe, Engine, Propeller */}
              <div className="grid grid-cols-3 gap-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <div className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-[#1b1d25] to-[#111218] border border-white/5 shadow-[5px_5px_15px_rgba(0,0,0,0.5),-2px_-2px_10px_rgba(255,255,255,0.02)] transition-transform hover:scale-[1.02] duration-300">
                  <span className="text-[#7C7C88] text-[10px] uppercase tracking-tighter font-semibold mb-1">Airframe</span>
                  <span className="text-white text-xs font-bold text-center leading-tight whitespace-normal w-full">{aircraft?.airframe || "—"}</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-[#1b1d25] to-[#111218] border border-white/5 shadow-[5px_5px_15px_rgba(0,0,0,0.5),-2px_-2px_10px_rgba(255,255,255,0.02)] transition-transform hover:scale-[1.02] duration-300">
                  <span className="text-[#7C7C88] text-[10px] uppercase tracking-tighter font-semibold mb-1">Engine</span>
                  <span className="text-white text-xs font-bold text-center leading-tight whitespace-normal w-full">{aircraft?.engine || "—"}</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-[#1b1d25] to-[#111218] border border-white/5 shadow-[5px_5px_15px_rgba(0,0,0,0.5),-2px_-2px_10px_rgba(255,255,255,0.02)] transition-transform hover:scale-[1.02] duration-300">
                  <span className="text-[#7C7C88] text-[10px] uppercase tracking-tighter font-semibold mb-1">Propeller</span>
                  <span className="text-white text-xs font-bold text-center leading-tight whitespace-normal w-full">{aircraft?.propeller || "—"}</span>
                </div>
              </div>

              {/* 3D Map Container */}
              <div className="p-1 rounded-2xl bg-gradient-to-br from-[#1b1d25] to-[#111218] border border-white/5 shadow-[5px_5px_15px_rgba(0,0,0,0.5),-2px_-2px_10px_rgba(255,255,255,0.02)] overflow-hidden">
                <iframe
                  src={`${aircraft?.latitude && aircraft?.longitude
                    ? `https://maps.google.com/maps?q=${aircraft?.latitude},${aircraft?.longitude}&z=12&output=embed`
                    : "https://maps.google.com/maps?q=34.7732102,-80.3917315&z=12&output=embed"
                    }`}
                  className="w-full h-[165px] rounded-xl"
                  style={{ filter: "grayscale(1) invert(1) contrast(1.2)" }}
                />
              </div>
            </div>
          </div>

          {/* Overview (rich HTML from backend) */}
          <div className="overview" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <div className="border-t-[1px] border-b-[1px] border-dashed border-[#46485D] py-6">
              <h2 className="mb-8 text-[1.2rem] xl:text-[1.5rem] bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent font-bold">
                Description
              </h2>
              {overviewHTML ? (
                <div
                  className="
                text-white/90 text-lg
                [&>p:last-child]:border-b-0 
                [&_strong]:text-white
                [&_ul]:list-disc [&_ul]:pl-6
                [&_ol]:list-decimal [&_ol]:pl-6
                [&_li]:mb-1
                [&_a]:underline [&_a]:text-[#7cc3ff]
              "
                  dangerouslySetInnerHTML={{ __html: overviewHTML }}
                />
              ) : (
                <p className="text-[1.2rem] xl:text-[1.5rem] text-white/70">No overview available.</p>
              )}
            </div>
          </div>

          {/* Tabs from backend sections */}
          {tabs.length > 0 && (
            <div className="tabs mt-8">
              <Tabs
                categories={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isAllTab={false}
              />
            </div>
          )}

          {/* Tab Content (checkmark list) */}
          <div className="md:flex justify-between mt-8 space-y-2 border-t-[1px] border-b-[1px] border-dashed border-gray-700 pt-2">
            <div className="md:w-[20%] tab-heading">
              <h2 className="pt-4 text-[1.2rem] xl:text-[1.5rem] font-semibold bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                {titleCase(activeTab)}
              </h2>
            </div>
            <div className="md:w-[80%] grid grid-cols-1 md:grid-cols-2 gap-x-10">
              {activeItems.length === 0 ? (
                <p className="text-[1.2rem] xl:text-[1.5rem] text-white/70 py-4">No data available.</p>
              ) : (
                activeItems.map((item, index) => (
                  <div key={index} className="text-sm py-3">
                    <div className="flex items-center text-white/80 text-lg border-b border-dashed border-[#46485D] pb-3 font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#268AE0] mr-4 shrink-0 shadow-[0_0_8px_rgba(38,138,224,0.4)]" />
                      {item}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Related Aircraft */}
          {related.length > 0 && (
            <>
              <h4 className="py-8 text-[1.2rem] xl:text-[1.5rem] text-white">
                Related Aircraft
              </h4>
              <Swiper
                spaceBetween={30}
                navigation={{ clickable: true }}
                keyboard={{ enabled: true, onlyInViewport: true }}
                loop
                modules={[Navigation, Keyboard]}
                className="mySwiper"
                breakpoints={{
                  0: { slidesPerView: 1 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {related.map((air) => (
                  <SwiperSlide key={air._id}>
                    <Card detail={air} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}

          {/* Video Modal */}
          <Modal
            isOpen={videoModalOpen}
            onRequestClose={closeVideoModal}
            contentLabel="Gallery Modal"
            className="fixed inset-0 flex items-center justify-center bg-black/90 z-[99999]"
            overlayClassName="z-[9999]"
          >
            <div className="bg-black p-4 rounded-lg w-[95%] md:w-[80%] max-w-5xl">
              <button
                onClick={closeVideoModal}
                className="text-white text-3xl font-bold absolute top-5 right-8"
              >
                &times;
              </button>
              <div className="aspect-video">
                <iframe
                  src={`${aircraft?.videoUrl}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </Modal>
        </div>
      </section>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default AircraftDetail;
