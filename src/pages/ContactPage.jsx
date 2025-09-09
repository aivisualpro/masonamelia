import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import bgPlane from "/images/contact.avif";
import bgPlaneHeader from "/images/contact-header.jpg";
import ScrollToTop from "../components/ScrollToTop";
import { useLocation } from "react-router-dom";
import ContactHeader from "../components/ContactHeader";
import useMediaQuery from "@mui/material/useMediaQuery";

const ContactPage = () => {
  const location = useLocation();
  const media = useMediaQuery("(max-width: 767px)");

  return (
    <>
      <Navbar />

      <section
        className={`md:sticky top-0 relative w-full bg-cover bg-center rounded-[20px] h-screen ${
          location.pathname !== "/contact" ? "lg:h-full xl:h-screen" : "h-full "
        }`}
        style={{
          backgroundImage: `linear-gradient(to right,rgb(21, 22, 28, ${
            media ? ".9" : "1"
          }) ${
            media ? "100%" : "35%"
          }, rgba(0, 0, 0, 0.05)), url(${bgPlaneHeader})`,
        }}
      >
        <div className="container">
          <ContactHeader />
        </div>
      </section>

      <section
        className={`relative w-full bg-cover bg-center rounded-[20px] ${
          location.pathname !== "/contact" ? "lg:h-full xl:h-screen" : "h-full "
        }`}
        style={{
          backgroundImage: `url(${bgPlane})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-[0]"></div>

        <div className="container flex flex-col h-full justify-center xl:py-10">
          <Contact />
        </div>
      </section>
      <Footer />

      <ScrollToTop />
    </>
  );
};

export default ContactPage;