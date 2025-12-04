import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Animated 
} from 'react-native';
import Logo from '../components/Logo';
import { missions } from '../data/missions';
import { 
  getUserStats, 
  getMissionsProgress 
} from '../utils/storage';

const MainHubScreen = ({ navigation }) => {
  const [userStats, setUserStats] = useState({ level: 1, totalXP: 0 });
  const [trilhas, setTrilhas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Carrega estatísticas do usuário
      const stats = await getUserStats();
      setUserStats(stats);
      
      // Carrega progresso das missões
      const missionsProgress = await getMissionsProgress();
      
      // Primeiro passe: calcular progresso de cada trilha
      const trilhasProgressData = Object.entries(missions).map(([key, trilha], index) => {
        const trilhaProgress = trilha.missions.map((mission, mIndex) => {
          const missionCompleted = missionsProgress[key]?.missions?.[mIndex] || false;
          return missionCompleted ? 100 : 0;
        });
        
        const avgProgress = trilhaProgress.reduce((a, b) => a + b, 0) / trilhaProgress.length;
        const completed = avgProgress === 100;
        
        return {
          id: key,
          title: trilha.title,
          description: trilha.description,
          progress: avgProgress,
          completed,
          xp: trilha.missions.reduce((total, mission) => total + (mission.xpReward || mission.xp || 200), 0),
          color: trilha.color || ['#EF4444', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6'][index % 5],
          totalMissions: trilha.missions.length,
          completedMissions: trilhaProgress.filter(p => p === 100).length
        };
      });
      
      // Segundo passe: calcular desbloqueio baseado no progresso anterior
      const trilhasData = trilhasProgressData.map((trilha, index) => {
        const unlockThreshold = 50;
        const isFirstTrilha = index === 0;
        const previousTrilhaProgress = index > 0 ? trilhasProgressData[index - 1]?.progress || 0 : 100;
        const isUnlocked = isFirstTrilha || previousTrilhaProgress >= unlockThreshold;
        const almostUnlocked = !isUnlocked && previousTrilhaProgress >= (unlockThreshold - 25);
        const progressNeededToUnlock = Math.max(0, unlockThreshold - previousTrilhaProgress);
        
        return {
          ...trilha,
          unlocked: isUnlocked,
          almostUnlocked: almostUnlocked,
          progressNeededToUnlock: progressNeededToUnlock,
        };
      });
      
      setTrilhas(trilhasData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Fallback para dados estáticos se houver erro
      setTrilhas([
        {
          id: '1',
          title: '🔍 Descubra um Problema',
          description: 'Identifique desafios do mundo real',
          progress: 0,
          unlocked: true,
          completed: false,
          xp: 200,
          color: '#EF4444'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleTrilhaPress = (trilha) => {
    if (trilha.unlocked) {
      navigation.navigate('Mission', { trilha });
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Carregando trilhas...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header com botão de voltar */}
      <View style={styles.topHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            // Evita erro quando não há tela anterior na pilha
            try {
              if (navigation && navigation.canGoBack && navigation.canGoBack()) {
                navigation.goBack();
                return;
              }
            } catch (err) {
              // Se goBack lançar, tratamos abaixo
              console.warn('goBack failed:', err);
            }

            // Fallback: navegar para a rota inicial (Splash)
            if (navigation && navigation.navigate) {
              navigation.navigate('Splash');
            }
          }}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topHeaderTitle}>Mapa de Trilhas</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Header com perfil do usuário */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>🦸‍♂️</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Jovem Empreendedor</Text>
            <Text style={styles.userLevel}>Nível {userStats.level || 1}</Text>
          </View>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Barra de XP */}
        <View style={styles.xpContainer}>
          <Text style={styles.xpText}>XP: {userStats.totalXP || 0}/{(userStats.level || 1) * 1000}</Text>
          <View style={styles.xpBar}>
            <View 
              style={[
                styles.xpProgress, 
                { width: `${((userStats.totalXP || 0) / ((userStats.level || 1) * 1000)) * 100}%` }
              ]} 
            />
          </View>
        </View>
      </View>

      {/* Mapa de Trilhas */}
      <View style={styles.mapContainer}>
        <Logo size="small" showText={false} />
        <Text style={styles.mapTitle}>🗺️ Mapa de Trilhas</Text>
        
        <View style={styles.trilhasContainer}>
          {trilhas.map((trilha, index) => (
            <View key={trilha.id} style={styles.trilhaWrapper}>
              {/* Linha conectora */}
              {index < trilhas.length - 1 && (
                <View style={styles.connectorLine} />
              )}
              
              <TouchableOpacity
                style={[
                  styles.trilhaCard,
                  { 
                    backgroundColor: trilha.unlocked ? trilha.color : '#D1D5DB',
                    opacity: trilha.unlocked ? 1 : (trilha.almostUnlocked ? 0.8 : 0.6),
                    borderColor: trilha.almostUnlocked ? trilha.color : 'transparent',
                    borderWidth: trilha.almostUnlocked ? 2 : 0
                  }
                ]}
                onPress={() => handleTrilhaPress(trilha)}
                disabled={!trilha.unlocked}
              >
                <View style={styles.trilhaHeader}>
                  <Text style={styles.trilhaTitle}>{trilha.title}</Text>
                  {trilha.completed && (
                    <Text style={styles.completedBadge}>✅</Text>
                  )}
                  {!trilha.unlocked && !trilha.almostUnlocked && (
                    <Text style={styles.lockedBadge}>🔒</Text>
                  )}
                  {trilha.almostUnlocked && (
                    <Text style={styles.almostUnlockedBadge}>⚡</Text>
                  )}
                </View>
                
                <Text style={styles.trilhaDescription}>
                  {trilha.description}
                </Text>
                
                {trilha.unlocked && (
                  <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>
                      Progresso: {trilha.progress.toFixed(0)}% ({trilha.completedMissions}/{trilha.totalMissions})
                    </Text>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { width: `${trilha.progress}%`, backgroundColor: trilha.color }
                        ]} 
                      />
                    </View>
                    <Text style={styles.xpReward}>+{trilha.xp} XP</Text>
                  </View>
                )}
                
                {!trilha.unlocked && trilha.almostUnlocked && (
                  <View style={styles.unlockedProgressContainer}>
                    <Text style={styles.unlockedProgressText}>
                      🌟 Faltam {trilha.progressNeededToUnlock.toFixed(0)}% para desbloquear!
                    </Text>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { width: `${100 - trilha.progressNeededToUnlock}%`, backgroundColor: '#F59E0B' }
                        ]} 
                      />
                    </View>
                    <Text style={styles.unlockedHintText}>Complete a trilha anterior para continuar</Text>
                  </View>
                )}
                
                {!trilha.unlocked && !trilha.almostUnlocked && (
                  <View style={styles.lockedContainer}>
                    <Text style={styles.lockedText}>
                      🔐 Desbloqueável ao completar a trilha anterior
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Seção de conquistas recentes */}
      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>🏆 Conquistas Recentes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementIcon}>🔍</Text>
            <Text style={styles.achievementText}>Explorador</Text>
          </View>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementIcon}>💡</Text>
            <Text style={styles.achievementText}>Inovador</Text>
          </View>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementIcon}>⭐</Text>
            <Text style={styles.achievementText}>Estrela</Text>
          </View>
        </ScrollView>
      </View>

      {/* Botões de navegação rápida */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('Ranking')}
        >
          <Text style={styles.quickActionIcon}>🏆</Text>
          <Text style={styles.quickActionText}>Ranking</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('Impact')}
        >
          <Text style={styles.quickActionIcon}>🌍</Text>
          <Text style={styles.quickActionText}>Impacto</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('DesafioEmpreendedor')}
        >
          <Text style={styles.quickActionIcon}>🎮</Text>
          <Text style={styles.quickActionText}>Mini-jogos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('Community')}
        >
          <Text style={styles.quickActionIcon}>👥</Text>
          <Text style={styles.quickActionText}>Comunidade</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  topHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    textAlign: 'center',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#10B981',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  avatarEmoji: {
    fontSize: 30,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  userLevel: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingsButton: {
    padding: 10,
  },
  settingsIcon: {
    fontSize: 24,
  },
  xpContainer: {
    marginBottom: 10,
  },
  xpText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 5,
  },
  xpBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpProgress: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  mapContainer: {
    padding: 20,
    alignItems: 'center',
  },
  mapTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    marginTop: 10,
  },
  trilhasContainer: {
    width: '100%',
  },
  trilhaWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  connectorLine: {
    width: 4,
    height: 30,
    backgroundColor: '#D1D5DB',
    marginBottom: 10,
  },
  trilhaCard: {
    width: '90%',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  trilhaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  trilhaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  completedBadge: {
    fontSize: 20,
  },
  lockedBadge: {
    fontSize: 20,
  },
  trilhaDescription: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginBottom: 15,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressText: {
    fontSize: 12,
    color: 'white',
    marginBottom: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  xpReward: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  unlockedProgressContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
  unlockedProgressText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  unlockedHintText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
    fontStyle: 'italic',
  },
  almostUnlockedBadge: {
    fontSize: 18,
  },
  lockedContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
  },
  lockedText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  achievementsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  achievementCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  achievementIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  achievementText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    paddingBottom: 40,
  },
  quickActionButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  quickActionText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#6B7280',
  },
});

export default MainHubScreen;