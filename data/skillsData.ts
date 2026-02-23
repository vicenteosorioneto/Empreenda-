import { SkillTree, Skill, ClassInfo, CharacterClass } from '../types/rpg';

// 🎯 DADOS DAS SKILLS - Árvore de Habilidades

export const SKILLS_DATA: SkillTree = {
  // ==================== PITCH (Vendas e Apresentação) ====================
  pitch_basic: {
    id: 'pitch_basic',
    name: 'Pitch Básico',
    description: 'Aprenda a apresentar sua ideia de forma clara e objetiva',
    category: 'PITCH',
    emoji: '🎤',
    level: 0,
    maxLevel: 3,
    cost: 2,
    prerequisites: [],
    effects: {
      attributes: { marketing: 5, leadership: 3 },
      passive: '+10% de chance de conseguir investimento',
    },
    unlocked: false,
  },
  pitch_persuasivo: {
    id: 'pitch_persuasivo',
    name: 'Pitch Persuasivo',
    description: 'Convença investidores com storytelling poderoso',
    category: 'PITCH',
    emoji: '🎯',
    level: 0,
    maxLevel: 3,
    cost: 3,
    prerequisites: ['pitch_basic'],
    effects: {
      attributes: { marketing: 8, vision: 5 },
      passive: '+25% reputação com investidores',
    },
    unlocked: false,
  },
  pitch_elevator: {
    id: 'pitch_elevator',
    name: 'Elevator Pitch',
    description: 'Apresente sua startup em 30 segundos de forma impactante',
    category: 'PITCH',
    emoji: '⚡',
    level: 0,
    maxLevel: 2,
    cost: 2,
    prerequisites: ['pitch_basic'],
    effects: {
      attributes: { marketing: 6, leadership: 4 },
      passive: 'Desbloqueio rápido de diálogos com NPCs',
    },
    unlocked: false,
  },

  // ==================== FINANÇAS ====================
  finance_basic: {
    id: 'finance_basic',
    name: 'Gestão Financeira',
    description: 'Controle seu fluxo de caixa e evite desperdícios',
    category: 'FINANCE',
    emoji: '💰',
    level: 0,
    maxLevel: 3,
    cost: 2,
    prerequisites: [],
    effects: {
      attributes: { finance: 8, management: 4 },
      passive: '-10% despesas mensais',
    },
    unlocked: false,
  },
  finance_runway: {
    id: 'finance_runway',
    name: 'Controle de Runway',
    description: 'Gerencie seu runway e evite falência prematura',
    category: 'FINANCE',
    emoji: '📊',
    level: 0,
    maxLevel: 3,
    cost: 3,
    prerequisites: ['finance_basic'],
    effects: {
      attributes: { finance: 10, management: 6 },
      passive: '+2 meses de runway',
    },
    unlocked: false,
  },
  finance_pricing: {
    id: 'finance_pricing',
    name: 'Precificação Estratégica',
    description: 'Precifique seus produtos de forma competitiva e lucrativa',
    category: 'FINANCE',
    emoji: '💎',
    level: 0,
    maxLevel: 2,
    cost: 3,
    prerequisites: ['finance_basic'],
    effects: {
      attributes: { finance: 7, marketing: 5 },
      passive: '+15% receita mensal',
    },
    unlocked: false,
  },

  // ==================== MARKETING ====================
  marketing_digital: {
    id: 'marketing_digital',
    name: 'Marketing Digital',
    description: 'Domine redes sociais e marketing de conteúdo',
    category: 'MARKETING',
    emoji: '📱',
    level: 0,
    maxLevel: 3,
    cost: 2,
    prerequisites: [],
    effects: {
      attributes: { marketing: 10, vision: 3 },
      passive: '+20% crescimento de clientes',
    },
    unlocked: false,
  },
  marketing_growth: {
    id: 'marketing_growth',
    name: 'Growth Hacking',
    description: 'Cresça rápido com experimentos e métricas',
    category: 'MARKETING',
    emoji: '🚀',
    level: 0,
    maxLevel: 3,
    cost: 4,
    prerequisites: ['marketing_digital'],
    effects: {
      attributes: { marketing: 12, vision: 6 },
      passive: '+30% velocidade de crescimento',
    },
    unlocked: false,
  },
  marketing_brand: {
    id: 'marketing_brand',
    name: 'Construção de Marca',
    description: 'Crie uma marca forte e memorável',
    category: 'MARKETING',
    emoji: '✨',
    level: 0,
    maxLevel: 2,
    cost: 3,
    prerequisites: ['marketing_digital'],
    effects: {
      attributes: { marketing: 8, leadership: 5 },
      passive: '+20% reputação no mercado',
    },
    unlocked: false,
  },

  // ==================== LIDERANÇA ====================
  leadership_team: {
    id: 'leadership_team',
    name: 'Gestão de Equipe',
    description: 'Lidere e motive seu time de forma eficaz',
    category: 'LEADERSHIP',
    emoji: '👥',
    level: 0,
    maxLevel: 3,
    cost: 2,
    prerequisites: [],
    effects: {
      attributes: { leadership: 10, management: 5 },
      passive: '+15% produtividade da equipe',
    },
    unlocked: false,
  },
  leadership_hiring: {
    id: 'leadership_hiring',
    name: 'Recrutamento Estratégico',
    description: 'Contrate as pessoas certas no momento certo',
    category: 'LEADERSHIP',
    emoji: '🎯',
    level: 0,
    maxLevel: 2,
    cost: 3,
    prerequisites: ['leadership_team'],
    effects: {
      attributes: { leadership: 8, vision: 4 },
      passive: '-20% custo de contratação',
    },
    unlocked: false,
  },
  leadership_culture: {
    id: 'leadership_culture',
    name: 'Cultura Organizacional',
    description: 'Construa uma cultura forte e alinhada',
    category: 'LEADERSHIP',
    emoji: '🌟',
    level: 0,
    maxLevel: 3,
    cost: 4,
    prerequisites: ['leadership_team', 'leadership_hiring'],
    effects: {
      attributes: { leadership: 12, management: 6 },
      passive: '+25% retenção de talentos',
    },
    unlocked: false,
  },

  // ==================== TECNOLOGIA ====================
  tech_mvp: {
    id: 'tech_mvp',
    name: 'Desenvolvimento de MVP',
    description: 'Construa produtos mínimos viáveis rapidamente',
    category: 'TECH',
    emoji: '⚙️',
    level: 0,
    maxLevel: 3,
    cost: 2,
    prerequisites: [],
    effects: {
      attributes: { vision: 8, management: 6 },
      passive: '-30% tempo de desenvolvimento',
    },
    unlocked: false,
  },
  tech_agile: {
    id: 'tech_agile',
    name: 'Metodologia Ágil',
    description: 'Implemente Scrum e entregas iterativas',
    category: 'TECH',
    emoji: '🔄',
    level: 0,
    maxLevel: 2,
    cost: 3,
    prerequisites: ['tech_mvp'],
    effects: {
      attributes: { management: 10, leadership: 4 },
      passive: '+20% velocidade de entrega',
    },
    unlocked: false,
  },
  tech_scale: {
    id: 'tech_scale',
    name: 'Escalabilidade',
    description: 'Prepare sua infraestrutura para crescimento',
    category: 'TECH',
    emoji: '📈',
    level: 0,
    maxLevel: 3,
    cost: 4,
    prerequisites: ['tech_mvp', 'tech_agile'],
    effects: {
      attributes: { vision: 10, management: 8 },
      passive: 'Suporta 10x mais usuários',
    },
    unlocked: false,
  },
};

