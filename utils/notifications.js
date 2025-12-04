// Sistema de notificações inteligentes e contextuais

export const NOTIFICATION_TYPES = {
  // Notificações de competição
  RANKING_CHANGE: 'ranking_change',
  FRIEND_ACHIEVEMENT: 'friend_achievement',
  LEAGUE_PROMOTION: 'league_promotion',

  // Notificações de progresso
  MILESTONE_REACHED: 'milestone_reached',
  BADGE_UNLOCKED: 'badge_unlocked',
  LEVEL_UP: 'level_up',

  // Notificações de engajamento
  DAILY_REMINDER: 'daily_reminder',
  STREAK_WARNING: 'streak_warning', // Aviso que streak vai acabar
  COMEBACK_OFFER: 'comeback_offer',

  // Notificações sociais
  FRIEND_INVITE: 'friend_invite',
  COMMUNITY_EVENT: 'community_event',
};

// Templates de notificações contextuais
export const NOTIFICATION_TEMPLATES = {
  // Ranking
  [NOTIFICATION_TYPES.RANKING_CHANGE]: {
    positionImproved: {
      title: '📈 Você subiu de posição!',
      message: 'Você passou para o 10º lugar no ranking',
      emoji: '🎉',
    },
    positionDecreased: {
      title: '📉 Um amigo te passou',
      message: 'Volte a competir e recupere sua posição',
      emoji: '⚡',
    },
  },

  [NOTIFICATION_TYPES.FRIEND_ACHIEVEMENT]: {
    badge: {
      title: '🏆 Seu amigo desbloqueou uma badge!',
      message: 'João desbloqueou "Mestre das Ideias"',
      emoji: '🎊',
    },
    levelUp: {
      title: '⭐ Um amigo subiu de nível!',
      message: 'Maria chegou ao Nível 5',
      emoji: '✨',
    },
  },

  [NOTIFICATION_TYPES.LEAGUE_PROMOTION]: {
    title: '🏅 Promoção de Liga!',
    message: 'Você foi promovido para a Liga Ouro',
    emoji: '👑',
  },

  // Progresso
  [NOTIFICATION_TYPES.MILESTONE_REACHED]: {
    hundred: {
      title: '🎯 100 XP ganhos hoje!',
      message: 'Você está em uma sequência incrível',
      emoji: '🔥',
    },
    thousand: {
      title: '💪 1000 XP totais!',
      message: 'Você é um grande empreendedor',
      emoji: '👏',
    },
  },

  [NOTIFICATION_TYPES.BADGE_UNLOCKED]: {
    title: '🎖️ Você desbloqueou uma badge rara!',
    message: 'Você é agora um "Mestre das Ideias"',
    emoji: '✨',
  },

  [NOTIFICATION_TYPES.LEVEL_UP]: {
    title: '⭐ Level Up!',
    message: 'Parabéns! Você chegou ao Nível 5 - Hacker',
    emoji: '🚀',
  },

  // Engajamento
  [NOTIFICATION_TYPES.DAILY_REMINDER]: {
    morning: {
      title: '☀️ Bom dia, Empreendedor!',
      message: 'Suas missões diárias estão esperando',
      emoji: '🌅',
    },
    afternoon: {
      title: '🌤️ Tarde!',
      message: 'Ainda falta completar 2 missões',
      emoji: '⏰',
    },
    evening: {
      title: '🌙 Última chance do dia!',
      message: 'Faltam apenas 3 horas para resetar as missões',
      emoji: '⚡',
    },
  },

  [NOTIFICATION_TYPES.STREAK_WARNING]: {
    title: '🔥 Sua sequência está em risco!',
    message: 'Complete uma missão antes das 23:59 para manter o streak',
    emoji: '⚠️',
  },

  [NOTIFICATION_TYPES.COMEBACK_OFFER]: {
    title: '👋 Sentimos sua falta!',
    message: 'Volte e ganhe 2x de XP por 3 dias',
    emoji: '🎁',
  },

  // Social
  [NOTIFICATION_TYPES.FRIEND_INVITE]: {
    title: '👥 Um amigo te convidou!',
    message: 'João quer te desafiar em um mini-jogo',
    emoji: '🎮',
  },

  [NOTIFICATION_TYPES.COMMUNITY_EVENT]: {
    title: '🌍 Evento Comunitário!',
    message: 'Semana de Inovação: colabore com 5 pessoas',
    emoji: '🎉',
  },
};

