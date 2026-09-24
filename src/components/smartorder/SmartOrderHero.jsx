import React from 'react';
import { RefreshCw, Tablet } from 'lucide-react';
import PageHero, { HeroVisual } from '../ui/PageHero';

export default function SmartOrderHero() {
  return (
    <PageHero
      label="스마트한 매장 운영의 시작"
      title={
        <>
          캡스만의 <span className="text-gradient">특별함</span>을
          <br />
          경험해보세요
        </>
      }
      description="태블릿을 통해 테이블에서 직접 주문받고, 주문 내역을 실시간으로 관리하는 효율적인 스마트 오더 시스템입니다."
      visual={
        <HeroVisual
          src="/image_file/스마트오더.png"
          alt="태블릿 주문 시스템"
          chips={[
            { icon: Tablet, title: '테이블에서 직접 주문', sub: '태블릿 스마트 오더' },
            { icon: RefreshCw, title: '24시간 이내 A/S', sub: '빈틈없는 사후관리' },
          ]}
        />
      }
    />
  );
}
