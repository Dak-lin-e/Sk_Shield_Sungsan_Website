import SmartOrderHero from "../components/smartorder/SmartOrderHero"; 
import SmartOrderFeature from "../components/smartorder/SmartOrderFeature";
import SmartOrderSystem from "../components/smartorder/SmartOrderSystem";
import SmartOrderCTA from "../components/smartorder/SmartOrderCTA";
export default function TableOrderPage() {
  return (
    <div>
      <SmartOrderHero />
      <SmartOrderFeature />
      <SmartOrderSystem />
      <SmartOrderCTA />
    </div>
  );
}