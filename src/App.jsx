import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import SecurityPage from "./pages/SecurityPage";
import KioskPage from "./pages/KioskPage";
import TableOrderPage from "./pages/TableOrderPage";
import CleanCarePage from "./pages/CleanCarePage";
import CyberGuardPage from "./pages/CyberGuardPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ScrollToTop />
        <div className="w-full overflow-hidden">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/kiosk" element={<KioskPage />} />
              <Route path="/table-order" element={<TableOrderPage />} />
              <Route path="/clean-care" element={<CleanCarePage />} />
              <Route path="/cyber-guard" element={<CyberGuardPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </BrowserRouter>
  );
}
