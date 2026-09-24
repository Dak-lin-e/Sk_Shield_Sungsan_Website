import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Outlet, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import SecurityPage from "./pages/SecurityPage";
import KioskPage from "./pages/KioskPage";
import TableOrderPage from "./pages/TableOrderPage";
import CleanCarePage from "./pages/CleanCarePage";
import CyberGuardPage from "./pages/CyberGuardPage";
import { ContentProvider } from "./content/ContentProvider";
import { Spinner } from "./admin/ui";

// 관리자 화면(Firebase Auth/Storage 포함)은 /admin 접속 시에만 내려받는다.
const AdminApp = lazy(() => import("./admin/AdminApp"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function SiteLayout() {
  return (
    <ContentProvider>
      <div className="w-full overflow-hidden">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ContentProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ScrollToTop />
        <Routes>
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<Spinner className="min-h-screen" />}>
                <AdminApp />
              </Suspense>
            }
          />
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/kiosk" element={<KioskPage />} />
            <Route path="/table-order" element={<TableOrderPage />} />
            <Route path="/clean-care" element={<CleanCarePage />} />
            <Route path="/cyber-guard" element={<CyberGuardPage />} />
          </Route>
        </Routes>
      </MotionConfig>
    </BrowserRouter>
  );
}
