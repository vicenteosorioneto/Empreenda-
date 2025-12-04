import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { THEME } from '../utils/theme';

/**
 * Tela de feedback com animações de vitória/acerto
 * Mostra mensagens como: "Boa! Você pensou como um empreendedor!"
 */
export const FeedbackOverlay = ({ 
  visible = false, 
  type = 'success', // 'success' | 'error' | 'achievement'
  message = '',
  submessage = '',
  duration = 2000,
  onDismiss = () => {},
}) => {
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = useState(visible);

  useEffect(() => {
    if (visible) {
      setDisplay(true);
      Animated.parallel([
        Animated.spring(scaleAnimation, {
          toValue: 1,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.spring(scaleAnimation, {
            toValue: 0,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setDisplay(false);
          onDismiss();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!display) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: THEME.colors.neonGreen,
          emoji: '✅',
          color: THEME.colors.neonGreen,
        };
      case 'error':
        return {
          backgroundColor: '#EF4444',
          emoji: '❌',
          color: '#EF4444',
        };
      case 'achievement':
        return {
          backgroundColor: THEME.colors.neonYellow,
          emoji: '🏆',
          color: THEME.colors.neonYellow,
        };
      default:
        return {
          backgroundColor: THEME.colors.neonBlue,
          emoji: '⭐',
          color: THEME.colors.neonBlue,
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <Animated.View
        style={[
          styles.feedbackBox,
          {
            transform: [{ scale: scaleAnimation }],
            opacity: opacityAnimation,
            backgroundColor: typeStyles.backgroundColor,
          },
          THEME.shadows[type === 'achievement' ? 'neonPink' : 'standard'],
        ]}
      >
        <Text style={styles.emoji}>{typeStyles.emoji}</Text>
        <Text style={styles.message}>{message}</Text>
        {submessage && (
          <Text style={styles.submessage}>{submessage}</Text>
        )}
      </Animated.View>
    </View>
  );
};

/**
 * Card flutuante de recompensa com partículas
 */
export const RewardCard = ({
  visible = false,
  xpAmount = 100,
  badge = null,
  onAnimationComplete = () => {},
}) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -100,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(opacityAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.delay(900),
          Animated.timing(opacityAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        onAnimationComplete();
      });
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.rewardCard,
        {
          transform: [{ translateY }],
          opacity: opacityAnimation,
        },
      ]}
    >
      <Text style={styles.xpText}>+{xpAmount} XP</Text>
      {badge && (
        <Text style={styles.badgeEmoji}>{badge.icon}</Text>
      )}
    </Animated.View>
  );
};

/**
 * Barra de progresso com efeito de enchimento rápido
 */
export const AnimatedProgressBar = ({
  currentValue,
  maxValue,
  label = '',
  color = THEME.colors.neonGreen,
  showPercentage = true,
}) => {
  const widthAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const progress = (currentValue / maxValue) * 100;
    Animated.timing(widthAnimation, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [currentValue, maxValue]);

  const percentage = Math.round((currentValue / maxValue) * 100);

  return (
    <View style={styles.progressContainer}>
      {label && <Text style={styles.progressLabel}>{label}</Text>}
      <View style={[styles.progressBar, { borderColor: color }]}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: widthAnimation.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: color,
            },
          ]}
        />
        {showPercentage && (
          <Text style={styles.progressText}>
            {currentValue}/{maxValue}
          </Text>
        )}
      </View>
    </View>
  );
};

/**
 * Popup com múltiplas linhas de achievement
 */
