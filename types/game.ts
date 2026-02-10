// 🎮 TIPOS DO SISTEMA DE JOGO RPG

// Status do jogo (barras de progresso)
export type GameStats = {
  cash: number;              // 💰 Caixa (0-100)
  customerInterest: number;  // 😊 Interesse do cliente (0-100)
  knowledge: number;         // 🧠 Conhecimento (0-100)
  motivation: number;        // 🔥 Motivação (0-100)
  socialImpact: number;      // 🌱 Impacto social (0-100)
};

// Sistema de energia (hábito diário)
export type Energy = {
  current: number;
  max: number;
  lastRecharge: string; // ISO string
};

// Nível de risco das decisões
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

// Decisão do jogador
export type Decision = {
  id: string;
  text: string;
  description?: string;
  effects: Partial<GameStats>;
  energyCost: number;
  riskLevel: RiskLevel;
  consequenceText: string;
};

// Missão (capítulo da startup)
export type Mission = {
  id: string;
  title: string;
  description: string;
  intro: string;
  phase: StartupPhase;
  decisions: Decision[];
  requiredStats?: Partial<GameStats>;
  energyCost: number;
  completed: boolean;
};

// Fases da startup
export type StartupPhase =
  | 'DISCOVERY'          // Descoberta de Problema
  | 'IDEATION'           // Ideação
  | 'VALIDATION'         // Validação com Clientes
  | 'MVP'                // Produto Mínimo Viável
  | 'PRICING'            // Precificação
  | 'PITCH'              // Pitch Final
  | 'SCALE';             // Escala

// Perfil do fundador (influencia jogo)
export type FounderProfile =
  | 'VISIONARY'    // Visionário - foco em inovação
  | 'ANALYTICAL'   // Analítico - foco em dados
  | 'EXECUTOR'     // Executor - foco em ação
  | 'SOCIAL';      // Social - foco em pessoas

// Títulos desbloqueáveis
export type FounderTitle =
  | 'BEGINNER'           // Fundador Iniciante
  | 'EXPLORER'           // Explorador de Ideias
  | 'BUILDER'            // Construtor de MVP
  | 'VALIDATOR'          // Validador
  | 'CEO_IN_TRAINING'    // CEO em Formação
  | 'SERIAL_FOUNDER';    // Fundador em Série

// Progresso do jogador
export type GameProgress = {
  currentMissionId: string;
  completedMissions: string[];
  stats: GameStats;
  energy: Energy;
  founderProfile: FounderProfile;
  currentTitle: FounderTitle;
  totalDecisions: number;
  dayStreak: number;
  lastPlayedDate: string;
};

// Reação do mascote
export type MascotReaction = {
  type: 'SUCCESS' | 'WARNING' | 'DANGER' | 'NEUTRAL';
  message: string;
  emoji: string;
};

// Consequência de uma decisão
export type DecisionConsequence = {
  statsChange: Partial<GameStats>;
  mascotReaction: MascotReaction;
  nextMissionUnlocked?: string;
  titleUnlocked?: FounderTitle;
};
