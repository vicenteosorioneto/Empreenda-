import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function CharacterSelectionScreen({ navigation, route }) {
  const { userType } = route.params;
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const characters = [
    {
      id: 1,
      name: 'Strategos',
      personality: 'Líder estratégico',
      gradient: ['#667eea', '#764ba2'],
      icon: 'briefcase',
      description: 'Focado em planejamento e liderança'
    },
    {
      id: 2,
      name: 'Pixel',
      personality: 'Inovador(a) criativo(a)',
      gradient: ['#f093fb', '#f5576c'],
      icon: 'bulb',
      description: 'Pensamento criativo e inovador'
    },
    {
      id: 3,
      name: 'Quantum',
      personality: 'Analista técnico',
      gradient: ['#4facfe', '#00f2fe'],
      icon: 'analytics',
      description: 'Análise de dados e estratégia'
    },
    {
      id: 4,
      name: 'Vibe',
      personality: 'Comunicador(a) social',
      gradient: ['#43e97b', '#38f9d7'],
      icon: 'people-circle',
      description: 'Networking e comunicação'
    },
    {
      id: 5,
      name: 'Nexus',
      personality: 'Executor(a) prático(a)',
      gradient: ['#fa709a', '#fee140'],
      icon: 'hammer',
      description: 'Ação e execução de projetos'
    },
    {
      id: 6,
      name: 'Eclipse',
      personality: 'Visionário(a) futurista',
      gradient: ['#30cfd0', '#330867'],
      icon: 'telescope',
      description: 'Visão de futuro e tendências'
    }
  ];

  const handleContinue = () => {
    if (selectedCharacter) {
      navigation.navigate('ClassAndSchoolSelection', { 
        userType, 
        character: selectedCharacter 
      });
    }
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Escolha seu Personagem</Text>
        <Text style={styles.subtitle}>Selecione o perfil que mais combina com você</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.charactersGrid}>
          {characters.map((character) => (
            <TouchableOpacity
              key={character.id}
              activeOpacity={0.8}
              onPress={() => setSelectedCharacter(character)}
              style={styles.characterWrapper}
            >
              <LinearGradient
                colors={character.gradient}
                style={[
                  styles.characterCard,
                  selectedCharacter?.id === character.id && styles.selectedCard
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {selectedCharacter?.id === character.id && (
                  <View style={styles.selectedBadge}>
                    <Ionicons name="checkmark-circle" size={28} color="#fff" />
                  </View>
                )}
                
                <View style={styles.iconCircle}>
                  <Ionicons name={character.icon} size={40} color="#fff" />
                </View>
                
                <Text style={styles.characterName}>{character.name}</Text>
                <Text style={styles.characterPersonality}>{character.personality}</Text>
                <Text style={styles.characterDescription}>{character.description}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedCharacter && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedCharacter}
        >
          <LinearGradient
            colors={selectedCharacter ? ['#667eea', '#764ba2'] : ['#4a5568', '#2d3748']}
            style={styles.continueButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.continueButtonText}>Continuar</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#a8b2d1',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  charactersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  characterWrapper: {
    width: (width - 60) / 2,
    marginBottom: 20,
  },
  characterCard: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    minHeight: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    position: 'relative',
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#fff',
  },
  selectedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  characterName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  characterPersonality: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f0f0f0',
    marginBottom: 8,
    textAlign: 'center',
  },
  characterDescription: {
    fontSize: 12,
    color: '#e0e0e0',
    textAlign: 'center',
    lineHeight: 16,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  continueButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
