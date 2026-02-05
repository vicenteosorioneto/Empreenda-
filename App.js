import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import das telas
import SplashScreen from './screens/SplashScreen';
import UserTypeSelectionScreen from './screens/UserTypeSelectionScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import MainHubScreen from './screens/MainHubScreen';
import MainHubScreenNeon from './screens/MainHubScreenNeon';
import MissionScreen from './screens/MissionScreen';
import ProfileScreen from './screens/ProfileScreen';
import RankingScreen from './screens/RankingScreen';
import ImpactScreen from './screens/ImpactScreen';
import SettingsScreen from './screens/SettingsScreen';
import ConquistasScreen from './screens/ConquistasScreen';
import DesafioEmpreendedorScreen from './minigames/DesafioEmpreendedor';

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
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="UserTypeSelection" component={UserTypeSelectionScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainHub" component={MainHubScreenNeon} />
          <Stack.Screen name="Mission" component={MissionScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Ranking" component={RankingScreen} />
          <Stack.Screen name="Impact" component={ImpactScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Conquistas" component={ConquistasScreen} />
          <Stack.Screen name="DesafioEmpreendedor" component={DesafioEmpreendedorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}