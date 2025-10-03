import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  ShowroomPage,
  AcquisitionPage,
  BrokeragePage,
  SkynetPage,
  AboutPage,
  TestimonialPage,
  TeamPage,
  MemberDetailPage,
  HigherPage,
  ContactPage,  
  AircraftDetailPage,
  BlogPage,
  BlogDetailPage,
} from "./pages/index";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SubscribePopup from "./components/SubscribePopup";
import AncillaryPage from "./pages/AncillaryPage";
import SearchResultsPage from "./pages/SearchResultsPage";
// import "./locomotive-scroll.css";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/showroom" element={<ShowroomPage />} />
        <Route path="/showroom/:id" element={<AircraftDetailPage />} />
        <Route path="/acquisition" element={<AcquisitionPage />} />
        <Route path="/brokerage" element={<BrokeragePage />} />
        <Route path="/ancillary" element={<AncillaryPage />} />
        <Route path="/skynet" element={<SkynetPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/testimonial" element={<TestimonialPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/team/:id" element={<MemberDetailPage />} />
        <Route path="/higher" element={<HigherPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog-detail/:id" element={<BlogDetailPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        {/* <Route path="/dashboard" element={<DashboardLayout />} /> */}
      </Routes>
      {/* <SubscribePopup /> */}
    </>
  );
}

export default App;
