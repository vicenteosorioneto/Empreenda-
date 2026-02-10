import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  RPGProgress,
  CharacterClass,
  PlayerAttributes,
  LevelSystem,
  Economy,
  CompanyStatus,
  Reputation,
  GameArea,
  Quest,
  QuestStatus,
  GameEvent,
  SkillTree,
} from '../types/rpg';
import { GameStats, Energy } from '../types/game';
import { getInitialSkillTree, CLASSES_INFO } from '../data/skillsData';
import { initializeNPCs } from '../data/npcsData';

// 🎮 RPG ENGINE - Motor Central do Jogo RPG

const STORAGE_KEY = '@empreenda_rpg_progress';
const EVENTS_KEY = '@empreenda_rpg_events';

class RPGEngine {
  // ==================== INICIALIZAÇÃO ====================

  async initializeNewCharacter(
    name: string,
    characterClass: CharacterClass
  ): Promise<RPGProgress> {
    const classInfo = CLASSES_INFO[characterClass];

    const initialProgress: RPGProgress = {
      character: {
        name,
        class: characterClass,
        attributes: {
          vision: 50 + classInfo.bonuses.vision,
          management: 50 + classInfo.bonuses.management,
          marketing: 50 + classInfo.bonuses.marketing,
          finance: 50 + classInfo.bonuses.finance,
          leadership: 50 + classInfo.bonuses.leadership,
        },
        level: {
          currentLevel: 1,
          currentXP: 0,
          xpToNextLevel: 100,
          totalXP: 0,
          skillPoints: 3, // Começa com 3 pontos
        },
        skills: getInitialSkillTree(characterClass), // Inicializa com skill tree
      },
      economy: {
        money: 1000, // R$ inicial
        monthlyRevenue: 0,
        monthlyExpenses: 500,
        runway: 2,
        risk: 30,
      },
      companyStatus: 'ACTIVE',
      reputation: {
        market: 50,
        investors: 50,
        customers: 50,
        community: 50,
      },
      currentArea: 'IDEATION',
      unlockedAreas: ['IDEATION'],
      quests: {},
      completedQuests: [],
      npcs: initializeNPCs(), // Inicializa NPCs com diálogos
      stats: {
        cash: 50,
        customerInterest: 30,
        knowledge: 40,
        motivation: 80,
        socialImpact: 20,
      },
      energy: {
        current: 10,
        max: 10,
        lastRecharge: new Date().toISOString(),
      },
      founderProfile: this.mapClassToFounderProfile(characterClass),
      dayStreak: 1,
      lastPlayedDate: new Date().toISOString(),
      totalPlayTime: 0,
    };

    await this.saveProgress(initialProgress);
    return initialProgress;
  }

  // ==================== SISTEMA DE XP E NÍVEIS ====================

  calculateXPForNextLevel(currentLevel: number): number {
    // Fórmula escalável: 100 * (level ^ 1.5)
    return Math.floor(100 * Math.pow(currentLevel, 1.5));
  }

  async gainXP(amount: number): Promise<{ leveledUp: boolean; newLevel?: number }> {
    const progress = await this.loadProgress();
    if (!progress) return { leveledUp: false };

    progress.character.level.currentXP += amount;
    progress.character.level.totalXP += amount;

    let leveledUp = false;
    let newLevel = progress.character.level.currentLevel;

    // Verificar se subiu de nível
    while (progress.character.level.currentXP >= progress.character.level.xpToNextLevel) {
      progress.character.level.currentXP -= progress.character.level.xpToNextLevel;
      progress.character.level.currentLevel++;
      newLevel = progress.character.level.currentLevel;
      progress.character.level.xpToNextLevel = this.calculateXPForNextLevel(newLevel);
      progress.character.level.skillPoints += 2; // 2 pontos por nível

      leveledUp = true;

      // Aumentar atributos automaticamente
      this.applyLevelUpBonuses(progress);

      // Registrar evento
      await this.registerEvent({
        type: 'LEVEL_UP',
        data: { newLevel },
        timestamp: new Date().toISOString(),
      });
    }

    await this.saveProgress(progress);
    return { leveledUp, newLevel };
  }

  private applyLevelUpBonuses(progress: RPGProgress): void {
    // Aumentar atributos baseado na classe
    const classInfo = CLASSES_INFO[progress.character.class];
    const attrs = progress.character.attributes;

    attrs.vision = Math.min(100, attrs.vision + Math.floor(classInfo.bonuses.vision / 2));
    attrs.management = Math.min(100, attrs.management + Math.floor(classInfo.bonuses.management / 2));
    attrs.marketing = Math.min(100, attrs.marketing + Math.floor(classInfo.bonuses.marketing / 2));
    attrs.finance = Math.min(100, attrs.finance + Math.floor(classInfo.bonuses.finance / 2));
    attrs.leadership = Math.min(100, attrs.leadership + Math.floor(classInfo.bonuses.leadership / 2));
  }

  // ==================== ECONOMIA E RISCO ====================

  async updateEconomy(change: Partial<Economy>): Promise<Economy> {
    const progress = await this.loadProgress();
    if (!progress) throw new Error('Progresso não encontrado');

    const economy = progress.economy;

    if (change.money !== undefined) {
      economy.money = Math.max(0, economy.money + change.money);
    }
    if (change.monthlyRevenue !== undefined) {
      economy.monthlyRevenue = Math.max(0, change.monthlyRevenue);
    }
    if (change.monthlyExpenses !== undefined) {
      economy.monthlyExpenses = Math.max(0, change.monthlyExpenses);
    }
    if (change.risk !== undefined) {
      economy.risk = Math.max(0, Math.min(100, economy.risk + change.risk));
    }

    // Recalcular runway
    if (economy.monthlyExpenses > 0) {
      economy.runway = Math.floor(economy.money / economy.monthlyExpenses);
    }

    // Atualizar status da empresa
    progress.companyStatus = this.calculateCompanyStatus(economy);

    // Verificar falência
    if (progress.companyStatus === 'BANKRUPT') {
      await this.registerEvent({
        type: 'CRISIS',
        data: { type: 'BANKRUPTCY' },
        timestamp: new Date().toISOString(),
      });
    }

    await this.saveProgress(progress);
    return economy;
  }

