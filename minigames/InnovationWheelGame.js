import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME } from '../utils/theme';
import { MINIGAME_TYPES } from '../data/minigames';
import { RotatingBadge, BounceView } from '../components/AnimationComponents';
import { FeedbackOverlay, RewardCard } from '../components/FeedbackComponents';
import { getRandomQuestions } from '../data/quizQuestions';

/**
 * Mini-jogo: Roda da Inovação
 * Gira e cai numa categoria de desafio
 */
const InnovationWheelGame = ({ navigation }) => {
  const wheelData = MINIGAME_TYPES.INNOVATION_WHEEL;
  const categories = wheelData.categories;

  const [spinning, setSpinning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [xpEarned, setXpEarned] = useState(0);
  const [feedback, setFeedback] = useState({ visible: false, message: '' });
  const [showReward, setShowReward] = useState(false);
  
  // Quiz mode states
  const [quizMode, setQuizMode] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    setSelectedCategory(null);

    const randomCategory = Math.floor(Math.random() * categories.length);
    const spins = 8; // Número de voltas completas
    const randomAngle = randomCategory * (360 / categories.length);
    const finalAngle = spins * 360 + randomAngle;

    Animated.sequence([
      // Spin animation
      Animated.timing(rotateAnimation, {
        toValue: finalAngle,
        duration: 3000,
        useNativeDriver: true,
      }),
      // Scale bounce on finish
      Animated.spring(scaleAnimation, {
        toValue: 1.1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.spring(scaleAnimation, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();

      setSelectedCategory(randomCategory);
      const category = categories[randomCategory];
      setFeedback({
        visible: true,
        message: `Você caiu em: ${category.name}!`,
      });

      // Calcula XP ganhado (com multiplicador por sorte)
      const baseXP = wheelData.baseXP;
      const bonus = Math.floor(Math.random() * 50); // 0-50 XP bonus
      setXpEarned(baseXP + bonus);
      setShowReward(true);

      setSpinning(false);
    });
  };

  const startQuizMode = () => {
    const questions = getRandomQuestions(5);
    setQuizQuestions(questions);
    setCurrentQuizQuestion(0);
    setQuizScore(0);
    setQuizMode(true);
  };

  const handleQuizAnswer = (selectedOption) => {
    const currentQuestion = quizQuestions[currentQuizQuestion];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setQuizScore(quizScore + 100);
      Alert.alert('✅ Correto!', currentQuestion.explanation, [
        {
          text: 'Próxima',
          onPress: () => {
            if (currentQuizQuestion < quizQuestions.length - 1) {
              setCurrentQuizQuestion(currentQuizQuestion + 1);
            } else {
              setQuizMode(false);
              setXpEarned(quizScore + 100);
              setShowReward(true);
            }
          }
        }
      ]);
    } else {
      Alert.alert('❌ Incorreto', currentQuestion.explanation, [
        {
          text: 'Próxima',
          onPress: () => {
            if (currentQuizQuestion < quizQuestions.length - 1) {
              setCurrentQuizQuestion(currentQuizQuestion + 1);
            } else {
              setQuizMode(false);
              setXpEarned(quizScore);
              setShowReward(true);
            }
          }
        }
      ]);
    }
  };

  const spinValue = rotateAnimation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  if (quizMode) {
    const question = quizQuestions[currentQuizQuestion];
    
    return (
      <LinearGradient
        colors={THEME.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setQuizMode(false)}>
            <Text style={styles.backButton}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.title}>📝 Quiz da Inovação</Text>
          <Text style={styles.subTitle}>Pergunta {currentQuizQuestion + 1}/{quizQuestions.length}</Text>
        </View>

        <ScrollView style={styles.quizContainer}>
          <View style={styles.quizCard}>
            <Text style={styles.quizQuestion}>{question.question}</Text>
            
            <View style={styles.quizOptionsContainer}>
              {['a', 'b', 'c', 'd'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.quizOption}
                  onPress={() => handleQuizAnswer(option)}
                >
                  <Text style={styles.quizOptionLetter}>{option.toUpperCase()}</Text>
                  <Text style={styles.quizOptionText}>{question[option]}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.quizScoreContainer}>
              <Text style={styles.quizScoreLabel}>Pontuação:</Text>
              <Text style={styles.quizScoreValue}>{quizScore}</Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <>
      <LinearGradient
      colors={THEME.gradients.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <FeedbackOverlay
        visible={feedback.visible}
        type="achievement"
        message={feedback.message}
        onDismiss={() => setFeedback({ ...feedback, visible: false })}
      />

      <RewardCard
        visible={showReward}
        xpAmount={xpEarned}
        onAnimationComplete={() => setShowReward(false)}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🎡 Roda da Inovação</Text>
        <Text style={styles.subTitle}>Gire e escolha um desafio</Text>
      </View>

      {/* Wheel Container */}
      <View style={styles.wheelContainer}>
        {/* Pointer/Indicator */}
        <View style={styles.pointerContainer}>
          <View style={styles.pointer} />
        </View>

        {/* Spinning Wheel */}
        <Animated.View
          style={[
            styles.wheelWrapper,
            {
              transform: [
                { rotate: spinValue },
                { scale: scaleAnimation },
              ],
            },
          ]}
        >
          <View style={styles.wheel}>
            {categories.map((category, index) => {
              const rotation = (360 / categories.length) * index;
              const isSelected = index === selectedCategory;

              return (
                <View
                  key={index}
                  style={[
                    styles.wheelSegment,
                    {
                      backgroundColor: category.color,
                      opacity: isSelected ? 1 : 0.9,
                      borderColor: isSelected ? 'white' : 'rgba(255,255,255,0.3)',
                    },
                    {
                      transform: [
                        { rotate: `${rotation}deg` },
                        { translateY: -48 },
                      ],
                    },
                  ]}
                >
                  <Text style={styles.segmentEmoji}>{category.icon}</Text>
                </View>
              );
            })}

            {/* Center circle */}
            <View style={styles.wheelCenter}>
              <RotatingBadge emoji="🎡" size={40} />
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Selected Category Info */}
      {selectedCategory !== null && (
        <BounceView trigger={true}>
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryEmoji}>
              {categories[selectedCategory].icon}
            </Text>
            <Text style={styles.categoryName}>
              {categories[selectedCategory].name}
            </Text>
            <Text style={styles.categoryDescription}>
              Responda 5 perguntas sobre {categories[selectedCategory].name.toLowerCase()}
            </Text>
          </View>
        </BounceView>
      )}

      {/* Spin Button */}
      <TouchableOpacity
        style={[
          styles.spinButton,
          spinning && styles.spinButtonDisabled,
        ]}
        onPress={spinWheel}
        disabled={spinning}
      >
        {console.log('Spin button colors:', THEME.gradients.reward)}
        <LinearGradient
          colors={THEME.gradients.reward}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.spinButtonGradient}
        >
          <Text style={styles.spinButtonText}>
            {spinning ? '🌪️ Girando...' : '🎯 Girar Roda'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Quiz Button */}
      <TouchableOpacity
        style={styles.quizButton}
        onPress={startQuizMode}
      >
        <LinearGradient
          colors={['#8B5CF6', '#6D28D9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.spinButtonGradient}
        >
          <Text style={styles.spinButtonText}>📝 Modo Quiz</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Stats */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>XP Possível</Text>
          <Text style={styles.statValue}>+{wheelData.baseXP}-{wheelData.baseXP + 50}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Tempo</Text>
          <Text style={styles.statValue}>{wheelData.duration}s</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Categorias</Text>
          <Text style={styles.statValue}>{categories.length}</Text>
        </View>
      </View>

      {/* Next Steps */}
      {selectedCategory !== null && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            // Aqui iria para o desafio da categoria
            console.log('Ir para desafio de', categories[selectedCategory].name);
          }}
        >
          <Text style={styles.nextButtonText}>
            Iniciar Desafio →
          </Text>
        </TouchableOpacity>
      )}
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.md,
  },
  header: {
    marginBottom: THEME.spacing.lg,
  },
  backButton: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.sm,
    fontWeight: THEME.fontWeight.semibold,
    marginBottom: THEME.spacing.sm,
  },
  title: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.xl,
    fontWeight: THEME.fontWeight.bold,
    marginBottom: THEME.spacing.xs,
  },
  subTitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: THEME.fontSize.sm,
  },

  // Wheel
  wheelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: THEME.spacing.lg,
    height: 224,
  },
  pointerContainer: {
    position: 'absolute',
    top: -8,
    zIndex: 10,
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: THEME.colors.neonYellow,
  },
  wheelWrapper: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  wheel: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelSegment: {
    position: 'absolute',
    width: 48,
    height: 64,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  segmentEmoji: {
    fontSize: 19,
  },
  wheelCenter: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Category Info
  categoryInfo: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  categoryEmoji: {
    fontSize: 32,
    marginBottom: THEME.spacing.sm,
  },
  categoryName: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.base,
    fontWeight: THEME.fontWeight.bold,
    marginBottom: THEME.spacing.xs,
  },
  categoryDescription: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: THEME.fontSize.xs,
    textAlign: 'center',
  },

  // Buttons
  spinButton: {
    marginBottom: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    overflow: 'hidden',
  },
  spinButtonDisabled: {
    opacity: 0.7,
  },
  spinButtonGradient: {
    paddingVertical: THEME.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinButtonText: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.base,
    fontWeight: THEME.fontWeight.bold,
  },
  nextButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: THEME.borderRadius.md,
    paddingVertical: THEME.spacing.md,
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  nextButtonText: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.sm,
    fontWeight: THEME.fontWeight.bold,
  },

  // Stats
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: THEME.spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: THEME.fontSize.xs,
    marginBottom: THEME.spacing.xs,
  },
  statValue: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.sm,
    fontWeight: THEME.fontWeight.bold,
  },

  // Quiz Styles
  quizButton: {
    marginBottom: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    overflow: 'hidden',
  },
  quizContainer: {
    flex: 1,
    padding: THEME.spacing.md,
  },
  quizCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    marginBottom: THEME.spacing.md,
  },
  quizQuestion: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
    color: THEME.colors.text,
    marginBottom: THEME.spacing.lg,
    lineHeight: 22,
  },
  quizOptionsContainer: {
    marginBottom: THEME.spacing.lg,
  },
  quizOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.sm,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  quizOptionLetter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8B5CF6',
    color: 'white',
    fontSize: THEME.fontSize.sm,
    fontWeight: THEME.fontWeight.bold,
    textAlign: 'center',
    lineHeight: 30,
    marginRight: THEME.spacing.sm,
  },
  quizOptionText: {
    flex: 1,
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.text,
    lineHeight: 18,
  },
  quizScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: THEME.spacing.md,
    paddingTop: THEME.spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.2)',
  },
  quizScoreLabel: {
    fontSize: THEME.fontSize.base,
    fontWeight: THEME.fontWeight.semibold,
    color: THEME.colors.text,
    marginRight: THEME.spacing.xs,
  },
  quizScoreValue: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
    color: '#8B5CF6',
  },
});

export default InnovationWheelGame;
