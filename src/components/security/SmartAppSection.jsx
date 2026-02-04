import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, AlertTriangle, MapPin, FileText, Users, Smartphone } from 'lucide-react';

export default function SmartAppSection() {
  const appFeatures = [
    { icon: Clock, text: '실시간(24시간) 조회' },
    { icon: Zap, text: '출입문 제어' },
    { icon: AlertTriangle, text: '실시간 녹화 및 저장' },
    { icon: MapPin, text: '매출/단가/재고 조회' },
    { icon: FileText, text: '키오스크 재실행' },
    { icon: Users, text: '방문 고객과 양방향 대화' }
  ];

  return (
    <section className="py-20 bg-blue-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              무인매장 전용 앱으로<br />
              어디서든 간편하게 관리
            </h2>
            <p className="text-blue-200 text-sm mb-8">
              다수의 매장을 운영하더라도 스마트폰 하나면 실시간 제어, 모니터링이 가능합니다.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {appFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <feature.icon className="w-4 h-4 text-cyan-400" />
                  <span className="text-white text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-1/2 flex justify-center"
          >
            <div className="relative">
              <div className="w-48 h-96 bg-gray-900 rounded-[2.5rem] border-4 border-gray-700 shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="w-40 h-80 bg-white rounded-[2rem] overflow-hidden">
                  <img 
                    src="./image_file/무인매장앱1.png" 
                    alt="무인매장 앱 화면"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}