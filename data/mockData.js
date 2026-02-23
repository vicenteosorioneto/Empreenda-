// Script para Popular Dados Mock Realistas para Demonstração
// Execute este arquivo no console do app para criar dados de exemplo

import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================
// DADOS DO USUÁRIO DEMO
// ============================================
export const DEMO_USER = {
  id: 'demo_user_001',
  name: 'Maria Silva',
  email: 'maria.demo@empreenda.app',
  userType: 'student',
  school: 'Escola Estadual do Futuro',
  class: '3º Ano A',
  avatar: {
    hair: 'colorido',
    outfit: 'tech',
    accessory: 'oculos',
    background: 'cidade'
  },
  level: 5,
  totalXP: 5500,
  currentStreak: 12,
  maxStreak: 15,
  joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias atrás
  lastActiveDate: new Date().toISOString(),
  
  // Progresso nas trilhas
  trilhasProgress: {
    trilha1: {
      id: 'trilha1',
      completed: true,
      progress: 100,
      xpEarned: 800,
      completedMissions: [0, 1, 2, 3],
      lastAccess: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    trilha2: {
      id: 'trilha2',
      completed: true,
      progress: 100,
      xpEarned: 750,
      completedMissions: [0, 1, 2, 3],
      lastAccess: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    trilha3: {
      id: 'trilha3',
      completed: false,
      progress: 60,
      xpEarned: 450,
      completedMissions: [0, 1],
      lastAccess: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    trilha4: {
      id: 'trilha4',
      completed: false,
      progress: 30,
      xpEarned: 200,
      completedMissions: [0],
      lastAccess: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    trilha5: {
      id: 'trilha5',
      completed: false,
      progress: 0,
      xpEarned: 0,
      completedMissions: [],
      lastAccess: null
    }
  },
  
  // Medalhas conquistadas
  badges: [
    { id: 'explorador', earnedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), rarity: 'bronze' },
    { id: 'inovador', earnedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), rarity: 'prata' },
    { id: 'lider_parcial', earnedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), rarity: 'bronze' },
    { id: 'velocidade', earnedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), rarity: 'ouro' },
    { id: 'sustentabilidade', earnedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), rarity: 'prata' },
    { id: 'dedicacao_7dias', earnedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), rarity: 'ouro' },
    { id: 'quiz_master', earnedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), rarity: 'prata' },
    { id: 'roda_vencedor', earnedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), rarity: 'bronze' }
  ],
  
  // Estatísticas de mini-jogos
  minigamesStats: {
    totalPlayed: 25,
    innovationWheel: {
      played: 10,
      wins: 7,
      bestStreak: 4,
      totalXP: 650
    },
    quizRapido: {
      played: 12,
      correctAnswers: 89,
      totalQuestions: 120,
      averageTime: 8.5,
      bestScore: 950,
      totalXP: 1200
    },
    desafioEmpreendedor: {
      played: 3,
      completed: 2,
      bestDecisions: 15,
      totalXP: 400
    }
  },
  
  // Histórico de atividades (últimas 20)
  activityHistory: [
    { type: 'login', date: new Date().toISOString(), xp: 50 },
    { type: 'quiz', date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), xp: 80 },
    { type: 'mission_complete', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), xp: 250, mission: 'trilha3_missao2' },
    { type: 'badge_earned', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), badge: 'roda_vencedor' },
    { type: 'minigame', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), xp: 120, game: 'innovation_wheel' },
    { type: 'streak_bonus', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), xp: 200 },
    { type: 'mission_complete', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), xp: 200, mission: 'trilha3_missao1' },
    { type: 'level_up', date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), level: 5 },
    { type: 'badge_earned', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), badge: 'dedicacao_7dias' },
    { type: 'quiz', date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), xp: 95 }
  ]
};