  private calculateCompanyStatus(economy: Economy): CompanyStatus {
    if (economy.money <= 0 || economy.runway === 0) {
      return 'BANKRUPT';
    }
    if (economy.risk > 70 || economy.runway < 3) {
      return 'AT_RISK';
    }
    if (economy.monthlyRevenue > economy.monthlyExpenses * 2) {
      return 'SCALING';
    }
    return 'ACTIVE';
  }

  async updateReputation(change: Partial<Reputation>): Promise<Reputation> {
    const progress = await this.loadProgress();
    if (!progress) throw new Error('Progresso não encontrado');

    const rep = progress.reputation;

    if (change.market !== undefined) {
      rep.market = Math.max(0, Math.min(100, rep.market + change.market));
    }
    if (change.investors !== undefined) {
      rep.investors = Math.max(0, Math.min(100, rep.investors + change.investors));
    }
    if (change.customers !== undefined) {
      rep.customers = Math.max(0, Math.min(100, rep.customers + change.customers));
    }
    if (change.community !== undefined) {
      rep.community = Math.max(0, Math.min(100, rep.community + change.community));
    }

    await this.saveProgress(progress);
    return rep;
  }

  // ==================== SISTEMA DE QUESTS ====================

  async startQuest(questId: string): Promise<Quest> {
    const progress = await this.loadProgress();
    if (!progress) throw new Error('Progresso não encontrado');

    const quest = progress.quests[questId];
    if (!quest) throw new Error('Quest não encontrada');

    if (quest.status !== 'AVAILABLE') {
      throw new Error('Quest não disponível');
    }

    quest.status = 'IN_PROGRESS';
    quest.startDate = new Date().toISOString();
    progress.activeQuestId = questId;

    await this.saveProgress(progress);
    return quest;
  }

  async completeQuestObjective(questId: string, objectiveId: string): Promise<void> {
    const progress = await this.loadProgress();
    if (!progress) throw new Error('Progresso não encontrado');

    const quest = progress.quests[questId];
    if (!quest) return;

    const objective = quest.objectives.find((obj) => obj.id === objectiveId);
    if (objective) {
      objective.completed = true;
    }

    // Verificar se todos objetivos foram completados
    const allCompleted = quest.objectives.every((obj) => obj.completed);
    if (allCompleted) {
      await this.completeQuest(questId);
    } else {
      await this.saveProgress(progress);
    }
  }

  async completeQuest(questId: string): Promise<void> {
    const progress = await this.loadProgress();
    if (!progress) throw new Error('Progresso não encontrado');

    const quest = progress.quests[questId];
    if (!quest) return;

    quest.status = 'COMPLETED';
    progress.completedQuests.push(questId);
    progress.activeQuestId = undefined;

    // Aplicar recompensas
    await this.gainXP(quest.rewards.xp);

    if (quest.rewards.money) {
      await this.updateEconomy({ money: quest.rewards.money });
    }

    if (quest.rewards.skillPoints) {
      progress.character.level.skillPoints += quest.rewards.skillPoints;
    }

    if (quest.rewards.reputation) {
      await this.updateReputation({ market: quest.rewards.reputation });
    }

    // Desbloquear nova quest
    if (quest.rewards.unlocksQuest) {
      const nextQuest = progress.quests[quest.rewards.unlocksQuest];
      if (nextQuest) {
        nextQuest.status = 'AVAILABLE';
      }
    }

    // Desbloquear nova área
    if (quest.rewards.unlocksArea) {
      const newArea = quest.rewards.unlocksArea as GameArea;
      if (!progress.unlockedAreas.includes(newArea)) {
        progress.unlockedAreas.push(newArea);
        await this.registerEvent({
          type: 'AREA_UNLOCKED',
          data: { area: newArea },
          timestamp: new Date().toISOString(),
        });
      }
    }

    await this.registerEvent({
      type: 'QUEST_COMPLETE',
      data: { questId, quest },
      timestamp: new Date().toISOString(),
    });

    await this.saveProgress(progress);
  }

  // ==================== HELPERS ====================

  mapClassToFounderProfile(characterClass: CharacterClass) {
    const map = {
      VISIONARY: 'VISIONARY' as const,
      STRATEGIST: 'ANALYTICAL' as const,
      EXECUTOR: 'EXECUTOR' as const,
      INNOVATOR: 'SOCIAL' as const,
    };
    return map[characterClass];
  }

  // ==================== STORAGE ====================

  async saveProgress(progress: RPGProgress): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  async loadProgress(): Promise<RPGProgress | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  async registerEvent(event: GameEvent): Promise<void> {
    try {
      const eventsData = await AsyncStorage.getItem(EVENTS_KEY);
      const events: GameEvent[] = eventsData ? JSON.parse(eventsData) : [];
      events.push(event);
      await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(events));
    } catch (error) {
      console.error('Erro ao registrar evento:', error);
    }
  }

  async getEvents(): Promise<GameEvent[]> {
    try {
      const data = await AsyncStorage.getItem(EVENTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
}

export default new RPGEngine();
