import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../utils/theme';

/**
 * Efeito de bounce quando responde certo
 */
export const BounceView = ({ children, trigger = false, duration = 500 }) => {
  const bounceAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (trigger) {
      bounceAnimation.setValue(1);
      Animated.sequence([
        Animated.timing(bounceAnimation, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnimation, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnimation, {
          toValue: 1.05,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnimation, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [trigger]);

  return (
    <Animated.View
      style={{
        transform: [{ scale: bounceAnimation }],
      }}
    >
      {children}
    </Animated.View>
  );
};

/**
 * Efeito de pulso contínuo (para cards clicáveis)
 */
export const PulsingCard = ({ children, color = THEME.colors.neonBlue, style }) => {
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: pulseAnimation }],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

/**
 * Barra de XP animada com crescimento suave
 */
export const AnimatedXPBar = ({ currentXP, maxXP, duration = 1000 }) => {
  const progressAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const progress = (currentXP / maxXP) * 100;
    Animated.timing(progressAnimation, {
      toValue: progress,
      duration,
      useNativeDriver: false,
    }).start();
  }, [currentXP, maxXP]);

  return (
    <View style={styles.xpBarContainer}>
      <Animated.View
        style={[
          styles.xpBarFill,
          {
            width: progressAnimation.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
      <View style={styles.xpBarGlow} />
    </View>
  );
};

/**
 * Partículas de celebração (fogos de artifício quando ganha)
 */
export const ConfettiParticles = ({ trigger = false }) => {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    animation: useRef(new Animated.Value(0)).current,
    xAnimation: useRef(new Animated.Value(0)).current,
  }));

  useEffect(() => {
    if (trigger) {
      particles.forEach((particle, index) => {
        const randomX = Math.random() * 200 - 100;
        const randomDelay = Math.random() * 300;

        setTimeout(() => {
          Animated.parallel([
            Animated.timing(particle.animation, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(particle.xAnimation, {
              toValue: randomX,
              duration: 800,
              useNativeDriver: true,
            }),
          ]).start(() => {
            particle.animation.setValue(0);
            particle.xAnimation.setValue(0);
          });
        }, randomDelay);
      });
    }
  }, [trigger]);

  return (
    <View style={StyleSheet.absoluteFill}>
      {particles.map((particle, index) => (
        <Animated.View
          key={particle.id}
          style={[
            styles.particle,
            {
              opacity: particle.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
              transform: [
                { translateX: particle.xAnimation },
                {
                  translateY: particle.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 200],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.particleEmoji}>
            {['✨', '⭐', '💫', '🌟'][index % 4]}
          </Text>
        </Animated.View>
      ))}
    </View>
  );
};

/**
 * Shimmer/brilho passando sobre elemento
 */
export const ShimmerEffect = ({ children, active = true }) => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (active) {
      Animated.loop(
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        })
      ).start();
    }
  }, [active]);

  const shimmerPosition = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['-100%', '100%'],
  });

  return (
    <View style={{ overflow: 'hidden' }}>
      {children}
      {active && (
        <Animated.View
          style={[
            styles.shimmer,
            {
              transform: [{ translateX: shimmerPosition }],
            },
          ]}
        />
      )}
    </View>
  );
};

/**
 * Botão com efeito de pressão animada
 */
export const AnimatedPressButton = ({ children, onPress, color = THEME.colors.neonBlue }) => {
  const pressAnimation = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(pressAnimation, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.animatedButton,
        {
          transform: [{ scale: pressAnimation }],
        },
      ]}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={[styles.button, { backgroundColor: color }]}
        activeOpacity={1}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

/**
 * Texto com efeito glow pulsante
 */
export const GlowText = ({ text, color = THEME.colors.neonBlue, size = 24 }) => {
  const glowAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const glowOpacity = glowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.8],
  });

  return (
    <View>
      <Animated.Text
        style={{
          fontSize: size,
          fontWeight: 'bold',
          color,
          textShadowColor: color,
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: glowAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 10],
          }),
          opacity: 1,
        }}
      >
        {text}
      </Animated.Text>
    </View>
  );
};

/**
 * Badge com rotate suave
 */
export const RotatingBadge = ({ emoji = '🏆', size = 40 }) => {
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate }],
      }}
    >
      <Text style={{ fontSize: size }}>{emoji}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  xpBarContainer: {
    height: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: THEME.colors.neonGreen,
    borderRadius: 6,
  },
  xpBarGlow: {
    ...StyleSheet.absoluteFill,
    borderRadius: 6,
    backgroundColor: THEME.colors.neonGreen,
    opacity: 0.3,
    blur: 10,
  },
  particle: {
    position: 'absolute',
    width: 20,
    height: 20,
  },
  particleEmoji: {
    fontSize: 16,
  },
  shimmer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: '50%',
  },
  animatedButton: {
    flex: 1,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
