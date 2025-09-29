import React, { useState } from "react";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Thumbs,
  FreeMode,
  Keyboard,
  Navigation,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/keyboard";
import "swiper/css/navigation";

import GallaryOne from "/images/thumbnails/1.jpg";
import GallaryTwo from "/images/thumbnails/2.webp"
import GallaryThree from "/images/thumbnails/3.jpg";
import GallaryFour from "/images/thumbnails/4.webp";
import GallaryFive from "/images/thumbnails/5.jpg";
import GallarySix from "/images/thumbnails/6.webp";
import GallarySeven from "/images/thumbnails/7.jpg";
import GallaryEight from "/images/thumbnails/8.webp";
import GallaryNine from "/images/thumbnails/9.jpg";
import GallaryTen from "/images/thumbnails/10.webp";
import GallaryEleven from "/images/thumbnails/11.jpg";
import GallaryTwelve from "/images/thumbnails/12.webp";
import GallaryThirteen from "/images/thumbnails/13.jpg";
import GallaryFourteen from "/images/thumbnails/14.webp";
import GallaryFifteen from "/images/thumbnails/15.webp";
import GallarySixteen from "/images/thumbnails/16.webp";
import GallarySeventeen from "/images/thumbnails/17.webp";
import GallaryEighteen from "/images/thumbnails/18.webp";
import GallaryNineteen from "/images/thumbnails/19.webp";
import GallaryTwenty from "/images/thumbnails/20.webp";
import GallaryTwentyOne from "/images/thumbnails/21.webp";
import { HeroParallax } from "./ui/hero-parallex";
import "../custom.css"

Modal.setAppElement("#root");

