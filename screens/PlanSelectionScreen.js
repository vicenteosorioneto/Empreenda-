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
  const [selectedPlan, setSelectedPlan] = useState<'FREE' | 'PREMIUM' | null>(null);

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

  const handlePlanSelect = async (plan: 'FREE' | 'PREMIUM') => {
    setSelectedPlan(plan);

    const subscription: UserSubscription = {
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

    // Navegar para o app principal
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'UserTypeSelection' }],
      });
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
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 30,
  },
  planCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  planCardSelected: {
    borderColor: '#8B5CF6',
    borderWidth: 3,
  },
  premiumCard: {
    padding: 0,
    overflow: 'hidden',
  },
  premiumGradient: {
    padding: 24,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
  },
  premiumPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  priceUnit: {
    fontSize: 16,
    color: '#94A3B8',
  },
  priceNote: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  planEmoji: {
    fontSize: 48,
  },
  featuresContainer: {
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 20,
  },
  featureText: {
    flex: 1,
    fontSize: 15,
    color: '#E2E8F0',
  },
  featureTextDisabled: {
    color: '#64748B',
    textDecorationLine: 'line-through',
  },
  selectedBadge: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 16,
    alignSelf: 'center',
  },
  selectedBadgePremium: {
    backgroundColor: '#8B5CF6',
  },
  selectedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  premiumWrapper: {
    position: 'relative',
  },
  trialBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: '#EF4444',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    zIndex: 1,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  trialText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default PlanSelectionScreen;
