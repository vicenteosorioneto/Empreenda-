import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// 🤖 MASCOTE ANIMADO - Empreenda+

export const Mascot = ({
  message,
  size = 'medium',
  animated = true,
}) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (animated) {
      // Animação de bounce
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -10,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Animação de escala
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [animated]);

  const sizeStyles = {
    small: { width: 80, height: 80, fontSize: 40 },
    medium: { width: 120, height: 120, fontSize: 60 },
    large: { width: 160, height: 160, fontSize: 80 },
  };

  const currentSize = sizeStyles[size];

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.mascotContainer,
          {
            transform: [
              { translateY: bounceAnim },
              { scale: scaleAnim },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={['#6366F1', '#8B5CF6', '#D946EF']}
          style={[
            styles.mascotCircle,
            { width: currentSize.width, height: currentSize.height },
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={[styles.mascotEmoji, { fontSize: currentSize.fontSize }]}>
            🚀
          </Text>
        </LinearGradient>
      </Animated.View>

      {message && (
        <View style={styles.speechBubble}>
          <Text style={styles.messageText}>{message}</Text>
          <View style={styles.bubbleTail} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotContainer: {
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  mascotCircle: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  mascotEmoji: {
    textAlign: 'center',
  },
  speechBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 24,
    maxWidth: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  messageText: {
    fontSize: 16,
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  bubbleTail: {
    position: 'absolute',
    top: -10,
    left: '50%',
    marginLeft: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
  },
});

export default Mascot;
