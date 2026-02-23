import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameProgress, GameStats, Energy, FounderProfile, FounderTitle } from '../types/game';

// 🎮 GAME MANAGER - Gerenciamento Central do Jogo

const STORAGE_KEY = '@empreenda_game_progress';

class GameManager {
  // Inicializar novo jogo
  async initializeNewGame(dailyMinutes: number, founderProfile: FounderProfile): Promise<GameProgress> {
    const initialProgress: GameProgress = {
      currentMissionId: 'mission_1_discovery',
      completedMissions: [],
      stats: {
        cash: 50,
        customerInterest: 30,
        knowledge: 40,
        motivation: 80,
        socialImpact: 20,
      },
      energy: {
        current: this.calculateMaxEnergy(dailyMinutes),
        max: this.calculateMaxEnergy(dailyMinutes),
        lastRecharge: new Date().toISOString(),
      },
      founderProfile,
      currentTitle: 'BEGINNER',
      totalDecisions: 0,
      dayStreak: 1,
      lastPlayedDate: new Date().toISOString(),
    };

    await this.saveProgress(progress);
    return initialProgress;
  }

  // Calcular energia máxima baseada no tempo diário
  calculateMaxEnergy(dailyMinutes: number): number {
    const energyMap: { [key: number]: number } = {
      5: 3,
      10: 5,
      15: 8,
      30: 15,
    };
    return energyMap[dailyMinutes] || 5;
  }

  // Salvar progresso
  async saveProgress(progress: GameProgress): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    }
  }

  // Carregar progresso
  async loadProgress(): Promise<GameProgress | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
      return null;
    }
  }

  // Recarregar energia (diariamente)
  async rechargeEnergy(): Promise<Energy> {
    const progress = await this.loadProgress();
    if (!progress) throw new Error('Progresso não encontrado');

    const lastRecharge = new Date(progress.energy.lastRecharge);
    const now = new Date();
    const hoursSinceRecharge = (now.getTime() - lastRecharge.getTime()) / (1000 * 60 * 60);

    // Recarregar se passou mais de 20 horas
    if (hoursSinceRecharge >= 20) {
      const newEnergy: Energy = {
        current: progress.energy.max,
        max: progress.energy.max,
        lastRecharge: now.toISOString(),
      };

      // Atualizar streak
      const lastPlayed = new Date(progress.lastPlayedDate);
      const daysDiff = Math.floor((now.getTime() - lastPlayed.getTime()) / (1000 * 60 * 60 * 24));
      
      progress.energy = newEnergy;
      progress.dayStreak = daysDiff === 1 ? progress.dayStreak + 1 : 1;
      progress.lastPlayedDate = now.toISOString();

      await this.saveProgress(progress);
      return newEnergy;
    }

    return progress.energy;
  }

  // Consumir energia
  async consumeEnergy(amount: number): Promise<boolean> {
    const progress = await this.loadProgress();
    if (!progress) return false;

    if (progress.energy.current >= amount) {
      progress.energy.current -= amount;
      await this.saveProgress(progress);
      return true;
    }

    return false;
  }

  // Atualizar stats após decisão
  async updateStats(statsChange: Partial<GameStats>): Promise<GameStats> {
    const progress = await this.loadProgress();
    if (!progress) throw new Error('Progresso não encontrado');

    const newStats: GameStats = { ...progress.stats };

    // Aplicar mudanças e manter entre 0-100
    Object.keys(statsChange).forEach((key) => {
      const statKey = key as keyof GameStats;
      newStats[statKey] = Math.max(0, Math.min(100, newStats[statKey] + (statsChange[statKey] || 0)));
    });

    progress.stats = newStats;
    progress.totalDecisions += 1;
    await this.saveProgress(progress);

    return newStats;
  }

  // Completar missão
  async completeMission(missionId: string): Promise<void> {
    const progress = await this.loadProgress();
    if (!progress) return;

    if (!progress.completedMissions.includes(missionId)) {
      progress.completedMissions.push(missionId);
      await this.saveProgress(progress);
    }
  }

  // Avançar para próxima missão
  async advanceToNextMission(nextMissionId: string): Promise<void> {
    const progress = await this.loadProgress();
    if (!progress) return;

    progress.currentMissionId = nextMissionId;
    await this.saveProgress(progress);
  }

  // Atualizar título
  async updateTitle(newTitle: FounderTitle): Promise<void> {
    const progress = await this.loadProgress();
    if (!progress) return;

    progress.currentTitle = newTitle;
    await this.saveProgress(progress);
  }

  // Verificar se pode iniciar missão
  canStartMission(energy: Energy, energyCost: number): boolean {
    return energy.current >= energyCost;
  }

  // Calcular título baseado em progresso
  calculateTitle(completedMissions: number): FounderTitle {
    if (completedMissions === 0) return 'BEGINNER';
    if (completedMissions <= 2) return 'EXPLORER';
    if (completedMissions <= 4) return 'BUILDER';
    if (completedMissions <= 6) return 'VALIDATOR';
    if (completedMissions <= 8) return 'CEO_IN_TRAINING';
    return 'SERIAL_FOUNDER';
  }

  // Obter mensagem de título
  getTitleName(title: FounderTitle): string {
    const titles: { [key in FounderTitle]: string } = {
      BEGINNER: 'Fundador Iniciante',
      EXPLORER: 'Explorador de Ideias',
      BUILDER: 'Construtor de MVP',
      VALIDATOR: 'Validador',
      CEO_IN_TRAINING: 'CEO em Formação',
      SERIAL_FOUNDER: 'Fundador em Série',
    };
    return titles[title];
  }

  // Resetar jogo
  async resetGame(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
}

export default new GameManager();
