import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="w-full py-16 bg-blue-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm sm:text-3xl font-bold text-white mb-4">
            지금 우리 사업장에 딱 맞는 방역 플랜을 확인하세요
          </h2>
          <p className="text-blue-200 text-xs sm:text-lg mb-8">
            전화 상담을 통해 무료 견적 및 컨설팅을 받으실 수 있습니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button 
              onClick={() => window.open('https://open.kakao.com/o/sIBSxkbi')}
              className="flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-white w-56 py-3 rounded-full font-semibold transition-all"
            >
              간편 상담 신청하기
            </button>
            <button 
              onClick={() => window.open('tel:010-3605-9528')}
              className="flex items-center justify-center gap-2 bg-white text-blue-900 w-56 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all"
            >
              <Phone className="w-5 h-5" />
              062-470-7730
            </button>

          </div>
        </motion.div>
      </div>
    </section>
  );
}