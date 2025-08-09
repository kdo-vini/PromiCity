/** Listagem de eventos com cartões elevador e datas formatadas. */
import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { listEvents } from '@/services/firestore';
import { format } from 'date-fns';
import { Appbar, Card, Text } from 'react-native-paper';

type EventItem = { id: string; title: string; date: number; location: string };

export default function EventsScreen() {
  const [items, setItems] = useState<EventItem[]>([]);
  useEffect(() => {
    const unsub = listEvents(setItems);
    return () => unsub?.();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="center-aligned" elevated>
        <Appbar.Content title="Eventos" />
      </Appbar.Header>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => (
          <Card mode="elevated" style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">{item.title}</Text>
              <Text variant="bodyMedium" style={styles.meta}>{format(item.date, 'dd/MM/yyyy HH:mm')} • {item.location}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 14 },
  meta: { opacity: 0.8, marginTop: 6 },
});


