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
      description: '365일 쉬지 않는 모니터링을 통해에보안의 위협 요소를 신속하게 탐지 차단합니다.'
    },
    {
      icon: Grid3X3,
      title: '맞춤형 모듈',
      description: '기업의 규모와 산업 환경에 최적화된 보안솔루션 구축을 제공합니다.'
    }
  ];


 return (    <>
 {/* Core Strengths 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cyan-600 text-sm tracking-widest mb-3">CORE STRENGTHS</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">왜 ADT Caps 사이버가드인가?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreStrengths.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <item.icon className="w-7 h-7 text-cyan-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
    );
}