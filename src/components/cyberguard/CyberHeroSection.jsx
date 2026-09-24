import React from 'react';
import { Clock, Lock } from 'lucide-react';
import PageHero, { HeroVisual } from '../ui/PageHero';
import { useContent } from '../../content/ContentProvider';
import RichText from '../../content/RichText';

export default function CyberHeroSection() {
  const content = useContent('cyberGuard');
  return (
    <PageHero
      tone="dark"
      label="Enterprise Security Solution"
      title={<RichText value={content.heroTitle} tone="dark" />}
      description={<RichText value={content.heroDescription} softBreaks />}
      visual={
        <HeroVisual
          tone="dark"
          src={content.heroImage}
          alt="ADT Caps 사이버가드"
          chips={[
            { icon: Clock, title: '24/7 실시간 관제', sub: '365일 모니터링' },
            { icon: Lock, title: '문서파일 암호화', sub: '랜섬웨어 탐지/차단/백업' },
          ]}
        />
      }
    />
  );
}
