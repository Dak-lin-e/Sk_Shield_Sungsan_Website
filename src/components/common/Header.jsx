import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';
import { useContact } from '../../content/ContentProvider';
import { cn } from '../../lib/cn';
import Button from '../ui/Button';
import { ConsultActions } from '../ui/Consult';
import { siteImage } from '../../lib/siteImages';

const NAV_ITEMS = [
  { to: '/security', label: 'ADT캡스 무인경비' },
  { to: '/kiosk', label: '키오스크' },
  { to: '/table-order', label: '테이블오더' },
  { to: '/clean-care', label: '클린케어' },
  { to: '/cyber-guard', label: '사이버가드' },
];

function KakaoButton({ className }) {
  const contact = useContact();
  return (
    <a
      href={contact.kakaoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="카카오톡 상담"
      className={cn(
        'block h-11 w-11 shrink-0 overflow-hidden rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        className
      )}
    >
      <img src={siteImage('카톡.png')} alt="" className="h-full w-full object-cover" />
    </a>
  );
}

export default function Header() {
  const contact = useContact();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 isolate border-b bg-white transition-shadow duration-300',
        scrolled || isOpen ? 'border-border shadow-sm' : 'border-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 lg:h-[72px]" aria-label="주요 메뉴">
        <Link to="/" className="flex shrink-0 items-center gap-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <img src={siteImage('헤더-로고.jpg')} alt="ADT 캡스" className="h-11 w-auto object-contain mix-blend-multiply md:h-12" />
          <span className="whitespace-nowrap text-base font-extrabold tracking-tight text-logo md:text-lg">성산대리점</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'relative whitespace-nowrap py-2 text-[15px] font-medium transition-colors duration-200',
                  'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-accent-gradient after:transition-transform after:duration-300',
                  isActive ? 'text-foreground after:scale-x-100' : 'text-muted-foreground after:scale-x-0 hover:text-foreground hover:after:scale-x-100'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Button href={contact.phoneHref} icon={Phone} className="h-11 px-5">
            {contact.phoneLabel}
          </Button>
          <KakaoButton />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(open => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn('overflow-hidden transition-all duration-300 ease-out lg:hidden', isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0')}
      >
        <div className="border-t border-border px-5 pb-6 pt-2">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between border-b border-border py-4 text-[15px] font-semibold',
                  isActive ? 'text-accent' : 'text-foreground'
                )
              }
            >
              {item.label}
              <span className="font-mono text-xs text-muted-foreground">→</span>
            </NavLink>
          ))}
          <ConsultActions size="md" className="mt-6" />
        </div>
      </div>
    </header>
  );
}
