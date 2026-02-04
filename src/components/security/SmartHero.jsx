import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Building, Smartphone } from 'lucide-react';

export default function SmartHero() {
  const features = [
    { icon: Shield, title: '보안솔루션 제공', desc: '캡스출동 서비스 / 24시간 경비 및 상황 서비스' },
    { icon: FileText, title: '도난 손해 보상', desc: '동산/현금/유가증권/귀중품 등 도난손해보상' },
    { icon: Building, title: '영업비 손해 보상', desc: '시설파손으로 인해 발생된 추가 손실에 대한 보상' }
  ];

  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-blue-600 text-lg mb-2">무인매장 특화 보안 및 원격관리</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            무인 경비 솔루션
          </h1>
          <p className="text-gray-500 text-sm max-w-md">
            무인매장에 최적화된 첨단 보안 서비스로 안심하고 운영하세요.<br />
            24시간 빈틈없는 감시와 실시간 대응 시스템을 제공합니다.
          </p>
        </motion.div>
 


        {/* 운영이 쉬워지는 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-8 flex flex-col lg:flex-row gap-8"
        >
          {/* 왼쪽 이미지 영역 */}
          <div className="lg:w-1/2 bg-gray-100 rounded-xl overflow-hidden min-h-[250px]">
            <img 
              src="./image_file/무인매장솔루션.png" 
              alt="스마트 매장 솔루션"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 오른쪽 텍스트 영역 */}
          <div className="lg:w-1/2">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              운영이 쉬워지는<br />
              <span className="text-blue-600">맞춤형 무인화 솔루션</span>
            </h2>

            <div className="mt-6 space-y-4">
              {features.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}