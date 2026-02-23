import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mascot } from '../components/Mascot';

// 🎮 INTRODUÇÃO À MINI MISSÃO

const MiniMissionIntroScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleStart = () => {
    navigation.navigate('MiniMission');
  };

  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B', '#334155']}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Mascot
          size="large"
          message="Oi, eu sou o Empreenda+! Vem aprender comigo como colocar suas ideias em prática e transformá-las em uma empresa."
          animated={true}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.title}>Bem-vindo(a)!</Text>
          <Text style={styles.subtitle}>
            Antes de começarmos, que tal um desafio rápido? 🎯
          </Text>
          <Text style={styles.description}>
            Vamos testar seus conhecimentos sobre empreendedorismo.
            Não se preocupe, é só para conhecer você melhor!
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Perguntas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>~3</Text>
              <Text style={styles.statLabel}>Minutos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>💯</Text>
              <Text style={styles.statLabel}>Diversão</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStart}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#8B5CF6', '#D946EF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Começar Desafio 🚀</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('GameProfile')}
          style={styles.skipButton}
        >
          <Text style={styles.skipText}>Pular desafio →</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#E2E8F0',
    marginBottom: 13,
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 11,
    color: '#94A3B8',
  },
  startButton: {
    width: '100%',
    marginTop: 16,
  },
  buttonGradient: {
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  skipButton: {
    marginTop: 13,
  },
  skipText: {
    fontSize: 13,
    color: '#64748B',
  },
});

export default MiniMissionIntroScreen;