// ============================================
// DADOS DE RANKING MOCK (15 usuários)
// ============================================
export const MOCK_RANKING = [
  { 
    id: 'user_001', 
    name: 'João Pedro', 
    level: 8, 
    totalXP: 45000, 
    avatar: { hair: 'moicano', outfit: 'esportiva', accessory: 'bone', background: 'tech' },
    badges: 15,
    streak: 45
  },
  { 
    id: 'user_002', 
    name: 'Ana Clara', 
    level: 7, 
    totalXP: 32000, 
    avatar: { hair: 'longo', outfit: 'criativa', accessory: 'fone', background: 'natureza' },
    badges: 12,
    streak: 30
  },
  { 
    id: 'user_003', 
    name: 'Lucas Santos', 
    level: 7, 
    totalXP: 28000, 
    avatar: { hair: 'curto', outfit: 'casual', accessory: 'oculos', background: 'cidade' },
    badges: 11,
    streak: 22
  },
  { 
    id: 'user_004', 
    name: 'Beatriz Lima', 
    level: 6, 
    totalXP: 18000, 
    avatar: { hair: 'colorido', outfit: 'tech', accessory: 'mochila', background: 'tech' },
    badges: 10,
    streak: 18
  },
  { 
    id: 'user_005', 
    name: 'Pedro Henrique', 
    level: 6, 
    totalXP: 15000, 
    avatar: { hair: 'afro', outfit: 'streetwear', accessory: 'relogio', background: 'cidade' },
    badges: 9,
    streak: 25
  },
  { 
    id: 'user_006', 
    name: 'Juliana Costa', 
    level: 5, 
    totalXP: 9000, 
    avatar: { hair: 'longo', outfit: 'formal', accessory: 'fone', background: 'natureza' },
    badges: 8,
    streak: 14
  },
  { 
    id: 'user_007', 
    name: 'Rafael Souza', 
    level: 5, 
    totalXP: 7500, 
    avatar: { hair: 'curto', outfit: 'executiva', accessory: 'oculos', background: 'tech' },
    badges: 7,
    streak: 10
  },
  { 
    id: 'demo_user_001', 
    name: 'Maria Silva', 
    level: 5, 
    totalXP: 5500, 
    avatar: { hair: 'colorido', outfit: 'tech', accessory: 'oculos', background: 'cidade' },
    badges: 8,
    streak: 12
  },
  { 
    id: 'user_009', 
    name: 'Carlos Eduardo', 
    level: 4, 
    totalXP: 4200, 
    avatar: { hair: 'moicano', outfit: 'casual', accessory: 'bone', background: 'cidade' },
    badges: 6,
    streak: 8
  },
  { 
    id: 'user_010', 
    name: 'Fernanda Dias', 
    level: 4, 
    totalXP: 3800, 
    avatar: { hair: 'longo', outfit: 'criativa', accessory: 'mochila', background: 'natureza' },
    badges: 5,
    streak: 7
  },
  { 
    id: 'user_011', 
    name: 'Gabriel Alves', 
    level: 3, 
    totalXP: 2100, 
    avatar: { hair: 'curto', outfit: 'esportiva', accessory: 'fone', background: 'tech' },
    badges: 4,
    streak: 5
  },
  { 
    id: 'user_012', 
    name: 'Isabela Rocha', 
    level: 3, 
    totalXP: 1800, 
    avatar: { hair: 'colorido', outfit: 'streetwear', accessory: 'oculos', background: 'cidade' },
    badges: 3,
    streak: 4
  },
  { 
    id: 'user_013', 
    name: 'Thiago Martins', 
    level: 2, 
    totalXP: 900, 
    avatar: { hair: 'afro', outfit: 'casual', accessory: 'relogio', background: 'natureza' },
    badges: 2,
    streak: 3
  },
  { 
    id: 'user_014', 
    name: 'Larissa Nunes', 
    level: 2, 
    totalXP: 600, 
    avatar: { hair: 'longo', outfit: 'formal', accessory: 'mochila', background: 'tech' },
    badges: 2,
    streak: 2
  },
  { 
    id: 'user_015', 
    name: 'Mateus Silva', 
    level: 1, 
    totalXP: 150, 
    avatar: { hair: 'curto', outfit: 'casual', accessory: '', background: 'cidade' },
    badges: 1,
    streak: 1
  }
];

