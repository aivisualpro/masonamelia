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
  InsurancePage,
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
    // Skip only for the showroom listing – it handles scroll restoration itself
    if (pathname !== '/showroom') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  // Record visitor once per session (not per navigation)
  useEffect(() => {
    if (sessionStorage.getItem('_visited')) return;
    sessionStorage.setItem('_visited', '1');

    try {
      const payload = JSON.stringify({
        page: window.location.pathname,
        referrer: document.referrer || '',
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
      });

      const sent = navigator.sendBeacon?.('/api/visits', new Blob([payload], { type: 'application/json' }));
      if (!sent) {
        fetch('/api/visits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch { /* ignore */ }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/showroom" element={<ShowroomPage />} />
        <Route path="/showroom/:id" element={<AircraftDetailPage />} />
        <Route path="/acquisition" element={<AcquisitionPage />} />
        <Route path="/brokerage" element={<BrokeragePage />} />
        <Route path="/ancillary" element={<AncillaryPage />} />
        <Route path="/insurance" element={<InsurancePage />} />
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
