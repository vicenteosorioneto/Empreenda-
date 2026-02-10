import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CharacterClass } from '../types/rpg';
import { CLASSES_INFO } from '../data/skillsData';
import RPGEngine from '../services/RPGEngine';

// 🎭 CRIAÇÃO DE PERSONAGEM RPG

const CharacterCreationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(null);
  const [step, setStep] = useState<'name' | 'class'>('name');

  const handleNameSubmit = () => {
    if (name.trim().length < 3) {
      alert('Nome deve ter pelo menos 3 caracteres');
      return;
    }
    setStep('class');
  };

  const handleClassSelect = async (classId: CharacterClass) => {
    setSelectedClass(classId);
    
    // Pequeno delay para feedback visual
    setTimeout(async () => {
      // Inicializar personagem
      await RPGEngine.initializeNewCharacter(name, classId);
      
      // Navegar para o jogo
      navigation.replace('GameHub');
    }, 500);
  };

  const renderNameStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Qual é o seu nome?</Text>
      <Text style={styles.subtitle}>
        Como você quer ser chamado nessa jornada?
      </Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Digite seu nome"
        placeholderTextColor="#64748B"
        maxLength={20}
        autoFocus
      />

      <TouchableOpacity
        style={[styles.continueButton, !name.trim() && styles.buttonDisabled]}
        onPress={handleNameSubmit}
        disabled={!name.trim()}
      >
        <LinearGradient
          colors={name.trim() ? ['#8B5CF6', '#D946EF'] : ['#64748B', '#475569']}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Continuar →</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderClassStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Escolha sua Classe</Text>
      <Text style={styles.subtitle}>
        Cada classe tem habilidades e bônus únicos
      </Text>

      <ScrollView style={styles.classesScroll} showsVerticalScrollIndicator={false}>
        {Object.values(CLASSES_INFO).map((classInfo) => (
          <TouchableOpacity
            key={classInfo.id}
            style={[
              styles.classCard,
              selectedClass === classInfo.id && styles.classCardSelected,
            ]}
            onPress={() => handleClassSelect(classInfo.id)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={
                selectedClass === classInfo.id
                  ? ['#8B5CF6', '#7C3AED']
                  : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']
              }
              style={styles.classCardGradient}
            >
              <View style={styles.classHeader}>
                <Text style={styles.classEmoji}>{classInfo.emoji}</Text>
                <View style={styles.classInfo}>
                  <Text style={styles.className}>{classInfo.name}</Text>
                  <Text style={styles.classDescription}>{classInfo.description}</Text>
                </View>
              </View>

              <View style={styles.bonusesContainer}>
                <Text style={styles.bonusesTitle}>Bônus:</Text>
                <View style={styles.bonusesGrid}>
                  {classInfo.bonuses.vision > 0 && (
                    <View style={styles.bonusItem}>
                      <Text style={styles.bonusIcon}>🔮</Text>
                      <Text style={styles.bonusText}>+{classInfo.bonuses.vision} Visão</Text>
                    </View>
                  )}
                  {classInfo.bonuses.management > 0 && (
                    <View style={styles.bonusItem}>
                      <Text style={styles.bonusIcon}>📊</Text>
                      <Text style={styles.bonusText}>+{classInfo.bonuses.management} Gestão</Text>
                    </View>
                  )}
                  {classInfo.bonuses.marketing > 0 && (
                    <View style={styles.bonusItem}>
                      <Text style={styles.bonusIcon}>📱</Text>
                      <Text style={styles.bonusText}>+{classInfo.bonuses.marketing} Marketing</Text>
                    </View>
                  )}
                  {classInfo.bonuses.finance > 0 && (
                    <View style={styles.bonusItem}>
                      <Text style={styles.bonusIcon}>💰</Text>
                      <Text style={styles.bonusText}>+{classInfo.bonuses.finance} Finanças</Text>
                    </View>
                  )}
                  {classInfo.bonuses.leadership > 0 && (
                    <View style={styles.bonusItem}>
                      <Text style={styles.bonusIcon}>👥</Text>
                      <Text style={styles.bonusText}>+{classInfo.bonuses.leadership} Liderança</Text>
                    </View>
                  )}
                </View>
              </View>

              {selectedClass === classInfo.id && (
                <View style={styles.selectedBadge}>
                  <Text style={styles.selectedText}>✓ Selecionado</Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#334155']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {step === 'name' && renderNameStep()}
        {step === 'class' && renderClassStep()}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 80,
  },
  stepContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    fontSize: 18,
    color: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    marginBottom: 24,
  },
  continueButton: {
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  classesScroll: {
    flex: 1,
  },
  classCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  classCardSelected: {
    borderWidth: 3,
    borderColor: '#8B5CF6',
  },
  classCardGradient: {
    padding: 20,
  },
  classHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  classEmoji: {
    fontSize: 48,
    marginRight: 16,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  classDescription: {
    fontSize: 14,
    color: '#E2E8F0',
    lineHeight: 20,
  },
  bonusesContainer: {
    marginTop: 12,
  },
  bonusesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 8,
  },
  bonusesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  bonusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  bonusIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  bonusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  selectedBadge: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default CharacterCreationScreen;
