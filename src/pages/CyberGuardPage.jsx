import CyberHeroSection from '../components/cyberguard/CyberHeroSection';
import React from 'react';
import CyberService from '../components/cyberguard/CyberService';
import CoreStrenghth from '../components/cyberguard/CoreStrength';
import CyberCTA from '../components/cyberguard/CyberCTA';   
export default function CyberGuardPage() {
  return (
    <div className="pt-20 min-h-screen">
    <CyberHeroSection />
    <CoreStrenghth />
    <CyberService />
    <CyberCTA />
    </div>
  );
}