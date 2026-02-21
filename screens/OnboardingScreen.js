import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const onboardingSteps = [
    {
      id: 0,
      title: 'Bem-vindo ao EMPREENDA+',
      subtitle: 'Sua jornada empreendedora começa aqui!',
      description: 'Descubra, aprenda e transforme suas ideias em projetos reais que fazem a diferença no mundo.',
      emoji: '🧭',
      color: '#0066FF',
      features: [
        { icon: '🗺️', text: 'Trilhas de aprendizado gamificadas' },
        { icon: '🏆', text: 'Sistema de conquistas e XP' },
        { icon: '🤝', text: 'Colaboração com outros jovens' },
        { icon: '🌍', text: 'Impacto real na sociedade' }
      ]
    },
    {
      id: 1,
      title: 'Explore as Trilhas',
      subtitle: '5 caminhos para dominar o empreendedorismo',
      description: 'Cada trilha te ensina uma habilidade essencial. Complete missões, ganhe XP e desbloqueie novos desafios!',
      emoji: '🗺️',
      color: '#7C3AED',
      features: [
        { icon: '💡', text: 'Identificação de Oportunidades' },
        { icon: '🎯', text: 'Validação de Ideias' },
        { icon: '🚀', text: 'Desenvolvimento de MVP' },
        { icon: '📊', text: 'Modelos de Negócio' },
        { icon: '💰', text: 'Estratégias de Crescimento' }
      ]
    },
    {
      id: 2,
      title: 'Ganhe XP e Conquistas',
      subtitle: 'Evolua como empreendedor',
      description: 'Complete missões, resolva desafios e colabore com outros. Cada ação te dá pontos de experiência!',
      emoji: '🏆',
      color: '#10B981',
      features: [
        { icon: '⭐', text: 'Ganhe XP a cada missão' },
        { icon: '🎖️', text: 'Desbloqueie medalhas especiais' },
        { icon: '📈', text: 'Suba de nível constantemente' },
        { icon: '👑', text: 'Compete no ranking global' }
      ]
    },
    {
      id: 3,
      title: 'Crie Impacto Real',
      subtitle: 'Transforme o mundo com suas ideias',
      description: 'Seus projetos podem gerar impacto positivo na sociedade. Acompanhe como você está mudando o mundo!',
      emoji: '🌍',
      color: '#06B6D4',
      features: [
        { icon: '🌱', text: 'Impacto ambiental positivo' },
        { icon: '🤝', text: 'Benefício para comunidades' },
        { icon: '💼', text: 'Criação de oportunidades' },
        { icon: '📊', text: 'Métricas de impacto em tempo real' }
      ]
    },
    {
      id: 4,
      title: 'Vamos Começar!',
      subtitle: 'Sua aventura empreendedora te espera',
      description: 'Pronto para se tornar o próximo grande empreendedor? Vamos criar o futuro juntos!',
      emoji: '🚀',
      color: '#EC4899',
      features: [
        { icon: '👤', text: 'Crie seu perfil' },
        { icon: '🎯', text: 'Escolha sua primeira trilha' },
        { icon: '⚡', text: 'Complete sua primeira missão' },
        { icon: '🎉', text: 'Comece a fazer a diferença!' }
      ]
    }
  ];

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep(currentStep + 1);
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      });
    } else {
      navigation.replace('Login');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep(currentStep - 1);
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const skipOnboarding = () => {
    navigation.replace('Login');
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {currentStep > 0 && (
          <TouchableOpacity 
            style={styles.backButtonHeader}
            onPress={prevStep}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={skipOnboarding}
        >
          <Text style={styles.skipText}>Pular</Text>
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                {
                  backgroundColor: index <= currentStep ? currentStepData.color : '#E5E7EB',
                  width: index === currentStep ? 20 : 8,
                }
              ]}
            />
          ))}
        </View>
      </View>

      {/* Content */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <ScrollView 
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Main Visual */}
          <View style={styles.visualContainer}>
            <View style={[styles.emojiContainer, { backgroundColor: currentStepData.color }]}>
              <Text style={styles.mainEmoji}>{currentStepData.emoji}</Text>
            </View>
            
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{currentStepData.title}</Text>
              <Text style={styles.subtitle}>{currentStepData.subtitle}</Text>
              <Text style={styles.description}>{currentStepData.description}</Text>
            </View>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            {currentStepData?.features && currentStepData.features.map((feature, index) => (
              <LinearGradient
                key={index}
                colors={[ 'rgba(15, 23, 42, 0.8)', 'rgba(30, 41, 59, 0.95)' ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.featureItem}
              >
                <View style={[styles.featureIcon]}>
                  <Text style={styles.featureEmoji}>{feature.icon}</Text>
                </View>
                <Text style={styles.featureText}>{feature.text}</Text>
              </LinearGradient>
            ))}
          </View>
        </ScrollView>
      </Animated.View>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity 
          style={[
            styles.navButton,
            styles.backButton,
            currentStep === 0 && styles.disabledButton
          ]}
          onPress={prevStep}
          disabled={currentStep === 0}
        >
          <Text style={[
            styles.navButtonText,
            styles.backButtonText,
            currentStep === 0 && styles.disabledButtonText
          ]}>
            ← Anterior
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, styles.nextButton, { backgroundColor: currentStepData.color }]}
          onPress={nextStep}
        >
          <Text style={[styles.navButtonText, styles.nextButtonText]}>
            {currentStep === onboardingSteps.length - 1 ? 'Começar!' : 'Próximo →'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  backButtonHeader: {
    padding: 8,
    marginRight: 'auto',
  },
  skipButton: {
    padding: 8,
    marginLeft: 'auto',
  },
  skipText: {
    fontSize: 13,
    color: '#64B5F6',
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressDot: {
    height: 6,
    borderRadius: 3,
    transition: 'all 0.3s ease',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
  visualContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emojiContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  mainEmoji: {
    fontSize: 48,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.4,
  },
  subtitle: {
    fontSize: 14,
    color: '#0FF',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 13,
    color: '#E0F2FF',
    textAlign: 'center',
    lineHeight: 21,
    fontWeight: '500',
  },
  featuresContainer: {
    gap: 10,
    marginVertical: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 13,
    padding: 16,
    marginVertical: 6,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#00D9FF',
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  featureIcon: {
    width: 45,
    height: 45,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
    backgroundColor: 'rgba(0, 217, 255, 0.2)',
    borderWidth: 2,
    borderColor: '#00D9FF',
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  featureEmoji: {
    fontSize: 22,
  },
  featureText: {
    flex: 1,
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 32,
    gap: 12,
  },
  navButton: {
    flex: 1,
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#0F1B2E',
    borderWidth: 2,
    borderColor: '#00D9FF',
  },
  nextButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  disabledButton: {
    opacity: 0.4,
    backgroundColor: '#1A2F42',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  backButtonText: {
    color: '#00D9FF',
  },
  nextButtonText: {
    color: '#FFFFFF',
  },
  disabledButtonText: {
    color: '#9CA3AF',
  },
});

export default OnboardingScreen;