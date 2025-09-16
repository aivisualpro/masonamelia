import React from "react";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Keyboard, Navigation } from "swiper/modules";
import { PhotoProvider, PhotoView } from "react-photo-view";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "react-photo-view/dist/react-photo-view.css";

Modal.setAppElement("#root");

const GalleryModal = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex,
}) => {
  if (!images || images.length === 0) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Gallery Modal"
      className="img-gallary fixed inset-0 flex items-center justify-center bg-black/90 z-[99999]"
      overlayClassName="z-[9999]"
    >
      <div className="bg-black p-4 rounded-lg w-[95%] md:w-[80%] max-w-5xl mt-20">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-white text-3xl font-bold top-5 right-8 z-[99999] absolute"
        >
          &times;
        </button>

        {/* Main Swipeable & Zoomable Image Viewer */}
        <div className="h-[70%]">
        <PhotoProvider>
          <PhotoView src={images[currentIndex]}>
            <img
              src={images[currentIndex]}
              className="mx-auto w-full max-h-[80vh] scale-[1.2] md:scale-100 object-contain rounded"
            />
          </PhotoView>
        </PhotoProvider>
        </div>

        <div className="h-[30%] mt-8 md:mt-4">
        {/* Thumbnail Navigation */}
        <Swiper
          spaceBetween={10}
          freeMode={true}
          keyboard={true}
          navigation={true}
          watchSlidesProgress={true}
          loop={true}
          modules={[FreeMode, Thumbs, Keyboard, Navigation]}
          className="mySwiper mt-10 md:mt-4"
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
          }}
        >
          {images?.map((image, i) => (
            <SwiperSlide key={i} className="cursor-pointer">
              <img
                src={image}
                alt={`Thumb ${i}`}
                className={`rounded border-2 ${
                  currentIndex === i ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => setCurrentIndex(i)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        </div>

      </div>
    </Modal>
  );
};

export default GalleryModal;