import AsyncStorage from '@react-native-async-storage/async-storage';

// Função genérica para salvar dados
export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    return false;
  }
};

// Função genérica para recuperar dados
export const getData = async (key) => {
  try {
    const result = await AsyncStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  } catch (error) {
    console.error('Erro ao recuperar dados:', error);
    return null;
  }
};

// Função para limpar todos os dados (reset)
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
    return false;
  }
};

// Funções específicas para dados do usuário
export const saveUserData = async (userData) => {
  return await saveData('userData', userData);
};

export const getUserData = async () => {
  return await getData('userData');
};

// Funções específicas para progresso das missões
export const saveMissionsProgress = async (progress) => {
  return await saveData('missionsProgress', progress);
};

export const getMissionsProgress = async () => {
  const defaultProgress = {
    trilha1: { completed: false, missions: [false, false, false] },
    trilha2: { completed: false, missions: [false, false, false] },
    trilha3: { completed: false, missions: [false, false, false] },
    trilha4: { completed: false, missions: [false, false, false] },
    trilha5: { completed: false, missions: [false, false, false] }
  };
  
  const saved = await getData('missionsProgress');
  return saved || defaultProgress;
};

// Funções específicas para medalhas desbloqueadas
export const saveMedalsUnlocked = async (medals) => {
  return await saveData('medalsUnlocked', medals);
};

export const getMedalsUnlocked = async () => {
  const saved = await getData('medalsUnlocked');
  return saved || [];
};

// Alias para compatibilidade
export const getUserMedals = async () => {
  return await getMedalsUnlocked();
};

// Funções específicas para configurações
export const saveSettings = async (settings) => {
  return await saveData('settings', settings);
};

export const getSettings = async () => {
  const defaultSettings = {
    darkMode: false,
    sound: true,
    vibration: true,
    notifications: true
  };
  
  const saved = await getData('settings');
  return saved || defaultSettings;
};

// Função para salvar estatísticas do usuário
export const saveUserStats = async (stats) => {
  return await saveData('userStats', stats);
};

export const getUserStats = async () => {
  const defaultStats = {
    totalXP: 0,
    level: 1,
    quizPlayed: 0,
    daysActive: 0,
    lastActiveDate: null,
    totalMissionsCompleted: 0,
    averageQuizScore: 0
  };
  
  const saved = await getData('userStats');
  return saved || defaultStats;
};

// Função utilitária para calcular nível baseado no XP
export const calculateLevel = (totalXP) => {
  return Math.floor(totalXP / 200) + 1;
};

// Função para adicionar XP e atualizar nível
export const addXP = async (xpToAdd) => {
  try {
    const currentStats = await getUserStats();
    const newTotalXP = currentStats.totalXP + xpToAdd;
    const newLevel = calculateLevel(newTotalXP);
    
    const updatedStats = {
      ...currentStats,
      totalXP: newTotalXP,
      level: newLevel
    };
    
    await saveUserStats(updatedStats);
    return {
      newXP: newTotalXP,
      newLevel: newLevel,
      levelUp: newLevel > currentStats.level
    };
  } catch (error) {
    console.error('Erro ao adicionar XP:', error);
    return null;
  }
};

// Função para marcar missão como concluída
export const completeMission = async (missionId, response = null) => {
  try {
    const progress = await getMissionsProgress();
    
    // Parse missionId para extrair trilhaId e missionIndex
    // Formato esperado: "trilha1_0", "trilha2_1", etc
    const parts = missionId.split('_');
    const trilhaId = parts.slice(0, -1).join('_'); // Em caso de IDs com underscore
    const missionIndex = parseInt(parts[parts.length - 1]);
    
    // Inicializa a estrutura se não existir
    if (!progress[trilhaId]) {
      progress[trilhaId] = {
        completed: false,
        missions: []
      };
    }
    
    if (!progress[trilhaId].missions) {
      progress[trilhaId].missions = [];
    }
    
    // Marca a missão como completa
    progress[trilhaId].missions[missionIndex] = true;
    
    // Verifica se a trilha foi completada (todas as missões feitas)
    const totalMissions = progress[trilhaId].missions.length;
    const completedMissions = progress[trilhaId].missions.filter(m => m === true).length;
    const allMissionsCompleted = completedMissions === totalMissions && totalMissions > 0;
    
    if (allMissionsCompleted) {
      progress[trilhaId].completed = true;
    }
    
    await saveMissionsProgress(progress);
    return progress;
  } catch (error) {
    console.error('Erro ao completar missão:', error);
    throw error; // Relança o erro para o caller tratar
  }
};

// Função para desbloquear medalha
export const unlockMedal = async (medalId) => {
  try {
    const currentMedals = await getMedalsUnlocked();
    if (!currentMedals.includes(medalId)) {
      currentMedals.push(medalId);
      await saveMedalsUnlocked(currentMedals);
    }
    return currentMedals;
  } catch (error) {
    console.error('Erro ao desbloquear medalha:', error);
    return null;
  }
};

// Função para verificar e conceder medalhas automáticas
export const checkAndAwardMedals = async () => {
  try {
    const stats = await getUserStats();
    const progress = await getMissionsProgress();
    const currentMedals = await getMedalsUnlocked();
    
    const newMedals = [];
    
    // Medalha de primeira missão
    if (stats.totalMissionsCompleted >= 1 && !currentMedals.includes('first_mission')) {
      newMedals.push('first_mission');
    }
    
    // Medalha de primeira trilha completa
    const completedTrilhas = Object.values(progress).filter(trilha => trilha.completed).length;
    if (completedTrilhas >= 1 && !currentMedals.includes('first_trail')) {
      newMedals.push('first_trail');
    }
    
    // Medalha de explorador (3 trilhas)
    if (completedTrilhas >= 3 && !currentMedals.includes('explorer')) {
      newMedals.push('explorer');
    }
    
    // Medalha de mestre (todas as trilhas)
    if (completedTrilhas >= 5 && !currentMedals.includes('master')) {
      newMedals.push('master');
    }
    
    // Medalha de quiz master (10 quizzes)
    if (stats.quizPlayed >= 10 && !currentMedals.includes('quiz_master')) {
      newMedals.push('quiz_master');
    }
    
    // Adiciona novas medalhas
    for (const medal of newMedals) {
      await unlockMedal(medal);
    }
    
    return newMedals;
  } catch (error) {
    console.error('Erro ao verificar medalhas:', error);
    return [];
  }
};