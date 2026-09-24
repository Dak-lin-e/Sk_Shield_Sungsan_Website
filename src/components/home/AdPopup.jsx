import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { loadFirestore } from '../../lib/loadFirestore';
import { isSafeValue } from '../../content/schema';
import { cn } from '../../lib/cn';
import { isInPeriod, todayString } from '../../lib/adPeriod';

const HIDE_KEY = 'adPopup:hiddenOn';

function hiddenToday() {
  try {
    return localStorage.getItem(HIDE_KEY) === todayString();
  } catch {
    return false;
  }
}

/** 홈 접속 시 노출 중인 광고를 팝업으로 보여준다. 여러 장이면 넘겨 볼 수 있다. */
export default function AdPopup() {
  const [ads, setAds] = useState([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const closeRef = useRef(null);

  useEffect(() => {
    if (hiddenToday()) return;
    let alive = true;
    loadFirestore()
      .then(({ collection, db, getDocs, query, where }) => getDocs(query(collection(db, 'ads'), where('active', '==', true))))
      .then(snapshot => {
        const today = todayString();
        const visible = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(ad => isSafeValue('image', ad.imageUrl || '') && isInPeriod(ad, today))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        if (!alive || visible.length === 0) return;
        setAds(visible);
        setOpen(true);
      })
      .catch(error => console.warn('광고를 불러오지 못했습니다.', error));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = e => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % ads.length);
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + ads.length) % ads.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, ads.length]);

  const hideToday = () => {
    try {
      localStorage.setItem(HIDE_KEY, todayString());
    } catch {
      // 저장이 막혀 있으면 이번 방문에서만 닫는다.
    }
    setOpen(false);
  };

  const ad = ads[index];
  const link = ad && isSafeValue('url', ad.linkUrl || '') ? ad.linkUrl : null;
  const image = ad && <img src={ad.imageUrl} alt={ad.title || '광고'} className="block max-h-[70vh] w-full object-contain" />;

  return (
    <AnimatePresence>
      {open && ad && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="광고"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative bg-muted">
              {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" aria-label={`${ad.title || '광고'} 자세히 보기`}>
                  {image}
                </a>
              ) : (
                image
              )}

              {ads.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="이전 광고"
                    onClick={() => setIndex(i => (i - 1 + ads.length) % ads.length)}
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition hover:bg-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="다음 광고"
                    onClick={() => setIndex(i => (i + 1) % ads.length)}
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition hover:bg-white"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
                    {ads.map((item, i) => (
                      <button
                        key={item.id}
                        type="button"
                        aria-label={`${i + 1}번째 광고 보기`}
                        onClick={() => setIndex(i)}
                        className={cn('h-2 rounded-full transition-all', i === index ? 'w-5 bg-accent' : 'w-2 bg-white/80')}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex items-stretch border-t border-border text-sm">
              <button type="button" onClick={hideToday} className="h-12 flex-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                오늘 하루 보지 않기
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-12 flex-1 items-center justify-center gap-1.5 border-l border-border font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                닫기
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
