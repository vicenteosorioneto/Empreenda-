import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mistake } from '../types/onboarding';
import StorageService from '../services/StorageService';

// 📝 REVISÃO DE ERROS - Sistema Educacional

const MistakeReviewScreen = ({ navigation, route }) => {
  const { mistakes } = route.params as { mistakes: Mistake[] };

  const handleContinue = async () => {
    // Limpar erros após revisão
    await StorageService.clearMistakes();
    navigation.navigate('GameProfile');
  };

  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B', '#334155']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📚 Vamos Aprender!</Text>
          <Text style={styles.headerSubtitle}>
            Revisar seus erros é o melhor jeito de aprender
          </Text>
        </View>

        {mistakes.map((mistake, index) => {
          const options = ['A', 'B', 'C', 'D'];
          
          return (
            <View key={index} style={styles.mistakeCard}>
              <View style={styles.mistakeHeader}>
                <Text style={styles.mistakeNumber}>Questão {index + 1}</Text>
              </View>

              <Text style={styles.questionText}>{mistake.question}</Text>

              <View style={styles.answerSection}>
                <View style={styles.answerRow}>
                  <View style={styles.wrongBadge}>
                    <Text style={styles.badgeText}>Sua resposta</Text>
                  </View>
                  <Text style={styles.answerText}>
                    {options[mistake.userAnswer]}
                  </Text>
                </View>

                <View style={styles.answerRow}>
                  <View style={styles.correctBadge}>
                    <Text style={styles.badgeText}>Resposta correta</Text>
                  </View>
                  <Text style={styles.answerText}>
                    {options[mistake.correctAnswer]}
                  </Text>
                </View>
              </View>

              <View style={styles.tipBox}>
                <Text style={styles.tipIcon}>💡</Text>
                <Text style={styles.tipText}>
                  Dica: Revise este tópico ao longo da jornada para fixar o aprendizado!
                </Text>
              </View>
            </View>
          );
        })}

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#10B981', '#059669']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Entendi! Vamos Continuar 🚀</Text>
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
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
  },
  mistakeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  mistakeHeader: {
    marginBottom: 12,
  },
  mistakeNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    lineHeight: 26,
  },
  answerSection: {
    gap: 12,
    marginBottom: 16,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  wrongBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 120,
  },
  correctBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 120,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  answerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tipBox: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    marginTop: 4,
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#E2E8F0',
    lineHeight: 20,
  },
  continueButton: {
    width: '100%',
    marginTop: 20,
    marginBottom: 40,
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

export default MistakeReviewScreen;
