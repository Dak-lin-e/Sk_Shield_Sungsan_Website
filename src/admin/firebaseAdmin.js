import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { app, usingEmulators } from '../lib/firebase';

// 관리자 화면에서만 필요한 서비스. /admin 청크에만 포함된다.
export const auth = getAuth(app);
export const storage = getStorage(app);

if (usingEmulators) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  connectStorageEmulator(storage, '127.0.0.1', 9199);
}
