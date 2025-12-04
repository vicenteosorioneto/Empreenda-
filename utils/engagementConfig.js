/**
 * QUICK REFERENCE - Elementos Visuais & Psicologia de Engajamento
 */

export const VISUAL_ELEMENTS = {
  // ✅ Paleta Vibrante e Chamativa
  colors: {
    // Neon - capturam atenção
    neonBlue: '#0066FF',
    neonPurple: '#7C3AED',
    neonGreen: '#10B981',
    neonCyan: '#06B6D4',
    neonPink: '#EC4899',
    neonYellow: '#FCD34D',
    
    // Dark backgrounds (contraste máximo)
    darkBg: '#0F172A',
    
    // Brancos para respiração
    white: '#FFFFFF',
  },

  // ✅ Gradientes Neon (Azul → Roxo, Verde → Azul)
  gradients: {
    primary: ['#0066FF', '#7C3AED'],
    secondary: ['#10B981', '#3B82F6'],
    reward: ['#FCD34D', '#F97316'],
    victory: ['#06B6D4', '#10B981'],
  },

  // ✅ Cards Brilhantes que Pulsam
  pulsingElements: [
    'StatCard', // Trilhas completadas, Ranking, Badges
    'DailyMissionCard', // Tarefas do dia
    'MiniGameCard', // Acesso rápido a jogos
  ],

  // ✅ Animações Rápidas e Reforçadoras
  animations: {
    bounce: 'Responde certo → Bounce suave',
    sparkles: 'Ganhou XP → Partículas cintilantes',
    confetti: 'Desbloqueou badge → Fogos de artifício',
    glow: 'Cards → Brilho contínuo',
    float: 'Avatar → Flutuação suave',
  },
};

export const ENGAGEMENT_MECHANICS = {
  // 🔥 Progressão Viciante Saudável
  progression: {
    levels: 9, // Novato → Unicórnio
    dailyMissions: 3, // 5-15 minutos cada
    weeklyChallenge: 1,
    milestones: [100, 500, 1000, 5000, 10000], // XP
  },

  // 🎯 Badges Raros
  rareBadges: [
    '🔥 Lenda da Inovação - Completou todas as trilhas rápido',
    '💡 Mestre das Ideias - 10 ideias inovadoras',
    '🔥 Guerreiro de Sequência - 7 dias seguidos completos',
    '🌍 Criador de Impacto - 100K impacto social',
    '⚡ Corredor de Velocidade - 5 missões em 1 minuto',
    '👥 Construtor de Comunidade - Influenciou 50 amigos',
  ],

  // 🎮 Mini-Jogos Educacionais (Não Azar Puro)
  minigames: {
    innovationWheel: 'Gira categoria → Responde sobre ela',
    colorChoice: 'Escolhe cor certa para ideias',
    sprint30s: 'Máximo de perguntas em 30 segundos',
    idleBattle: 'Duelo rápido com amigos',
    puzzles: 'Resolver sobre modelos de negócio',
    startupAuction: 'Avalia potencial de startups',
  },

  // 📌 Psicologia Ética (Versão Viciante Positiva)
  psychology: {
    competence: 'Usuário se sente melhorando → volta para melhorar',
    immediateRewards: 'Feedback em < 500ms',
    variableRewards: 'Nem sempre igual, mas sempre ligado ao esforço',
    streaks: 'Sequências criar dependência saudável',
    social: 'Amigos passando no ranking → competição leve',
    customization: 'Avatar evolui com progresso',
  },

  // ✔ Vício Positivo
  healthyAddiction: {
    sessionLength: '3-5 minutos, alto impacto',
    notificationTiming: 'Inteligente, não spam',
    avatarEvolution: 'Ganhos visuais contínuos',
    dailyMissionsReset: 'Todo dia novo começo',
    streakWarnings: 'Aviso antes de perder sequência',
  },
};

