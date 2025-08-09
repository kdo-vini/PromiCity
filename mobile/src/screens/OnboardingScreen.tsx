/** Tela de onboarding com chamada para ação de login. */
import { View, StyleSheet } from 'react-native';
import { useAuth } from '@/services/auth-context';
import { Button, Text } from 'react-native-paper';

export default function OnboardingScreen() {
  const { signInWithGoogle } = useAuth();
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Bem-vindo!</Text>
      <Text variant="bodyMedium" style={{ opacity: 0.8 }}>
        Faça login para criar e destacar seu perfil profissional.
      </Text>
      <Button mode="contained" onPress={signInWithGoogle}>Entrar com Google</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, gap: 12 },
});


