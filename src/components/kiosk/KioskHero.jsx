import React from 'react';
import { CreditCard, Headphones } from 'lucide-react';
import PageHero, { HeroVisual } from '../ui/PageHero';
import { useContent } from '../../content/ContentProvider';
import RichText from '../../content/RichText';

export default function KioskHero() {
  const content = useContent('kiosk');
  return (
    <PageHero
      label="Professional Kiosk"
      title={<RichText value={content.heroTitle} />}
      description={<RichText value={content.heroDescription} softBreaks />}
      visual={
        <HeroVisual
          src={content.heroImage}
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
