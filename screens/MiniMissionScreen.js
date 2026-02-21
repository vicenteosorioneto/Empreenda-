import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mascot } from '../components/Mascot';
import { initialMission } from '../data/initialMission';
import { getRandomMotivation } from '../data/motivationalMessages';
import { MotivationEngine } from '../services/MotivationEngine';
import StorageService from '../services/StorageService';
import { Mistake } from '../types/onboarding';

// 🎮 MINI MISSÃO - Jogo Interativo

const MiniMissionScreen = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [mistakes, setMistakes] = useState([]);
  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationMessage, setMotivationMessage] = useState('');
  const [answersHistory, setAnswersHistory] = useState([]);

  const progress = ((currentQuestion + 1) / initialMission.length) * 100;
  const mission = initialMission[currentQuestion];

  const handleOptionSelect = (optionIndex) => {
    if (showFeedback) return;
    setSelectedOption(optionIndex);
  };

  const handleConfirm = async () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === mission.correctOption;
    const newAnswersHistory = [...answersHistory, isCorrect];
    setAnswersHistory(newAnswersHistory);

    if (isCorrect) {
      const newCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(newCorrectAnswers);

      // Verificar streak para motivação
      if (MotivationEngine.checkStreak(newCorrectAnswers)) {
        setMotivationMessage(getRandomMotivation());
        setShowMotivation(true);
      }
    } else {
      // Registrar erro
      const mistake = {
        questionId: mission.id,
        userAnswer: selectedOption,
        correctAnswer: mission.correctOption,
        question: mission.question,
      };
      const newMistakes = [...mistakes, mistake];
      setMistakes(newMistakes);
      await StorageService.saveMistakes(newMistakes);
    }

    setShowFeedback(true);
  };

  const handleNext = async () => {
    if (currentQuestion < initialMission.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      // Missão completada - salvar progresso
      const score = MotivationEngine.calculateScore(
        correctAnswers,
        initialMission.length
      );

      await StorageService.saveOnboardingProgress({
        currentStep: 1,
        completedMission: true,
        profileCreated: false,
        goalSet: false,
        planSelected: false,
        score,
        mistakes,
        streak: MotivationEngine.calculateCurrentStreak(answersHistory),
      });

      navigation.navigate('MissionResult', {
        correctAnswers,
        totalQuestions: initialMission.length,
        mistakes,
      });
    }
  };

  const isCorrectAnswer = selectedOption === mission.correctOption;

  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B', '#334155']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {currentQuestion + 1} de {initialMission.length}
          </Text>
        </View>

        {/* Score */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>✅ {correctAnswers}</Text>
          <Text style={styles.scoreText}>❌ {mistakes.length}</Text>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>{mission.title}</Text>
          <Text style={styles.questionText}>{mission.question}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {mission.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const showCorrect = showFeedback && index === mission.correctOption;
            const showWrong = showFeedback && isSelected && !isCorrectAnswer;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  isSelected && !showFeedback && styles.optionSelected,
                  showCorrect && styles.optionCorrect,
                  showWrong && styles.optionWrong,
                ]}
                onPress={() => handleOptionSelect(index)}
                disabled={showFeedback}
                activeOpacity={0.7}
              >
                <View style={styles.optionContent}>
                  <View style={styles.optionNumber}>
                    <Text style={styles.optionNumberText}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                  <Text style={styles.optionText}>{option}</Text>
                  {showCorrect && <Text style={styles.checkmark}>✓</Text>}
                  {showWrong && <Text style={styles.crossmark}>✗</Text>}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Feedback */}
        {showFeedback && (
          <View
            style={[
              styles.feedbackContainer,
              isCorrectAnswer ? styles.feedbackCorrect : styles.feedbackWrong,
            ]}
          >
            <Text style={styles.feedbackTitle}>
              {isCorrectAnswer ? '🎉 Correto!' : '💭 Quase lá!'}
            </Text>
            {mission.explanation && (
              <Text style={styles.feedbackText}>{mission.explanation}</Text>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          {!showFeedback ? (
            <TouchableOpacity
              style={[
                styles.confirmButton,
                selectedOption === null && styles.confirmButtonDisabled,
              ]}
              onPress={handleConfirm}
              disabled={selectedOption === null}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  selectedOption !== null
                    ? ['#8B5CF6', '#D946EF']
                    : ['#64748B', '#475569']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#10B981', '#059669']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {currentQuestion < initialMission.length - 1
                    ? 'Próxima →'
                    : 'Ver Resultado 🏆'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Motivation Modal */}
      <Modal
        visible={showMotivation}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMotivation(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.motivationModal}>
            <Mascot size="medium" animated={true} />
            <Text style={styles.motivationText}>{motivationMessage}</Text>
            <TouchableOpacity
              style={styles.motivationButton}
              onPress={() => setShowMotivation(false)}
            >
              <Text style={styles.motivationButtonText}>Continue! 💪</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 48,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 6,
    textAlign: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  questionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 13,
    marginBottom: 19,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  questionTitle: {
    fontSize: 13,
    color: '#8B5CF6',
    marginBottom: 10,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    lineHeight: 22,
  },
  optionsContainer: {
    gap: 10,
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  optionCorrect: {
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  optionWrong: {
    borderColor: '#EF4444',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
  },
  optionNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  optionNumberText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  optionText: {
    flex: 1,
    fontSize: 13,
    color: '#E2E8F0',
    lineHeight: 18,
  },
  checkmark: {
    fontSize: 19,
    color: '#10B981',
    marginLeft: 6,
  },
  crossmark: {
    fontSize: 19,
    color: '#EF4444',
    marginLeft: 6,
  },
  feedbackContainer: {
    padding: 13,
    borderRadius: 10,
    marginBottom: 16,
  },
  feedbackCorrect: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  feedbackWrong: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  feedbackTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  feedbackText: {
    fontSize: 12,
    color: '#E2E8F0',
    lineHeight: 18,
  },
  actionContainer: {
    marginTop: 8,
  },
  confirmButton: {
    width: '100%',
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  nextButton: {
    width: '100%',
  },
  buttonGradient: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  motivationModal: {
    backgroundColor: '#1E293B',
    borderRadius: 19,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  motivationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 19,
    lineHeight: 22,
  },
  motivationButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 26,
    paddingVertical: 11,
    borderRadius: 10,
  },
  motivationButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default MiniMissionScreen;
