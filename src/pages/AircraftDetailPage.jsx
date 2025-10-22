import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AircraftDetail from "../components/AircraftDetail";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import GalleryModal from "../components/GallaryModal";
import Contact from "../components/Contact";
import CTABanner from "../components/CTABanner";

const AircraftDetailPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gallary, setGallary] = useState([]);

  const openModal = (index, images) => {
    setCurrentIndex(index);
    setGallary(images);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Navbar />

      <AircraftDetail
        onOpenModal={openModal}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <section className="bg-[#111218] relative z-[10] py-10">
        <div className="container px-5">
          <CTABanner />
        </div>
      </section>

      {/* <Contact /> */}
      <Footer />
      <ScrollToTop />

      <GalleryModal
        isOpen={modalOpen}
        onClose={closeModal}
        images={gallary}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </>
  );
};

export default AircraftDetailPage;