export const PSYCHOLOGICAL_TRIGGERS = {
  // 1️⃣ Efeito de Competência
  competenceFeedback: [
    'Boa! Você pensou como um empreendedor!',
    'Excelente análise de mercado!',
    'Inovação pura! 🚀',
    'Visão estratégica impressionante!',
  ],

  // 2️⃣ Feedback Imediato
  immediateReactions: {
    correct: { emoji: '✅', color: 'green', animation: 'bounce' },
    incorrect: { emoji: '❌', color: 'red', animation: 'shake' },
    achievement: { emoji: '🏆', color: 'yellow', animation: 'sparkles' },
    streak: { emoji: '🔥', color: 'orange', animation: 'pulse' },
  },

  // 3️⃣ Recompensas Variáveis (Saudáveis)
  variableRewards: {
    rule: 'Nem sempre igual, mas sempre por ESFORÇO',
    examples: [
      'Quiz: 50-100 XP (+ bônus por velocidade)',
      'Ideia: 75-150 XP (+ raro badge)',
      'Desafio: 100-200 XP (+ avatar item)',
      'Mini-jogo: 50-500 XP (multiplicador por streak)',
    ],
  },

  // 4️⃣ Risco/Recompensa Ético
  riskReward: {
    notAcual: 'Simula sensação, mas sem azar puro',
    baseOnMerit: 'Tudo depende do conhecimento do usuário',
    examples: [
      'Roda não é sorte, é conhecimento',
      'Cores não é aleatório, é estratégia',
      'Multiplicadores por esforço, não RNG',
    ],
  },
};

export const ENGAGEMENT_LOOP = {
  // Hora 1: Sessão Curta mas Intensa
  minute_0: 'Notificação: "Missões diárias esperando"',
  minute_1: 'Abre app → Avatar flutuante e brilhante',
  minute_2: 'Clica em missão daily',
  minute_3: 'Completa em < 5 minutos com feedback visual',
  minute_4: 'Ganha XP animado + possível badge',
  minute_5: 'Toast: "Sua sequência: 🔥 7 dias!"',

  // Engajamento Retido
  afterSession: {
    immediate: 'Efeito de realização (dopamina)',
    afterMinutes: 'Curiosidade: "Quantos XP ganhar hoje?"',
    afterHours: 'Notificação estratégica: "Amigo te passou"',
    nextDay: 'Notificação: "Streak em risco!" (motivador)',
  },

  // Ativadores de Volta
  returnTriggers: [
    'Streak warning (21h sem atividade)',
    'Friend achievement',
    'Ranking change',
    'New badge unlocked',
    'Avatar evolution milestone',
    'Community event',
  ],
};

export const ANTI_PATTERNS = {
  // ❌ O QUE NÃO FAZER
  avoid: [
    'Azar puro (verdadeiros loot boxes)',
    'Pay-to-win mechanics',
    'Excessivo grind sem recompensa',
    'Notificações spam (> 1x/dia)',
    'Conteúdo adulado (fake difficulty)',
    'Falta de controle do usuário',
    'Vícios criados = frustração',
  ],

  // ✅ O QUE FAZER
  do: [
    'Tudo baseado em conhecimento',
    'Cosmético apenas premium',
    'Recompensas significativas',
    'Notificações estratégicas',
    'Desafios reais + aprendizado',
    'Controle total do streak/notificações',
    'Vícios positivos = crescimento',
  ],
};

export const METRICS_TO_TRACK = {
  // Engagement
  dailyActiveUsers: 'DAU',
  monthlyActiveUsers: 'MAU',
  sessionLength: 'Duração média de sessão',
  sessionsPerDay: 'Sessões por dia por usuário',
  
  // Retention
  day1Retention: 'Voltou no dia 2',
  day7Retention: 'Voltou dia 8',
  day30Retention: 'Voltou dia 31',
  churnRate: 'Taxa de abandono',

  // Progression
  avgLevelReached: 'Nível médio alcançado',
  avgXPPerSession: 'XP médio ganho',
  badgesUnlocked: 'Badges desbloqueadas (mediana)',
  streakAverage: 'Sequência média',

  // Monetization (Ético)
  cosmetics: 'Avatar skins vendidas',
  premiumBattlePass: 'Pass premium',
  avgSpendPerUser: 'Gasto médio (ético)',

  // Health
  churnByLevel: 'Onde usuários abandonam',
  difficultySpike: 'Onde desistem por dificuldade',
  frustrationPoints: 'Feedback negativo',
};

// RESUMO EXECUTIVO
export const SUMMARY = `
🎨 VISUAL: Neon brilhante, dark backgrounds, gradientes vibrantes
🎮 MECÂNICA: Mérito puro, sem azar, baseado em conhecimento
🧠 PSICOLOGIA: Competência, feedback imediato, recompensas variáveis
❤️  ÉTICA: Engajamento positivo, educacional, saudável
📊 RESULTADO: Vício positivo = aprendizado + crescimento
`;
