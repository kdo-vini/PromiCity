// mobile/src/services/auth-context.tsx

import { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '@/services/firebase'; // Importa diretamente
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
  const [user, setUser] = useState<User | null>(null);
  WebBrowser.maybeCompleteAuthSession();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_IOS_CLIENT_ID,
  });

  useEffect(() => {
    // onAuthStateChanged já lida com o estado inicial do usuário
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  async function signInWithGoogle() {
    if (Platform.OS === 'web') {
      await signInWithPopup(auth, googleProvider);
      return;
    }
    await promptAsync();
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  async function signOut() {
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