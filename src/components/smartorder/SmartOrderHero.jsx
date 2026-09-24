import React from 'react';
import { RefreshCw, Tablet } from 'lucide-react';
import PageHero, { HeroVisual } from '../ui/PageHero';
import { useContent } from '../../content/ContentProvider';
import RichText from '../../content/RichText';

export default function SmartOrderHero() {
  const content = useContent('tableOrder');
  return (
    <PageHero
      label="스마트한 매장 운영의 시작"
      title={<RichText value={content.heroTitle} />}
      description={<RichText value={content.heroDescription} softBreaks />}
      visual={
        <HeroVisual
          src={content.heroImage}
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
