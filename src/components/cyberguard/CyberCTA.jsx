import React from 'react';
import { ConsultCTA } from '../ui/Consult';

export default function CyberCTA() {
  return (
    <ConsultCTA
      title={
        <>
          안전한 디지털 환경을 위한
          <br className="hidden sm:block" /> <span className="text-gradient-light">최고의 파트너</span>
        </>
      }
      description="보안 전문가의 1:1 무료 컨설팅을 통해 귀사만의 보안 로드맵을 만들어 보세요."
    />
  );
}
