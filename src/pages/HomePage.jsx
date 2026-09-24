import HeroSection from "../components/home/HeroSection";
import ScrollSection from "../components/home/ScrollSection";
import TemplateSection from "../components/home/TemplateSection";
import Contact from "../components/home/Contact";
import AdPopup from "../components/home/AdPopup";
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TemplateSection />
      <ScrollSection />
      <Contact />
      <AdPopup />
    </>
  );
}