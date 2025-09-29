import React, { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ServiceBanner from "../components/ServiceBanner";
import banner from "/images/acquisition/banner.png";
import ServiceBannerContent from "../components/ServiceBannerContent";
import CTABanner from "../components/CTABanner";
import ServiceRappleResearch from "../components/ServiceRappleResearch";
import ServiceHighlights from "../components/ServiceHighlights";
import Navbar from "../components/Navbar";

const AcquisitionPage = () => {
  const bannerRef = useRef(null);

  const data = [
    { id: 1, title: "Materials & Outreach Preparation", description: "From buyer intent letters to targeted outreach, we craft compelling packages that open doors. This includes electronic newsletters, private inquiries, and public channel monitoring." },
    { id: 2, title: "Buyer Intent Letters", description: "We craft personalized buyer letters that communicate credibility and serious intent — opening doors to off-market conversations and early negotiations with aircraft owners." },
    { id: 3, title: "Opportunity Monitoring", description: "We continuously scan global listings, private boards, and industry networks to uncover real-time buying opportunities that match your desired aircraft class and criteria." },
  ];

  const acquisitionData = [
    { id: 1, title: "Tailored Aircraft Identification", description: "We begin by identifying aircraft that align precisely with your mission profile, operational goals, and financial expectations—narrowing down by make, model, and availability." },
    { id: 2, title: "Strategic Marketing & Advertising", description: "We handle everything from photography to copywriting, launching your listing across key channels to reach serious buyers efficiently and attractively." },
    { id: 3, title: "Data-Driven Aircraft Evaluation", description: "Utilizing proprietary data and aviation market intelligence, we determine a competitive listing price that reflects real-time demand and enhances buyer interest." },
    { id: 4, title: "End-to-End Transaction Management", description: "We handle LOIs, negotiate terms, finalize contracts, and oversee all due diligence processes—ensuring speed, accuracy, and full transparency at every step." },
    { id: 5, title: "Full-Service Integration Support", description: "From legal and escrow coordination to insurance, financing, and pilot training—we bring the right partners to the table and manage all moving parts to close successfully." },
  ];

  useEffect(() => {
    const t = setTimeout(() => {
      const secondSection = document.getElementById("acquisition");
      // If user already scrolled, skip auto-scroll
      if (window.scrollY < 50 && secondSection) {
        secondSection.scrollIntoView({ behavior: "smooth", block: "start" });
        // Alternatively, scroll exactly the banner height:
        // if (bannerRef.current) {
        //   window.scrollTo({ top: bannerRef.current.offsetHeight, behavior: "smooth" });
        // }
      }
    }, 1000);

    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* First section: 100vh until 1024px (lg), then auto */}
      <div ref={bannerRef} className="h-screen lg:h-auto">
        <ServiceBanner banner={banner} />
      </div>

      <main id="acquisition" className="relative z-[0]">
        <ServiceRappleResearch
          data={data}
          highlightedTitle={"Pre Acquisition"}
          title={"Insight Curated For Precision"}
          description={
            "Before any deal takes flight, our team conducts thorough groundwork to ensure your acquisition strategy is sharp, informed, and advantageously positioned — from outreach to opportunity identification."
          }
        />
        <ServiceHighlights data={acquisitionData} />

        <section className="bg-[#111218] relative z-[0] py-10">
          <div className="container px-5">
            <CTABanner />
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
};

export default AcquisitionPage;
