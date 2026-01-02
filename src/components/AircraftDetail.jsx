import { useEffect, useMemo, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
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

import { motion } from "framer-motion";
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
  const [loading, setLoading] = useState(true);

  const [aircraft, setAircraft] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const [related, setRelated] = useState([]);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

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
        console.log("res recieved =========>", res)
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

  console.log("aircrafts", aircraft)

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

  console.log("related ======== >", related)

  return (
    <>
      {/* Spinner mounts into <body> via portal */}
      <FullscreenSpinner show={loading} text="Loading aircraft..." />

      {errMsg && (
        <div className="py-10 text-center text-red-400">
          Failed to load aircraft.
        </div>
      )}

      <section
        id="showroom"
        className="pb-20 pt-[98px] md:pb-20 md:pt-[calc(110px+76px)]"
      >
        <div className="md:hidden flex items-center bg-[#1777cb] px-2">
          <Link to="/showroom">
            <div className="showroom-redirect-icon flex items-center">
              <IoIosArrowBack size={16} color="white" />
            </div>
          </Link>
          <h1 className="text-base md:text-3xl mx-auto font-bold mt-2 mb-2 lg:mt-0 lg:mb-8 text-white">
            {aircraft?.title}
          </h1>
          {/* <span className="text-[#1777cb]">helloafdad</span> */}
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
                loop={Array.isArray(gallery) && gallery.length > 1} // guard
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

            <div className="rounded-lg overflow-hidden">
              <iframe
                src={`${aircraft?.latitude && aircraft?.longitude
                  ? `https://maps.google.com/maps?q=${aircraft?.latitude},${aircraft?.longitude}&z=12&output=embed`
                  : "https://maps.google.com/maps?q=34.7732102,-80.3917315&z=12&output=embed"
                  }`}
                className="w-full h-[180px] rounded"
                style={{ filter: "invert(90%) hue-rotate(180deg)" }}
              />
            </div>
          </div>
        </div>

        <div className="container px-5">
          {/* Desktop Header Row - Back Ribbon | Title | Status Tag */}
          <div className="hidden md:flex items-center gap-4 mb-6">
            {/* Back Ribbon Button */}
            <Link to="/showroom" className="flex-shrink-0">
              <div className="flex items-center">
                <div
                  className="tag-left-arrow"
                  style={{ borderRight: "16px solid #22242e" }}
                />
                <div className="flex items-center gap-2 px-4 py-2 bg-[#22242e] text-white text-sm font-semibold hover:bg-[#2a2d38] transition-colors duration-200">
                  <IoIosArrowBack size={18} />
                  <span>Back</span>
                </div>
              </div>
            </Link>

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
                  loop={Array.isArray(gallery) && gallery.length > 1} // guard
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

            <div className="lg:w-[40%] w-full">
              <div className="jet_featured flex md:flex-row flex-col justify-between mt-4 gap-4">
                <div className="flex flex-col items-center bg-[#171921] w-1/2 w-full p-4 rounded-3xl">
                  <div className="featured_value">
                    <h4 className="text-xl md:text-2xl text-white">
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
                <div className="flex flex-col items-center bg-[#171921] w-1/2 w-full p-4 rounded-3xl">
                  <div className="featured_value">
                    <h4 className="text-xl md:text-2xl text-white">
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

              <div className="py-8 flex xl:flex-row lg:flex-col md:flex-row flex-col items-start justify-between">
                <div className="contact-info">
                  <h2 className="mb-4 text-[1.2rem] xl:text-[1.5rem] bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
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

                <div className="aircraft-location xl:pt-0 lg:pt-8 md:pt-0 pt-8">
                  <h2 className="mb-4 text-[1.2rem] xl:text-[1.5rem] bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
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

              <div className="rounded-lg overflow-hidden">
                <iframe
                  src={`${aircraft?.latitude && aircraft?.longitude
                    ? `https://maps.google.com/maps?q=${aircraft?.latitude},${aircraft?.longitude}&z=12&output=embed`
                    : "https://maps.google.com/maps?q=34.7732102,-80.3917315&z=12&output=embed"
                    }`}
                  className="w-full h-[180px] rounded"
                  style={{ filter: "invert(90%) hue-rotate(180deg)" }}
                />
              </div>
            </div>
          </div>

          <div className="py-8 flex flex-row items-center justify-between lg:w-[30%] w-full">
            <div className="airframe md:text-start text-center">
              <h2 className="mb-3 text-[1.2rem] xl:text-[1.5rem] bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                Airframe
              </h2>
              <span className="text-white/90 text-lg">
                {aircraft?.airframe}
              </span>
            </div>
            <div className="engine md:text-start text-center">
              <h2 className="mb-3 text-[1.2rem] xl:text-[1.5rem] bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                Engine
              </h2>
              <span className="text-white/90 text-lg">
                {aircraft?.engine}{" "}
                {aircraft?.engineTwo ? `/ ${aircraft?.engineTwo}` : ""}
              </span>
            </div>
            <div className="propeller md:text-start text-center">
              <h2 className="mb-3 text-[1.2rem] xl:text-[1.5rem] bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                Propeller
              </h2>
              <span className="text-white/90 text-lg">
                {aircraft?.propeller}{" "}
                {aircraft?.propellerTwo ? `/ ${aircraft?.propellerTwo}` : ""}
              </span>
            </div>
          </div>

          {/* Overview (rich HTML from backend) */}
          <div className="overview">
            <h2 className="mb-8 text-[1.2rem] xl:text-[1.5rem] bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
              Overview
            </h2>

            <div className="border-t-[1px] border-b-[1px] border-dashed border-[#46485D] py-6">
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
            <div className="md:w-[80%]">
              {activeItems.length === 0 ? (
                <p className="text-[1.2rem] xl:text-[1.5rem] text-white/70 py-4">No data available.</p>
              ) : (
                activeItems.map((item, index) => (
                  <div key={index} className="text-sm py-4">
                    <span className="text-white border-b border-t border-dashed border-[#46485D] font-medium block text-white/80 bg-[#171921] text-lg p-4">
                      <IoCheckmarkDoneOutline className="text-tertiary_color inline-block mr-2 mb-[6px]" />
                      {item}
                    </span>
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
    </>
  );
};

export default AircraftDetail;
