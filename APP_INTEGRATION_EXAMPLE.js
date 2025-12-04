/**
 * EXEMPLO DE INTEGRAÇÃO NO App.js
 * Substitua as linhas correspondentes no seu App.js
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// ===== NOVAS IMPORTAÇÕES =====
// Telas
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import MainHubScreenNeon from './screens/MainHubScreenNeon'; // ← NOVO (atualizado)
import MissionScreen from './screens/MissionScreen';
import ProfileScreen from './screens/ProfileScreen';
import RankingScreen from './screens/RankingScreen';
import ImpactScreen from './screens/ImpactScreen';
import SettingsScreen from './screens/SettingsScreen';
import ConquistasScreen from './screens/ConquistasScreen';

// Mini-Games
import DesafioEmpreendedorScreen from './minigames/DesafioEmpreendedor';
import InnovationWheelGame from './minigames/InnovationWheelGame'; // ← NOVO
import QuizRapidoGame from './minigames/QuizRapidoGame'; // ← NOVO (criar)
import SprintGame from './minigames/SprintGame'; // ← NOVO (criar)

// Componentes Utilitários
import { THEME } from './utils/theme';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar 
          style="light"
          backgroundColor={THEME.colors.darkBg}
        />
        
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: THEME.colors.darkBg, // ← NOVO: Dark theme
            },
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              };
            },
          }}
        >
          {/* Auth Screens */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />

          {/* Main App */}
          <Stack.Screen name="MainHub" component={MainHubScreenNeon} />
          <Stack.Screen name="Mission" component={MissionScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Ranking" component={RankingScreen} />
          <Stack.Screen name="Impact" component={ImpactScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Conquistas" component={ConquistasScreen} />

          {/* Mini-Games */}
          <Stack.Screen 
            name="DesafioEmpreendedor" 
            component={DesafioEmpreendedorScreen}
            options={{ 
              animationEnabled: true,
              gestureEnabled: true 
            }} 
          />
          <Stack.Screen
            name="InnovationWheel"
            component={InnovationWheelGame}
            options={{ animationEnabled: true }}
          />
          <Stack.Screen
            name="QuizRapido"
            component={QuizRapidoGame}
            options={{ animationEnabled: true }}
          />
          <Stack.Screen
            name="Sprint30s"
            component={SprintGame}
            options={{ animationEnabled: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

/**
 * ===== MUDANÇAS NECESSÁRIAS =====
 * 
 * 1. IMPORTS
 *    - Substituir: import MainHubScreen from './screens/MainHubScreen'
 *    - Por: import MainHubScreenNeon from './screens/MainHubScreenNeon'
 *    - Adicionar novos mini-games
 * 
 * 2. THEME GLOBAL
 *    - Adicionar: import { THEME } from './utils/theme'
 *    - Usar: backgroundColor={THEME.colors.darkBg}
 * 
 * 3. STATUS BAR
 *    - Mudar para: style="light" + backgroundColor dark
 * 
 * 4. ROUTES NOVAS
 *    - Adicionar Stack.Screen para InnovationWheel
 *    - Adicionar Stack.Screen para QuizRapido
 *    - Adicionar Stack.Screen para Sprint30s
 * 
 * ===== DEPOIS =====
 * 
 * 5. Criar mini-games faltantes
 *    - minigames/QuizRapidoGame.js
 *    - minigames/SprintGame.js
 *    - minigames/IdeaBattleGame.js
 *    - minigames/StartupAuctionGame.js
 * 
 * 6. Atualizar utils/storage.js com:
 *    - saveAvatarEquipment()
 *    - getAvatarEquipment()
 *    - addBadge()
 *    - getDailyMissionProgress()
 *    - saveDailyMissionProgress()
 *    - updateStreak()
 * 
 * 7. Configurar notificações:
 *    - expo-notifications
 *    - scheduling
 *    - push notifications backend
 * 
 * 8. Integrar sons:
 *    - expo-av
 *    - arquivos de som em assets/sounds/
 */

/**
 * ESTRUTURA DE ARQUIVOS ESPERADA
 */
const EXPECTED_STRUCTURE = `
Empreenda-/
├── App.js (ATUALIZADO)
├── app.json
├── package.json
│
├── screens/
│   ├── MainHubScreenNeon.js (NOVO)
│   ├── MainHubScreen.js (antigo - pode remover)
│   ├── [outras telas...]
│
├── minigames/
│   ├── InnovationWheelGame.js (NOVO)
│   ├── QuizRapidoGame.js (CRIAR)
│   ├── SprintGame.js (CRIAR)
│   ├── IdeaBattleGame.js (CRIAR)
│   ├── StartupAuctionGame.js (CRIAR)
│   ├── [antigos...]
│
├── components/
│   ├── AnimationComponents.js (NOVO)
│   ├── FeedbackComponents.js (NOVO)
│   ├── AvatarEvolution.js (NOVO)
│   ├── [outros...]
│
├── utils/
│   ├── theme.js (NOVO)
│   ├── engagementConfig.js (NOVO)
│   ├── notifications.js (NOVO)
│   ├── storage.js (ATUALIZAR)
│
├── data/
│   ├── dailyMissions.js (NOVO)
│   ├── minigames.js (NOVO)
│   ├── [outros...]
│
├── assets/
│   ├── sounds/ (CRIAR)
│   │   ├── win.mp3
│   │   ├── level-up.mp3
│   │   ├── badge-unlock.mp3
│   │   ├── button-click.mp3
│   ├── [outros...]
│
└── GUIA_IMPLEMENTACAO_NEON.md (NOVO)
`;
