import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME, LEVEL_TIERS } from '../utils/theme';
import { 
  BounceView, 
  PulsingCard, 
  AnimatedXPBar, 
  RotatingBadge 
} from '../components/AnimationComponents';
import {
  FeedbackOverlay,
  ToastNotification,
} from '../components/FeedbackComponents';
import { AvatarRenderer } from '../components/AvatarEvolution';
import { missions } from '../data/missions';
import { getUserStats, getMissionsProgress } from '../utils/storage';

const MainHubScreenNeon = ({ navigation }) => {
  const [userStats, setUserStats] = useState({ 
    level: 1, 
    totalXP: 0,
    equippedItems: {},
  });
  const [trilhas, setTrilhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [streak, setStreak] = useState(0);

  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const floatAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadUserData();
    startFloatingAnimation();
  }, []);

  const startFloatingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnimation, {
          toValue: 10,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnimation, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const loadUserData = async () => {
    try {
      setLoading(true);
      const stats = await getUserStats();
      setUserStats(stats);

      const missionsProgress = await getMissionsProgress();
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
          xp: trilha.missions.reduce((total, mission) => total + (mission.xpReward || 200), 0),
          color: trilha.color || THEME.gradients.primary,
          totalMissions: trilha.missions.length,
          completedMissions: trilhaProgress.filter(p => p === 100).length,
        };
      });

      const trilhasData = trilhasProgressData.map((trilha, index) => {
        const unlockThreshold = 50;
        const isFirstTrilha = index === 0;
        const previousProgress = index > 0 ? trilhasProgressData[index - 1]?.progress : 100;
        const isUnlocked = isFirstTrilha || previousProgress >= unlockThreshold;
        const almostUnlocked = !isUnlocked && previousProgress >= 25;
        const progressNeeded = Math.max(0, unlockThreshold - previousProgress);

        return {
          ...trilha,
          unlocked: isUnlocked,
          almostUnlocked,
          progressNeededToUnlock: progressNeeded,
        };
      });

      setTrilhas(trilhasData);
      setStreak(Math.floor(Math.random() * 7) + 1); // Mock streak
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTrilhaPress = (trilha) => {
    if (trilha.unlocked) {
      setFeedbackVisible(true);
      setTimeout(() => {
        navigation.navigate('Mission', { trilha });
      }, 500);
    }
  };

  const currentLevel = LEVEL_TIERS.find(t => t.level === userStats.level) || LEVEL_TIERS[0];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Animated.View style={{ transform: [{ translateY: floatAnimation }] }}>
          <RotatingBadge emoji="🚀" size={60} />
        </Animated.View>
        <Text style={styles.loadingText}>Carregando sua jornada...</Text>
      </View>
    );
  }

  const maxXP = currentLevel.level * 1000;
  const progressPercent = Math.min((userStats.totalXP / maxXP) * 100, 100);

  return (
    <ScrollView style={styles.container}>
      <FeedbackOverlay
        visible={feedbackVisible}
        type="success"
        message="Excelente! 🎯"
        submessage="Prepare-se para o desafio"
        duration={1500}
      />

      <ToastNotification
        visible={toastVisible && streak > 0}
        title={`🔥 Sequência de ${streak} dias!`}
        message="Continue assim para desbloquear recompensas"
        type="achievement"
      />

      {/* Hero Section com Gradiente */}
      <LinearGradient
        colors={THEME.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroSection}
      >
        <View style={styles.heroContent}>
          {/* Avatar com Aura */}
          <Animated.View
            style={{
              transform: [{ translateY: floatAnimation }],
            }}
          >
            <AvatarRenderer
              level={userStats.level}
              equippedItems={userStats.equippedItems}
              size="large"
            />
          </Animated.View>

          {/* Nível e Título */}
          <View style={styles.userHeaderInfo}>
            <Text style={styles.userName}>Jovem Empreendedor</Text>
            <Text style={styles.userLevelTitle}>
              {currentLevel.emoji} {currentLevel.name}
            </Text>
            <Text style={styles.userLevelNumber}>Nível {userStats.level}</Text>
          </View>

          {/* Streak Indicator */}
          {streak > 0 && (
            <View style={styles.streakBadge}>
              <Text style={styles.streakIcon}>🔥</Text>
              <Text style={styles.streakText}>{streak} dias</Text>
            </View>
          )}
        </View>

        {/* XP Bar Animada */}
        <View style={styles.xpSection}>
          <View style={styles.xpHeader}>
            <Text style={styles.xpLabel}>Experiência</Text>
            <Text style={styles.xpValue}>
              {userStats.totalXP}/{maxXP}
            </Text>
          </View>
          <AnimatedXPBar
            currentXP={userStats.totalXP}
            maxXP={maxXP}
            duration={1000}
          />
          <Text style={styles.nextLevelText}>
            {maxXP - userStats.totalXP} XP para próximo nível
          </Text>
        </View>
      </LinearGradient>

      {/* Seção de Missões Diárias */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>📅 Atividades</Text>
          <TouchableOpacity style={styles.sectionButton}>
            <Text style={styles.sectionButtonText}>Ver Tudo →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dailyMissionsScroll}
        >
          <BounceView trigger={false}>
            <TouchableOpacity onPress={() => navigation.navigate('QuizGame')}>
              <LinearGradient
                colors={[THEME.colors.neonBlue, THEME.colors.neonPurple]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.dailyMissionCard}
              >
                <Text style={styles.dailyMissionEmoji}>🧠</Text>
                <Text style={styles.dailyMissionText}>Quiz</Text>
                <Text style={styles.dailyMissionXP}>+150 XP</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BounceView>
          
          <BounceView trigger={false}>
            <TouchableOpacity onPress={() => navigation.navigate('Ideas')}>
              <LinearGradient
                colors={['#f093fb', '#f5576c']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.dailyMissionCard}
              >
                <Text style={styles.dailyMissionEmoji}>💡</Text>
                <Text style={styles.dailyMissionText}>Ideias</Text>
                <Text style={styles.dailyMissionXP}>Criar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BounceView>
          
          <BounceView trigger={false}>
            <TouchableOpacity onPress={() => navigation.navigate('Challenge')}>
              <LinearGradient
                colors={['#43e97b', '#38f9d7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.dailyMissionCard}
              >
                <Text style={styles.dailyMissionEmoji}>🎯</Text>
                <Text style={styles.dailyMissionText}>Desafio</Text>
                <Text style={styles.dailyMissionXP}>15 min</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BounceView>

          <BounceView trigger={false}>
            <TouchableOpacity onPress={() => navigation.navigate('DesafioEmpreendedor')}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.dailyMissionCard}
              >
                <Text style={styles.dailyMissionEmoji}>⚡</Text>
                <Text style={styles.dailyMissionText}>Empreendedor</Text>
                <Text style={styles.dailyMissionXP}>+200 XP</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BounceView>

          <BounceView trigger={false}>
            <TouchableOpacity onPress={() => navigation.navigate('InnovationWheel')}>
              <LinearGradient
                colors={['#4facfe', '#00f2fe']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.dailyMissionCard}
              >
                <Text style={styles.dailyMissionEmoji}>🎡</Text>
                <Text style={styles.dailyMissionText}>Roda Inovação</Text>
                <Text style={styles.dailyMissionXP}>+150 XP</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BounceView>

          <BounceView trigger={false}>
            <TouchableOpacity onPress={() => navigation.navigate('QuizRapido')}>
              <LinearGradient
                colors={['#fa709a', '#fee140']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.dailyMissionCard}
              >
                <Text style={styles.dailyMissionEmoji}>⚡</Text>
                <Text style={styles.dailyMissionText}>Quiz Rápido</Text>
                <Text style={styles.dailyMissionXP}>+100 XP</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BounceView>
        </ScrollView>
      </View>

      {/* Mapa de Trilhas com Efeito Brilhante */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🗺️ Mapa de Trilhas</Text>

        <View style={styles.trilhasContainer}>
          {trilhas.map((trilha, index) => (
            <View key={trilha.id} style={styles.trilhaWrapper}>
              {index < trilhas.length - 1 && trilha.unlocked && (
                <View style={styles.connectorLine} />
              )}

              <TouchableOpacity
                style={[
                  styles.trilhaCardNeon,
                  {
                    opacity: trilha.unlocked ? 1 : 0.6,
                    borderColor: trilha.unlocked ? trilha.color : '#999',
                  },
                ]}
                onPress={() => handleTrilhaPress(trilha)}
                disabled={!trilha.unlocked}
              >
                {console.log('Trilha colors for', trilha.id, trilha.color)}
                <LinearGradient
                  colors={
                    trilha.unlocked
                      ? [trilha.color + '20', trilha.color + '10']
                      : ['#ccc', '#999']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />

                <View style={styles.trilhaHeader}>
                  <Text style={styles.trilhaTitle}>{trilha.title}</Text>
                  {trilha.completed && <RotatingBadge emoji="✅" size={24} />}
                  {!trilha.unlocked && <Text style={styles.lockIcon}>🔒</Text>}
                  {trilha.almostUnlocked && <Text style={styles.almostIcon}>⚡</Text>}
                </View>

                <Text style={styles.trilhaDescription}>{trilha.description}</Text>

                {trilha.unlocked && (
                  <View style={styles.trilhaProgress}>
                    <View style={[styles.progressBarSmall, { borderColor: trilha.color }]}>
                      <View
                        style={[
                          styles.progressFillSmall,
                          { width: `${trilha.progress}%`, backgroundColor: trilha.color },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {trilha.completedMissions}/{trilha.totalMissions}
                    </Text>
                    <Text style={styles.xpReward}>+{trilha.xp} XP</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Mini-Jogos Quick Access */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎮 Mini-Jogos Rápidos</Text>
        <View style={styles.miniGamesGrid}>
          {[
            { name: 'Roda', emoji: '🎡', color: THEME.gradients.primary },
            { name: 'Cores', emoji: '🎨', color: THEME.gradients.secondary },
            { name: 'Sprint', emoji: '⚡', color: THEME.gradients.reward },
            { name: 'Batalha', emoji: '⚔️', color: THEME.gradients.victory },
          ].map((game, i) => (
            <LinearGradient
              key={i}
              colors={game.color}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.miniGameCard}
            >
              <TouchableOpacity style={styles.miniGameButton}>
                <Text style={styles.miniGameEmoji}>{game.emoji}</Text>
                <Text style={styles.miniGameName}>{game.name}</Text>
              </TouchableOpacity>
            </LinearGradient>
          ))}
        </View>
      </View>

      {/* Botões de Navegação */}
      <View style={styles.navButtonsSection}>
        <TouchableOpacity
          style={[styles.navButton, { borderColor: THEME.colors.neonGreen }]}
          onPress={() => navigation.navigate('Ranking')}
        >
          <Text style={styles.navButtonEmoji}>🏆</Text>
          <Text style={styles.navButtonText}>Ranking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, { borderColor: THEME.colors.neonCyan }]}
          onPress={() => navigation.navigate('Impact')}
        >
          <Text style={styles.navButtonEmoji}>🌍</Text>
          <Text style={styles.navButtonText}>Impacto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, { borderColor: THEME.colors.neonPurple }]}
          onPress={() => navigation.navigate('Conquistas')}
        >
          <Text style={styles.navButtonEmoji}>🎖️</Text>
          <Text style={styles.navButtonText}>Conquistas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, { borderColor: THEME.colors.neonPink }]}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.navButtonEmoji}>⚙️</Text>
          <Text style={styles.navButtonText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.darkBg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.darkBg,
  },
  loadingText: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.lg,
    marginTop: THEME.spacing.xl,
    fontWeight: THEME.fontWeight.bold,
  },

  // Hero Section
  heroSection: {
    paddingVertical: THEME.spacing.xxl,
    paddingHorizontal: THEME.spacing.lg,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    marginBottom: THEME.spacing.xl,
  },
  userHeaderInfo: {
    alignItems: 'center',
    marginTop: THEME.spacing.lg,
  },
  userName: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.base,
    fontWeight: THEME.fontWeight.semibold,
  },
  userLevelTitle: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
    marginTop: THEME.spacing.sm,
  },
  userLevelNumber: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: THEME.fontSize.sm,
    marginTop: THEME.spacing.xs,
  },
  streakBadge: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.round,
    marginTop: THEME.spacing.lg,
    alignItems: 'center',
  },
  streakIcon: {
    fontSize: 16,
    marginRight: THEME.spacing.sm,
  },
  streakText: {
    color: THEME.colors.textInverted,
    fontWeight: THEME.fontWeight.bold,
  },
  xpSection: {
    width: '100%',
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: THEME.spacing.sm,
  },
  xpLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: THEME.fontSize.sm,
  },
  xpValue: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.sm,
    fontWeight: THEME.fontWeight.bold,
  },
  nextLevelText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: THEME.fontSize.xs,
    marginTop: THEME.spacing.sm,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.lg,
    gap: THEME.spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: THEME.colors.darkCard,
    padding: THEME.spacing.md,
    borderRadius: THEME.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: THEME.spacing.sm,
  },
  statLabel: {
    color: THEME.colors.textSecondary,
    fontSize: THEME.fontSize.xs,
    marginBottom: THEME.spacing.xs,
  },
  statValue: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
  },

  // Section
  section: {
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.lg,
  },
  sectionTitle: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
  },
  sectionButton: {
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.sm,
  },
  sectionButtonText: {
    color: THEME.colors.neonBlue,
    fontSize: THEME.fontSize.sm,
    fontWeight: THEME.fontWeight.semibold,
  },

  // Daily Missions
  dailyMissionsScroll: {
    marginBottom: THEME.spacing.lg,
  },
  dailyMissionCard: {
    marginRight: THEME.spacing.md,
    paddingVertical: THEME.spacing.lg,
    paddingHorizontal: THEME.spacing.xl,
    borderRadius: THEME.borderRadius.lg,
    alignItems: 'center',
    minWidth: 120,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  dailyMissionEmoji: {
    fontSize: 32,
    marginBottom: THEME.spacing.sm,
  },
  dailyMissionText: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.sm,
    fontWeight: THEME.fontWeight.semibold,
    marginBottom: THEME.spacing.xs,
  },
  dailyMissionXP: {
    color: THEME.colors.neonYellow,
    fontSize: THEME.fontSize.xs,
    fontWeight: THEME.fontWeight.bold,
  },

  // Trilhas
  trilhasContainer: {
    width: '100%',
  },
  trilhaWrapper: {
    alignItems: 'center',
    marginBottom: THEME.spacing.lg,
  },
  connectorLine: {
    width: 3,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: THEME.spacing.md,
    borderRadius: THEME.borderRadius.sm,
  },
  trilhaCardNeon: {
    width: '100%',
    padding: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 2,
    overflow: 'hidden',
  },
  trilhaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  trilhaTitle: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.base,
    fontWeight: THEME.fontWeight.bold,
    flex: 1,
  },
  trilhaDescription: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: THEME.fontSize.sm,
    marginBottom: THEME.spacing.md,
  },
  trilhaProgress: {
    marginTop: THEME.spacing.md,
  },
  progressBarSmall: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: THEME.borderRadius.sm,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: THEME.spacing.sm,
  },
  progressFillSmall: {
    height: '100%',
    borderRadius: THEME.borderRadius.sm,
  },
  progressText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: THEME.fontSize.xs,
    marginBottom: THEME.spacing.xs,
  },
  xpReward: {
    color: THEME.colors.neonYellow,
    fontSize: THEME.fontSize.xs,
    fontWeight: THEME.fontWeight.bold,
  },
  lockIcon: {
    fontSize: 18,
  },
  almostIcon: {
    fontSize: 18,
  },

  // Mini-Games
  miniGamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: THEME.spacing.md,
    justifyContent: 'space-between',
  },
  miniGameCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: THEME.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  miniGameButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniGameEmoji: {
    fontSize: 36,
    marginBottom: THEME.spacing.sm,
  },
  miniGameName: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.sm,
    fontWeight: THEME.fontWeight.semibold,
  },

  // Nav Buttons
  navButtonsSection: {
    flexDirection: 'row',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.xl,
    gap: THEME.spacing.md,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  navButton: {
    flex: 1,
    minWidth: '22%',
    paddingVertical: THEME.spacing.lg,
    alignItems: 'center',
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 2,
    backgroundColor: THEME.colors.darkCard,
  },
  navButtonEmoji: {
    fontSize: 24,
    marginBottom: THEME.spacing.sm,
  },
  navButtonText: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.xs,
    fontWeight: THEME.fontWeight.semibold,
  },
});

export default MainHubScreenNeon;