const Gallary = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openHeroModal = (index) => {
    console.log(index);
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentIndex(0);
  };

  return (
    <>
      <HeroParallax portfolio={products} onImageClick={openHeroModal} />

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Video Gallery Modal"
        className="gallary_thumbnail fixed inset-0 flex items-center justify-center bg-black/90 z-[9999]"
        overlayClassName="z-[9999]"
      >
        <div className="bg-black h-screen rounded-lg w-[95%] md:w-[80%] max-w-5xl">
          <button
            onClick={closeModal}
            className="text-white text-3xl font-bold absolute top-5 right-8"
          >
            &times;
          </button>

          {/* Main Video */}
          <div className="h-[70%]">
            <iframe
              src={products[currentIndex].videoUrl}
              title={products[currentIndex].src}
              allowFullScreen
              className="w-full h-full mt-10 rounded"
            ></iframe>
          </div>

          {/* Thumbnails */}
          <div className="h-[30%]">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4.5}
            navigation={true}
            loop={true}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs, Navigation, Keyboard]}
            className="mySwiper w-full min-w-screen flex items-end"
            keyboard={true}
          >
            {products?.map((video, i) => (
              <SwiperSlide key={video.id} className="cursor-pointer">
                <img
                  src={video.src}
                  alt={video.title}
                  className={`rounded border-4 ${
                    currentIndex === i
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setCurrentIndex(i)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Gallary;

export const products = [
  {
    _id: 1,
    title: "G7",
    category: "",
    src: GallaryOne,
    videoUrl: "https://www.youtube.com/embed/IuMFks3rKUs?si=W4TKvepROxV0VqS4",
  },
  {
    _id: 2,
    title: "SR22",
    category: "",
    src: GallaryTwo,
    videoUrl: "https://www.youtube.com/embed/bupjXqMZcZE?si=Xh4IFH2gbRbXo3m-",

  },
  {
    _id: 3,
    title: "Marco",
    category: "",
    src: GallaryThree,
    videoUrl: "https://www.youtube.com/embed/0P8JNb42PvM?si=DlnQvcSO9LZONpA4",
  },
  {
    _id: 4,
    title: "4",
    category: "",
    src: GallaryFour,
    videoUrl: "https://www.youtube.com/embed/2_EVnUEyR3A?si=sJYJIC1XFUWA1Et5",
  },
  {
    _id: 5,
    title: "5",
    category: "",
    src: GallaryFive,
    videoUrl: "https://www.youtube.com/embed/0qhS6U4xNQA?si=7ipy3FuPf1Jiu4Dj",
  },
  {
    _id: 6,
    title: "Moonbeam",
    category: "",
    src: GallarySix,
    videoUrl: "https://www.youtube.com/embed/rhDjyEPPhJw?si=RwyglvRrtqsGqGrt",
  },
  {
    _id: 7,
    title: "Moonbeam",
    category: "",
    src: GallarySeven,
    videoUrl: "https://www.youtube.com/embed/9Axd7C4ryMk?si=WISxdBwNl1Z880is",
  },
  {
    _id: 8,
    title: "Moonbeam",
    category: "",
    src: GallaryEight,
    videoUrl: "https://www.youtube.com/embed/sS4xXGDoGX4?si=SyL_JT9H94K3x92a",
  },
  {
    _id: 9,
    title: "Moonbeam",
    category: "",
    src: GallaryNine,
    videoUrl: "https://www.youtube.com/embed/FpHaEl_8LFM?si=oI6eaHI9OTFNo4BI",
  },
  {
    _id: 10,
    title: "Moonbeam",
    category: "",
    src: GallaryTen,
    videoUrl: "https://www.youtube.com/embed/n738UsSZDiU?si=pz4hfbHOUfcIRmrp",
  },
  {
    _id: 11,
    title: "Moonbeam",
    category: "",
    src: GallaryEleven,
    videoUrl: "https://www.youtube.com/embed/YOYnQA1hN6s?si=XAVo4dy9IU8G1FeO",
  },
  {
    _id: 12,
    title: "Moonbeam",
    category: "",
    src: GallaryTwelve,
    videoUrl: "https://www.youtube.com/embed/65aV6vIo0yY?si=XxruFjaLOlH9jltM",
  },
  {
    _id: 13,
    title: "Moonbeam",
    category: "",
    src: GallaryThirteen,
    videoUrl: "https://www.youtube.com/embed/nJdIQ1rkkE0?si=DgCi_QI25YgaIomj",
  },
  {
    _id: 14,
    title: "Moonbeam",
    category: "",
    src: GallaryFourteen,
    videoUrl: "https://www.youtube.com/embed/BItfj9LidNw?si=bNI5SdwyH_xprCMC",
  },
  {
    _id: 15,
    title: "Moonbeam",
    category: "",
    src: GallaryFifteen,
    videoUrl: "https://www.youtube.com/embed/p9UdiASc748?si=84P-__aAH-gyODwY",
  },
  {
    _id: 16,
    title: "Moonbeam",
    category: "",
    src: GallarySixteen,
    videoUrl: "https://www.youtube.com/embed/cPiu6BqUXRY?si=hRYQfKfmhwdF95Qg",
  },
  {
    _id: 17,
    title: "Moonbeam",
    category: "",
    src: GallarySeventeen,
    videoUrl: "https://www.youtube.com/embed/2SUY8ULXEl0?si=LPRgJZx3hsxqt7dR",
  },
  {
    _id: 18,
    title: "Moonbeam",
    category: "",
    src: GallaryEighteen,
    videoUrl: "https://www.youtube.com/embed/4ujvEkQs620?si=dvYpmckpt62PjjiX",
  },
  {
    _id: 19,
    title: "Moonbeam",
    category: "",
    src: GallaryNineteen,
    videoUrl: "https://www.youtube.com/embed/AHF7354Fr1w?si=uAKuimD0sI1CU9Sz",
  },
  {
    _id: 20,
    title: "Moonbeam",
    category: "",
    src: GallaryTwenty,
    videoUrl: "https://www.youtube.com/embed/v6xa1FALxzw?si=lMZghJ1LsmkCbTS8",
  },
  {
    _id: 21,
    title: "Moonbeam",
    category: "",
    src: GallaryTwentyOne,
    videoUrl: "https://www.youtube.com/embed/2SUY8ULXEl0?si=NI4GX5xLf-tZquI2",
  },
];