// ==================== INFORMAÇÕES DAS CLASSES ====================

export const CLASSES_INFO: { [key in CharacterClass]: ClassInfo } = {
  VISIONARY: {
    id: 'VISIONARY',
    name: 'Visionário',
    description: 'Enxerga oportunidades onde outros veem problemas. Foco em inovação e transformação.',
    emoji: '🔮',
    bonuses: {
      vision: 20,
      management: 5,
      marketing: 10,
      finance: 0,
      leadership: 10,
    },
    startingSkill: 'tech_mvp',
  },
  STRATEGIST: {
    id: 'STRATEGIST',
    name: 'Estrategista',
    description: 'Planeja cada passo com precisão. Foco em gestão e análise de dados.',
    emoji: '♟️',
    bonuses: {
      vision: 10,
      management: 20,
      marketing: 5,
      finance: 15,
      leadership: 5,
    },
    startingSkill: 'finance_basic',
  },
  EXECUTOR: {
    id: 'EXECUTOR',
    name: 'Executor',
    description: 'Transforma ideias em realidade rapidamente. Foco em produtividade e ação.',
    emoji: '⚡',
    bonuses: {
      vision: 5,
      management: 15,
      marketing: 10,
      finance: 10,
      leadership: 15,
    },
    startingSkill: 'leadership_team',
  },
  INNOVATOR: {
    id: 'INNOVATOR',
    name: 'Inovador',
    description: 'Cria soluções disruptivas e criativas. Foco em tecnologia e marketing.',
    emoji: '💡',
    bonuses: {
      vision: 15,
      management: 5,
      marketing: 15,
      finance: 5,
      leadership: 10,
    },
    startingSkill: 'marketing_digital',
  },
};

// Helper para obter skill tree inicial baseado na classe
export const getInitialSkillTree = (characterClass: CharacterClass): SkillTree => {
  const skillTree = { ...SKILLS_DATA };
  const classInfo = CLASSES_INFO[characterClass];

  // Desbloquear skill inicial da classe
  if (skillTree[classInfo.startingSkill]) {
    skillTree[classInfo.startingSkill].unlocked = true;
    skillTree[classInfo.startingSkill].level = 1;
  }

  return skillTree;
};
