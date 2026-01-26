import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function TemplateSection() {
  const [activeCard, setActiveCard] = useState(null);

  const templates = [
    {
      id: 1,
      name: '출동경비',
      description: '이상 신호 감지 시 최단거리 차량 출동',
      image: '/image_file/출동경비2.png',
      color: 'from-purple-500 to-pink-500',
      detailDescription: [
        '방문 맞춤컨설팅을 통한 보안설계 및 설치',
        'AI 이상신호 감지 및 알림',
        'AI CCTV의 24시간 모니터링 및 긴급 출동',
        '안심플러스 보상서비스로 더 안심',
        '전국 규모의 전문 기술지원 센터 A/S 처리'
      ]
    },
    {
      id: 2,
      name: 'CCTV',
      description: '쉽고 빠른 영상 검색, 200만/500만 화소 고화질 AI CCTV',
      image: '/image_file/cctv2.png',
      color: 'from-blue-500 to-cyan-500',
      detailDescription: [
        '사람/차량 스마트 AI 검색',
        '영역 지정 침입탐지 및 검색',
        '침입 감지 알림 서비스',
        '피플카운팅 방문 분석 서비스'
      ]
    },
    {
      id: 3,
      name: '출입통제',
      description: '지문, 카드, 얼굴 인식을 이용하여 출입/근태 출입관리',
      image: '/image_file/출입통제2.png',
      color: 'from-orange-500 to-red-500',
      detailDescription: [
        '내,외부인원의 출입권한 통제 관리(일반문,자동문, E/L)',
        '내부직원을 위한 다양한 인증 방식',
        '외부인을 위한 다양한 호출 방식'
      ]
    },
    {
      id: 4,
      name: '캡스홈 (가정용)',
      description: '현관문 앞 영상, 얼굴인식 AI, 집안상황 실시간 확인',
      image: '/image_file/캡스홈2.png',
      color: 'from-green-500 to-emerald-500',
      detailDescription: [
        '현관 앞 상황실시간 영상 확인',
        '현관문 출입 내역 알림/확인',
        '현관 앞 배회자 감지 및 알림',
        '이상신호 감지시 대원 출동'
      ]
    },
  ];

  const handleCardClick = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <section id="template" className="w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 제목 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            통합 상품 설명서 
          </h2>
          <p className="text-xl text-gray-600">
            AI 기술로 더 빨리, 더 정확하게! 자신과 정보를 지키는 전문 보안 서비스
          </p>
        </motion.div>

        {/* 템플릿 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer"
              onClick={() => handleCardClick(template.id)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl active:shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95">
                {/* 이미지 */}
                <div className="aspect-video bg-gradient-to-br from-gray-300 to-gray-400 overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.name}
                    className={`w-full h-full object-cover group-hover:scale-110 group-hover:blur-sm transition-all duration-300 ${
                      activeCard === template.id ? 'scale-110 blur-sm' : ''
                    }`}
                  />

                  {/* 호버/터치 시 상세 설명 오버레이 */}
                  <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 flex items-center justify-center p-6 ${
                    activeCard === template.id 
                      ? 'opacity-100' 
                      : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    <div className="text-center text-white">
                      <h4 className="text-2xl font-bold mb-6">{template.name}</h4>
                      
                      {/* 리스트 형태의 상세 설명 */}
                      <div className="mb-6 space-y-2">
                        {template.detailDescription.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-start text-left">
                            <span className="text-yellow-400 mr-3 text-lg">•</span>
                            <span className="text-sm sm:text-base leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 active:bg-white/40 transition-colors duration-200">
                        <span className="font-semibold text-sm sm:text-base">
                          {activeCard === template.id ? '닫기' : '자세히 보기'}
                        </span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 텍스트 정보 */}
                <div className="p-6 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-gray-700 active:text-gray-800 transition-colors duration-300">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 hover:text-gray-700 active:text-gray-800 transition-colors duration-300">
                    {template.description}
                  </p>
                  
                  {/* 모바일용 터치 안내 */}
                  {/* <div className="mt-3 md:hidden">
                    <p className="text-xs text-gray-500">
                      💡 상세 정보
                    </p>
                  </div> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          {/* <button className="bg-black hover:bg-gray-900 text-white px-10 py-4 text-lg font-bold rounded-lg transition-all duration-300 transform hover:scale-105">
            모든 상품 보기
          </button> */}
        </motion.div>
      </div>
    </section>
  );
}