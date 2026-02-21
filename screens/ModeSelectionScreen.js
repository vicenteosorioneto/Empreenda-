import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

// 🎮 TELA DE SELEÇÃO DE MODO - Quiz vs RPG

const ModeSelectionScreen = ({ navigation }) => {
  const [selectedMode, setSelectedMode] = useState(null);

  const handleModeSelect = async (mode) => {
    setSelectedMode(mode);
    
    // Salvar preferência
    await AsyncStorage.setItem('@empreenda_game_mode', mode);
    
    // Pequeno delay para feedback visual
    setTimeout(() => {
      if (mode === 'quiz') {
        navigation.replace('UserTypeSelection');
      } else {
        navigation.replace('CharacterCreation');
      }
    }, 300);
  };

  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B', '#334155']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Escolha seu Modo</Text>
        <Text style={styles.subtitle}>
          Como você quer aprender empreendedorismo?
        </Text>
      </View>

      {/* Cards de Seleção */}
      <View style={styles.cardsContainer}>
        {/* Card Quiz */}
        <TouchableOpacity
          style={styles.cardWrapper}
          onPress={() => handleModeSelect('quiz')}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#3B82F6', '#2563EB', '#1E40AF']}
            style={[
              styles.card,
              selectedMode === 'quiz' && styles.cardSelected,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardIcon}>
              <Text style={styles.iconEmoji}>📚</Text>
            </View>
            
            <Text style={styles.cardTitle}>Modo Quiz</Text>
            <Text style={styles.cardDescription}>
              Aprenda com perguntas e respostas interativas
            </Text>

            <View style={styles.features}>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>✓</Text>
                <Text style={styles.featureText}>Missões por níveis</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>✓</Text>
                <Text style={styles.featureText}>Sistema de ranking</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>✓</Text>
                <Text style={styles.featureText}>Conquistas e XP</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>✓</Text>
                <Text style={styles.featureText}>Minigames educativos</Text>
              </View>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>🎯 Ideal para memorização</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Card RPG */}
        <TouchableOpacity
          style={styles.cardWrapper}
          onPress={() => handleModeSelect('rpg')}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED', '#6D28D9']}
            style={[
              styles.card,
              selectedMode === 'rpg' && styles.cardSelected,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardIcon}>
              <Text style={styles.iconEmoji}>🎮</Text>
            </View>
            
            <Text style={styles.cardTitle}>Modo RPG</Text>
            <Text style={styles.cardDescription}>
              Construa sua startup com decisões estratégicas
            </Text>

            <View style={styles.features}>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>✓</Text>
                <Text style={styles.featureText}>Decisões reais</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>✓</Text>
                <Text style={styles.featureText}>5 indicadores da startup</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>✓</Text>
                <Text style={styles.featureText}>Sistema de energia</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>✓</Text>
                <Text style={styles.featureText}>Mascote com feedback</Text>
              </View>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>🚀 Ideal para prática</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 Você pode trocar de modo a qualquer momento nas configurações
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 19,
  },
  cardsContainer: {
    flex: 1,
    gap: 16,
  },
  cardWrapper: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 19,
    padding: 19,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 13,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: '#FFFFFF',
    transform: [{ scale: 1.01 }],
  },
  cardIcon: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },
  iconEmoji: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 13,
    color: '#E2E8F0',
    marginBottom: 16,
    lineHeight: 18,
  },
  features: {
    gap: 10,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureBullet: {
    fontSize: 13,
    color: '#FFFFFF',
    marginRight: 6,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 11,
    color: '#FFFFFF',
    flex: 1,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default ModeSelectionScreen;
