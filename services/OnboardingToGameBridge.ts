import GameManager from '../services/GameManager';
import { FounderProfile } from '../types/game';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔗 INTEGRAÇÃO ENTRE ONBOARDING E RPG

const ONBOARDING_PROFILE_KEY = '@empreenda_onboarding_profile';

/**
 * Mapeia perfil do onboarding (GameProfileScreen) para FounderProfile do RPG
 */
export const mapOnboardingToFounderProfile = (onboardingData: any): FounderProfile => {
  // Perfil do onboarding vem de GameProfileScreen:
  // - motivation (rápido/equilibrado/planejado)
  // - idea (tipo de ideia)
  // - goal (objetivo principal)
  
  const motivationMap: { [key: string]: FounderProfile } = {
    'rápido': 'INNOVATOR',
    'equilibrado': 'ANALYTICAL',
    'planejado': 'METHODICAL',
  };

  // Se tem foco em impacto social
  if (onboardingData.goal?.includes('impacto') || onboardingData.goal?.includes('social')) {
    return 'SOCIAL';
  }

  // Caso contrário, mapear pela motivação
  return motivationMap[onboardingData.motivation] || 'ANALYTICAL';
};

/**
 * Inicializa o jogo RPG após completar o onboarding
 */
export const initializeGameFromOnboarding = async (
  dailyMinutes: number,
  onboardingData: any
): Promise<boolean> => {
  try {
    // 1. Mapear perfil
    const founderProfile = mapOnboardingToFounderProfile(onboardingData);

    // 2. Inicializar jogo
    await GameManager.initializeNewGame(dailyMinutes, founderProfile);

    // 3. Salvar referência do onboarding
    await AsyncStorage.setItem(
      ONBOARDING_PROFILE_KEY,
      JSON.stringify({
        ...onboardingData,
        founderProfile,
        initializedAt: new Date().toISOString(),
      })
    );

    return true;
  } catch (error) {
    console.error('Erro ao inicializar jogo:', error);
    return false;
  }
};

/**
 * Verifica se o jogador já completou o onboarding e tem jogo ativo
 */
export const hasActiveGame = async (): Promise<boolean> => {
  try {
    const progress = await GameManager.loadProgress();
    return progress !== null;
  } catch {
    return false;
  }
};

/**
 * Obtém perfil do onboarding
 */
export const getOnboardingProfile = async (): Promise<any | null> => {
  try {
    const data = await AsyncStorage.getItem(ONBOARDING_PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

/**
 * Navega para a tela correta baseado no progresso
 * - Se não completou onboarding: vai para onboarding
 * - Se completou onboarding mas não tem jogo: inicializa jogo
 * - Se tem jogo ativo: vai para GameHub
 */
export const getInitialRoute = async (): Promise<string> => {
  try {
    // Verifica se tem jogo ativo
    const hasGame = await hasActiveGame();
    if (hasGame) {
      return 'GameHub';
    }

    // Verifica se completou onboarding
    const profile = await getOnboardingProfile();
    if (profile) {
      // Completou onboarding mas não tem jogo - algo deu errado
      // Vamos reinicializar
      await initializeGameFromOnboarding(profile.dailyMinutes || 30, profile);
      return 'GameHub';
    }

    // Não completou onboarding
    return 'Splash';
  } catch (error) {
    console.error('Erro ao determinar rota inicial:', error);
    return 'Splash';
  }
};

export default {
  mapOnboardingToFounderProfile,
  initializeGameFromOnboarding,
  hasActiveGame,
  getOnboardingProfile,
  getInitialRoute,
};
