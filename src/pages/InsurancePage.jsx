import React from "react";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ServiceBanner from "../components/ServiceBanner";
import banner from "/images/insurance/insurance image.jpg";
import bannerTwo from "/images/insurance/insurance image.jpg"; // Using same for mobile
import { useContact } from "../hooks/useContactQuery";

const InsurancePage = () => {
  const { data: contactData } = useContact();

  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO / FIRST SECTION */}
      <div className="relative z-[9] lg:h-auto overflow-hidden">
        <ServiceBanner
          banner={banner}
          bannerTwo={bannerTwo}
          titleWhite={contactData?.insurance_hero_title_white}
          titleBlue={contactData?.insurance_hero_title_blue}
          heroDescription={contactData?.insurance_hero_description}
          bgImage={contactData?.insurance_hero_bg_image}
        />
      </div>
      {/* Mobile-only: Titan banner below hero */}
      <main className="md:hidden relative z-[0] bg-[#111218] py-16">
        <div className="container mx-auto px-5 text-center flex flex-col items-center">
          <img 
            src="/images/insurance/titan_aerospace_insurance.avif" 
            alt="Titan Aerospace Insurance" 
            className="max-w-[240px] mx-auto rounded-lg mb-8"
          />
          <a
            href="mailto:insurance@masonamelia.com"
            className="text-[#111218] flex gap-2 items-center shadow-xl text-lg bg-[#fff] backdrop-blur-md font-medium isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-tertiary_color hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-8 py-3 overflow-hidden border-2 border-[#111218] transition-all duration-700 hover:border-tertiary_color rounded-full group"
          >
            Get Quote
          </a>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default InsurancePage;
