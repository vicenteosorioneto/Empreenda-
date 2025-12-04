// Sistema de Missões Diárias com recompensas progressivas
export const DAILY_MISSIONS = [
  {
    id: 'daily_quiz_1',
    title: '🧠 Quiz Rápido',
    description: 'Responda 3 perguntas sobre empreendedorismo',
    icon: '🧠',
    xpReward: 50,
    duration: 300, // 5 minutos
    difficulty: 'easy',
    category: 'conhecimento',
  },
  {
    id: 'daily_idea_1',
    title: '💡 Ideia do Dia',
    description: 'Compartilhe uma ideia inovadora',
    icon: '💡',
    xpReward: 75,
    duration: 600, // 10 minutos
    difficulty: 'medium',
    category: 'criatividade',
  },
  {
    id: 'daily_challenge_1',
    title: '🎯 Desafio do Dia',
    description: 'Complete um mini-jogo educacional',
    icon: '🎯',
    xpReward: 100,
    duration: 900, // 15 minutos
    difficulty: 'hard',
    category: 'prática',
  },
];

// Bônus por sequência (streak)
export const STREAK_BONUSES = {
  day_1: { bonus: 10, icon: '🔥', message: 'Começou bem!' },
  day_3: { bonus: 50, icon: '🔥🔥', message: 'Sequência de 3 dias!' },
  day_7: { bonus: 150, icon: '🔥🔥🔥', message: 'Uma semana de dedicação!' },
  day_14: { bonus: 300, icon: '⭐', message: 'Duas semanas impressionantes!' },
  day_30: { bonus: 500, icon: '🏆', message: 'Um mês incrível!' },
};

// Estrutura de dados para daily missions no storage
export const createDailyMissionEntry = () => ({
  date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
  completed: {
    daily_quiz_1: false,
    daily_idea_1: false,
    daily_challenge_1: false,
  },
  completedAll: false,
  xpEarned: 0,
  streakBonus: 0,
  lastCompletedDate: null,
  currentStreak: 0,
});

// Lootbox - caixa surpresa com conteúdos educacionais
export const LOOTBOX_REWARDS = {
  common: [
    { type: 'xp', amount: 25, rarity: 'common', icon: '⭐' },
    { type: 'xp', amount: 50, rarity: 'common', icon: '⭐' },
    { type: 'badge_unlock', badge: 'explorer', rarity: 'common', icon: '🗺️' },
  ],
  rare: [
    { type: 'xp', amount: 150, rarity: 'rare', icon: '✨' },
    { type: 'badge_unlock', badge: 'idea_master', rarity: 'rare', icon: '💡' },
    { type: 'content_unlock', content: 'entrepreneur_guide', rarity: 'rare', icon: '📚' },
  ],
  epic: [
    { type: 'xp', amount: 300, rarity: 'epic', icon: '💫' },
    { type: 'avatar_item', item: 'neon_skin', rarity: 'epic', icon: '🎨' },
    { type: 'content_unlock', content: 'startup_masterclass', rarity: 'epic', icon: '🎓' },
  ],
  legendary: [
    { type: 'xp', amount: 500, rarity: 'legendary', icon: '🌟' },
    { type: 'badge_unlock', badge: 'innovation_legend', rarity: 'legendary', icon: '🔥' },
    { type: 'avatar_item', item: 'unicorn_badge', rarity: 'legendary', icon: '🦄' },
  ],
};

// Pesos de probabilidade (ético - baseado em esforço, não sorte)
export const LOOTBOX_WEIGHTS = {
  // Quanto mais o usuário estuda, melhor a chance de recompensa
  // Isso encoraja comportamento saudável
  common: { weight: 30, streakMultiplier: 0.9 }, // Diminui com streak
  rare: { weight: 40, streakMultiplier: 1.1 },
  epic: { weight: 20, streakMultiplier: 1.3 },
  legendary: { weight: 10, streakMultiplier: 1.5 },
};
