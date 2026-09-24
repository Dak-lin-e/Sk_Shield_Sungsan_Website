import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore/lite';

// 웹 앱 설정값은 브라우저에 공개되는 식별자다. 데이터 보호는 firestore.rules / storage.rules가 담당한다.
const firebaseConfig = {
  apiKey: 'AIzaSyC-UyDgTXPLTHgr4MvuWLjwzifCbhMSnYM',
  authDomain: 'sk-shield-sungsan.firebaseapp.com',
  projectId: 'sk-shield-sungsan',
  storageBucket: 'sk-shield-sungsan.firebasestorage.app',
  messagingSenderId: '187524242005',
  appId: '1:187524242005:web:4191caa631f73c3823d2dc',
};

export const app = initializeApp(firebaseConfig);

// 공개 사이트는 실시간 구독이 필요 없어 번들이 작은 Firestore Lite를 쓴다.
export const db = getFirestore(app);

// 로컬 개발: VITE_FIREBASE_EMULATORS=true 이면 실제 프로젝트 대신 Firebase 에뮬레이터에 연결한다.
export const usingEmulators = import.meta.env.VITE_FIREBASE_EMULATORS === 'true';
if (usingEmulators) connectFirestoreEmulator(db, '127.0.0.1', 8181);
