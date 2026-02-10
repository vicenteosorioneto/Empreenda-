import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mascot } from '../components/Mascot';
import { MotivationEngine } from '../services/MotivationEngine';
import { Mistake } from '../types/onboarding';

// 🏆 RESULTADO DA MINI MISSÃO

const MissionResultScreen = ({ navigation, route }) => {
  const { correctAnswers, totalQuestions, mistakes } = route.params;
  const score = MotivationEngine.calculateScore(correctAnswers, totalQuestions);
  const performance = MotivationEngine.getPerformanceLevel(score);

  const handleContinue = () => {
    navigation.navigate('GameProfile');
  };

  const handleReviewMistakes = () => {
    navigation.navigate('MistakeReview', { mistakes });
  };

  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B', '#334155']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Mascot
          size="large"
          message={performance.message}
          animated={true}
        />

        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Missão Completa!</Text>
          
          <View style={styles.scoreCircle}>
            <LinearGradient
              colors={
                score >= 70
                  ? ['#10B981', '#059669']
                  : score >= 50
                  ? ['#F59E0B', '#D97706']
                  : ['#EF4444', '#DC2626']
              }
              style={styles.scoreGradient}
            >
              <Text style={styles.scoreNumber}>{score}</Text>
              <Text style={styles.scoreLabel}>pontos</Text>
            </LinearGradient>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>✅</Text>
              <Text style={styles.statNumber}>{correctAnswers}</Text>
              <Text style={styles.statLabel}>Acertos</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statIcon}>❌</Text>
              <Text style={styles.statNumber}>{mistakes.length}</Text>
              <Text style={styles.statLabel}>Erros</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📊</Text>
              <Text style={styles.statNumber}>{totalQuestions}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>

          <View style={styles.performanceCard}>
            <Text style={styles.performanceEmoji}>{performance.emoji}</Text>
            <Text style={styles.performanceLevel}>{performance.level}</Text>
          </View>

          {mistakes.length > 0 && (
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={handleReviewMistakes}
              activeOpacity={0.8}
            >
              <Text style={styles.reviewButtonText}>
                📝 Revisar {mistakes.length} {mistakes.length === 1 ? 'erro' : 'erros'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#8B5CF6', '#D946EF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
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
    paddingTop: 60,
    alignItems: 'center',
  },
  resultContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 30,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  scoreGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#94A3B8',
  },
  performanceCard: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    marginBottom: 20,
  },
  performanceEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  performanceLevel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  reviewButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  reviewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  continueButton: {
    width: '100%',
    marginTop: 30,
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

export default MissionResultScreen;
