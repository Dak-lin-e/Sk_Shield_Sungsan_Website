import React, { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import {
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { Copy, ExternalLink, FileText, Image as ImageIcon, LogOut, MessageSquare } from 'lucide-react';
import { db } from '../lib/firebase';
import { cn } from '../lib/cn';
import { auth } from './firebaseAdmin';
import Button from '../components/ui/Button';
import SectionLabel from '../components/ui/SectionLabel';
import { Field, inputClass, Notice, Spinner } from './ui';
import InquiriesView from './InquiriesView';
import AdsView from './AdsView';
import ContentView from './ContentView';

const TABS = [
  { to: '/admin', end: true, label: '상담 신청', icon: MessageSquare },
  { to: '/admin/ads', label: '광고 팝업', icon: ImageIcon },
  { to: '/admin/content', label: '콘텐츠 편집', icon: FileText },
];

// 사용자가 창을 닫은 경우 등은 안내하지 않는다 (빈 문자열).
const AUTH_ERRORS = {
  'auth/popup-closed-by-user': '',
  'auth/cancelled-popup-request': '',
  'auth/user-cancelled': '',
  'auth/network-request-failed': '네트워크 연결을 확인해 주세요.',
  'auth/too-many-requests': '시도가 너무 많아요. 잠시 후 다시 시도해 주세요.',
  'auth/operation-not-allowed': 'Firebase 콘솔에서 Google 로그인을 먼저 켜 주세요.',
  'auth/unauthorized-domain': '이 주소에서는 로그인이 허용되지 않았어요. Firebase 콘솔의 승인된 도메인에 추가해 주세요.',
  'auth/user-disabled': '사용이 중지된 계정이에요.',
  'auth/invalid-credential': '이메일 또는 비밀번호가 올바르지 않아요.',
  'auth/invalid-email': '이메일 형식을 확인해 주세요.',
  'auth/missing-password': '비밀번호를 입력해 주세요.',
  // 콘솔에서 가입(계정 생성)을 막아 둔 상태에서 등록되지 않은 계정이 로그인하려 할 때
  'auth/admin-restricted-operation': '관리자로 등록되지 않은 계정이에요.',
};

const describeAuthError = error => AUTH_ERRORS[error?.code] ?? '로그인하지 못했어요. 잠시 후 다시 시도해 주세요.';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/** 관리자 등록 키: 구글이 인증한 이메일(소문자). Firestore `admins/{이메일}` 문서와 대응한다. */
const adminKey = user => (user?.emailVerified && user.email ? user.email.toLowerCase() : null);

/** 카카오톡·네이버 등 앱 안의 브라우저는 구글이 로그인을 차단한다. */
function detectInAppBrowser() {
  const ua = navigator.userAgent;
  if (/KAKAOTALK/i.test(ua)) return 'kakao';
  if (/NAVER\(inapp|Instagram|FBAN|FBAV|Line\/|DaumApps|; wv\)/i.test(ua)) return 'other';
  return null;
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function AuthShell({ children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-16">
      <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-accent opacity-[0.08] blur-[150px]" aria-hidden="true" />
      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}

function InAppBrowserNotice({ kind }) {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  return (
    <Notice tone="info" className="mt-6">
      <p className="font-semibold text-foreground">앱 안의 브라우저에서는 구글 로그인이 막혀 있어요.</p>
      <p className="mt-1">Chrome이나 Safari에서 이 주소를 열어 주세요.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {kind === 'kakao' && (
          <a
            href={`kakaotalk://web/openExternal?url=${encodeURIComponent(url)}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-3 text-xs font-medium text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            외부 브라우저로 열기
          </a>
        )}
        <button type="button" onClick={copy} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-xs font-medium">
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          {copied ? '주소 복사됨' : '주소 복사'}
        </button>
      </div>
    </Notice>
  );
}

function LoginView({ notice }) {
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const inApp = detectInAppBrowser();

  const start = () => {
    setBusy(true);
    setError('');
    setInfo('');
  };

  const signInGoogle = async () => {
    start();
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      // 팝업이 막힌 환경(일부 모바일 브라우저)은 페이지 이동 방식으로 다시 시도한다.
      if (err?.code === 'auth/popup-blocked') return signInWithRedirect(auth, googleProvider);
      setError(describeAuthError(err));
      setBusy(false);
    }
  };

  const signInEmail = async e => {
    e.preventDefault();
    start();
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // 이후 확인(인증 여부/관리자 여부)은 AdminApp의 onAuthStateChanged가 처리한다.
    } catch (err) {
      setError(describeAuthError(err));
      setBusy(false);
    }
  };

  const resetPassword = async () => {
    setError('');
    setInfo('');
    if (!email.trim()) return setError('비밀번호를 재설정할 이메일을 먼저 입력해 주세요.');
    try {
      await sendPasswordResetEmail(auth, email.trim());
      // 계정 존재 여부를 드러내지 않도록 항상 같은 문구를 보여준다.
      setInfo('등록된 계정이라면 비밀번호 재설정 메일이 발송돼요. 메일함(스팸함 포함)을 확인해 주세요.');
    } catch (err) {
      setError(describeAuthError(err));
    }
  };

  return (
    <AuthShell>
      <div className="rounded-2xl border border-border bg-card p-7 shadow-xl sm:p-9">
        <SectionLabel>Admin</SectionLabel>
        <h1 className="font-display mt-5 text-3xl">성산대리점 관리자</h1>
        <p className="mt-2 text-sm text-muted-foreground">등록된 관리자 계정으로만 로그인할 수 있어요.</p>

        {inApp ? (
          <InAppBrowserNotice kind={inApp} />
        ) : (
          <button
            type="button"
            onClick={signInGoogle}
            disabled={busy}
            className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-border bg-card text-base font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <GoogleIcon />
            Google 계정으로 로그인
          </button>
        )}

        <div className="my-7 flex items-center gap-3 text-xs text-muted-foreground" aria-hidden="true">
          <span className="h-px flex-1 bg-border" />
          또는 이메일로 로그인
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={signInEmail} className="space-y-4">
          <Field label="이메일" htmlFor="admin-email">
            <input id="admin-email" type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
          </Field>
          <Field label="비밀번호" htmlFor="admin-password">
            <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className={inputClass} />
          </Field>
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? '확인 중…' : '이메일로 로그인'}
          </Button>
        </form>
        <button type="button" onClick={resetPassword} className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground">
          비밀번호를 잊으셨나요?
        </button>

        <Notice tone="error" className="mt-5">{error}</Notice>
        <Notice tone={notice?.tone || 'error'} className="mt-5">{info ? '' : notice?.message}</Notice>
        <Notice tone="success" className="mt-5">{info}</Notice>
      </div>
      <Link to="/" className="mt-6 block text-center text-sm text-muted-foreground hover:text-foreground">
        ← 사이트로 돌아가기
      </Link>
    </AuthShell>
  );
}

function AdminLayout({ user }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-white">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-gradient-diagonal font-mono text-xs font-medium text-white">AD</span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[15px] font-bold">성산대리점 관리자</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/"
              target="_blank"
              className="hidden h-10 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted sm:inline-flex"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              사이트 보기
            </Link>
            <button
              type="button"
              onClick={() => signOut(auth)}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              로그아웃
            </button>
          </div>
        </div>
        <nav className="mx-auto flex w-full max-w-6xl gap-1 overflow-x-auto px-3 sm:px-4" aria-label="관리 메뉴">
          {TABS.map(tab => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                cn(
                  'relative inline-flex h-12 shrink-0 items-center gap-2 px-3 text-sm font-semibold transition-colors',
                  'after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-accent-gradient after:transition-transform',
                  isActive ? 'text-foreground after:scale-x-100' : 'text-muted-foreground after:scale-x-0 hover:text-foreground'
                )
              }
            >
              <tab.icon className="h-4 w-4" aria-hidden="true" />
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-6 md:py-10">
        <Routes>
          <Route index element={<InquiriesView />} />
          <Route path="ads" element={<AdsView />} />
          <Route path="content" element={<ContentView />} />
          <Route path="*" element={<InquiriesView />} />
        </Routes>
      </main>
    </div>
  );
}

/** /admin 진입점: 구글 또는 이메일 로그인 → 인증된 관리자 이메일인지 확인 → 아니면 즉시 로그아웃 */
export default function AdminApp() {
  const [state, setState] = useState({ status: 'loading', user: null, notice: null });

  useEffect(() => {
    document.title = '관리자 | SK shieldus 성산대리점';

    // signInWithRedirect로 돌아온 경우의 오류를 보여준다.
    getRedirectResult(auth).catch(err => {
      const message = describeAuthError(err);
      if (message) setState(s => ({ ...s, notice: { tone: 'error', message } }));
    });

    return onAuthStateChanged(auth, async user => {
      if (!user) {
        setState(s => ({ status: 'signedOut', user: null, notice: s.notice }));
        return;
      }
      setState(s => ({ ...s, status: 'loading' }));

      const key = adminKey(user);
      let allowed = false;
      if (key) {
        try {
          allowed = (await getDoc(doc(db, 'admins', key))).exists();
        } catch {
          allowed = false;
        }
      }
      if (allowed) {
        setState({ status: 'admin', user, notice: null });
        return;
      }

      // 이메일/비밀번호 계정은 처음에 미인증 상태다. 인증 메일을 보내고, 링크를 누른 뒤 다시 로그인하게 한다.
      let notice = { tone: 'error', message: `${user.email || '이 계정'} — 관리자로 등록되지 않은 계정이에요.` };
      if (user.email && !user.emailVerified) {
        try {
          await sendEmailVerification(user);
          notice = { tone: 'info', message: `${user.email}로 인증 메일을 보냈어요. 메일의 링크를 누른 뒤 다시 로그인해 주세요. (스팸함도 확인해 주세요)` };
        } catch (err) {
          notice = {
            tone: 'error',
            message: err?.code === 'auth/too-many-requests' ? '인증 메일을 너무 자주 요청했어요. 이미 받은 메일의 링크를 누르거나 잠시 후 다시 시도해 주세요.' : '인증 메일을 보내지 못했어요. 잠시 후 다시 시도해 주세요.',
          };
        }
      }

      // 관리자가 아니거나 미인증 계정은 세션을 남기지 않는다. (데이터 접근은 보안 규칙이 별도로 차단)
      await signOut(auth);
      setState({ status: 'signedOut', user: null, notice });
    });
  }, []);

  if (state.status === 'loading') return <Spinner label="관리자 정보를 확인하는 중…" className="min-h-screen" />;
  if (state.status === 'signedOut') return <LoginView notice={state.notice} />;
  return <AdminLayout user={state.user} />;
}
