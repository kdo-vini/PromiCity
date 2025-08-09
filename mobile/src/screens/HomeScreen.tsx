/** Tela inicial com busca e apresentação do app. */
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Appbar, Text, Searchbar, useTheme, Card } from 'react-native-paper';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Appbar.Header mode="center-aligned" elevated>
        <Appbar.Content title="PromiCity" />
      </Appbar.Header>
      <View style={{ padding: 16, gap: 16 }}>
        <Searchbar
          placeholder="Buscar serviços, categorias ou nomes"
          value={query}
          onChangeText={setQuery}
        />
        <Card mode="contained" style={{ backgroundColor: theme.colors.surfaceVariant }}>
          <Card.Content>
            <Text variant="titleMedium">Encontre profissionais confiáveis</Text>
            <Text variant="bodyMedium" style={{ opacity: 0.8, marginTop: 8 }}>
              Explore a aba Profissionais, filtre por categoria e entre em contato direto via WhatsApp.
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});


