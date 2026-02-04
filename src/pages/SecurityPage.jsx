import React from 'react';
import SmartHero from '../components/security/SmartHero';
import SolutionServices from '../components/security/SolutionService';
import ServiceFlow from '../components/security/ServiceFlow';
import SmartAppSection from '../components/security/SmartAppSection';
export default function SecurityPage() {
  return (
    <div className="pt-20 min-h-screen">
      <SmartHero />
      <SolutionServices />
      <ServiceFlow />
      <SmartAppSection />
    </div>
  );
}