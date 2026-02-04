import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const products = [
  {
    name: '유통매장용',
    subtitle: 'Retail & Convenience',
    image: './image_file/유통매장용.png',
    badgeColor: 'bg-red-500',
  },
  {
    name: '베리어프리 요식업용',
    subtitle: 'Full Service Floor',
    image: './image_file/베리어프리.png',
    badge: null,
  }

];

export default function SystemSection() {
  return (
    <section id="products" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-[#1a2b6d]" />
            <span className="text-xs tracking-widest text-gray-500">제품 라인업</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            결제 시간 단축, 빠른 주문 처리로
          </h2>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b6d]">
            회전율 상승이 가능한 키오스크 시스템
          </h2>
        </motion.div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 gap-32 md:grid-cols-2 gap-36">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-[4/4] bg-gray-100">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                {product.badge && (
                  <div className={`absolute top-4 left-4 ${product.badgeColor} text-white text-xs font-medium px-3 py-1 rounded-full`}>
                    {product.badge}
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {product.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-white rounded-2xl p-6 md:p-8 border border-gray-100"
        >
          <p className="text-gray-600 text-sm md:text-base leading-relaxed text-center">
            다양한 종류의 매장에 최적화된 <span className="text-[#1a2b6d] font-semibold">구성/크기의 키오스크</span>와 고객의 사업 전반
            <br className="hidden md:block" />
            상담을 진행합니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}