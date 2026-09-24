import React from 'react';
import KioskHero from '../components/kiosk/KioskHero';
import KioskSystem from '../components/kiosk/KioskSystem';
import KioskSolution from '../components/kiosk/KioskSolution';




export default function KioskPage() {
  return (
    <div>
      <KioskHero />
      <KioskSystem />
      <KioskSolution />
      
    </div>
  );
}