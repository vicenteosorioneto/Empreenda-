// 🎮 TIPOS EXPANDIDOS DO SISTEMA RPG COMPLETO

import { GameStats, Energy, FounderProfile, Mission } from './game';

// ==================== CLASSES DE PERSONAGEM ====================
export type CharacterClass = 'VISIONARY' | 'STRATEGIST' | 'EXECUTOR' | 'INNOVATOR';

export type ClassBonus = {
  vision: number;
  management: number;
  marketing: number;
  finance: number;
  leadership: number;
};

export type ClassInfo = {
  id: CharacterClass;
  name: string;
  description: string;
  emoji: string;
  bonuses: ClassBonus;
  startingSkill: string;
};

// ==================== ATRIBUTOS RPG ====================
export type PlayerAttributes = {
  vision: number; // 0-100 - Visão e inovação
  management: number; // 0-100 - Gestão e planejamento
  marketing: number; // 0-100 - Marketing e vendas
  finance: number; // 0-100 - Finanças e controle
  leadership: number; // 0-100 - Liderança de equipe
};

// ==================== SISTEMA DE XP E NÍVEL ====================
export type LevelSystem = {
  currentLevel: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
  skillPoints: number; // Pontos para gastar na skill tree
};

// ==================== SKILL TREE ====================
export type SkillCategory = 'PITCH' | 'FINANCE' | 'MARKETING' | 'LEADERSHIP' | 'TECH';

export type Skill = {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  emoji: string;
  level: number; // 0-3
  maxLevel: number;
  cost: number; // Skill points necessários
  prerequisites: string[]; // IDs de skills necessárias
  effects: {
    attributes?: Partial<PlayerAttributes>;
    passive?: string; // Descrição do efeito passivo
  };
  unlocked: boolean;
};

export type SkillTree = {
  [skillId: string]: Skill;
};

// ==================== ECONOMIA E RISCO ====================
export type Economy = {
  money: number; // Dinheiro atual
  monthlyRevenue: number;
  monthlyExpenses: number;
  runway: number; // Meses até falência
  risk: number; // 0-100 - risco de falência
};

export type CompanyStatus = 'ACTIVE' | 'AT_RISK' | 'BANKRUPT' | 'SCALING';

// ==================== NPCs ====================
export type NPCType = 'MENTOR' | 'INVESTOR' | 'CLIENT' | 'COMPETITOR' | 'PARTNER';

export type NPC = {
  id: string;
  name: string;
  type: NPCType;
  emoji: string;
  relationship: number; // 0-100
  dialogues: Dialogue[];
};

export type Dialogue = {
  id: string;
  npcId: string;
  text: string;
  options: DialogueOption[];
  context?: string; // Quando aparece
};

export type DialogueOption = {
  id: string;
  text: string;
  consequences: {
    relationship?: number;
    money?: number;
    reputation?: number;
    attributes?: Partial<PlayerAttributes>;
  };
  nextDialogueId?: string;
};

// ==================== SISTEMA DE QUESTS ====================
export type QuestType = 'MAIN' | 'SIDE' | 'DAILY';
export type QuestStatus = 'LOCKED' | 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export type Quest = {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  status: QuestStatus;
  narrative: string;
  objectives: QuestObjective[];
  rewards: QuestReward;
  consequences?: QuestConsequence;
  requiredLevel?: number;
  requiredQuests?: string[];
  timeLimit?: number; // Dias
  startDate?: string;
};

export type QuestObjective = {
  id: string;
  description: string;
  completed: boolean;
  type: 'QUESTION' | 'DECISION' | 'DIALOGUE' | 'MILESTONE';
  target?: any;
};

export type QuestReward = {
  xp: number;
  money?: number;
  skillPoints?: number;
  reputation?: number;
  unlocksQuest?: string;
  unlocksArea?: string;
};

export type QuestConsequence = {
  onSuccess?: {
    story: string;
    effects: any;
  };
  onFailure?: {
    story: string;
    effects: any;
  };
};

// ==================== PERGUNTAS CONTEXTUAIS ====================
export type QuestionType = 'MULTIPLE_CHOICE' | 'STRATEGIC_DECISION' | 'SCENARIO';

export type Question = {
  id: string;
  questId: string;
  type: QuestionType;
  text: string;
  context: string; // Narrativa da situação
  options: QuestionOption[];
  correctAnswerId?: string; // Para múltipla escolha
  educationalFeedback: string;
};

export type QuestionOption = {
  id: string;
  text: string;
  isCorrect?: boolean; // Para múltipla escolha
  consequences: {
    xp: number;
    money?: number;
    attributes?: Partial<PlayerAttributes>;
    risk?: number;
    reputation?: number;
  };
  explanation: string;
};

// ==================== MAPA E ÁREAS ====================
export type GameArea = 'IDEATION' | 'VALIDATION' | 'MVP' | 'GROWTH' | 'SCALE';

export type Area = {
  id: GameArea;
  name: string;
  description: string;
  unlocked: boolean;
  requiredLevel: number;
  quests: string[]; // IDs das quests
  npcs: string[]; // IDs dos NPCs
};

export type WorldMap = {
  [areaId: string]: Area;
};

// ==================== REPUTAÇÃO ====================
export type Reputation = {
  market: number; // 0-100
  investors: number; // 0-100
  customers: number; // 0-100
  community: number; // 0-100
};

// ==================== PROGRESSO RPG COMPLETO ====================
export type RPGProgress = {
  // Personagem
  character: {
    name: string;
    class: CharacterClass;
    attributes: PlayerAttributes;
    level: LevelSystem;
    skills: SkillTree;
  };

  // Economia
  economy: Economy;
  companyStatus: CompanyStatus;
  reputation: Reputation;

  // Progresso
  currentArea: GameArea;
  unlockedAreas: GameArea[];
  quests: {
    [questId: string]: Quest;
  };
  completedQuests: string[];
  activeQuestId?: string;

  // NPCs e relacionamentos
  npcs: {
    [npcId: string]: NPC;
  };

  // Stats legados (compatibilidade)
  stats: GameStats;
  energy: Energy;
  founderProfile: FounderProfile;

  // Meta
  dayStreak: number;
  lastPlayedDate: string;
  totalPlayTime: number; // minutos
};

// ==================== GAME ENGINE EVENTS ====================
export type GameEvent = {
  type: 'LEVEL_UP' | 'QUEST_COMPLETE' | 'SKILL_UNLOCKED' | 'AREA_UNLOCKED' | 'CRISIS' | 'ACHIEVEMENT';
  data: any;
  timestamp: string;
};

export type GameState = {
  progress: RPGProgress;
  pendingEvents: GameEvent[];
  lastSave: string;
};
