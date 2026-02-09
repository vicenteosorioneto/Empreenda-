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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButtonHeader: {
    padding: 10,
    marginRight: 'auto',
  },
  skipButton: {
    padding: 10,
    marginLeft: 'auto',
  },
  skipText: {
    fontSize: 16,
    color: '#64B5F6',
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressDot: {
    height: 8,
    borderRadius: 4,
    transition: 'all 0.3s ease',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  visualContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emojiContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  mainEmoji: {
    fontSize: 60,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#0FF',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 16,
    color: '#E0F2FF',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500',
  },
  featuresContainer: {
    gap: 12,
    marginVertical: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#00D9FF',
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    backgroundColor: 'rgba(0, 217, 255, 0.2)',
    borderWidth: 2,
    borderColor: '#00D9FF',
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  featureEmoji: {
    fontSize: 28,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
    gap: 15,
  },
  navButton: {
    flex: 1,
    borderRadius: 25,
    padding: 18,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#0F1B2E',
    borderWidth: 2,
    borderColor: '#00D9FF',
  },
  nextButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  disabledButton: {
    opacity: 0.4,
    backgroundColor: '#1A2F42',
  },
  navButtonText: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
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