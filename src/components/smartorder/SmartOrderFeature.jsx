import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, RefreshCw, Clock, Monitor, Gift, Settings } from 'lucide-react';

export default function SmartOrderFeatures() {
  const features = [
    {
      icon: Smartphone,
      title: '편리한 셋업',
      description: '기존의 사용하던 POS 기기를 교체하지 않아도 활용이 가능합니다.',
      highlight: false
    },
    {
      icon: RefreshCw,
      title: '빈틈없는 사후관리',
      description: '24시간 이내 신속하게 A/S 처리해드립니다.',
      highlight: true
    },
    {
      icon: Clock,
      title: '웨이팅 기능',
      description: '실시간 대기현황을 확인 후 입장 시 알람을 통해 고객 불편을 최소화합니다.',
      highlight: false
    },
    {
      icon: Monitor,
      title: '태블릿 도난 알림 기능',
      description: '테블릿 네트워크가 끊어지면 관리자 테블릿에 도난방지알람이 발생해 빠른 대응이 가능합니다.',
      highlight: true
    },
    {
      icon: Gift,
      title: '신규 가입 베네핏',
      description: '메뉴 사진 촬영과 기기 최초 설치를 무상으로 지원합니다.',
      highlight: false
    },
    {
      icon: Settings,
      title: '다양한 관리자 기능',
      description: '매출 통계, 메뉴, 키오스크, 노출 순서 외 다른 종류의 관리를 다양하게 사용하세요.',
      highlight: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">스마트 오더 주요 기능</h2>
          <p className="text-gray-500 text-sm">매장 운영의 효율성을 향상하는 스마트한 기능들을 확인해보세요.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                feature.highlight ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
              }`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}