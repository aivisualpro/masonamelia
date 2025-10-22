import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import SearchResults from "../components/SearchResults";
import Contact from "../components/Contact";
import CTABanner from "../components/CTABanner";

const MemberDetailPage = () => {
  // useGsapScroll();

  return (
    <>
      <Navbar />
      <main id="main">
        <div className="py-20 mt-[100px]">
          <SearchResults />
        </div>
      </main>

      <section className="bg-[#111218] relative z-[10] py-10">
        <div className="container px-5">
          <CTABanner />
        </div>
      </section>

      {/* <Contact /> */}
      <Footer />

      <ScrollToTop />
    </>
  );
};

export default MemberDetailPage;
