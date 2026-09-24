import React from 'react';
import { Clock, Lock } from 'lucide-react';
import PageHero, { HeroVisual } from '../ui/PageHero';

export default function CyberHeroSection() {
  return (
    <PageHero
      tone="dark"
      label="Enterprise Security Solution"
      title={
        <>
          민감정보 유출을 완벽히 차단하는
          <br />
          <span className="text-gradient-light">맞춤형 정보보안 솔루션</span>
        </>
      }
      description={
        <>
          ADT Caps 사이버가드와 함께라면, 보안 아키텍처를 통해
          <br className="hidden sm:block" /> 기업의 소중한 자산과 데이터를 24시간 보호합니다.
        </>
      }
      visual={
        <HeroVisual
          tone="dark"
          src="/image_file/사이버가드배경1.png"
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
