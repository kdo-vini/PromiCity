/** Vitrine PromiCity: mostra apenas profissionais em destaque e aprovados. */
import { useEffect, useState } from 'react';
import { View, FlatList, Linking } from 'react-native';
import { Appbar } from 'react-native-paper';
import { FeaturedProviderCard } from '@/components/FeaturedProviderCard';
import { listFeaturedProfessionals } from '@/services/firestore';
import { Professional } from '@/components/ProfessionalCard';

export default function ShowcaseScreen() {
  const [items, setItems] = useState<(Professional & { rating?: number })[]>([]);

  useEffect(() => {
    const unsub = listFeaturedProfessionals(setItems as any);
    return () => unsub?.();
  }, []);

  const openWhatsApp = (phone: string) => {
    Linking.openURL(`https://wa.me/${phone}`);
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="center-aligned" elevated>
        <Appbar.Content title="PromiCity" />
      </Appbar.Header>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, gap: 16 }}
        renderItem={({ item }) => (
          <FeaturedProviderCard item={item} onContact={openWhatsApp} />
        )}
      />
    </View>
  );
}


