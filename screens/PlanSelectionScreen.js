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
import { UserSubscription } from '../types/onboarding';

// 💎 SELEÇÃO DE PLANO - Paywall Suave

const PlanSelectionScreen = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const features = {
    free: [
      { icon: '✅', text: 'Missões básicas', included: true },
      { icon: '✅', text: '5 trilhas de aprendizado', included: true },
      { icon: '✅', text: 'Sistema de ranking', included: true },
      { icon: '❌', text: 'Mentorias exclusivas', included: false },
      { icon: '❌', text: 'Certificados', included: false },
      { icon: '❌', text: 'Conteúdo premium', included: false },
    ],
    premium: [
      { icon: '✅', text: 'TUDO do plano grátis', included: true },
      { icon: '✅', text: 'Mentorias com especialistas', included: true },
      { icon: '✅', text: 'Certificados oficiais', included: true },
      { icon: '✅', text: 'Conteúdo premium ilimitado', included: true },
      { icon: '✅', text: 'Análise de ideias por IA', included: true },
      { icon: '✅', text: 'Plano de negócios personalizado', included: true },
    ],
  };

  const handlePlanSelect = async (plan) => {
    setSelectedPlan(plan);

    const subscription = {
      plan,
      isTrialActive: plan === 'PREMIUM',
      trialStartDate: plan === 'PREMIUM' ? new Date().toISOString() : undefined,
      trialEndDate: plan === 'PREMIUM'
        ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        : undefined,
    };

    await StorageService.saveSubscription(subscription);

    // Atualizar progresso
    const progress = await StorageService.getOnboardingProgress();
    if (progress) {
      await StorageService.saveOnboardingProgress({
        ...progress,
        planSelected: true,
        currentStep: 4,
      });
    }

    // Navegar para seleção de modo
    setTimeout(() => {
      navigation.navigate('ModeSelection');
    }, 1500);
  };

  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B', '#334155']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Mascot
          size="medium"
          message="Escolha o plano ideal para sua jornada empreendedora! 🚀"
          animated={true}
        />

        <Text style={styles.subtitle}>
          Você pode começar grátis e evoluir depois
        </Text>

        {/* Plano Grátis */}
        <TouchableOpacity
          style={[
            styles.planCard,
            selectedPlan === 'FREE' && styles.planCardSelected,
          ]}
          onPress={() => handlePlanSelect('FREE')}
          activeOpacity={0.9}
        >
          <View style={styles.planHeader}>
            <View>
              <Text style={styles.planName}>Empreenda+</Text>
              <Text style={styles.planPrice}>Grátis</Text>
            </View>
            <Text style={styles.planEmoji}>🚀</Text>
          </View>

          <View style={styles.featuresContainer}>
            {features.free.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={[
                  styles.featureText,
                  !feature.included && styles.featureTextDisabled
                ]}>
                  {feature.text}
                </Text>
              </View>
            ))}
          </View>

          {selectedPlan === 'FREE' && (
            <View style={styles.selectedBadge}>
              <Text style={styles.selectedText}>✓ Selecionado</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Plano Premium */}
        <View style={styles.premiumWrapper}>
          <View style={styles.trialBadge}>
            <Text style={styles.trialText}>🎁 7 DIAS GRÁTIS</Text>
          </View>
          
          <TouchableOpacity
            style={[
              styles.planCard,
              styles.premiumCard,
              selectedPlan === 'PREMIUM' && styles.planCardSelected,
            ]}
            onPress={() => handlePlanSelect('PREMIUM')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['rgba(139, 92, 246, 0.2)', 'rgba(217, 70, 239, 0.2)']}
              style={styles.premiumGradient}
            >
              <View style={styles.planHeader}>
                <View>
                  <Text style={styles.planName}>Super Empreenda+</Text>
                  <Text style={styles.premiumPrice}>
                    R$ 19,90<Text style={styles.priceUnit}>/mês</Text>
                  </Text>
                  <Text style={styles.priceNote}>Após período de teste</Text>
                </View>
                <Text style={styles.planEmoji}>💎</Text>
              </View>

              <View style={styles.featuresContainer}>
                {features.premium.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <Text style={styles.featureIcon}>{feature.icon}</Text>
                    <Text style={styles.featureText}>{feature.text}</Text>
                  </View>
                ))}
              </View>

              {selectedPlan === 'PREMIUM' && (
                <View style={[styles.selectedBadge, styles.selectedBadgePremium]}>
                  <Text style={styles.selectedText}>✓ Selecionado</Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Text style={styles.disclaimer}>
          💡 Você pode mudar de plano a qualquer momento
        </Text>
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
    paddingTop: 48,
    paddingBottom: 32,
  },
  subtitle: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 13,
    marginBottom: 24,
  },
  planCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 19,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  planCardSelected: {
    borderColor: '#8B5CF6',
    borderWidth: 2,
  },
  premiumCard: {
    padding: 0,
    overflow: 'hidden',
  },
  premiumGradient: {
    padding: 19,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  planName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  planPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#10B981',
  },
  premiumPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  priceUnit: {
    fontSize: 13,
    color: '#94A3B8',
  },
  priceNote: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 3,
  },
  planEmoji: {
    fontSize: 38,
  },
  featuresContainer: {
    gap: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 13,
    marginRight: 10,
    width: 16,
  },
  featureText: {
    flex: 1,
    fontSize: 12,
    color: '#E2E8F0',
  },
  featureTextDisabled: {
    color: '#64748B',
    textDecorationLine: 'line-through',
  },
  selectedBadge: {
    backgroundColor: '#10B981',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 13,
    marginTop: 13,
    alignSelf: 'center',
  },
  selectedBadgePremium: {
    backgroundColor: '#8B5CF6',
  },
  selectedText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  premiumWrapper: {
    position: 'relative',
  },
  trialBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    backgroundColor: '#EF4444',
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 13,
    zIndex: 1,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  trialText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
});

export default PlanSelectionScreen;
