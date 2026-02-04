import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function CyberCTA() {
  return (
    <>

{/* CTA 섹션 */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(./image_file/전산실.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-blue-900/90" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
              안전한 디지털 환경을 위한<br />
              최고의 파트너
            </h2>
            <p className="text-blue-200 text-sm mb-8 max-w-md">
              보안 전문가의 1:1 무료 컨설팅을 통해 귀사만의 보안 로드맵을 만들어 보세요.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => window.open('https://open.kakao.com/o/sIBSxkbi')}
              className="flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-full font-medium transition-all w-48"
            >
              간편 상담 신청
            </button>

            <button 
              onClick={() => window.open('tel:010-3605-9528')}
              className="flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap w-48"
            >
              <Phone className="w-5 h-5" />
              062-470-7730
            </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}