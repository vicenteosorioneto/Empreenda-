import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Animated,
  Alert,
  Dimensions
} from 'react-native';
import { getRandomQuestions } from '../data/quizQuestions';

const { width } = Dimensions.get('window');

const DesafioEmpreendedorScreen = ({ navigation }) => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, quiz, results
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [playerChoices, setPlayerChoices] = useState([]);
  
  // Quiz mode states
  const [quizMode, setQuizMode] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  
  // Animações
  const fadeAnim = new Animated.Value(1);
  const scaleAnim = new Animated.Value(1);

  const scenarios = [
    {
      id: 1,
      situation: "🏪 Situação: Você quer abrir uma loja de produtos sustentáveis no seu bairro",
      challenge: "Qual deve ser seu PRIMEIRO passo?",
      options: [
        { 
          id: 'A', 
          text: "Comprar produtos e abrir a loja imediatamente",
          points: 10,
          feedback: "Precipitado! É importante validar a ideia primeiro."
        },
        { 
          id: 'B', 
          text: "Pesquisar se há demanda no bairro e quais produtos as pessoas querem",
          points: 100,
          feedback: "Excelente! Validação de mercado é fundamental!"
        },
        { 
          id: 'C', 
          text: "Pedir empréstimo para investir muito dinheiro",
          points: 0,
          feedback: "Cuidado! Investir sem validação é muito arriscado."
        },
        { 
          id: 'D', 
          text: "Copiar exatamente uma loja que vi na internet",
          points: 20,
          feedback: "Nem sempre o que funciona em um lugar funciona em outro."
        }
      ]
    },
    {
      id: 2,
      situation: "💡 Situação: Você teve uma ideia inovadora para um aplicativo",
      challenge: "Como validar se sua ideia realmente resolve um problema?",
      options: [
        { 
          id: 'A', 
          text: "Desenvolver o app completo antes de mostrar para alguém",
          points: 10,
          feedback: "Pode ser desperdício de tempo e dinheiro!"
        },
        { 
          id: 'B', 
          text: "Criar um protótipo simples e testar com pessoas reais",
          points: 100,
          feedback: "Perfeito! MVP (Mínimo Produto Viável) é a chave!"
        },
        { 
          id: 'C', 
          text: "Perguntar apenas para família e amigos o que acham",
          points: 30,
          feedback: "Família e amigos podem não ser imparciais."
        },
        { 
          id: 'D', 
          text: "Assumir que todos vão gostar da minha ideia",
          points: 0,
          feedback: "Perigoso! É importante testar com o público-alvo."
        }
      ]
    },
    {
      id: 3,
      situation: "💰 Situação: Você precisa de dinheiro para começar seu negócio",
      challenge: "Qual a melhor estratégia para conseguir recursos?",
      options: [
        { 
          id: 'A', 
          text: "Começar pequeno com o dinheiro que tenho",
          points: 80,
          feedback: "Ótima estratégia! Bootstrap é uma opção inteligente."
        },
        { 
          id: 'B', 
          text: "Preparar um pitch convincente e buscar investidores",
          points: 100,
          feedback: "Excelente! Investidores podem acelerar o crescimento."
        },
        { 
          id: 'C', 
          text: "Pedir dinheiro emprestado de qualquer lugar",
          points: 20,
          feedback: "Cuidado! Dívidas mal planejadas podem quebrar o negócio."
        },
        { 
          id: 'D', 
          text: "Desistir da ideia por falta de dinheiro",
          points: 0,
          feedback: "Não desista! Há várias formas criativas de começar."
        }
      ]
    },
    {
      id: 4,
      situation: "📈 Situação: Seu negócio está começando a crescer",
      challenge: "Como garantir que o crescimento seja sustentável?",
      options: [
        { 
          id: 'A', 
          text: "Crescer o mais rápido possível sem se preocupar com qualidade",
          points: 10,
          feedback: "Perigoso! Crescimento sem estrutura pode causar problemas."
        },
        { 
          id: 'B', 
          text: "Manter controle financeiro e investir em sistemas",
          points: 100,
          feedback: "Perfeito! Base sólida é essencial para crescimento saudável."
        },
        { 
          id: 'C', 
          text: "Contratar muitas pessoas rapidamente",
          points: 30,
          feedback: "Cuidado! Contratações devem ser planejadas."
        },
        { 
          id: 'D', 
          text: "Manter tudo do mesmo jeito",
          points: 40,
          feedback: "Crescer exige adaptação e melhoria contínua."
        }
      ]
    },
    {
      id: 5,
      situation: "🤝 Situação: Um concorrente apareceu no mercado",
      challenge: "Qual a melhor forma de lidar com a concorrência?",
      options: [
        { 
          id: 'A', 
          text: "Baixar preços para eliminar o concorrente",
          points: 20,
          feedback: "Guerra de preços pode prejudicar ambos os negócios."
        },
        { 
          id: 'B', 
          text: "Focar em melhorar meu produto e diferencial",
          points: 100,
          feedback: "Excelente! Inovação e diferenciação são chaves do sucesso."
        },
        { 
          id: 'C', 
          text: "Copiar tudo que o concorrente faz",
          points: 10,
          feedback: "Copiar não te dá vantagem competitiva sustentável."
        },
        { 
          id: 'D', 
          text: "Ignorar completamente a concorrência",
          points: 30,
          feedback: "É importante monitorar o mercado e aprender."
        }
      ]
    }
  ];

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      finishGame();
    }
    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  const startGame = () => {
    setGameState('playing');
    setCurrentScenario(0);
    setScore(0);
    setTimeLeft(60);
    setPlayerChoices([]);
    setQuizMode(false);
  };

  const startQuizMode = () => {
    const questions = getRandomQuestions(5);
    setQuizQuestions(questions);
    setCurrentQuizQuestion(0);
    setQuizScore(0);
    setGameState('quiz');
    setQuizMode(true);
  };

  const handleQuizAnswer = (selectedOption) => {
    const currentQuestion = quizQuestions[currentQuizQuestion];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setQuizScore(quizScore + 100);
      Alert.alert('✅ Correto!', currentQuestion.explanation, [
        {
          text: 'Próxima',
          onPress: () => {
            if (currentQuizQuestion < quizQuestions.length - 1) {
              setCurrentQuizQuestion(currentQuizQuestion + 1);
            } else {
              setGameState('results');
              setScore(quizScore + 100);
            }
          }
        }
      ]);
    } else {
      Alert.alert('❌ Incorreto', currentQuestion.explanation, [
        {
          text: 'Próxima',
          onPress: () => {
            if (currentQuizQuestion < quizQuestions.length - 1) {
              setCurrentQuizQuestion(currentQuizQuestion + 1);
            } else {
              setGameState('results');
              setScore(quizScore);
            }
          }
        }
      ]);
    }
  };

  const selectOption = (option) => {
    const newChoices = [...playerChoices, {
      scenario: currentScenario,
      choice: option,
      points: option.points
    }];
    setPlayerChoices(newChoices);
    setScore(score + option.points);

    // Animação de feedback
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();

    // Mostrar feedback
    Alert.alert(
      `${option.points > 70 ? '🎉' : option.points > 30 ? '👍' : '🤔'} ${option.points} pontos!`,
      option.feedback,
      [
        {
          text: 'Próximo',
          onPress: () => {
            if (currentScenario < scenarios.length - 1) {
              setCurrentScenario(currentScenario + 1);
            } else {
              finishGame();
            }
          }
        }
      ]
    );
  };

  const finishGame = () => {
    setGameState('results');
  };

  const getPerformanceLevel = () => {
    const maxPossibleScore = scenarios.length * 100;
    const percentage = (score / maxPossibleScore) * 100;
    
    if (percentage >= 90) return { level: 'Mestre Empreendedor', emoji: '👑', color: '#F59E0B' };
    if (percentage >= 75) return { level: 'Empreendedor Experiente', emoji: '🚀', color: '#10B981' };
    if (percentage >= 60) return { level: 'Empreendedor Promissor', emoji: '⭐', color: '#3B82F6' };
    if (percentage >= 40) return { level: 'Empreendedor Iniciante', emoji: '🌱', color: '#8B5CF6' };
    return { level: 'Futuro Empreendedor', emoji: '💡', color: '#6B7280' };
  };

  if (gameState === 'menu') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🎮 Desafio Empreendedor</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.menuCard}>
            <Text style={styles.gameTitle}>⚡ DESAFIO EMPREENDEDOR</Text>
            <Text style={styles.gameSubtitle}>Teste suas habilidades empreendedoras!</Text>
            
            <View style={styles.gameInfo}>
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>🎯</Text>
                <Text style={styles.infoText}>5 cenários desafiadores</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>⏱️</Text>
                <Text style={styles.infoText}>60 segundos para decidir</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>🏆</Text>
                <Text style={styles.infoText}>Até 500 pontos possíveis</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>🧠</Text>
                <Text style={styles.infoText}>Decisões estratégicas</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.startButton} onPress={startGame}>
              <Text style={styles.startButtonText}>🚀 Começar Desafio</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.startButton, { backgroundColor: '#8B5CF6', marginTop: 12 }]} 
              onPress={startQuizMode}
            >
              <Text style={styles.startButtonText}>📝 Modo Quiz</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.instructionsCard}>
            <Text style={styles.instructionsTitle}>📋 Como Jogar</Text>
            <Text style={styles.instructionsText}>
              • Você enfrentará 5 situações empreendedoras reais{'\n'}
              • Escolha a melhor estratégia para cada cenário{'\n'}
              • Ganhe pontos baseados na qualidade das suas decisões{'\n'}
              • Aprenda com feedback personalizado{'\n'}
              • Descubra seu nível empreendedor!{'\n'}
              • Ou teste seus conhecimentos no Modo Quiz!
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  if (gameState === 'quiz') {
    const question = quizQuestions[currentQuizQuestion];
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setGameState('menu')}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>📝 Quiz Empreendedor</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <View style={styles.quizProgress}>
            <Text style={styles.progressText}>
              Pergunta {currentQuizQuestion + 1} de {quizQuestions.length}
            </Text>
            <Text style={styles.quizScoreText}>Pontuação: {quizScore}</Text>
          </View>

          <View style={styles.quizCard}>
            <Text style={styles.quizQuestion}>{question.question}</Text>
            
            <View style={styles.quizOptionsContainer}>
              {['a', 'b', 'c', 'd'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.quizOption}
                  onPress={() => handleQuizAnswer(option)}
                >
                  <View style={styles.quizOptionHeader}>
                    <Text style={styles.quizOptionLetter}>{option.toUpperCase()}</Text>
                  </View>
                  <Text style={styles.quizOptionText}>{question[option]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  }

  if (gameState === 'playing') {
    const scenario = scenarios[currentScenario];
    
    return (
      <View style={styles.container}>
        <View style={styles.gameHeader}>
          <View style={styles.gameProgress}>
            <Text style={styles.progressText}>
              Cenário {currentScenario + 1} de {scenarios.length}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentScenario + 1) / scenarios.length) * 100}%` }
                ]} 
              />
            </View>
          </View>
          
          <View style={styles.gameStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{score}</Text>
              <Text style={styles.statLabel}>Pontos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: timeLeft < 20 ? '#EF4444' : '#10B981' }]}>
                {timeLeft}s
              </Text>
              <Text style={styles.statLabel}>Tempo</Text>
            </View>
          </View>
        </View>

        <Animated.View style={[styles.scenarioCard, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.situationText}>{scenario.situation}</Text>
          <Text style={styles.challengeText}>{scenario.challenge}</Text>
          
          <View style={styles.optionsContainer}>
            {scenario.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionButton}
                onPress={() => selectOption(option)}
              >
                <View style={styles.optionHeader}>
                  <Text style={styles.optionId}>{option.id}</Text>
                </View>
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    );
  }

  if (gameState === 'results') {
    const performance = getPerformanceLevel();
    const maxPossibleScore = scenarios.length * 100;
    const percentage = Math.round((score / maxPossibleScore) * 100);
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🏆 Resultado Final</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.resultsCard}>
            <Text style={styles.performanceEmoji}>{performance.emoji}</Text>
            <Text style={styles.performanceLevel}>{performance.level}</Text>
            <Text style={styles.finalScore}>{score} / {maxPossibleScore} pontos</Text>
            <Text style={styles.percentage}>{percentage}% de acertos</Text>
            
            <View style={styles.resultStats}>
              <View style={styles.resultStat}>
                <Text style={styles.resultStatNumber}>{playerChoices.filter(c => c.points >= 80).length}</Text>
                <Text style={styles.resultStatLabel}>Decisões Excelentes</Text>
              </View>
              <View style={styles.resultStat}>
                <Text style={styles.resultStatNumber}>{playerChoices.filter(c => c.points >= 40 && c.points < 80).length}</Text>
                <Text style={styles.resultStatLabel}>Decisões Boas</Text>
              </View>
              <View style={styles.resultStat}>
                <Text style={styles.resultStatNumber}>{playerChoices.filter(c => c.points < 40).length}</Text>
                <Text style={styles.resultStatLabel}>Precisa Melhorar</Text>
              </View>
            </View>
          </View>

          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackTitle}>💡 Dicas para Melhorar</Text>
            <View style={styles.tipsContainer}>
              <Text style={styles.tip}>• Sempre valide suas ideias antes de investir</Text>
              <Text style={styles.tip}>• Mantenha controle financeiro rigoroso</Text>
              <Text style={styles.tip}>• Foque no cliente e resolva problemas reais</Text>
              <Text style={styles.tip}>• Aprenda com concorrentes sem copiar</Text>
              <Text style={styles.tip}>• Construa uma base sólida antes de escalar</Text>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={styles.playAgainButton} 
              onPress={() => setGameState('menu')}
            >
              <Text style={styles.playAgainText}>🔄 Jogar Novamente</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => navigation.navigate('MainHub')}
            >
              <Text style={styles.continueText}>➡️ Continuar Trilhas</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 40,
    backgroundColor: 'white',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 19,
    color: '#6B7280',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  placeholder: {
    width: 35,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  gameTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  gameSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'center',
  },
  gameInfo: {
    width: '100%',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 24,
  },
  infoText: {
    fontSize: 13,
    color: '#374151',
  },
  startButton: {
    backgroundColor: '#10B981',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  instructionsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 18,
  },
  gameHeader: {
    backgroundColor: 'white',
    padding: 16,
    paddingTop: 40,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  gameProgress: {
    marginBottom: 12,
  },
  progressText: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 6,
  },
  progressBar: {
    height: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
  gameStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#10B981',
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
  },
  scenarioCard: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  situationText: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 12,
    lineHeight: 19,
  },
  challengeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  optionId: {
    backgroundColor: '#10B981',
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 8,
  },
  optionText: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 18,
  },
  resultsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  performanceEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  performanceLevel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  finalScore: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 4,
  },
  percentage: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 20,
  },
  resultStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  resultStat: {
    alignItems: 'center',
  },
  resultStatNumber: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  resultStatLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
  feedbackCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  feedbackTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  tipsContainer: {
    gap: 6,
  },
  tip: {
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 16,
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 16,
  },
  playAgainButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  playAgainText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  continueText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  quizProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  quizScoreText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  quizCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  quizQuestion: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    lineHeight: 21,
  },
  quizOptionsContainer: {
    gap: 12,
  },
  quizOption: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  quizOptionHeader: {
    marginBottom: 6,
  },
  quizOptionLetter: {
    backgroundColor: '#8B5CF6',
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  quizOptionText: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 18,
  },
});

export default DesafioEmpreendedorScreen;