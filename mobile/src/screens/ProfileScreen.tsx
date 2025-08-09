/** Tela de perfil com ações de autenticação. */
import { View, StyleSheet } from 'react-native';
import { useAuth } from '@/services/auth-context';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, Appbar } from 'react-native-paper';

export default function ProfileScreen() {
  const { user, signInWithGoogle, signOut } = useAuth();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Appbar.Header mode="center-aligned" elevated>
        <Appbar.Content title="Perfil" />
      </Appbar.Header>
      <View style={{ padding: 16, gap: 12 }}>
        {user ? (
          <>
            <Text variant="titleLarge">Olá, {user.displayName || user.email}</Text>
            <Button mode="contained" onPress={() => navigation.navigate('ProfessionalForm' as never)}>
              Editar Meu Perfil Profissional
            </Button>
            <Button mode="text" onPress={signOut}>Sair</Button>
          </>
        ) : (
          <>
            <Text variant="titleLarge">Entre para gerenciar seu perfil</Text>
            <Button mode="contained" onPress={signInWithGoogle}>Entrar com Google</Button>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 18, fontWeight: '700' },
});


