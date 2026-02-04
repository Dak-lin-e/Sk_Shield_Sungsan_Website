import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldCheck, Clock, Grid3X3, ChevronDown, Check, ArrowRight } from 'lucide-react';

export default function CyberService() {
     const coreStrengths = [
    {
      icon: ShieldCheck,
      title: '검증된 전문성',
      description: '국내최초 정보보호 인가기업과 검증된 보안 전문가 조직을 갖춘 조직을 보유하고 있습니다.'
    },
    {
      icon: Clock,
      title: '24/7 실시간 관제',
      description: '365일 쉬지 않는 모니터링을 통해 보안의 위협 요소를 신속하게 탐지 차단합니다.'
    },
    {
      icon: Grid3X3,
      title: '맞춤형 모듈',
      description: '기업의 규모와 산업 환경에 최적화된 보안솔루션 구축을 제공합니다.'
    }
  ];

  const personalFeatures = ['웹 방화벽', 'PC 백신 및 DRM', '문서파일 암호화', '랜섬웨어 탐지/차단/백업'];
  const serverFeatures = ['통합 네트워크 UTM', '이미지/도면 암호화', '웹/서버 취약점 진단', '365일 24시간 관제'];

  return (
    <>
 {/* 서비스 카드 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 개인정보 및 기업 비밀 보호 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">개인정보 및 기업비밀 보호</h3>
              <p className="text-gray-500 text-sm mb-6">
                내부 데이터의 불법적인 유출을 원천 봉쇄, 개인정보보호 법적 요구사항을 대응합니다.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {personalFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-600" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
{/* 
              <a href="#" className="text-cyan-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                자세히 보기 <ArrowRight className="w-4 h-4" />
              </a> */}
            </motion.div>

            {/* 서버 보호 및 인프라 보안 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                <Grid3X3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">서버 보호 및 인프라 보안</h3>
              <p className="text-gray-500 text-sm mb-6">
                보안 인증 서비스로 안벽을 대비한 침탈이 차단 대비와 위협 차단 기술을 제공합니다.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {serverFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-600" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
{/* 
              <a href="#" className="text-cyan-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                자세히 보기 <ArrowRight className="w-4 h-4" />
              </a> */}
            </motion.div>
          </div>
        </div>
      </section>
        </>
    );
}