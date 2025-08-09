import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type EventCardProps = {
  event: {
    id: string;
    name: string;
    eventDate?: Date | string;
    location?: string;
    [key: string]: any;
  };
};

function formatDate(date: Date | string | undefined) {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.date}>{formatDate(event.eventDate)}</Text>
      {event.location && <Text style={styles.location}>{event.location}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    color: '#007AFF',
  },
});

export default EventCard;
