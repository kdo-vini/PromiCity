// mobile/index.ts

// Esta linha garante que o Firebase seja a primeira coisa a ser executada no seu app.
import './src/services/firebase';

import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);