/**
 * Lógica para decidir qual notificação enviar
 * Baseado em contexto do usuário
 */
export const getSmartNotification = (userContext) => {
  const {
    level,
    totalXP,
    ranking,
    dailyMissionsCompleted,
    currentStreak,
    lastActivityTime,
    badges,
  } = userContext;

  // Se usuário não ativa a mais de 24 horas, notificação de comeback
  if (Date.now() - lastActivityTime > 86400000) {
    return {
      type: NOTIFICATION_TYPES.COMEBACK_OFFER,
      priority: 'high',
      template: NOTIFICATION_TEMPLATES[NOTIFICATION_TYPES.COMEBACK_OFFER],
    };
  }

  // Se streak está em risco (apenas 2 horas para resetar)
  if (currentStreak > 0 && shouldWarnAboutStreak(lastActivityTime)) {
    return {
      type: NOTIFICATION_TYPES.STREAK_WARNING,
      priority: 'urgent',
      template: NOTIFICATION_TEMPLATES[NOTIFICATION_TYPES.STREAK_WARNING],
    };
  }

  // Se usuario é novo e ainda não completou missões diárias
  if (level < 3 && dailyMissionsCompleted === 0 && isRightTimeForReminder()) {
    return {
      type: NOTIFICATION_TYPES.DAILY_REMINDER,
      priority: 'normal',
      template: NOTIFICATION_TEMPLATES[NOTIFICATION_TYPES.DAILY_REMINDER].morning,
    };
  }

  // Se é hora de dica de engajamento (random)
  if (Math.random() > 0.8) {
    return getEngagementTip();
  }

  return null;
};

/**
 * Dicas de engajamento personalizadas
 */
export const getEngagementTip = () => {
  const tips = [
    {
      title: '💡 Dica de Inovação',
      message: 'Combine 3 ideias diferentes para gerar inovação',
      emoji: '🧠',
      type: 'tip',
    },
    {
      title: '🎯 Desafio Diário',
      message: 'Tente completar uma missão em menos de 2 minutos',
      emoji: '⚡',
      type: 'challenge',
    },
    {
      title: '👥 Convide um Amigo',
      message: 'Colabore com amigos e ganhe bônus de XP',
      emoji: '🤝',
      type: 'social',
    },
    {
      title: '🏆 Compita!',
      message: 'Você está próximo de passar um amigo no ranking',
      emoji: '🎮',
      type: 'competitive',
    },
  ];

  return tips[Math.floor(Math.random() * tips.length)];
};

// Funções auxiliares
const shouldWarnAboutStreak = (lastActivityTime) => {
  const now = new Date();
  const lastActivity = new Date(lastActivityTime);
  const hoursSinceActivity =
    (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60);
  return hoursSinceActivity > 21; // 21+ horas = 3 horas para resetar
};

const isRightTimeForReminder = () => {
  const hour = new Date().getHours();
  // Morning: 7-9, Afternoon: 12-14, Evening: 20-22
  return (hour >= 7 && hour <= 9) || (hour >= 12 && hour <= 14) || (hour >= 20 && hour <= 22);
};

/**
 * Cronograma de notificações
 * Para usar com setInterval ou background tasks
 */
export const NOTIFICATION_SCHEDULE = {
  daily: {
    morning: { hour: 7, minute: 0 },
    afternoon: { hour: 12, minute: 0 },
    evening: { hour: 20, minute: 0 },
  },
  weeklyChallenge: {
    dayOfWeek: 1, // Monday
    hour: 10,
    minute: 0,
  },
  weeklyRanking: {
    dayOfWeek: 0, // Sunday
    hour: 19,
    minute: 0,
  },
};

/**
 * Personalizações por tipo de usuário
 */
export const USER_NOTIFICATION_PREFERENCES = {
  // Usuário casual
  casual: {
    frequency: 'low',
    types: ['DAILY_REMINDER', 'MILESTONE_REACHED', 'BADGE_UNLOCKED'],
  },
  // Usuário ativo
  active: {
    frequency: 'medium',
    types: ['RANKING_CHANGE', 'FRIEND_ACHIEVEMENT', 'STREAK_WARNING', 'DAILY_REMINDER'],
  },
  // Usuário hardcore
  hardcore: {
    frequency: 'high',
    types: [
      'RANKING_CHANGE',
      'FRIEND_ACHIEVEMENT',
      'DAILY_REMINDER',
      'STREAK_WARNING',
      'LEAGUE_PROMOTION',
      'COMMUNITY_EVENT',
    ],
  },
};
