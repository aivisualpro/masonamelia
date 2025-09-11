import { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { CiUser } from "react-icons/ci";
import { ImLocation2 } from "react-icons/im";
import Tabs from "./Tabs";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import Card from "./Card";
import planeOne from "/images/planes/plane (1).png";
import planeTwo from "/images/planes/plane (2).png";
import Modal from "react-modal";

Modal.setAppElement("#root");

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

// import required modules
import { Navigation, Keyboard, FreeMode, Thumbs } from "swiper/modules";
import { motion } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";

const airplanes = [
  {
    _id: "94827342a",
    title: "Gulfstream G600",
    description: `Ultra-long-range jet offering luxurious interiors and advanced aerodynamics.`,
    image: planeOne,
    price: 58000000,
    airframe: "2500",
    engine: "2665",
    category: "acquired",
    propeller: "2352",
  },
  {
    _id: "dafda4353",
    title: "Pilatus PC-24",
    description: `The world’s first Super Versatile Jet, combining jet performance with STOL capability.`,
    image: planeTwo,
    price: 11200000,
    airframe: "2500",
    engine: "2665",
    category: "for-sale",
    propeller: "2352",
  },
  {
    _id: "948affad23127342a",
    title: "Dassault Falcon 8X",
    description: `Trijet design built for global missions with impressive comfort and silence.`,
    image:
      "https://static.wixstatic.com/media/04f737_1c39fe2f88ed45528ce4adbaf6fcb7db~mv2.jpg/v1/fill/w_475,h_317,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
    price: 62000000,
    airframe: "2500",
    engine: "2665",
    category: "for-sale",
    propeller: "2352",
  },
  {
    _id: "aasfa241",
    title: "Cessna Citation Latitude",
    description: `A spacious midsize business jet with refined performance and connectivity.`,
    image:
      "https://static.wixstatic.com/media/04f737_ac3a5ea4fa314ee2a69820004b466adc~mv2.jpg/v1/fill/w_476,h_317,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
    price: 18500000,
    airframe: "2500",
    engine: "2665",
    category: "off-market",
    propeller: "2352",
  },
  {
    _id: "fada2341",
    title: "Embraer Legacy 500",
    description: `Elegant design, powerful range, and fly-by-wire technology define this midsize jet.`,
    image:
      "https://static.wixstatic.com/media/04f737_cd6176e2909246568c3e1e28bc53a5e6~mv2.png/v1/fill/w_494,h_317,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.png",
    price: 20500000,
    airframe: "2500",
    engine: "2665",
    category: "wanted",
    propeller: "2352",
  },
  {
    _id: "342561",
    title: "Bombardier Global 7500",
    description: `A record-breaking ultra-long-range jet built for elite intercontinental travel.`,
    image:
      "https://static.wixstatic.com/media/04f737_fd0a17988c874abba73d71133474396d~mv2.jpg/v1/fill/w_476,h_317,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
    price: 75000000,
    airframe: "5000",
    engine: "2665",
    category: "sold",
    propeller: "2352",
  },
  {
    _id: "252571",
    title: "HondaJet Elite",
    description: `Light jet designed for efficiency, innovation, and a quiet ride.`,
    image:
      "https://static.wixstatic.com/media/04f737_e52f694a355b4486b572f20d7b9cadef~mv2.jpg/v1/fill/w_461,h_321,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
    price: 7000000,
    airframe: "2500",
    engine: "2665",
    category: "sale-pending",
    propeller: "2352",
  },
  {
    _id: "adad2413414",
    title: "Cessna Citation CJ4 Gen2",
    description: `Compact yet powerful jet, ideal for short runways and business hops.`,
    image:
      "https://static.wixstatic.com/media/04f737_6e0dc7c677f5437d829b057ea12c2819~mv2.jpg/v1/fill/w_476,h_317,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
    price: 10500000,
    airframe: "2500",
    engine: "2665",
    category: "coming-soon",
    propeller: "2352",
  },
  {
    _id: "24342342",
    title: "Beechcraft King Air 260",
    description: `Proven twin-turboprop with excellent speed, range, and avionics.`,
    image:
      "https://static.wixstatic.com/media/04f737_52a32d56f9714148904f44208f37a15c~mv2.jpg/v1/fill/w_476,h_317,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
    price: 7200000,
    airframe: "5000",
    engine: "2665",
    category: "for-sale",
    propeller: "2352",
  },
  {
    _id: "25545426fgdafa",
    title: "Cirrus Vision Jet G2+",
    description: `Personal jet with enhanced automation and safety through Cirrus CAPS.`,
    image:
      "https://static.wixstatic.com/media/04f737_5f0dce2365ab4f4ca18a4aa8a1a89c87~mv2.jpg/v1/fill/w_475,h_317,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
    price: 3450000,
    airframe: "5000",
    engine: "2665",
    category: "for-sale",
    propeller: "2352",
  },
];

const AircraftDetail = ({ onOpenModal, currentIndex, setCurrentIndex }) => {
  const aircraft = {
    _id: "193726afas91731",
    title: "N252DA 2020 Diamond DA40 NG",
    description: [
      "Nick Buccellato with Mason Amelia proudly presents N252DA, a 2020 Diamond DA40 NG that blends performance, efficiency, and comfort like no other. Powered by the Austro AE300 turbo-diesel engine featuring FADEC (Full Authority Digital Engine Control), this bird sips Jet-A fuel, delivering impressive fuel economy while significantly reducing pilot workload. With its sleek composite airframe built for durability and efficiency, an industry-leading safety record, and all the creature comforts you’d expect from an aircraft of this caliber, N252DA is the perfect co-pilot.",
      "Equipped with Garmin G1000 NXi avionics and a GFC700 autopilot, take advantage of expanded flight operations and unmatched capability for any mission. Factory-installed air conditioning means you’re cruising comfortably, no matter the season. Don’t forget the huge windows that provide an unobstructed panoramic view, letting you enjoy the sights while watching for traffic. N252DA is ideal for cross-country flights or locking in some IFR training.",
      "The DA40 NG doesn’t play by the same rules. Winglets slash drag and smooth out stability. Add in Diamond’s trademark T-tail, and you’ve got a sleeper STOL performer. Top off the tanks with 39 usable gallons of jet fuel, and you’re good for 900 NM at 50% power. For a faster ride, 150 knots true and a hefty 750-pound useful load deliver a solid combination of performance and payload. N252DA’s detailed logbooks reflect a lifetime of meticulous maintenance. Take advantage of pre-buy savings and receive this DA40 NG with a fresh annual! ",
      "For more information about this DA40 NG, please contact Nick Buccellato with Mason Amelia!",
    ],
    images: [
      "https://static.wixstatic.com/media/04f737_d3db2b6627024d4391e1be56933ad55f~mv2.jpg/v1/fill/w_980,h_503,q_90,enc_avif,quality_auto/04f737_d3db2b6627024d4391e1be56933ad55f~mv2.jpg",
      "https://static.wixstatic.com/media/04f737_4e7e05e743ec4edcaeadb753a016cf0c~mv2.jpg/v1/fill/w_980,h_503,q_90,enc_avif,quality_auto/04f737_4e7e05e743ec4edcaeadb753a016cf0c~mv2.jpg",
      "https://static.wixstatic.com/media/04f737_c4a237800964489792c73d776af0e6be~mv2.jpg/v1/fill/w_980,h_503,q_90,enc_avif,quality_auto/04f737_c4a237800964489792c73d776af0e6be~mv2.jpg",
      "https://static.wixstatic.com/media/04f737_48f37e94e11845b8a154f698c80188f2~mv2.jpg/v1/fill/w_980,h_503,q_90,enc_avif,quality_auto/04f737_48f37e94e11845b8a154f698c80188f2~mv2.jpg",
      "https://static.wixstatic.com/media/04f737_3ff5f109793e43d7814c099ecae8a7dd~mv2.jpg/v1/fill/w_980,h_503,q_90,enc_avif,quality_auto/04f737_3ff5f109793e43d7814c099ecae8a7dd~mv2.jpg",
    ],
    agent: {
      _id: "9218371dsa1av01823",
      name: "Nick Buccellato",
      email: "nick@masonamelia.com",
      phone: "518-578-0609",
    },
    location: "Nephi, UT, USA",
    price: 529900,
    published_year: 2020,
    status: "For Sale",
    category: {
      _id: "9218371dsa1av01823",
      name: "Acquired",
      slug: "acquired",
    },
    airframe: [
      "2020 Diamond DA40 NG",
      "875 hours Total Time",
      "Long-range Fuel Capacity (39 gal)",
    ],
    engine: [
      "AUSTRO AE300 Turbo Diesel w/ Single Lever Control System",
      "875 SNEW",
      "Engine TBO: 1800",
      "Turbocharged: Yes",
    ],
    propeller: ["MT 3-Bladed Prop", "875 SNEW"],
    avionics: [
      "Garmin G1000 NXi Flight Deck",
      "Garmin 10-inch Display Units (PFD & MFD)",
      "Garmin GFC700 Autopilot",
      "Garmin G3000 Flight Management System",
      "Garmin GFC 700 Automatic Flight Control System",
      "Garmin G5000 Flight Management System",
      "Garmin GMA 1360 Digital Audio System",
      "Garmin TAWS-B (Terrain Awareness)",
      "Garmin Synthetic Vision",
      "Garmin Safe Taxi",
      "Garmin GDL69 XM Weather/Radio",
      "Garmin Traffic Advisory System",
      "Analog Standby Instruments",
      "ELT 406 MHz",
    ],
    equipments: [
      "Air Conditioning/RACC System (Powered by an additional alternator)",
      "Electrically Operated Adjustable Rudder Pedals",
      "Built-in Tablet Mount Provisions (Pilot and copilot armrests)",
      "Headset Hangers on Front Seats",
      "Emergency Egress Axe",
      "Flight Manual",
      "Fire Extinguisher",
      "Long-Range Fuel Tanks (39 gal)",
      "Baggage Compartment Cargo Net",
      "Dual USB Charging Ports",
      "Tow Bar",
      "Control Lock",
    ],
    interior: [
      "High-gloss Multi-Layer Matterhorn White Basecoat with Red and Silver Accent Striping",
      "Wheel Fairings, LED Landing and Taxi Lights, LED Position and Strobe Lights",
    ],
    exterior: [
      "Beige perforated Leather Ergonomic Seats, Dark Grey Premium Carpet, Light Grey/beige Side Panels, Panoramic Toned Canopy with Sun Glare Shields, Hydrolok Adjustable Backrest for Pilot & Co-Pilot, Dual USB Charging Ports for Pilot & Co-Pilot, Instrument Lighting, Overhead Cabin Light",
    ],
    inspection: [
      "2025 annual to commence in April",
      "Recent 600-hour inspection completed (borescope inspection, adherence to all recommended service bulletins, V-clamp AD compliance, and recent replacement of the mass flywheel and high-pressure turbo)",
    ],
  };

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("airframe");

  const categories = [
    { name: "Airframe", slug: "airframe" },
    { name: "Engine", slug: "engine" },
    { name: "Propeller", slug: "propeller" },
    { name: "Avionics", slug: "avionics" },
    { name: "Equipments", slug: "equipments" },
    { name: "Interior", slug: "interior" },
    { name: "Exterior", slug: "exterior" },
    { name: "Inspection", slug: "inspection" },
  ];

  const openVideoModal = () => {
    setVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setVideoModalOpen(false);
  };

  const gallary = aircraft?.images?.filter((item) => item);

  const media = useMediaQuery("(max-width: 768px)");

  const renderTabContent = () => {
    const data = aircraft[activeTab.toLowerCase()];
    return (
      <div className="md:flex justify-between mt-6 space-y-2 border-t-[1px] border-b-[1px] border-dashed border-gray-700">
        <div className="md:w-[20%] tab-heading">
          <h2 className="pt-4 text-3xl font-semibold bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
            {activeTab
              ?.split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h2>
        </div>
        <div className="md:w-[80%]">
          {data.map((item, index) => (
            <div key={index} className=" text-sm  py-4">
              <span className="text-white border-b border-t border-dashed border-[#46485D] font-medium block text-white/80 bg-[#171921] text-lg p-4">
                <IoCheckmarkDoneOutline className="text-tertiary_color inline-block mr-2 mb-[6px]" />{" "}
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <section id="showroom" className="pb-20 pt-[150px] md:pb-20 md:pt-[calc(110px+5rem)]">
        <div className="container px-5">
          <div className="lg:flex items-center justify-between">
            <h1 className="text-3xl font-bold mb-4 lg:mb-8 text-white">
              {aircraft?.title}
            </h1>
            <div className="tag-container mb-4">
              <div
                className="tag-left-arrow"
                style={{ borderRight: "20px solid #1777cb" }}
              ></div>
              <div className="flex items-center gap-2 px-4 py-[9px] bg-[#1777cb] text-white text-sm font-semibold">
                <span className="w-2 h-2 bg-[#fff] rounded-full"></span>
                {aircraft?.status}
              </div>
            </div>
          </div>

          <div className="lg:flex flex-col md:flex-row gap-4">
            <div className="lg:w-[60%]">
              <img
                src={aircraft?.images[activeImgIndex]}
                alt="Main Aircraft"
                className="w-full h-[400px] object-cover rounded-2xl cursor-pointer"
                onClick={() => onOpenModal(activeImgIndex, gallary)} // updated
              />
              <div className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gallary_images gap-4">
                  {aircraft?.images?.slice(0, 4).map((src, i) => (
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
                    onClick={() => onOpenModal(currentIndex, gallary)}
                    className="bg-[#22242e] w-full md:w-1/2 md:mb-0 mb-4 hover:bg-[#22242e]/80 transition-all duration-300 flex items-center justify-center gap-2 text-white py-3 px-4 rounded-[30px] text-sm md:text-lg font-semibold"
                  >
                    <IoImageOutline size={media ? 18 : 22} />{" "}
                    <span>View More</span>
                  </button>
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="bg-[#22242e] w-full md:w-1/2 md:mb-0 mb-4 hover:bg-[#22242e]/80 transition-all duration-300 flex items-center justify-center gap-2 text-white py-3 px-4 rounded-[30px] text-sm md:text-lg font-semibold"
                  >
                    <FaRegCirclePlay size={media ? 18 : 22} />{" "}
                    <span>Video</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:w-[40%]">
              <div className="jet_featured flex justify-between mt-4 gap-4">
                <div className="flex flex-col items-center bg-[#171921] w-1/2 p-4 rounded-3xl">
                  <div className="featured_value">
                    <h4 className="text-xl md:text-3xl text-white">4</h4>
                  </div>
                  <div className="featured_text">
                    <h4 className="text-[#7C7C88] text-sm md:text-base text-center">
                      Passangers
                    </h4>
                  </div>
                </div>
                <div className="flex flex-col items-center bg-[#171921] w-1/2 p-4 rounded-3xl">
                  <div className="featured_value">
                    <h4 className="text-xl md:text-3xl text-white">
                      900 <span className="text-white text-lg">nm</span>
                    </h4>
                  </div>
                  <div className="featured_text">
                    <h4 className="text-[#7C7C88] text-sm md:text-base text-center">
                      Range
                    </h4>
                  </div>
                </div>
              </div>
              <div className="jet_featured flex justify-between mt-4 gap-4">
                <div className="flex flex-col items-center bg-[#171921] w-1/2 p-4 rounded-3xl">
                  <div className="featured_value">
                    <h4 className="text-xl md:text-3xl text-white">
                      150 <span className="text-white text-lg">ktas</span>
                    </h4>
                  </div>
                  <div className="featured_text">
                    <h4 className="text-[#7C7C88] text-sm md:text-base text-center">
                      Max Cruise Speed
                    </h4>
                  </div>
                </div>
                <div className="flex flex-col items-center bg-[#171921] w-1/2 p-4 rounded-3xl">
                  <div className="featured_value">
                    <h4 className="text-xl md:text-3xl text-white">
                      16,000 <span className="text-white text-lg">ft</span>
                    </h4>
                  </div>
                  <div className="featured_text">
                    <h4 className="text-[#7C7C88] text-sm md:text-base text-center">
                      Max Ceiling Height
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
                      />{" "}
                      {aircraft?.agent?.name}
                    </p>
                    <p className="text-base mb-3 text-white flex items-center">
                      <TfiEmail
                        className="mr-2 bg-tertiary_color p-[6px] rounded-full"
                        size={28}
                      />{" "}
                      {aircraft?.agent?.email}
                    </p>
                    <p className="text-base mb-3 text-white flex items-center">
                      <FaPhone
                        className="mr-2 bg-tertiary_color p-[6px] rounded-full"
                        size={28}
                      />{" "}
                      {aircraft?.agent?.phone}
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
                      />{" "}
                      {aircraft?.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49118.23391548527!2d-111.87382773125353!3d39.697185689909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874c5648a65523d9%3A0xd7b6f9f8a451f49e!2sNephi%2C%20UT%2084648%2C%20USA!5e0!3m2!1sen!2s!4v1755939914578!5m2!1sen!2s"
                  className="w-full h-[180px] mt-6 rounded"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="description mt-8">
            <h2 className="mb-8 text-2xl bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
              Description
            </h2>
            <div className="gap-4 border-t-[1px] border-b-[1px] border-dashed border-[#46485D]">
              {aircraft?.description?.map((point, idx) => (
                <p
                  key={idx}
                  className={`text-base mb-3 text-white flex ${
                    idx === aircraft?.description?.length - 1
                      ? "pb-1"
                      : idx === 0
                      ? "pt-4 border-b-[1px] border-dashed border-[#4d4e50] pb-4"
                      : "border-b-[1px] border-dashed border-[#4d4e50] pb-4"
                  }`}
                >
                  {point}
                </p>
              ))}
            </div>
          </div>

          <div className="tabs mt-16">
            <Tabs
              categories={categories}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isAllTab={false}
            />
          </div>

          {/* Tab Content */}
          {renderTabContent()}

          {/* Relatedd Aircraft */}
          <h4 className="mt-16 mb-8 text-4xl text-white">Related Aircraft</h4>
          <Swiper
            spaceBetween={30}
            navigation={{
              clickable: true,
            }}
            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
            loop={true}
            modules={[Navigation, Keyboard]}
            className="mySwiper"
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {airplanes?.map((airplane) => (
              <SwiperSlide key={airplane._id}>
                <Card detail={airplane} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Modal For Gallary Images */}

          {/* Modal For Video */}
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

              {/* Main Video */}
              <div className="aspect-video">
                <iframe
                  src={
                    "https://www.youtube.com/embed/taLem3cUJb4?si=p7OX_eyJ_4abvwRO"
                  }
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </Modal>
        </div>
      </section>
    </>
  );
};

export default AircraftDetail;
