import React from 'react';
import KioskHero from '../components/kiosk/KioskHero';
import KioskSystem from '../components/kiosk/KioskSystem';
import KioskSolution from '../components/kiosk/KioskSolution';




export default function KioskPage() {
  return (
    <div className="pt-20 min-h-screen">
      <KioskHero />
      <KioskSystem />
      <KioskSolution />
      
    </div>
  );
}