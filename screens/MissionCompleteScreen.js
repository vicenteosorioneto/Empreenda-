import React, { useState, useEffect } from 'react';
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
import { GameProgress } from '../types/game';

// 🏆 TELA DE CONCLUSÃO DE MISSÃO

const MissionCompleteScreen = ({ route, navigation }) => {
  const { missionId, missionTitle } = route.params;
  
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
      setProgress(gameProgress);
      
      // Calcular recompensas (XP, títulos, etc)
      const newTitle = GameManager.calculateTitle(gameProgress.completedMissions.length);
      const leveledUp = newTitle !== gameProgress.currentTitle;
      
      setRewards({
        newTitle,
        leveledUp,
        missionsCompleted: gameProgress.completedMissions.length,
      });
    } catch (error) {
      console.error('Erro ao carregar conclusão:', error);
    }
  };

  const animateCompletion = () => {
    // Animação de escala
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 60,
      useNativeDriver: true,
    }).start();

    // Animação de fade
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
        {/* Troféu animado */}
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

        {/* Título */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.congratsTitle}>Missão Completa!</Text>
          <Text style={styles.missionName}>{missionTitle}</Text>
        </Animated.View>

        {/* Mascote com mensagem */}
        <View style={styles.mascotContainer}>
          <Mascot
            size="large"
            message={
              rewards.leveledUp
                ? `🎉 Incrível! Você evoluiu para ${GameManager.getTitleName(rewards.newTitle)}!`
                : `Parabéns por completar mais uma missão! Continue assim!`
            }
            animated={true}
          />
        </View>

        {/* Recompensas */}
        <View style={styles.rewardsContainer}>
          <Text style={styles.rewardsTitle}>🎁 Recompensas</Text>

          {/* Nova título (se houver) */}
          {rewards.leveledUp && (
            <View style={styles.rewardCard}>
              <Text style={styles.rewardIcon}>⬆️</Text>
              <View style={styles.rewardContent}>
                <Text style={styles.rewardLabel}>Novo Título Desbloqueado</Text>
                <Text style={styles.rewardValue}>
                  {GameManager.getTitleName(rewards.newTitle)}
                </Text>
              </View>
            </View>
          )}

          {/* Missões completadas */}
          <View style={styles.rewardCard}>
            <Text style={styles.rewardIcon}>🎯</Text>
            <View style={styles.rewardContent}>
              <Text style={styles.rewardLabel}>Missões Completadas</Text>
              <Text style={styles.rewardValue}>{rewards.missionsCompleted}</Text>
            </View>
          </View>

          {/* Streak */}
          <View style={styles.rewardCard}>
            <Text style={styles.rewardIcon}>🔥</Text>
            <View style={styles.rewardContent}>
              <Text style={styles.rewardLabel}>Dias Seguidos</Text>
              <Text style={styles.rewardValue}>{progress.dayStreak} dias</Text>
            </View>
          </View>
        </View>

        {/* Status da startup */}
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
              <Text style={styles.statLabel}>Motivação</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🌱</Text>
              <Text style={styles.statValue}>{progress.stats.socialImpact}</Text>
              <Text style={styles.statLabel}>Impacto</Text>
            </View>
          </View>
        </View>

        {/* Botão de continuar */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#8B5CF6', '#D946EF']}
            style={styles.buttonGradient}
          >
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
    padding: 20,
    paddingTop: 80,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 100,
  },
  trophyContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  trophyIcon: {
    fontSize: 64,
  },
  congratsTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  missionName: {
    fontSize: 18,
    color: '#8B5CF6',
    textAlign: 'center',
    marginBottom: 32,
  },
  mascotContainer: {
    width: '100%',
    marginBottom: 32,
  },
  rewardsContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  rewardsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  rewardIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  rewardContent: {
    flex: 1,
  },
  rewardLabel: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
  },
  rewardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statsCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
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
    marginBottom: 16,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  continueButton: {
    width: '100%',
    marginTop: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default MissionCompleteScreen;
