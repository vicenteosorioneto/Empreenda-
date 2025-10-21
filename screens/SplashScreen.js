import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Logo from '../components/Logo';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

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

    // Navegar para a próxima tela após 3 segundos
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
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
      <View style={styles.particle1} />
      <View style={styles.particle2} />
      <View style={styles.particle3} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
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
    backgroundColor: '#FDE047',
    borderRadius: 10,
    opacity: 0.6,
  },
  particle2: {
    position: 'absolute',
    top: '70%',
    right: '15%',
    width: 15,
    height: 15,
    backgroundColor: '#F59E0B',
    borderRadius: 10,
    opacity: 0.4,
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