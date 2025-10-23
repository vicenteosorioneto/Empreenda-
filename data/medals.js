export const medals = {
  // Medalhas de Progresso
  first_mission: {
    id: 'first_mission',
    title: 'Primeiro Passo',
    description: 'Completou sua primeira missão',
    icon: '👶',
    color: '#CD7F32', // Bronze
    rarity: 'comum',
    xpBonus: 50,
    requirements: 'Complete 1 missão',
    category: 'progresso'
  },
  
  first_trail: {
    id: 'first_trail',
    title: 'Explorador Iniciante',
    description: 'Completou sua primeira trilha',
    icon: '🗺️',
    color: '#C0C0C0', // Prata
    rarity: 'comum',
    xpBonus: 100,
    requirements: 'Complete 1 trilha completa',
    category: 'progresso'
  },
  
  explorer: {
    id: 'explorer',
    title: 'Explorador Experiente',
    description: 'Completou 3 trilhas diferentes',
    icon: '🧭',
    color: '#FFD700', // Ouro
    rarity: 'raro',
    xpBonus: 200,
    requirements: 'Complete 3 trilhas',
    category: 'progresso'
  },
  
  master: {
    id: 'master',
    title: 'Mestre Empreendedor',
    description: 'Completou todas as 5 trilhas',
    icon: '👑',
    color: '#B9F2FF', // Diamante
    rarity: 'épico',
    xpBonus: 500,
    requirements: 'Complete todas as 5 trilhas',
    category: 'progresso'
  },

  // Medalhas de Quiz e Conhecimento
  quiz_master: {
    id: 'quiz_master',
    title: 'Quiz Master',
    description: 'Jogou 10 quizzes',
    icon: '🧠',
    color: '#8B5CF6', // Roxo especial
    rarity: 'raro',
    xpBonus: 150,
    requirements: 'Jogue 10 quizzes',
    category: 'conhecimento'
  },
  
  perfect_score: {
    id: 'perfect_score',
    title: 'Nota 10',
    description: 'Acertou 100% em um quiz',
    icon: '💯',
    color: '#10B981', // Verde
    rarity: 'raro',
    xpBonus: 100,
    requirements: 'Acerte todas as perguntas de um quiz',
    category: 'conhecimento'
  },
  
  knowledge_seeker: {
    id: 'knowledge_seeker',
    title: 'Sede de Conhecimento',
    description: 'Acertou 100 perguntas no total',
    icon: '📚',
    color: '#F59E0B', // Amarelo
    rarity: 'épico',
    xpBonus: 300,
    requirements: 'Acerte 100 perguntas em quizzes',
    category: 'conhecimento'
  },

  // Medalhas de Consistência
  daily_warrior: {
    id: 'daily_warrior',
    title: 'Guerreiro Diário',
    description: 'Usou o app por 7 dias seguidos',
    icon: '🔥',
    color: '#EF4444', // Vermelho
    rarity: 'raro',
    xpBonus: 200,
    requirements: 'Use o app 7 dias consecutivos',
    category: 'consistencia'
  },
  
  weekly_champion: {
    id: 'weekly_champion',
    title: 'Campeão Semanal',
    description: 'Completou pelo menos 1 missão por semana durante 4 semanas',
    icon: '🏆',
    color: '#FFD700', // Ouro
    rarity: 'épico',
    xpBonus: 400,
    requirements: '1 missão por semana durante 4 semanas',
    category: 'consistencia'
  },
  
  unstoppable: {
    id: 'unstoppable',
    title: 'Imparável',
    description: 'Usou o app por 30 dias seguidos',
    icon: '⚡',
    color: '#8B5CF6', // Roxo
    rarity: 'lendário',
    xpBonus: 1000,
    requirements: 'Use o app 30 dias consecutivos',
    category: 'consistencia'
  },

  // Medalhas de Habilidades Específicas
  problem_solver: {
    id: 'problem_solver',
    title: 'Solucionador de Problemas',
    description: 'Completou trilha de Identificação de Oportunidades',
    icon: '🔍',
    color: '#10B981', // Verde
    rarity: 'comum',
    xpBonus: 100,
    requirements: 'Complete a Trilha 1',
    category: 'habilidade'
  },
  
  validator: {
    id: 'validator',
    title: 'Validador Expert',
    description: 'Completou trilha de Validação de Ideias',
    icon: '✅',
    color: '#3B82F6', // Azul
    rarity: 'comum',
    xpBonus: 100,
    requirements: 'Complete a Trilha 2',
    category: 'habilidade'
  },
  
  builder: {
    id: 'builder',
    title: 'Construtor de MVPs',
    description: 'Completou trilha de Desenvolvimento de MVP',
    icon: '🛠️',
    color: '#8B5CF6', // Roxo
    rarity: 'comum',
    xpBonus: 100,
    requirements: 'Complete a Trilha 3',
    category: 'habilidade'
  },
  
  strategist: {
    id: 'strategist',
    title: 'Estrategista de Negócios',
    description: 'Completou trilha de Modelos de Negócio',
    icon: '📊',
    color: '#F59E0B', // Amarelo
    rarity: 'comum',
    xpBonus: 100,
    requirements: 'Complete a Trilha 4',
    category: 'habilidade'
  },
  
  presenter: {
    id: 'presenter',
    title: 'Apresentador Expert',
    description: 'Completou trilha de Pitch',
    icon: '🎤',
    color: '#EC4899', // Rosa
    rarity: 'comum',
    xpBonus: 100,
    requirements: 'Complete a Trilha 5',
    category: 'habilidade'
  },

  // Medalhas de Impacto
  impact_maker: {
    id: 'impact_maker',
    title: 'Gerador de Impacto',
    description: 'Acumulou 1000 pontos de impacto',
    icon: '🌍',
    color: '#059669', // Verde escuro
    rarity: 'raro',
    xpBonus: 250,
    requirements: 'Acumule 1000 pontos de impacto',
    category: 'impacto'
  },
  
  change_catalyst: {
    id: 'change_catalyst',
    title: 'Catalisador de Mudança',
    description: 'Inspirou outros empreendedores',
    icon: '🚀',
    color: '#8B5CF6', // Roxo
    rarity: 'épico',
    xpBonus: 300,
    requirements: 'Compartilhe seu progresso',
    category: 'impacto'
  },

  // Medalhas Especiais
  early_adopter: {
    id: 'early_adopter',
    title: 'Pioneiro',
    description: 'Um dos primeiros 100 usuários do app',
    icon: '🌟',
    color: '#FFD700', // Ouro
    rarity: 'lendário',
    xpBonus: 500,
    requirements: 'Seja um dos primeiros usuários',
    category: 'especial'
  },
  
  community_leader: {
    id: 'community_leader',
    title: 'Líder da Comunidade',
    description: 'Está no top 10 do ranking geral',
    icon: '👥',
    color: '#EF4444', // Vermelho
    rarity: 'épico',
    xpBonus: 400,
    requirements: 'Fique no top 10 do ranking',
    category: 'especial'
  },
  
  innovator: {
    id: 'innovator',
    title: 'Inovador',
    description: 'Criou uma solução única e inovadora',
    icon: '💡',
    color: '#F59E0B', // Amarelo
    rarity: 'lendário',
    xpBonus: 600,
    requirements: 'Desenvolva uma solução inovadora validada',
    category: 'especial'
  },

  // Medalhas de Mini-jogos
  quiz_champion: {
    id: 'quiz_champion',
    title: 'Campeão do Quiz',
    description: 'Obteve pontuação máxima no Quiz Rápido',
    icon: '🏅',
    color: '#FFD700', // Ouro
    rarity: 'raro',
    xpBonus: 150,
    requirements: 'Pontuação máxima no Quiz Rápido',
    category: 'minigame'
  },
  
  decision_master: {
    id: 'decision_master',
    title: 'Mestre das Decisões',
    description: 'Pontuação perfeita no Desafio Empreendedor',
    icon: '🎯',
    color: '#8B5CF6', // Roxo
    rarity: 'épico',
    xpBonus: 250,
    requirements: 'Pontuação máxima no Desafio Empreendedor',
    category: 'minigame'
  },

  // Medalhas Sazonais/Eventos
  new_year_resolver: {
    id: 'new_year_resolver',
    title: 'Resolucionário',
    description: 'Completou uma trilha em Janeiro',
    icon: '🎆',
    color: '#FFD700', // Ouro
    rarity: 'especial',
    xpBonus: 200,
    requirements: 'Complete uma trilha em Janeiro',
    category: 'sazonal'
  },
  
  earth_day_hero: {
    id: 'earth_day_hero',
    title: 'Herói da Terra',
    description: 'Focou em soluções sustentáveis no Dia da Terra',
    icon: '🌱',
    color: '#059669', // Verde
    rarity: 'especial',
    xpBonus: 200,
    requirements: 'Atividade especial no Dia da Terra',
    category: 'sazonal'
  }
};