export const AchievementPopup = ({
  visible = false,
  achievements = [],
  onClose = () => {},
}) => {
  const scaleAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnimation, {
        toValue: 1,
        friction: 7,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scaleAnimation, {
        toValue: 0,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={[StyleSheet.absoluteFill, styles.popupOverlay]}>
      <Animated.View
        style={[
          styles.achievementPopup,
          {
            transform: [{ scale: scaleAnimation }],
          },
          THEME.shadows.neonPurple,
        ]}
      >
        <Text style={styles.popupTitle}>🏆 Conquistas Desbloqueadas!</Text>
        <View style={styles.achievementsList}>
          {Array.isArray(achievements) && achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <Text style={styles.achievementItemEmoji}>{achievement.icon}</Text>
              <View style={styles.achievementItemText}>
                <Text style={styles.achievementItemName}>{achievement.name}</Text>
                <Text style={styles.achievementItemDesc}>{achievement.description}</Text>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity 
          style={styles.popupButton}
          onPress={onClose}
        >
          <Text style={styles.popupButtonText}>Incrível! 🎉</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

/**
 * Toast de notificação rápida (canto superior)
 */
export const ToastNotification = ({
  visible = false,
  title = '',
  message = '',
  type = 'info', // 'info' | 'warning' | 'achievement'
  duration = 3000,
  onDismiss = () => {},
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 20,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onDismiss();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'achievement':
        return THEME.colors.neonPink;
      case 'warning':
        return '#F59E0B';
      default:
        return THEME.colors.neonBlue;
    }
  };

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          transform: [{ translateY }],
          backgroundColor: getBackgroundColor(),
        },
        THEME.shadows.standard,
      ]}
    >
      {title && <Text style={styles.toastTitle}>{title}</Text>}
      <Text style={styles.toastMessage}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackBox: {
    paddingVertical: THEME.spacing.xl,
    paddingHorizontal: THEME.spacing.xxl,
    borderRadius: THEME.borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 48,
    marginBottom: THEME.spacing.md,
  },
  message: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
    color: THEME.colors.textInverted,
    textAlign: 'center',
    marginBottom: THEME.spacing.sm,
  },
  submessage: {
    fontSize: THEME.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  rewardCard: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -60,
    backgroundColor: THEME.colors.neonYellow,
    paddingVertical: THEME.spacing.lg,
    paddingHorizontal: THEME.spacing.xl,
    borderRadius: THEME.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  xpText: {
    fontSize: THEME.fontSize.xl,
    fontWeight: THEME.fontWeight.bold,
    color: THEME.colors.textPrimary,
  },
  badgeEmoji: {
    fontSize: 32,
    marginTop: THEME.spacing.sm,
  },
  progressContainer: {
    marginBottom: THEME.spacing.lg,
  },
  progressLabel: {
    fontSize: THEME.fontSize.sm,
    fontWeight: THEME.fontWeight.semibold,
    color: THEME.colors.textPrimary,
    marginBottom: THEME.spacing.sm,
  },
  progressBar: {
    height: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: THEME.borderRadius.sm,
    overflow: 'hidden',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressFill: {
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressText: {
    fontSize: THEME.fontSize.xs,
    fontWeight: THEME.fontWeight.bold,
    color: THEME.colors.textInverted,
    zIndex: 10,
  },
  popupOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementPopup: {
    backgroundColor: THEME.colors.lightCard,
    borderRadius: THEME.borderRadius.xl,
    padding: THEME.spacing.xxl,
    width: '85%',
    maxHeight: '80%',
  },
  popupTitle: {
    fontSize: THEME.fontSize.xl,
    fontWeight: THEME.fontWeight.bold,
    color: THEME.colors.textPrimary,
    marginBottom: THEME.spacing.lg,
    textAlign: 'center',
  },
  achievementsList: {
    marginBottom: THEME.spacing.lg,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  achievementItemEmoji: {
    fontSize: 28,
    marginRight: THEME.spacing.lg,
  },
  achievementItemText: {
    flex: 1,
  },
  achievementItemName: {
    fontSize: THEME.fontSize.base,
    fontWeight: THEME.fontWeight.bold,
    color: THEME.colors.textPrimary,
    marginBottom: THEME.spacing.xs,
  },
  achievementItemDesc: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.textSecondary,
  },
  popupButton: {
    backgroundColor: THEME.colors.neonGreen,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.lg,
    alignItems: 'center',
  },
  popupButtonText: {
    fontSize: THEME.fontSize.base,
    fontWeight: THEME.fontWeight.bold,
    color: THEME.colors.textInverted,
  },
  toast: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    paddingVertical: THEME.spacing.lg,
    paddingHorizontal: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
  },
  toastTitle: {
    fontSize: THEME.fontSize.sm,
    fontWeight: THEME.fontWeight.bold,
    color: THEME.colors.textInverted,
    marginBottom: THEME.spacing.xs,
  },
  toastMessage: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.textInverted,
  },
});

// Imports consolidated above
