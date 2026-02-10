import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import das telas
import SplashScreen from './screens/SplashScreen';
// Onboarding Gamificado
import MiniMissionIntroScreen from './screens/MiniMissionIntroScreen';
import MiniMissionScreen from './screens/MiniMissionScreen';
import MissionResultScreen from './screens/MissionResultScreen';
import MistakeReviewScreen from './screens/MistakeReviewScreen';
import GameProfileScreen from './screens/GameProfileScreen';
import DailyGoalScreen from './screens/DailyGoalScreen';
import PlanSelectionScreen from './screens/PlanSelectionScreen';
// Telas principais
import UserTypeSelectionScreen from './screens/UserTypeSelectionScreen';
import CharacterSelectionScreen from './screens/CharacterSelectionScreen';
import ClassAndSchoolSelectionScreen from './screens/ClassAndSchoolSelectionScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import MainHubScreen from './screens/MainHubScreen';
import MainHubScreenNeon from './screens/MainHubScreenNeon';
import MissionScreen from './screens/MissionScreen';
import ProfileScreen from './screens/ProfileScreen';
import RankingScreen from './screens/RankingScreen';
import RankingScreenNew from './screens/RankingScreenNew';
import ImpactScreen from './screens/ImpactScreen';
import SettingsScreen from './screens/SettingsScreen';
import ConquistasScreen from './screens/ConquistasScreen';
import QuizGameScreen from './screens/QuizGameScreen';
import IdeasScreen from './screens/IdeasScreen';
import ChallengeScreen from './screens/ChallengeScreen';
import DesafioEmpreendedorScreen from './minigames/DesafioEmpreendedor';
import InnovationWheelGame from './minigames/InnovationWheelGame';
import QuizRapido from './minigames/QuizRapido';

// Import das telas RPG
import GameHubScreen from './screens/GameHubScreen';
import RPGMissionScreen from './screens/RPGMissionScreen';
import MissionCompleteScreen from './screens/MissionCompleteScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator 
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
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
          {/* Onboarding Gamificado */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="MiniMissionIntro" component={MiniMissionIntroScreen} />
          <Stack.Screen name="MiniMission" component={MiniMissionScreen} />
          <Stack.Screen name="MissionResult" component={MissionResultScreen} />
          <Stack.Screen name="MistakeReview" component={MistakeReviewScreen} />
          <Stack.Screen name="GameProfile" component={GameProfileScreen} />
          <Stack.Screen name="DailyGoal" component={DailyGoalScreen} />
          <Stack.Screen name="PlanSelection" component={PlanSelectionScreen} />
          
          {/* Fluxo Principal */}
          <Stack.Screen name="UserTypeSelection" component={UserTypeSelectionScreen} />
          <Stack.Screen name="CharacterSelection" component={CharacterSelectionScreen} />
          <Stack.Screen name="ClassAndSchoolSelection" component={ClassAndSchoolSelectionScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainHub" component={MainHubScreenNeon} />
          <Stack.Screen name="Mission" component={MissionScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Ranking" component={RankingScreenNew} />
          <Stack.Screen name="Impact" component={ImpactScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Conquistas" component={ConquistasScreen} />
          <Stack.Screen name="QuizGame" component={QuizGameScreen} />
          <Stack.Screen name="Ideas" component={IdeasScreen} />
          <Stack.Screen name="Challenge" component={ChallengeScreen} />
          <Stack.Screen name="DesafioEmpreendedor" component={DesafioEmpreendedorScreen} />
          <Stack.Screen name="InnovationWheel" component={InnovationWheelGame} />
          <Stack.Screen name="QuizRapido" component={QuizRapido} />
          
          {/* Telas do Sistema RPG */}
          <Stack.Screen name="GameHub" component={GameHubScreen} />
          <Stack.Screen name="RPGMission" component={RPGMissionScreen} />
          <Stack.Screen name="MissionComplete" component={MissionCompleteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}