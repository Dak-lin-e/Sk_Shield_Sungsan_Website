import React from 'react';
import { Phone, Play, ShieldCheck } from 'lucide-react';
import { CONTACT } from '../../constants/contact';
import Button from '../ui/Button';
import PageHero, { HeroVisual } from '../ui/PageHero';

const VIDEOS = [
  { label: '뷰가드 AI 영상보기', href: 'https://www.youtube.com/watch?v=MXOCO6a3Y5o' },
  { label: 'ADT 캡스 영상보기', href: 'https://www.youtube.com/watch?v=zQQNhQMxst0' },
];

export default function HeroSection() {
  return (
    <PageHero
      label="ADT CAPS · 성산대리점"
      title={
        <>
          ADT 캡스
          <br />
          <span className="relative isolate inline-block">
            <span className="text-gradient">통합 보안</span>
            <span className="absolute inset-x-0 -bottom-1 -z-10 h-3 rounded-sm bg-linear-to-r from-accent/15 to-accent-secondary/10 md:-bottom-2 md:h-4" aria-hidden="true" />
          </span>{' '}
          시스템
        </>
      }
      description="비교할수록 확실한 차이, ADT캡스 전문대리점에서 최적의 솔루션을 만나세요."
      actions={
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <Button href={CONTACT.phoneHref} size="lg" icon={Phone} arrow className="w-full sm:w-auto">
            상담 연결
          </Button>
          {VIDEOS.map(video => (
            <Button key={video.href} href={video.href} size="lg" variant="secondary" icon={Play} className="w-full sm:w-auto">
              {video.label}
            </Button>
          ))}
        </div>
      }
      visual={
        <HeroVisual
          src="/image_file/출입보안2.jpg"
          alt="ADT 캡스 출입 보안 시스템"
          chips={[
            { icon: ShieldCheck, title: 'AI CCTV 24시간 모니터링', sub: '이상 신호 감지 시 긴급 출동' },
            { icon: Phone, title: `전화상담 ${CONTACT.phoneLabel}`, sub: '성산대리점 직접 상담' },
          ]}
        />
      }
    />
  );
}