// ============================================
// FUNÇÃO PARA POPULAR DADOS
// ============================================
export async function populateDemoData() {
  try {
    console.log('🚀 Iniciando população de dados mock...');
    
    // 1. Salvar dados do usuário
    await AsyncStorage.setItem('userStats', JSON.stringify({
      level: DEMO_USER.level,
      totalXP: DEMO_USER.totalXP,
      currentStreak: DEMO_USER.currentStreak,
      maxStreak: DEMO_USER.maxStreak,
      equippedItems: DEMO_USER.avatar
    }));
    console.log('✅ Stats do usuário salvos');
    
    // 2. Salvar perfil do usuário
    await AsyncStorage.setItem('userProfile', JSON.stringify({
      id: DEMO_USER.id,
      name: DEMO_USER.name,
      email: DEMO_USER.email,
      userType: DEMO_USER.userType,
      school: DEMO_USER.school,
      class: DEMO_USER.class,
      joinDate: DEMO_USER.joinDate,
      lastActiveDate: DEMO_USER.lastActiveDate
    }));
    console.log('✅ Perfil do usuário salvo');
    
    // 3. Salvar progresso das trilhas
    await AsyncStorage.setItem('missionsProgress', JSON.stringify(DEMO_USER.trilhasProgress));
    console.log('✅ Progresso das trilhas salvo');
    
    // 4. Salvar medalhas
    await AsyncStorage.setItem('badges', JSON.stringify(DEMO_USER.badges));
    console.log('✅ Medalhas salvas');
    
    // 5. Salvar avatar customizado
    await AsyncStorage.setItem('avatarEquipment', JSON.stringify(DEMO_USER.avatar));
    console.log('✅ Avatar customizado salvo');
    
    // 6. Salvar dados de mini-jogos
    await AsyncStorage.setItem('minigamesStats', JSON.stringify(DEMO_USER.minigamesStats));
    console.log('✅ Stats de mini-jogos salvos');
    
    // 7. Salvar histórico de atividades
    await AsyncStorage.setItem('activityHistory', JSON.stringify(DEMO_USER.activityHistory));
    console.log('✅ Histórico de atividades salvo');
    
    // 8. Salvar ranking
    await AsyncStorage.setItem('ranking', JSON.stringify(MOCK_RANKING));
    console.log('✅ Ranking salvo (15 usuários)');
    
    // 9. Salvar streak
    await AsyncStorage.setItem('currentStreak', String(DEMO_USER.currentStreak));
    await AsyncStorage.setItem('lastActiveDate', new Date().toISOString().split('T')[0]);
    console.log('✅ Streak configurado');
    
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 DADOS MOCK POPULADOS COM SUCESSO!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('📊 Resumo:');
    console.log(`  • Usuário: ${DEMO_USER.name}`);
    console.log(`  • Nível: ${DEMO_USER.level}`);
    console.log(`  • XP Total: ${DEMO_USER.totalXP}`);
    console.log(`  • Streak: ${DEMO_USER.currentStreak} dias`);
    console.log(`  • Trilhas completas: 2 de 5`);
    console.log(`  • Medalhas: ${DEMO_USER.badges.length}`);
    console.log(`  • Ranking: #8 de 15`);
    console.log('');
    console.log('🔄 Reinicie o app para ver os dados!');
    
    return {
      success: true,
      user: DEMO_USER,
      ranking: MOCK_RANKING
    };
    
  } catch (error) {
    console.error('❌ Erro ao popular dados:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================
// FUNÇÃO PARA LIMPAR DADOS (RESET)
// ============================================
export async function clearAllData() {
  try {
    console.log('🗑️  Limpando todos os dados...');
    
    const keys = [
      'userStats',
      'userProfile',
      'missionsProgress',
      'badges',
      'avatarEquipment',
      'minigamesStats',
      'activityHistory',
      'ranking',
      'currentStreak',
      'lastActiveDate'
    ];
    
    await AsyncStorage.multiRemove(keys);
    
    console.log('✅ Todos os dados foram limpos!');
    console.log('🔄 Reinicie o app para começar do zero.');
    
    return { success: true };
    
  } catch (error) {
    console.error('❌ Erro ao limpar dados:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// FUNÇÃO PARA VISUALIZAR DADOS ATUAIS
// ============================================
export async function showCurrentData() {
  try {
    const userStats = await AsyncStorage.getItem('userStats');
    const userProfile = await AsyncStorage.getItem('userProfile');
    const badges = await AsyncStorage.getItem('badges');
    const ranking = await AsyncStorage.getItem('ranking');
    
    console.log('📊 DADOS ATUAIS DO APP:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('User Stats:', userStats ? JSON.parse(userStats) : 'Não encontrado');
    console.log('User Profile:', userProfile ? JSON.parse(userProfile) : 'Não encontrado');
    console.log('Badges:', badges ? JSON.parse(badges).length : 0);
    console.log('Ranking:', ranking ? JSON.parse(ranking).length + ' usuários' : 'Não encontrado');
    
    return {
      userStats: userStats ? JSON.parse(userStats) : null,
      userProfile: userProfile ? JSON.parse(userProfile) : null,
      badges: badges ? JSON.parse(badges) : [],
      ranking: ranking ? JSON.parse(ranking) : []
    };
    
  } catch (error) {
    console.error('❌ Erro ao visualizar dados:', error);
    return null;
  }
}

// ============================================
// EXPORTAR TUDO
// ============================================
export default {
  DEMO_USER,
  MOCK_RANKING,
  populateDemoData,
  clearAllData,
  showCurrentData
};

// ============================================
// COMO USAR:
// ============================================
/*

1. POPULAR DADOS DEMO:
   import { populateDemoData } from './data/mockData';
   populateDemoData();

2. LIMPAR TODOS OS DADOS:
   import { clearAllData } from './data/mockData';
   clearAllData();

3. VER DADOS ATUAIS:
   import { showCurrentData } from './data/mockData';
   showCurrentData();

4. USAR NO DEBUGSCREEN:
   - Adicione botões para executar essas funções
   - Útil para resetar demo rapidamente

*/
