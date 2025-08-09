/** Listagem de profissionais com cartões modernos e botão de ação flutuante. */
import { useEffect, useState } from 'react';
import { View, FlatList, Linking, StyleSheet } from 'react-native';
import { listApprovedProfessionals } from '@/services/firestore';
import { FAB, Appbar, Chip, Text } from 'react-native-paper';
import { ProfessionalCard, Professional } from '@/components/ProfessionalCard';
import { useNavigation } from '@react-navigation/native';
import { filterChips } from '@/constants/categories';
import { mockProfessionals } from '@/mocks/professionals';

export default function ProfessionalsScreen() {
  const [items, setItems] = useState<Professional[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('Todos');
  const navigation = useNavigation();

  useEffect(() => {
    const unsub = listApprovedProfessionals(setItems);
    // fallback para mock quando não houver retorno
    const timer = setTimeout(() => {
      setItems((prev) => (prev && prev.length > 0 ? prev : mockProfessionals));
    }, 1200);
    return () => { unsub?.(); clearTimeout(timer); };
  }, []);

  const openWhatsApp = (phone: string) => {
    const url = `https://wa.me/${phone}`;
    Linking.openURL(url);
  };

  const renderItem = ({ item }: { item: Professional }) => (
    <ProfessionalCard item={item} onContact={openWhatsApp} />
  );

  const filtered = selectedFilter === 'Todos' ? items : items.filter((i) => i.category === selectedFilter);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="center-aligned" elevated>
        <Appbar.Content title="PromiCity" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="filter-variant" onPress={() => {}} />
      </Appbar.Header>
      <View style={styles.chipsRow}>
        <Text variant="labelLarge" style={{ opacity: 0.8 }}>Categorias</Text>
        <FlatList
          data={filterChips}
          keyExtractor={(i) => i}
          renderItem={({ item }) => (
            <Chip
              selected={selectedFilter === item}
              onPress={() => setSelectedFilter(item)}
              compact
              style={{ marginRight: 8, marginTop: 8 }}
            >
              {item}
            </Chip>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, gap: 12 }}
      />
      <FAB
        style={styles.fab}
        icon="account-edit"
        onPress={() => navigation.navigate('ProfessionalForm' as never)}
        label="Meu Perfil"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: { position: 'absolute', right: 16, bottom: 24 },
  chipsRow: { paddingTop: 8 },
});


