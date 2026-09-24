import React from 'react';
import { CreditCard, Headphones } from 'lucide-react';
import PageHero, { HeroVisual } from '../ui/PageHero';

export default function KioskHero() {
  return (
    <PageHero
      label="Professional Kiosk"
      title={
        <>
          캡스 키오스크의
          <br />
          <span className="text-gradient">특별함을 경험해보세요</span>
        </>
      }
      description={
        <>
          직원 없이도 간편하게! 인건비와 응대 피로도를 줄이는
          <br className="hidden sm:block" /> 똑똑한 결제 키오스크로 매장 운영의 효율을 높이세요.
        </>
      }
      visual={
        <HeroVisual
          src="/image_file/키오스크배경1.png"
          alt="ADT CAPS 키오스크"
          fit="contain"
          chips={[
            { icon: CreditCard, title: '카드/현금 겸용', sub: '결제 키오스크' },
            { icon: Headphones, title: '365일 A/S', sub: '빠르고 정확하게' },
          ]}
        />
      }
    />
  );
}
