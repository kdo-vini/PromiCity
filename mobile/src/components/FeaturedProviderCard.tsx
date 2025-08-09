/** Card destacado para a vitrine PromiCity (anúncio pago). */
import { StyleSheet, View } from 'react-native';
import { Avatar, Badge, Button, Card, Text, useTheme, Icon } from 'react-native-paper';
import { Professional } from '@/components/ProfessionalCard';

export function FeaturedProviderCard({ item, onContact }: { item: Professional & { rating?: number } ; onContact: (phone: string) => void }) {
  const theme = useTheme();
  return (
    <Card mode="elevated" style={styles.card}>
      {item.avatarUrl ? <Card.Cover source={{ uri: item.avatarUrl }} style={styles.cover} /> : null}
      <Card.Content style={{ gap: 8 }}>
        <View style={styles.titleRow}>
          <Text variant="titleLarge" style={{ fontWeight: '800' }}>{item.name}</Text>
          <Badge style={{ backgroundColor: theme.colors.secondary, marginLeft: 8 }}>Destaque</Badge>
        </View>
        <Text variant="bodyMedium" style={{ opacity: 0.9 }}>{item.category}</Text>
        <View style={styles.ratingRow}>
          <Icon size={18} source="star" color="#FACC15" />
          <Text variant="labelLarge" style={{ marginLeft: 6 }}>{(item as any).rating ?? 5.0}</Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" icon="whatsapp" onPress={() => onContact(item.phone)}>
          Chamar no WhatsApp
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, overflow: 'hidden' },
  cover: { height: 140 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
});


