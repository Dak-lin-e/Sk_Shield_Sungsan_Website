import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function SmartOrderCTA() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            지금 바로 전문가와 상담하세요
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            매장 규모와 업종에 최적화된 스마트 오더 솔루션을 제안해드립니다.<br />
            상담 신청 후 빠른 연락받을 안내해드세요.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => window.open('https://open.kakao.com/o/sIBSxkbi')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-sm font-medium"
            >
              간편 상담 신청하기
            </button>
            <button 
              onClick={() => window.open('tel:010-3605-9528')}
              className="bg-white hover:bg-gray-100 text-gray-700 px-8 py-3 rounded-full text-sm font-medium border border-gray-200 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              062-470-7730
            </button>
          </div>
{/* 
          <p className="text-xs text-gray-400 mt-6">
            상담 시간: 평일 09시 ~ 18시 (점심시간별도)
          </p> */}
        </motion.div>
      </div>
    </section>
  );
}