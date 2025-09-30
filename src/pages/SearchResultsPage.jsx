import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import SearchResults from "../components/SearchResults";

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
      <Footer />

      <ScrollToTop />
    </>
  );
};

export default MemberDetailPage;
