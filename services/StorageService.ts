import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingProgress, UserProfile, UserSubscription, Mistake } from '../types/onboarding';

// 🗄️ STORAGE SERVICE - Offline First

const KEYS = {
  ONBOARDING_PROGRESS: '@empreenda_onboarding_progress',
  USER_PROFILE: '@empreenda_user_profile',
  USER_SUBSCRIPTION: '@empreenda_user_subscription',
  MISSION_MISTAKES: '@empreenda_mission_mistakes',
  LAST_SYNC: '@empreenda_last_sync',
};

class StorageService {
  // Salvar progresso do onboarding
  async saveOnboardingProgress(progress: OnboardingProgress): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.ONBOARDING_PROGRESS, JSON.stringify(progress));
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    }
  }

  // Carregar progresso do onboarding
  async getOnboardingProgress(): Promise<OnboardingProgress | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.ONBOARDING_PROGRESS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
      return null;
    }
  }

  // Salvar perfil do usuário
  async saveUserProfile(profile: UserProfile): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
    }
  }

  // Carregar perfil do usuário
  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      return null;
    }
  }

  // Salvar assinatura
  async saveSubscription(subscription: UserSubscription): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.USER_SUBSCRIPTION, JSON.stringify(subscription));
    } catch (error) {
      console.error('Erro ao salvar assinatura:', error);
    }
  }

  // Carregar assinatura
  async getSubscription(): Promise<UserSubscription | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.USER_SUBSCRIPTION);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erro ao carregar assinatura:', error);
      return null;
    }
  }

  // Salvar erros da missão
  async saveMistakes(mistakes: Mistake[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.MISSION_MISTAKES, JSON.stringify(mistakes));
    } catch (error) {
      console.error('Erro ao salvar erros:', error);
    }
  }

  // Carregar erros da missão
  async getMistakes(): Promise<Mistake[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.MISSION_MISTAKES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao carregar erros:', error);
      return [];
    }
  }

  // Limpar erros da missão
  async clearMistakes(): Promise<void> {
    try {
      await AsyncStorage.removeItem(KEYS.MISSION_MISTAKES);
    } catch (error) {
      console.error('Erro ao limpar erros:', error);
    }
  }

  // Marcar última sincronização
  async setLastSync(): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.LAST_SYNC, new Date().toISOString());
    } catch (error) {
      console.error('Erro ao marcar sync:', error);
    }
  }

  // Obter última sincronização
  async getLastSync(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(KEYS.LAST_SYNC);
    } catch (error) {
      console.error('Erro ao obter sync:', error);
      return null;
    }
  }

  // Limpar todos os dados do onboarding (reset)
  async clearOnboardingData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        KEYS.ONBOARDING_PROGRESS,
        KEYS.MISSION_MISTAKES,
      ]);
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
    }
  }

  // Limpar todos os dados do app
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Erro ao limpar todos os dados:', error);
    }
  }
}

export default new StorageService();
