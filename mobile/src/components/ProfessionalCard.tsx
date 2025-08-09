/**
 * Cartão de profissional com design moderno (Paper MD3) e destaque para perfis pagos.
 */
import { StyleSheet, View } from 'react-native';
import { Avatar, Badge, Button, Card, Text, useTheme } from 'react-native-paper';

export type Professional = {
  id: string;
  name: string;
  category: string;
  phone: string;
  avatarUrl?: string;
  featured?: boolean;
};

export function ProfessionalCard({ item, onContact }: { item: Professional; onContact: (phone: string) => void }) {
  const theme = useTheme();
  return (
    <Card mode="elevated" style={styles.card}>
      <Card.Content style={styles.row}>
        {item.avatarUrl ? (
          <Avatar.Image size={56} source={{ uri: item.avatarUrl }} />
        ) : (
          <Avatar.Text size={56} label={item.name.slice(0, 1).toUpperCase()} />
        )}
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text variant="titleMedium" style={styles.title}>{item.name}</Text>
            {item.featured && (
              <Badge style={{ backgroundColor: theme.colors.secondary, marginLeft: 8 }}>Destaque</Badge>
            )}
          </View>
          <Text variant="bodyMedium" style={{ opacity: 0.8 }}>{item.category}</Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => onContact(item.phone)} icon="whatsapp">WhatsApp</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  content: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontWeight: '700' },
});


