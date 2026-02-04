import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import SecurityPage from "./pages/SecurityPage";
import KioskPage from "./pages/KioskPage";
import TableOrderPage from "./pages/TableOrderPage";
import CleanCarePage from "./pages/CleanCarePage";
import CyberGuardPage from "./pages/CyberGuardPage";

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}