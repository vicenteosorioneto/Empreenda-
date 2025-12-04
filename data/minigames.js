// Mini-jogos educacionais estilo "bets" mas baseados em mérito

export const MINIGAME_TYPES = {
  // Roda da Inovação - gira e cai numa categoria
  INNOVATION_WHEEL: {
    id: 'innovation_wheel',
    name: '🎡 Roda da Inovação',
    description: 'Gire e caia numa categoria de desafio',
    icon: '🎡',
    duration: 120,
    baseXP: 75,
    categories: [
      { name: 'Estratégia', icon: '🎯', color: '#0066FF' },
      { name: 'Criatividade', icon: '💡', color: '#7C3AED' },
      { name: 'Análise', icon: '📊', color: '#10B981' },
      { name: 'Inovação', icon: '🚀', color: '#EC4899' },
      { name: 'Liderança', icon: '👑', color: '#FCD34D' },
      { name: 'Sustentabilidade', icon: '🌍', color: '#06B6D4' },
    ],
  },

  // Escolha a Cor - responda rápido sobre ideias inovadoras
  COLOR_CHOICE: {
    id: 'color_choice',
    name: '🎨 Escolha Inteligente',
    description: 'Escolha a cor certa para ideias inovadoras',
    icon: '🎨',
    duration: 180,
    baseXP: 100,
    multipliers: {
      perfect: 2.0, // Respostas rápidas e certas
      good: 1.5,
      ok: 1.0,
    },
  },

  // Sprint 30 Segundos - acerte máximo de perguntas rápidas
  SPRINT_30S: {
    id: 'sprint_30s',
    name: '⚡ Sprint 30s',
    description: 'Acerte o máximo de perguntas em 30 segundos',
    icon: '⚡',
    duration: 30,
    baseXP: 50,
    bonusPerCorrect: 10,
    bonusForSpeed: 25, // Se responder em menos de 3 segundos
  },

  // Batalha de Ideias - duelo rápido contra IA/friend
  IDEA_BATTLE: {
    id: 'idea_battle',
    name: '⚔️ Batalha de Ideias',
    description: 'Compete com amigos em rápidos rounds',
    icon: '⚔️',
    duration: 300,
    baseXP: 150,
    roundCount: 5,
    pointsPerRound: 20,
  },

  // Puzzle Empreendedor - resolva mini-puzzles sobre negócios
  ENTREPRENEUR_PUZZLE: {
    id: 'entrepreneur_puzzle',
    name: '🧩 Puzzle Empreendedor',
    description: 'Resolva puzzles sobre modelos de negócio',
    icon: '🧩',
    duration: 240,
    baseXP: 120,
    puzzleCount: 3,
    bonusForSpeed: 40,
  },

  // Leilão de Startups - "aposte" em ideias (educacional)
  STARTUP_AUCTION: {
    id: 'startup_auction',
    name: '🏆 Leilão de Startups',
    description: 'Escolha qual startup tem mais potencial',
    icon: '🏆',
    duration: 200,
    baseXP: 110,
    judgingCriteria: ['Inovação', 'Mercado', 'Escalabilidade', 'Sustentabilidade'],
  },
};

// Perguntas para Sprint 30s
export const SPRINT_30S_QUESTIONS = [
  {
    question: 'Qual é o primeiro passo para uma startup?',
    options: ['Pedir dinheiro', 'Entender o problema', 'Alugar um escritório'],
    correct: 1,
    category: 'estratégia',
  },
  {
    question: 'MVP significa:',
    options: ['Most Valuable Player', 'Minimum Viable Product', 'Maximum Value Project'],
    correct: 1,
    category: 'conceitos',
  },
  {
    question: 'Qual é o maior risco para uma startup?',
    options: ['Falta de dinheiro', 'Falta de product-market fit', 'Competição'],
    correct: 1,
    category: 'risco',
  },
  {
    question: 'Inovação é principalmente sobre:',
    options: ['Tecnologia', 'Resolver problemas reais', 'Ser o primeiro'],
    correct: 1,
    category: 'inovação',
  },
  {
    question: 'Qual é a métrica mais importante no início?',
    options: ['Receita', 'Usuários ativos', 'Satisfação do cliente'],
    correct: 1,
    category: 'métricas',
  },
];

// Categorias de Color Choice
export const COLOR_CHOICE_QUESTIONS = [
  {
    statement: 'Uma solução que resolve um problema real',
    color: 'green', // ✓
    icon: '✅',
  },
  {
    statement: 'Uma ideia sem validação de mercado',
    color: 'yellow', // ⚠️
    icon: '⚠️',
  },
  {
    statement: 'Um produto que ninguém quer',
    color: 'red', // ❌
    icon: '❌',
  },
  {
    statement: 'Escalabilidade e crescimento rápido',
    color: 'green',
    icon: '📈',
  },
  {
    statement: 'Impacto social e sustentabilidade',
    color: 'green',
    icon: '🌍',
  },
];

// Puzzles
export const ENTREPRENEUR_PUZZLES = [
  {
    id: 'puzzle_1',
    title: 'O Modelo Canvas',
    description: 'Ordene os elementos de um modelo de negócio',
    elements: [
      'Proposição de Valor',
      'Segmento de Clientes',
      'Canais de Distribuição',
      'Relacionamento com Cliente',
      'Fontes de Receita',
    ],
    correctOrder: [0, 1, 2, 3, 4], // Ordem correta
    xpReward: 100,
  },
  {
    id: 'puzzle_2',
    title: 'Ciclo de Vida de Startup',
    description: 'Ordene os estágios do desenvolvimento',
    elements: [
      'Ideia',
      'MVP',
      'Product-Market Fit',
      'Crescimento',
      'Escala',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    xpReward: 100,
  },
];

// Dados para Startup Auction
export const STARTUP_IDEAS = [
  {
    id: 'startup_1',
    name: 'EcoDelivery',
    description: 'Entrega ecológica com bikes elétricas',
    stats: {
      inovacao: 8,
      mercado: 9,
      escalabilidade: 7,
      sustentabilidade: 10,
    },
  },
  {
    id: 'startup_2',
    name: 'SelfCare AI',
    description: 'App de wellness com IA personalizada',
    stats: {
      inovacao: 9,
      mercado: 8,
      escalabilidade: 9,
      sustentabilidade: 6,
    },
  },
  {
    id: 'startup_3',
    name: 'FarmConnect',
    description: 'Conectar fazendeiros direto com consumidores',
    stats: {
      inovacao: 6,
      mercado: 8,
      escalabilidade: 7,
      sustentabilidade: 9,
    },
  },
];

// Sistema de multiplicadores para engajamento
export const ENGAGEMENT_MULTIPLIERS = {
  // Quanto mais dias seguidos, maior o multiplicador
  streak: {
    day_1: 1.0,
    day_3: 1.1,
    day_5: 1.2,
    day_7: 1.5,
    day_14: 1.8,
    day_30: 2.0,
  },
  // Quanto mais rápido responde, melhor
  speed: {
    instant: 1.5, // < 1 segundo
    quick: 1.25, // < 3 segundos
    normal: 1.0, // 3-10 segundos
    slow: 0.8, // > 10 segundos
  },
  // Dificuldade
  difficulty: {
    easy: 1.0,
    medium: 1.5,
    hard: 2.0,
  },
};
