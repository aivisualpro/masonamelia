import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
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
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // ---- Fetch detail ----
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      setLoading(true);
      try {
        setErrMsg("");
        const res = await fetch(`${DETAIL_URL}${id}`, { signal: ac.signal });
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
        const res = await fetch(LIST_URL, { signal: ac.signal });
        const json = await res.json();
        const rows = Array.isArray(json?.data) ? json.data : [];
        const mapped = rows
          .filter((r) => r._id !== id)
          .map((r) => ({
            _id: r._id,
            title: r.title,
            price: Number(r.price || 0),
            featuredImage: r.featuredImage,
            overview: r.overview,
            images: Array.isArray(r.images) ? r.images : [],
            airframe: String(r.airframe ?? ""),
            engine: String(r.engine ?? ""),
            propeller: String(r.propeller ?? ""),
            category: r.status || "for-sale", // Card expects string
          }));
        setRelated(mapped);
      } catch {
        // ignore related errors
      }
    })();
    return () => ac.abort();
  }, [id]);

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

  const openVideoModal = () => setVideoModalOpen(true);
  const closeVideoModal = () => setVideoModalOpen(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full mx-auto">
        <PuffLoader color="#fff" size={100} />
      </div>
    );
  }

  if (errMsg) {
    return (
      <section id="showroom" className="pb-20 pt-[150px] md:py-20">
        <div className="container px-5">
          <p className="text-red-400">Error: {errMsg || "Not found"}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="showroom"
        className="pb-20 pt-[150px] md:pb-20 md:pt-[calc(110px+5rem)]"
      >
        <div className="container px-5">
          <div className="lg:flex items-center justify-between">
            <h1 className="text-3xl font-bold mb-4 lg:mb-8 text-white">
              {aircraft?.title}
            </h1>
            <div className="tag-container mb-4">
              <div
                className="tag-left-arrow"
                style={{ borderRight: "20px solid #1777cb" }}
              />
              <div className="flex items-center gap-2 px-4 py-[9px] bg-[#1777cb] text-white text-sm font-semibold">
                <span className="w-2 h-2 bg-[#fff] rounded-full" />
                {titleCase(aircraft?.status || "")}
              </div>
            </div>
          </div>

          <div className="lg:flex flex-col md:flex-row gap-4">
            {/* Left: gallery */}
            <div className="lg:w-[60%]">
              <img
                src={gallery?.[activeImgIndex]}
                alt="Main Aircraft"
                className="w-full h-[400px] object-cover rounded-2xl cursor-pointer"
                onClick={() => onOpenModal(activeImgIndex, gallery)}
              />
              <div className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gallary_images gap-4">
                  {gallery?.slice(0, 4)?.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Thumb ${i}`}
                      className={`${
                        activeImgIndex === i
                          ? "border-2 border-[#1777cb] opacity-70"
                          : ""
                      } cursor-pointer h-[120px] object-cover rounded-2xl`}
                      onClick={() => setActiveImgIndex(i)}
                    />
                  ))}
                </div>
                <div className="flex mt-4 gap-4">
                  <button
                    onClick={() => onOpenModal(currentIndex, gallery)}
                    className="bg-[#22242e] w-full md:w-1/2 md:mb-0 mb-4 hover:bg-[#22242e]/80 transition-all duration-300 flex items-center justify-center gap-2 text-white py-3 px-4 rounded-[30px] text-sm md:text-lg font-semibold"
                  >
                    <IoImageOutline size={media ? 18 : 22} />
                    <span>View More</span>
                  </button>
                  {aircraft?.videoUrl && (
                    <button
                      onClick={openVideoModal}
                      className="bg-[#22242e] w-full md:w-1/2 md:mb-0 mb-4 hover:bg-[#22242e]/80 transition-all duration-300 flex items-center justify-center gap-2 text-white py-3 px-4 rounded-[30px] text-sm md:text-lg font-semibold"
                    >
                      <FaRegCirclePlay size={media ? 18 : 22} />
                      <span>Video</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: specs & contact */}
            <div className="lg:w-[40%]">
              <div className="jet_featured flex justify-between mt-4 gap-4">
                <div className="flex flex-col items-center bg-[#171921] w-1/2 p-4 rounded-3xl">
                  <div className="featured_value">
                    <h4 className="text-xl md:text-2xl text-white">
                      $ {Number(aircraft?.price || 0).toLocaleString()}
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

              <div className="mt-8 md:flex items-start justify-between">
                <div className="contact-info">
                  <h2 className="mb-4 text-2xl bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
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
                      {aircraft?.contactAgent?.phone || "—"}
                    </p>
                  </div>
                </div>

                <div className="aircraft-location">
                  <h2 className="mb-4 text-2xl bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
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

              <div className="">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49118.23391548527!2d-111.87382773125353!3d39.697185689909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874c5648a65523d9%3A0xd7b6f9f8a451f49e!2sNephi%2C%20UT%2084648%2C%20USA!5e0!3m2!1sen!2s!4v1755939914578!5m2!1sen!2s"
                  className="w-full h-[180px] mt-6 rounded"
                />
              </div>
            </div>
          </div>

          {/* Overview (rich HTML from backend) */}
          <div className="overview mt-8">
            <h2 className="mb-8 text-2xl bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
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
                <p className="text-white/70">No overview available.</p>
              )}
            </div>
          </div>

          {/* Tabs from backend sections */}
          {tabs.length > 0 && (
            <div className="tabs mt-16">
              <Tabs
                categories={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isAllTab={false}
              />
            </div>
          )}

          {/* Tab Content (checkmark list) */}
          <div className="md:flex justify-between mt-6 space-y-2 border-t-[1px] border-b-[1px] border-dashed border-gray-700 pt-2">
            <div className="md:w-[20%] tab-heading">
              <h2 className="pt-4 text-3xl font-semibold bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                {titleCase(activeTab)}
              </h2>
            </div>
            <div className="md:w-[80%]">
              {activeItems.length === 0 ? (
                <p className="text-white/70 py-4">No data available.</p>
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
              <h4 className="mt-16 mb-8 text-4xl text-white">
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
