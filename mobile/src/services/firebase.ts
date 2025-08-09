import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Platform } from 'react-native';

// Config via variáveis de ambiente do Expo (prioritário) ou fallback fornecido
const envApiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
const envAuthDomain = process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN;
const envProjectId = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID;
const envStorageBucket = process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET;
const envMessagingSenderId = process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const envAppId = process.env.EXPO_PUBLIC_FIREBASE_APP_ID;
const envMeasurementId = (process.env as any).EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID as string | undefined;

// Removemos fallback hardcoded para segurança; utilize .env em produção
const fallbackConfig = {
  apiKey: undefined,
  authDomain: undefined,
  projectId: undefined,
  storageBucket: undefined,
  messagingSenderId: undefined,
  appId: undefined,
  measurementId: undefined,
};

export const firebaseConfig: {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
  measurementId?: string | undefined;
} = {
  apiKey: envApiKey || fallbackConfig.apiKey,
  authDomain: envAuthDomain || fallbackConfig.authDomain,
  projectId: envProjectId || fallbackConfig.projectId,
  storageBucket: envStorageBucket || fallbackConfig.storageBucket,
  messagingSenderId: envMessagingSenderId || fallbackConfig.messagingSenderId,
  appId: envAppId || fallbackConfig.appId,
  measurementId: envMeasurementId || fallbackConfig.measurementId,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId
);

let app: ReturnType<typeof initializeApp> | null = null;
let _auth: ReturnType<typeof getAuth> | null = null;
let _db: ReturnType<typeof getFirestore> | null = null;
let _storage: ReturnType<typeof getStorage> | null = null;
let _googleProvider: GoogleAuthProvider | null = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig as any);
  _auth = getAuth(app);
  _db = getFirestore(app);
  _storage = getStorage(app);
  _googleProvider = new GoogleAuthProvider();
  // Analytics apenas no Web
  if (Platform.OS === 'web') {
    // Import dinâmico para evitar carregar pacote web no native
    import('firebase/analytics')
      .then(async (mod) => {
        try {
          const isSupported = (mod as any).isSupported ? await (mod as any).isSupported() : true;
          if (isSupported) {
            (mod as any).getAnalytics(app);
          }
        } catch {
          // ignora erros de analytics
        }
      })
      .catch(() => {});
  }
} else {
  if (typeof console !== 'undefined') {
    console.warn('[Firebase] Variáveis de ambiente não configuradas. O app rodará em modo limitado.');
  }
}

export const auth = _auth;
export const db = _db;
export const storage = _storage;
export const googleProvider = _googleProvider;


