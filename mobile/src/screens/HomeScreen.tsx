/** Tela inicial com busca e apresentação do app. */
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import { FeaturedProviderCard } from '../components/FeaturedProviderCard';
import { ProfessionalCard } from '../components/ProfessionalCard';
import EventCard from '../components/EventCard';
import { getFeaturedProfessionals, getNewestProfessionals, getUpcomingEvents } from '../services/firestore';


export default function HomeScreen() {
  const [featuredProfessionals, setFeaturedProfessionals] = useState<Array<any>>([]);
  const [newProfessionals, setNewProfessionals] = useState<Array<any>>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  // Tipagem correta para navegação
  // Ajuste conforme seu RootNavigator
  // Se não usar TypeScript, pode manter sem tipagem
  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [featured, news, events] = await Promise.all([
          getFeaturedProfessionals(),
          getNewestProfessionals(),
          getUpcomingEvents(),
        ]);
        setFeaturedProfessionals(featured);
        setNewProfessionals(news);
        setUpcomingEvents(events);
      } catch (error) {
        // Trate erros conforme necessário
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleContact = (phone: string) => {
    // Implementar ação de contato, ex: abrir WhatsApp
    Alert.alert('Contato', `Abrir WhatsApp para ${phone}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <SearchBar />

      {/* Em Destaque */}
      <Text style={styles.sectionTitle}>Em Destaque</Text>
      <FlatList
        data={featuredProfessionals}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfessionalDetails', { professionalId: item.id })}
          >
            <FeaturedProviderCard item={item} onContact={handleContact} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.horizontalList}
      />

      {/* Próximos Eventos */}
      <View style={styles.eventsHeader}>
        <Text style={styles.sectionTitle}>Próximos Eventos</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EventsScreen')}>
          <Text style={styles.seeAllButton}>Ver todos</Text>
        </TouchableOpacity>
      </View>
      {upcomingEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

      {/* Novos na Cidade */}
      <Text style={styles.sectionTitle}>Novos na Cidade</Text>
      <FlatList
        data={newProfessionals}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfessionalDetails', { professionalId: item.id })}
          >
            <ProfessionalCard item={item} onContact={handleContact} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.horizontalList}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 16 },
  horizontalList: { paddingBottom: 16 },
  eventsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seeAllButton: { color: '#007AFF', fontWeight: 'bold' },
});


