import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, stagger, viewportOnce } from '../../lib/motion';

/** 뷰포트에 들어오면 위로 떠오르며 나타난다. */
export function Reveal({ children, className, delay = 0, as = 'div', ...props }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeInUp}
      transition={delay ? { delay } : undefined}
      {...props}
    >
      {children}
    </Component>
  );
}

/** 자식 RevealItem들을 0.1초 간격으로 순차 등장시킨다. */
export function RevealGroup({ children, className, as = 'div', ...props }) {
  const Component = motion[as];
  return (
    <Component className={className} initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} {...props}>
      {children}
    </Component>
  );
}

export function RevealItem({ children, className, as = 'div', ...props }) {
  const Component = motion[as];
  return (
    <Component className={className} variants={fadeInUp} {...props}>
      {children}
    </Component>
  );
}
