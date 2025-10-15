import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AircraftDetail from "../components/AircraftDetail";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import GalleryModal from "../components/GallaryModal";
import Contact from "../components/Contact";

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

      <Contact />
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
