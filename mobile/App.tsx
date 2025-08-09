// mobile/App.tsx

/**
 * Componente raiz do app: provê tema, navegação e contexto de autenticação.
 */
// As linhas de import e chamada de initializeFirebase foram REMOVIDAS daqui

import { NavigationContainer, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from '@/navigation/RootNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from '@/theme/theme';
import { AuthProvider } from '@/services/auth-context';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={NavigationDarkTheme}>
          <StatusBar style="light" />
          <AuthProvider>
            <RootNavigator />
          </AuthProvider>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}