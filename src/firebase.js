import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app;
let FIREBASE_ENABLED = true;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  // rudimentary guard: require projectId to be present
  if (!firebaseConfig.projectId) {
    FIREBASE_ENABLED = false;
  }
} catch (e) {
  FIREBASE_ENABLED = false;
}

const auth = FIREBASE_ENABLED ? getAuth(app) : null;
const db = FIREBASE_ENABLED ? getFirestore(app) : null;

const provider = FIREBASE_ENABLED ? new GoogleAuthProvider() : null;

async function signInWithGoogle() {
  if (!FIREBASE_ENABLED) throw new Error('Firebase not configured');
  await signInWithPopup(auth, provider);
}

async function signOut() {
  if (!FIREBASE_ENABLED) return;
  await fbSignOut(auth);
}

export { auth, db, signInWithGoogle, signOut, FIREBASE_ENABLED };
