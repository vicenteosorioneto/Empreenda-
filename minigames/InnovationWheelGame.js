import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME } from '../utils/theme';
import { MINIGAME_TYPES } from '../data/minigames';
import { RotatingBadge, BounceView } from '../components/AnimationComponents';
import { FeedbackOverlay, RewardCard } from '../components/FeedbackComponents';

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

  const spinValue = rotateAnimation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

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
                        { translateY: -60 },
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
              <RotatingBadge emoji="🎡" size={50} />
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
    paddingVertical: THEME.spacing.lg,
    paddingHorizontal: THEME.spacing.lg,
  },
  header: {
    marginBottom: THEME.spacing.xl,
  },
  backButton: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.base,
    fontWeight: THEME.fontWeight.semibold,
    marginBottom: THEME.spacing.md,
  },
  title: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.xxl,
    fontWeight: THEME.fontWeight.bold,
    marginBottom: THEME.spacing.sm,
  },
  subTitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: THEME.fontSize.base,
  },

  // Wheel
  wheelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: THEME.spacing.xl,
    height: 280,
  },
  pointerContainer: {
    position: 'absolute',
    top: -10,
    zIndex: 10,
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: THEME.colors.neonYellow,
  },
  wheelWrapper: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  wheel: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelSegment: {
    position: 'absolute',
    width: 60,
    height: 80,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  segmentEmoji: {
    fontSize: 24,
  },
  wheelCenter: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Category Info
  categoryInfo: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    alignItems: 'center',
    marginBottom: THEME.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  categoryEmoji: {
    fontSize: 40,
    marginBottom: THEME.spacing.md,
  },
  categoryName: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
    marginBottom: THEME.spacing.sm,
  },
  categoryDescription: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: THEME.fontSize.sm,
    textAlign: 'center',
  },

  // Buttons
  spinButton: {
    marginBottom: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
    overflow: 'hidden',
  },
  spinButtonDisabled: {
    opacity: 0.7,
  },
  spinButtonGradient: {
    paddingVertical: THEME.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinButtonText: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
  },
  nextButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: THEME.spacing.lg,
    alignItems: 'center',
    marginBottom: THEME.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  nextButtonText: {
    color: THEME.colors.textInverted,
    fontSize: THEME.fontSize.base,
    fontWeight: THEME.fontWeight.bold,
  },

  // Stats
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: THEME.spacing.lg,
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
    fontSize: THEME.fontSize.base,
    fontWeight: THEME.fontWeight.bold,
  },
});

export default InnovationWheelGame;
