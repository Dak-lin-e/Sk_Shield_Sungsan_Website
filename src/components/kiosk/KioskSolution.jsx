import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Shield, Headphones } from 'lucide-react';

const solutions = [
  {
    icon: Monitor,
    title: '편리한 실시간 운영관리',
    description: '매장별 매출과 재고관리를 한 번에 파악해 효율적인 매장 운영이 가능합니다.',
  },
  {
    icon: Shield,
    title: '똑똑하고 견고한 키오스크',
    description: '다양한 기능 제공은 물론 전면 강화유리/아크릴로 제작되어 견고합니다.',
  },
  {
    icon: Headphones,
    title: '빠르고 정확한 A/S',
    description: '365일 빠르고 정확하게 문제를 해결합니다.',
  },
];

export default function SolutionSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            결제 키오스크 솔루션
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            매장 운영에 최적화된 ADT 캡스만의 기술력을 경험하세요.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#1a2b6d] rounded-xl flex items-center justify-center mb-5">
                <solution.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {solution.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}