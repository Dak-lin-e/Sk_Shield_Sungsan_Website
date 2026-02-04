import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function ServiceSection() {
  const services = [
    {
      title: '일반살균',
      image: './image_file/일반살균.png',
      color: 'bg-emerald-600',
      features: [
        '표면 살균 서비스',
        '접촉으로 인한 감염 예방',
        '월 1회 정기적 방문'
      ]
    },
    {
      title: '전문살균',
      image: './image_file/전문살균.png',
      color: 'bg-blue-600',
      features: [
        '초 미립자 분무 방식(ULV)',
        '법정 전염병 살균 서비스',
        '공기중 전파에 대한 예방'
      ]
    },
    {
      title: '보행해충',
      image: './image_file/보행해충.png',
      color: 'bg-sky-500',
      features: [
        '쥐, 바퀴벌레, 지네 퇴치',
        '모니터링 트랩 설치',
        '소독필증 발급',
        '월 1회 정기적 방문'
      ]
    },
    {
      title: '비래해충',
      image: './image_file/비행해충.png',
      color: 'bg-gray-200',
      features: [
        '포충기 렌탈 서비스',
        '파리, 모기, 나방 등 제거',
        '번트랩 PC 확산형 커버 사용',
        '오스람 램프 사용'
      ]
    }
  ];

  return (
    <section id="service" className="w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-xl sm:text-2xl md:text-3xl flex items-center justify-center gap-2 mb-4 white space-nowrap">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-900 flex-shrink-0" />
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-blue-900 whitespace-nowrap">
                사업장 청결관리 전문 방역·방제 솔루션
              </h2>
            </div>
            
          </div>
          <p className="text-gray-500 text-sm sm:text-lg md:text-lg max-w-2xl mx-auto">
            검증된 방역 기술로 실내 환경의 안전을 책임집니다.<br />
            사업장 특성에 맞는 맞춤 솔루션을 경험해 보세요.
          </p>
        </motion.div>

        {/* 서비스 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow p-6"
            >
              {/* 이미지 */}
              <div className={`w-28 h-28 mx-auto mb-6 rounded-full ${service.color} flex items-center justify-center overflow-hidden`}>
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover opacity-80"
                />
              </div>

              {/* 타이틀 */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4">{service.title}</h3>

              {/* 구분선 */}
              <div className="w-12 h-0.5 bg-blue-900 mx-auto mb-4"></div>

              {/* 특징 리스트 */}
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {feature}
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