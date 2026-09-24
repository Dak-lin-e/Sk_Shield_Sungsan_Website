import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/cn';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-xl font-medium whitespace-nowrap transition-all duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const variants = {
  primary: 'bg-accent-gradient text-white shadow-sm hover:-translate-y-0.5 hover:shadow-glow-lg hover:brightness-110',
  secondary: 'border border-border bg-card text-foreground hover:-translate-y-0.5 hover:border-accent/30 hover:bg-muted hover:shadow-md',
  inverse: 'bg-white text-foreground hover:-translate-y-0.5 hover:shadow-xl focus-visible:ring-offset-foreground',
  'outline-inverse': 'border border-white/25 text-white hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 focus-visible:ring-offset-foreground',
  ghost: 'text-muted-foreground hover:text-foreground',
};

const sizes = {
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
};

/**
 * href가 있으면 <a>, 없으면 <button>으로 렌더링한다.
 * 외부 링크(http)는 새 탭으로 연다.
 */
export default function Button({ variant = 'primary', size = 'md', href, icon: Icon, arrow = false, className, children, ...props }) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {Icon && <Icon className="h-[1.1em] w-[1.1em] shrink-0" aria-hidden="true" />}
      {children}
      {arrow && <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />}
    </>
  );

  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}
