// Sistema de temas e gradientes neon para o app
export const THEME = {
  // Gradientes neon vibrantes
  gradients: {
    // Azul → Roxo
    primary: ['#0066FF', '#7C3AED'],
    // Verde → Azul
    secondary: ['#10B981', '#3B82F6'],
    // Rosa → Roxo (para premium)
    premium: ['#EC4899', '#8B5CF6'],
    // Amarelo → Laranja (para recompensas)
    reward: ['#FCD34D', '#F97316'],
    // Ciano → Verde (para vitórias)
    victory: ['#06B6D4', '#10B981'],
    // Vermelho → Rosa (para ativações)
    activation: ['#EF4444', '#EC4899'],
  },

  // Cores sólidas para elementos específicos
  colors: {
    // Neon bright
    neonBlue: '#0066FF',
    neonPurple: '#7C3AED',
    neonGreen: '#10B981',
    neonCyan: '#06B6D4',
    neonPink: '#EC4899',
    neonYellow: '#FCD34D',
    
    // Dark backgrounds
    darkBg: '#0F172A',
    darkBgSecondary: '#1E293B',
    darkCard: '#334155',
    
    // Light backgrounds
    lightBg: '#F8FAFC',
    lightCard: '#FFFFFF',
    
    // Text
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textInverted: '#FFFFFF',
  },

  // Sombreamento com brilho neon
  shadows: {
    neonBlue: {
      shadowColor: '#0066FF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 15,
      elevation: 15,
    },
    neonPurple: {
      shadowColor: '#7C3AED',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 15,
      elevation: 15,
    },
    neonGreen: {
      shadowColor: '#10B981',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 15,
      elevation: 15,
    },
    neonPink: {
      shadowColor: '#EC4899',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 15,
      elevation: 15,
    },
    standard: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 5,
    },
  },

  // Espaçamento
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  // Border radius
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    round: 9999,
  },

  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  // Font weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
};

// Níveis com nomes temáticos
export const LEVEL_TIERS = [
  { level: 1, name: 'Novato', emoji: '🌱', color: THEME.colors.neonGreen, minXP: 0 },
  { level: 2, name: 'Aprendiz', emoji: '📚', color: THEME.colors.neonCyan, minXP: 1000 },
  { level: 3, name: 'Técnico', emoji: '⚙️', color: THEME.colors.neonBlue, minXP: 3000 },
  { level: 4, name: 'Especialista', emoji: '🎯', color: THEME.colors.neonPurple, minXP: 6000 },
  { level: 5, name: 'Hacker', emoji: '💻', color: THEME.colors.neonPink, minXP: 10000 },
  { level: 6, name: 'Visionário', emoji: '🔮', color: THEME.colors.neonYellow, minXP: 15000 },
  { level: 7, name: 'Fundador', emoji: '🏛️', color: '#FF6B35', minXP: 25000 },
  { level: 8, name: 'Lenda', emoji: '⭐', color: '#FFD700', minXP: 40000 },
  { level: 9, name: 'Unicórnio', emoji: '🦄', color: '#FF1493', minXP: 60000 },
];

// Badges raros com descrições
export const RARE_BADGES = {
  innovationLegend: {
    id: 'innovation_legend',
    name: '🔥 Lenda da Inovação',
    description: 'Completou todas as trilhas em tempo record',
    rarity: 'legendary',
    icon: '🔥',
    color: THEME.colors.neonPink,
  },
  ideaMaster: {
    id: 'idea_master',
    name: '💡 Mestre das Ideias',
    description: 'Criou 10 ideias inovadoras',
    rarity: 'rare',
    icon: '💡',
    color: THEME.colors.neonYellow,
  },
  streakWarrior: {
    id: 'streak_warrior',
    name: '🔥 Guerreiro de Sequência',
    description: 'Manteve 7 dias de missões diárias completas',
    rarity: 'rare',
    icon: '🔥',
    color: '#FF6B35',
  },
  impactMaker: {
    id: 'impact_maker',
    name: '🌍 Criador de Impacto',
    description: 'Alcançou 100K de impacto social',
    rarity: 'legendary',
    icon: '🌍',
    color: THEME.colors.neonGreen,
  },
  speedRunner: {
    id: 'speed_runner',
    name: '⚡ Corredor de Velocidade',
    description: 'Completou 5 missões em 1 minuto',
    rarity: 'epic',
    icon: '⚡',
    color: THEME.colors.neonCyan,
  },
  communityBuilder: {
    id: 'community_builder',
    name: '👥 Construtor de Comunidade',
    description: 'Influenciou 50 amigos a se juntarem',
    rarity: 'legendary',
    icon: '👥',
    color: THEME.colors.neonPurple,
  },
};
