import React from 'react';
import CleanHero from '../components/cleancare/CleanHero';
import ServiceSection from '../components/cleancare/ServiceSection';
import CTASection from '../components/cleancare/CTASection';

export default function CleanCarePage() {
  return (
    <div>
      <CleanHero />
      <ServiceSection />
      <CTASection />
    </div>
  );
}