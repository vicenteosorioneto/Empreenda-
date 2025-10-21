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
      color: '#10B981',
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
      color: '#3B82F6',
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
      color: '#F59E0B',
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
      color: '#8B5CF6',
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
      color: '#EF4444',
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
    <View style={[styles.container, { backgroundColor: currentStepData.color + '10' }]}>
      {/* Header */}
      <View style={styles.header}>
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
            {currentStepData.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: currentStepData.color + '20' }]}>
                  <Text style={styles.featureEmoji}>{feature.icon}</Text>
                </View>
                <Text style={styles.featureText}>{feature.text}</Text>
              </View>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
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
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  mainEmoji: {
    fontSize: 60,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    gap: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
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
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  nextButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButtonText: {
    color: '#6B7280',
  },
  nextButtonText: {
    color: 'white',
  },
  disabledButtonText: {
    color: '#9CA3AF',
  },
});

export default OnboardingScreen;