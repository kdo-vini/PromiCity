import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShowcaseScreen from '@/screens/ShowcaseScreen';
import ProfessionalsScreen from '@/screens/ProfessionalsScreen';
import EventsScreen from '@/screens/EventsScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import OnboardingScreen from '@/screens/OnboardingScreen';
import ProfessionalFormScreen from '@/screens/ProfessionalFormScreen';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  const paperTheme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: paperTheme.colors.primary,
        tabBarInactiveTintColor: paperTheme.colors.onSurface,
        tabBarStyle: { backgroundColor: paperTheme.colors.surface },
        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === 'PromiCity' ? 'star' :
            route.name === 'Profissionais' ? 'search' :
            route.name === 'Eventos' ? 'calendar' : 'person-circle-outline';
          return <Ionicons name={iconName as any} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="PromiCity" component={ShowcaseScreen} />
      <Tab.Screen name="Profissionais" component={ProfessionalsScreen} />
      <Tab.Screen name="Eventos" component={EventsScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ title: 'Entrar' }} />
      <Stack.Screen name="ProfessionalForm" component={ProfessionalFormScreen} options={{ title: 'Meu Perfil Profissional' }} />
    </Stack.Navigator>
  );
}