// Função para obter medalha por ID
export const getMedalById = (id) => {
  return medals[id] || null;
};

// Função para obter medalhas por categoria
export const getMedalsByCategory = (category) => {
  return Object.values(medals).filter(medal => medal.category === category);
};

// Função para obter medalhas por raridade
export const getMedalsByRarity = (rarity) => {
  return Object.values(medals).filter(medal => medal.rarity === rarity);
};

// Função para verificar se uma medalha pode ser desbloqueada
export const checkMedalEligibility = (medalId, userStats, userProgress) => {
  const medal = medals[medalId];
  if (!medal) return false;

  switch (medalId) {
    case 'first_mission':
      return userStats.totalMissionsCompleted >= 1;
    
    case 'first_trail':
      return Object.values(userProgress).filter(trail => trail.completed).length >= 1;
    
    case 'explorer':
      return Object.values(userProgress).filter(trail => trail.completed).length >= 3;
    
    case 'master':
      return Object.values(userProgress).filter(trail => trail.completed).length >= 5;
    
    case 'quiz_master':
      return userStats.quizPlayed >= 10;
    
    case 'daily_warrior':
      return userStats.consecutiveDays >= 7;
    
    case 'weekly_champion':
      return userStats.weeklyStreak >= 4;
    
    case 'unstoppable':
      return userStats.consecutiveDays >= 30;
    
    // Adicione mais lógicas conforme necessário
    default:
      return false;
  }
};

// Função para obter todas as medalhas disponíveis
export const getAllMedals = () => {
  return Object.values(medals);
};

// Função para obter cor baseada na raridade
export const getRarityColor = (rarity) => {
  const colors = {
    'comum': '#6B7280',
    'raro': '#3B82F6', 
    'épico': '#8B5CF6',
    'lendário': '#EF4444',
    'especial': '#F59E0B'
  };
  return colors[rarity] || '#6B7280';
};

export default medals;