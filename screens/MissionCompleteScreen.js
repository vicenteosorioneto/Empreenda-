import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mascot } from '../components/Mascot';
import GameManager from '../services/GameManager';

// 🏆 TELA DE CONCLUSAO DE MISSAO

const MissionCompleteScreen = ({ route, navigation }) => {
  const { missionTitle } = route.params;

  const [progress, setProgress] = useState(null);
  const [rewards, setRewards] = useState(null);
  const [scaleAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    loadCompletion();
    animateCompletion();
  }, []);

  const loadCompletion = async () => {
    try {
      const gameProgress = await GameManager.loadProgress();
      if (!gameProgress) return;

      const newTitle = GameManager.calculateTitle(
        gameProgress.completedMissions.length
      );
      const leveledUp = newTitle !== gameProgress.currentTitle;

      if (leveledUp) {
        await GameManager.updateTitle(newTitle);
      }

      setProgress(gameProgress);
      setRewards({
        leveledUp,
        newTitle,
        missionsCompleted: gameProgress.completedMissions.length,
      });
    } catch (error) {
      console.error('Erro ao carregar conclusao da missao:', error);
    }
  };

  const animateCompletion = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 60,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      delay: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleContinue = () => {
    navigation.navigate('GameHub');
  };

  if (!progress || !rewards) {
    return (
      <LinearGradient colors={['#0F172A', '#1E293B']} style={styles.container}>
        <Text style={styles.loadingText}>Processando...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#334155']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View
          style={[
            styles.trophyContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.trophyIcon}>🏆</Text>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.congratsTitle}>Missao Completa!</Text>
          <Text style={styles.missionName}>{missionTitle}</Text>
        </Animated.View>

        <View style={styles.mascotContainer}>
          <Mascot
            size="large"
            message={
              rewards.leveledUp
                ? `🎉 Incrivel! Voce evoluiu para ${GameManager.getTitleName(
                    rewards.newTitle
                  )}!`
                : 'Parabens por completar mais uma missao! Continue assim!'
            }
            animated={true}
          />
        </View>

        <View style={styles.rewardsContainer}>
          <Text style={styles.rewardsTitle}>🎁 Recompensas</Text>

          {rewards.leveledUp && (
            <View style={styles.rewardCard}>
              <Text style={styles.rewardIcon}>⬆️</Text>
              <View style={styles.rewardContent}>
                <Text style={styles.rewardLabel}>Novo Titulo Desbloqueado</Text>
                <Text style={styles.rewardValue}>
                  {GameManager.getTitleName(rewards.newTitle)}
                </Text>
              </View>
            </View>
          )}

          <View style={styles.rewardCard}>
            <Text style={styles.rewardIcon}>🎯</Text>
            <View style={styles.rewardContent}>
              <Text style={styles.rewardLabel}>Missoes Completadas</Text>
              <Text style={styles.rewardValue}>{rewards.missionsCompleted}</Text>
            </View>
          </View>

          <View style={styles.rewardCard}>
            <Text style={styles.rewardIcon}>🔥</Text>
            <View style={styles.rewardContent}>
              <Text style={styles.rewardLabel}>Dias Seguidos</Text>
              <Text style={styles.rewardValue}>{progress.dayStreak} dias</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>📊 Status Atual da sua Startup</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>💰</Text>
              <Text style={styles.statValue}>{progress.stats.cash}</Text>
              <Text style={styles.statLabel}>Caixa</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>😊</Text>
              <Text style={styles.statValue}>{progress.stats.customerInterest}</Text>
              <Text style={styles.statLabel}>Clientes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🧠</Text>
              <Text style={styles.statValue}>{progress.stats.knowledge}</Text>
              <Text style={styles.statLabel}>Conhecimento</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🔥</Text>
              <Text style={styles.statValue}>{progress.stats.motivation}</Text>
              <Text style={styles.statLabel}>Motivacao</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🌱</Text>
              <Text style={styles.statValue}>{progress.stats.socialImpact}</Text>
              <Text style={styles.statLabel}>Impacto</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <LinearGradient colors={['#8B5CF6', '#D946EF']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Continuar Jornada →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 19,
    paddingTop: 64,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 100,
  },
  trophyContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 19,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  trophyIcon: {
    fontSize: 51,
  },
  congratsTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
  },
  missionName: {
    fontSize: 14,
    color: '#8B5CF6',
    textAlign: 'center',
    marginBottom: 26,
  },
  mascotContainer: {
    width: '100%',
    marginBottom: 26,
  },
  rewardsContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 19,
    marginBottom: 19,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  rewardsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 13,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 10,
    padding: 13,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  rewardIcon: {
    fontSize: 26,
    marginRight: 13,
  },
  rewardContent: {
    flex: 1,
  },
  rewardLabel: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 3,
  },
  rewardValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statsCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 19,
    marginBottom: 19,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 13,
  },
  statIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'center',
  },
  continueButton: {
    width: '100%',
    marginTop: 6,
  },
  buttonGradient: {
    paddingVertical: 13,
    borderRadius: 13,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default MissionCompleteScreen;
