import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ScrollSection from "./components/ScrollSection";
import TemplateSection from "./components/TemplateSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="w-full overflow-hidden">
      <Header />
      <HeroSection />
      <TemplateSection />
      <ScrollSection />
      <Footer />
    </div>
  );
}
