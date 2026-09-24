import CyberHeroSection from '../components/cyberguard/CyberHeroSection';
import React from 'react';
import CyberService from '../components/cyberguard/CyberService';
import CoreStrength from '../components/cyberguard/CoreStrength';
import CyberCTA from '../components/cyberguard/CyberCTA';   
export default function CyberGuardPage() {
  return (
    <div>
    <CyberHeroSection />
    <CoreStrength />
    <CyberService />
    <CyberCTA />
    </div>
  );
}