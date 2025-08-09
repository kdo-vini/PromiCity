import { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '@/services/firebase';
import { onAuthStateChanged, signInWithPopup, signOut as fbSignOut, User, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

type AuthContextType = {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(auth?.currentUser ?? null);
  WebBrowser.maybeCompleteAuthSession();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_IOS_CLIENT_ID,
  });

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  async function signInWithGoogle() {
    if (!auth) {
      console.warn('[Auth] Firebase não configurado. Login desabilitado.');
      return;
    }
    if (Platform.OS === 'web') {
      if (!googleProvider) return;
      await signInWithPopup(auth, googleProvider);
      return;
    }
    await promptAsync();
  }

  // Completa login nativo (Android/iOS) ao receber response do AuthSession
  useEffect(() => {
    (async () => {
      if (!auth) return;
      if (response?.type === 'success') {
        const idToken = (response.params as any)?.id_token as string | undefined;
        const accessToken = (response.params as any)?.access_token as string | undefined;
        if (!idToken) return;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        await signInWithCredential(auth, credential);
      }
    })();
  }, [response]);

  async function signOut() {
    if (!auth) return;
    await fbSignOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}


