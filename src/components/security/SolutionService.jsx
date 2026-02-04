import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, MessageSquare, ArrowRight,Megaphone,Siren,ShieldPlus } from 'lucide-react';

export default function SolutionServices() {
  const solutions = [
    {
      icon: 'megaphone',
      title: 'AI / 스피커',
      items: ['AI카메라 금지구역 침입 감지 및 양방향 대화', '매장 이용 안내 스피커를 통한 안내멘트 송출']
    },
    {
      icon: 'monitor',
      title: '인증기 / 키오스크',
      items: ['다양한 인증 방식으로 출입가능한 인증기', '카드/현금 겸용의 결제 키오스크']
    },
    {
      icon: 'siren',
      title: '출동서비스 / 환경감지기',
      items: ['비상벨/장기체류/쓰러짐 감지 시 출동서비스', '매장 온/습도/유해물질 측정하는 환경감지기']
    }
  ];

  const renderIcon = (type) => {
    if (type === 'siren') return <Siren className="w-5 h-5" />;
    if (type === 'monitor') return <Monitor className="w-5 h-5" />;
    if (type === 'megaphone') return <Megaphone className="w-5 h-5" />;
    return <MessageSquare className="w-5 h-5" />;
    
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2"><ShieldPlus className="inline w-10 h-10 mr-2 pb-2 text-blue-600" />무인안심존 솔루션 특화 서비스</h2>
          <p className="text-gray-500 text-xs sm:text-lg md:text-xl">간편하게 매장 운영을 위한 ADT 캡스만의 특별한 기술력</p>
        </motion.div>

        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border-1 border-blue-300 p-4 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-gray-400">
                  {renderIcon(solution.icon)}
                </div>
                <h3 className="font-bold text-gray-900">{solution.title}</h3>
              </div>
              <ul className="space-y-2">
                {solution.items.map((item, idx) => (
                  <li key={idx} className="text-gray-500 text-sm flex items-start gap-2">
                    <ArrowRight className="w-3 h-3 mt-1 text-blue-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}