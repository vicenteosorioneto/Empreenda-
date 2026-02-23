import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Logo from '../components/Logo';
import { Mascot } from '../components/Mascot';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const particle1Anim = useRef(new Animated.Value(0)).current;
  const particle2Anim = useRef(new Animated.Value(0)).current;
  const particle3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Animação de partículas flutuantes
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(particle1Anim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(particle1Anim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(particle2Anim, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(particle2Anim, {
            toValue: 0,
            duration: 2500,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(particle3Anim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(particle3Anim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    // Navegar para Mini Missão após 3 segundos
    const timer = setTimeout(() => {
      navigation.replace('MiniMissionIntro');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Logo size="large" showText={true} />
      </Animated.View>
      
      {/* Partículas animadas de fundo */}
      <Animated.View 
        style={[
          styles.particle1,
          {
            opacity: particle1Anim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.2, 0.6, 0.2],
            }),
            transform: [
              {
                translateY: particle1Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -30],
                }),
              },
              {
                scale: particle1Anim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 1.2, 1],
                }),
              },
            ],
          },
        ]} 
      />
      <Animated.View 
        style={[
          styles.particle2,
          {
            opacity: particle2Anim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.15, 0.5, 0.15],
            }),
            transform: [
              {
                translateY: particle2Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 40],
                }),
              },
              {
                translateX: particle2Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -20],
                }),
              },
            ],
          },
        ]} 
      />
      <Animated.View 
        style={[
          styles.particle3,
          {
            opacity: particle3Anim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.15, 0.45, 0.15],
            }),
            transform: [
              {
                translateY: particle3Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -50],
                }),
              },
              {
                translateX: particle3Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 25],
                }),
              },
            ],
          },
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  particle1: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: 20,
    height: 20,
    backgroundColor: '#0066FF',
    borderRadius: 10,
    opacity: 0.4,
  },
  particle2: {
    position: 'absolute',
    top: '70%',
    right: '15%',
    width: 15,
    height: 15,
    backgroundColor: '#7C3AED',
    borderRadius: 10,
    opacity: 0.3,
  },
  particle3: {
    position: 'absolute',
    bottom: '20%',
    left: '20%',
    width: 25,
    height: 25,
    backgroundColor: '#EC4899',
    borderRadius: 15,
    opacity: 0.3,
  },
});

export default SplashScreen;