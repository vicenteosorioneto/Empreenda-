import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mascot } from '../components/Mascot';
import StorageService from '../services/StorageService';
import { UserProfile } from '../types/onboarding';

// 🎮 CRIAÇÃO DE PERFIL GAMIFICADA - Etapa 1: Objetivo

const GameProfileScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({});

  const goals = [
    { id: 'learn', emoji: '📚', title: 'Aprender', description: 'Quero aprender sobre empreendedorismo' },
    { id: 'idea', emoji: '💡', title: 'Ter uma ideia', description: 'Quero descobrir uma ideia de negócio' },
    { id: 'business', emoji: '🚀', title: 'Criar negócio', description: 'Quero tirar minha ideia do papel' },
    { id: 'grow', emoji: '📈', title: 'Crescer', description: 'Já tenho um negócio e quero crescer' },
  ];

  const handleGoalSelect = (goal: string) => {
    setProfile({ ...profile, goal });
    setStep(2);
  };

  const handleIdeaSelect = (hasIdea: boolean) => {
    setProfile({ ...profile, hasIdea });
    setStep(3);
  };

  const motivations = [
    { id: 'freedom', emoji: '🦅', title: 'Liberdade', description: 'Ser meu próprio chefe' },
    { id: 'impact', emoji: '🌍', title: 'Impacto', description: 'Fazer diferença no mundo' },
    { id: 'money', emoji: '💰', title: 'Financeiro', description: 'Ter independência financeira' },
    { id: 'passion', emoji: '❤️', title: 'Paixão', description: 'Fazer o que amo' },
  ];

  const handleMotivationSelect = (motivation: string) => {
    setProfile({ ...profile, motivation });
    setStep(4);
  };

  const timeOptions = [
    { minutes: 5, emoji: '⚡', title: '5 minutos', description: 'Rápido e direto' },
    { minutes: 10, emoji: '🎯', title: '10 minutos', description: 'Equilibrado' },
    { minutes: 15, emoji: '🔥', title: '15 minutos', description: 'Mais completo' },
    { minutes: 30, emoji: '💪', title: '30+ minutos', description: 'Dedicação total' },
  ];

  const handleTimeSelect = async (minutes: number) => {
    const completeProfile: UserProfile = {
      ...profile,
      dailyMinutes: minutes,
    } as UserProfile;

    // Salvar perfil
    await StorageService.saveUserProfile(completeProfile);

    // Atualizar progresso
    const progress = await StorageService.getOnboardingProgress();
    if (progress) {
      await StorageService.saveOnboardingProgress({
        ...progress,
        profileCreated: true,
        currentStep: 2,
      });
    }

    // Navegar para configuração de meta
    navigation.navigate('DailyGoal', { dailyMinutes: minutes });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Mascot
              size="medium"
              message="Primeiro, me conta: qual é seu objetivo no Empreenda+?"
              animated={true}
            />
            <View style={styles.optionsContainer}>
              {goals.map((goal) => (
                <TouchableOpacity
                  key={goal.id}
                  style={styles.optionCard}
                  onPress={() => handleGoalSelect(goal.id)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['rgba(139, 92, 246, 0.1)', 'rgba(217, 70, 239, 0.1)']}
                    style={styles.cardGradient}
                  >
                    <Text style={styles.optionEmoji}>{goal.emoji}</Text>
                    <Text style={styles.optionTitle}>{goal.title}</Text>
                    <Text style={styles.optionDescription}>{goal.description}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );

      case 2:
        return (
          <>
            <Mascot
              size="medium"
              message="Legal! Você já tem alguma ideia de negócio em mente?"
              animated={true}
            />
            <View style={styles.binaryOptions}>
              <TouchableOpacity
                style={styles.binaryCard}
                onPress={() => handleIdeaSelect(true)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#10B981', '#059669']}
                  style={styles.binaryGradient}
                >
                  <Text style={styles.binaryEmoji}>✅</Text>
                  <Text style={styles.binaryText}>Sim, já tenho!</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.binaryCard}
                onPress={() => handleIdeaSelect(false)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#F59E0B', '#D97706']}
                  style={styles.binaryGradient}
                >
                  <Text style={styles.binaryEmoji}>🔍</Text>
                  <Text style={styles.binaryText}>Ainda não</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
        );

      case 3:
        return (
          <>
            <Mascot
              size="medium"
              message="O que mais te motiva a empreender?"
              animated={true}
            />
            <View style={styles.optionsContainer}>
              {motivations.map((motivation) => (
                <TouchableOpacity
                  key={motivation.id}
                  style={styles.optionCard}
                  onPress={() => handleMotivationSelect(motivation.id)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['rgba(139, 92, 246, 0.1)', 'rgba(217, 70, 239, 0.1)']}
                    style={styles.cardGradient}
                  >
                    <Text style={styles.optionEmoji}>{motivation.emoji}</Text>
                    <Text style={styles.optionTitle}>{motivation.title}</Text>
                    <Text style={styles.optionDescription}>{motivation.description}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );

      case 4:
        return (
          <>
            <Mascot
              size="medium"
              message="Quanto tempo você pode dedicar por dia?"
              animated={true}
            />
            <View style={styles.timeOptionsContainer}>
              {timeOptions.map((option) => (
                <TouchableOpacity
                  key={option.minutes}
                  style={styles.timeCard}
                  onPress={() => handleTimeSelect(option.minutes)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['rgba(139, 92, 246, 0.15)', 'rgba(217, 70, 239, 0.15)']}
                    style={styles.timeGradient}
                  >
                    <Text style={styles.timeEmoji}>{option.emoji}</Text>
                    <Text style={styles.timeTitle}>{option.title}</Text>
                    <Text style={styles.timeDescription}>{option.description}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );
    }
  };

  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B', '#334155']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.progressContainer}>
          <View style={styles.progressDots}>
            {[1, 2, 3, 4].map((dot) => (
              <View
                key={dot}
                style={[
                  styles.progressDot,
                  dot <= step && styles.progressDotActive,
                ]}
              />
            ))}
          </View>
          <Text style={styles.progressText}>Etapa {step} de 4</Text>
        </View>

        {renderStep()}
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
    paddingTop: 60,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  progressDots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressDotActive: {
    backgroundColor: '#8B5CF6',
  },
  progressText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  optionsContainer: {
    gap: 12,
    marginTop: 30,
  },
  optionCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  cardGradient: {
    padding: 20,
    alignItems: 'center',
  },
  optionEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
  binaryOptions: {
    gap: 16,
    marginTop: 30,
  },
  binaryCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  binaryGradient: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  binaryEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  binaryText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  timeOptionsContainer: {
    gap: 12,
    marginTop: 30,
  },
  timeCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  timeGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  timeTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  timeDescription: {
    fontSize: 14,
    color: '#94A3B8',
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: 8,
  },
});

export default GameProfileScreen;
