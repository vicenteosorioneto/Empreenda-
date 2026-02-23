import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CLASSES_INFO } from '../data/skillsData';
import RPGEngine from '../services/RPGEngine';

// 🎭 CRIACAO DE PERSONAGEM RPG

const CharacterCreationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [step, setStep] = useState('name');

  const handleNameSubmit = () => {
    if (name.trim().length < 3) {
      alert('Nome deve ter pelo menos 3 caracteres');
      return;
    }
    setStep('class');
  };

  const handleClassSelect = async (classId) => {
    setSelectedClass(classId);

    // Pequeno delay para feedback visual
    setTimeout(async () => {
      await RPGEngine.initializeNewCharacter(name, classId);
      navigation.replace('GameHub');
    }, 500);
  };

  const renderNameStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Qual e o seu nome?</Text>
      <Text style={styles.subtitle}>Como voce quer ser chamado nessa jornada?</Text>

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
      <Text style={styles.subtitle}>Cada classe tem habilidades e bonus unicos</Text>

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
                <Text style={styles.bonusesTitle}>Bonus:</Text>
                <View style={styles.bonusesGrid}>
                  {classInfo.bonuses.vision > 0 && (
                    <View style={styles.bonusItem}>
                      <Text style={styles.bonusIcon}>🔮</Text>
                      <Text style={styles.bonusText}>+{classInfo.bonuses.vision} Visao</Text>
                    </View>
                  )}
                  {classInfo.bonuses.management > 0 && (
                    <View style={styles.bonusItem}>
                      <Text style={styles.bonusIcon}>📊</Text>
                      <Text style={styles.bonusText}>+{classInfo.bonuses.management} Gestao</Text>
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
                      <Text style={styles.bonusText}>+{classInfo.bonuses.finance} Financas</Text>
                    </View>
                  )}
                  {classInfo.bonuses.leadership > 0 && (
                    <View style={styles.bonusItem}>
                      <Text style={styles.bonusIcon}>👥</Text>
                      <Text style={styles.bonusText}>+{classInfo.bonuses.leadership} Lideranca</Text>
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
    padding: 16,
    paddingTop: 64,
    flexGrow: 1,
  },
  stepContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 19,
    textAlign: 'center',
    lineHeight: 18,
  },
  input: {
    padding: 13,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    color: '#FFFFFF',
    fontSize: 13,
    marginBottom: 19,
  },
  continueButton: {
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonGradient: {
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  classesScroll: {
    flex: 1,
    marginBottom: 13,
  },
  classCard: {
    marginBottom: 13,
    borderRadius: 16,
    overflow: 'hidden',
  },
  classCardSelected: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  classCardGradient: {
    padding: 16,
  },
  classHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  classEmoji: {
    fontSize: 38,
    marginRight: 12,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  classDescription: {
    fontSize: 12,
    color: '#E2E8F0',
    lineHeight: 18,
  },
  bonusesContainer: {
    marginTop: 10,
  },
  bonusesTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 6,
  },
  bonusesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  bonusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  bonusIcon: {
    fontSize: 11,
    marginRight: 3,
  },
  bonusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  selectedBadge: {
    backgroundColor: '#10B981',
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  selectedText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default CharacterCreationScreen;
