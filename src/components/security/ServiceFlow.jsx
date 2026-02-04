import React from 'react';
import { motion } from 'framer-motion';
import { User, Smartphone, Camera, Users, Circle, ArrowRight, ArrowDown, ArrowLeftRight } from 'lucide-react';

export default function ServiceFlow() {
  const steps = [
    { icon: User, label: '점주', color: 'bg-white border-2 border-gray-200' },
    { icon: Smartphone, label: '점주 App', color: 'bg-white border-2 border-gray-200' },
    { icon: Camera, label: '카메라', color: 'bg-white border-2 border-gray-200' },
    { icon: Users, label: '매장고객', color: 'bg-amber-400', textColor: 'text-white' },
    { icon: Circle, label: '호출버튼', color: 'bg-white border-2 border-gray-200' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* 제목 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-block bg-blue-900 text-white px-8 py-3 rounded-t-lg">
            <h2 className="text-lg sm:text-xl font-bold">양방향통화 서비스 구성도</h2>
          </div>
        </motion.div>

        {/* 플로우 차트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border-2 border-blue-200 p-6 sm:p-8"
        >
          {/* 데스크톱 레이아웃 */}
          <div className="hidden md:block">
            {/* 상단 흐름: 점주 ↔ 점주App → 카메라 → 매장고객 → 호출버튼 */}
            <div className="flex items-center justify-between gap-2">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  {/* 아이템 */}
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-20 h-20 rounded-full ${step.color} flex items-center justify-center shadow-md`}>
                      <step.icon className={`w-10 h-10 ${step.textColor || 'text-gray-700'}`} />
                    </div>
                    <span className={`text-sm font-semibold px-4 py-1 rounded ${index === 3 ? 'bg-amber-400 text-white' : 'bg-blue-100 text-blue-800'}`}>
                      {step.label}
                    </span>
                  </div>
                  
                  {/* 화살표 */}
                  {index < steps.length - 1 && (
                    <div className="flex flex-col items-center">
                      {index === 0 ? (
                        // 점주 ↔ 점주App: 양방향 화살표
                        <ArrowLeftRight className="w-6 h-6 text-gray-400" />
                      ) : index === 2 ? (
                        // 카메라 → 매장고객: 음성송출
                        <>
                          <span className="text-xs text-gray-500 mb-1">음성송출</span>
                          <ArrowRight className="w-6 h-6 text-gray-400 " />
                        </>
                      ) : (
                        <ArrowRight className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* 하단 음성수신 화살표: 호출버튼 → 카메라 (ㄷ자 형태) */}
            <div className="relative mt-4" style={{ marginLeft: '48%', marginRight: '5%' }}>
              {/* 카메라 쪽 수직선 (위로 향함) */}
              <div className="absolute left-0 top-0 w-0.5 h-8 border-l-2 border-dashed border-gray-300"></div>
              {/* 카메라 쪽 화살표 (위로) */}
              <div className="absolute left-0 -top-2 -translate-x-[7px]">
                <ArrowDown className="w-5 h-5 text-gray-400 rotate-180" />
              </div>
              
              {/* 가로선 */}
              <div className="absolute left-0 right-0 top-8 border-t-2 border-dashed border-gray-300"></div>
              
              {/* 중간 텍스트 */}
              <div className="absolute left-1/2 -translate-x-1/2 top-8 -translate-y-1/2 bg-white px-2">
                <span className="text-sm text-gray-600 font-medium">음성수신</span>
              </div>
              
              {/* 호출버튼 쪽 수직선 (아래로 내려옴) */}
              <div className="absolute right-0 -top-8 w-0.5 h-16 border-l-2 border-dashed border-gray-300"></div>
              
              {/* 빈 공간 확보 */}
              <div className="h-12"></div>
            </div>
          </div>

          {/* 모바일 레이아웃 */}
          <div className="md:hidden">
            <div className="flex flex-col items-center gap-4">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  {/* 아이템 */}
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center shadow-md`}>
                      <step.icon className={`w-8 h-8 ${step.textColor || 'text-gray-700'}`} />
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded ${index === 3 ? 'bg-amber-400 text-white' : 'bg-blue-100 text-blue-800'}`}>
                      {step.label}
                    </span>
                  </div>
                  
                  {/* 화살표 */}
                  {index < steps.length - 1 && (
                    <div className="flex flex-col items-center py-1">
                      {index === 0 ? (
                        // 점주 ↔ 점주App: 양방향 화살표
                        <div className="flex items-center gap-1">
                          <ArrowDown className="w-5 h-5 text-gray-400" />
                          <ArrowDown className="w-5 h-5 text-gray-400 rotate-180" />
                        </div>
                      ) : index === 2 ? (
                        // 카메라 → 매장고객: 음성송출
                        <>
                          <span className="text-xs text-gray-500 mb-1">음성송출</span>
                          <ArrowDown className="w-5 h-5 text-gray-400" />
                        </>
                      ) : (
                        <ArrowDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}

              {/* 하단 음성수신 표시: 호출버튼 → 카메라 */}
              <div className="flex items-center gap-2 border-2 border-dashed border-gray-300 rounded-full px-4 py-2 mt-2">
                <ArrowDown className="w-4 h-4 text-gray-400 rotate-180" />
                <span className="text-xs text-gray-600 font-medium">음성수신 (호출버튼→카메라)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}