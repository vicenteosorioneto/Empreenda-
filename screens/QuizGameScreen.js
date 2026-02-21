import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import NavigationHeader from '../components/NavigationHeader';
import { getRandomQuestions } from '../data/quizQuestions';

const { width } = Dimensions.get('window');
const TIMER_SECONDS = 20;

export default function QuizGameScreen({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (gameStarted && !isAnswered && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeOut();
    }
  }, [timeLeft, gameStarted, isAnswered]);

  const startGame = () => {
    const quizQuestions = getRandomQuestions(10);
    setQuestions(quizQuestions);
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(TIMER_SECONDS);
    setAnswers([]);
  };

  const handleTimeOut = () => {
    setIsAnswered(true);
    setAnswers([...answers, {
      questionId: questions[currentQuestion].id,
      selectedAnswer: null,
      correct: false,
      timeTaken: TIMER_SECONDS,
      points: 0
    }]);
    
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const handleAnswerSelect = (optionId) => {
    if (isAnswered) return;

    setSelectedAnswer(optionId);
    setIsAnswered(true);

    const currentQ = questions[currentQuestion];
    const selectedOption = currentQ.options.find(opt => opt.id === optionId);
    const isCorrect = selectedOption.correct;
    const timeTaken = TIMER_SECONDS - timeLeft;
    
    // Pontuação: base 100 pontos + bônus de velocidade
    let points = 0;
    if (isCorrect) {
      const speedBonus = Math.floor((timeLeft / TIMER_SECONDS) * 50);
      points = 100 + speedBonus;
      setScore(score + points);
    }

    setAnswers([...answers, {
      questionId: currentQ.id,
      selectedAnswer: optionId,
      correct: isCorrect,
      timeTaken,
      points
    }]);

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(TIMER_SECONDS);
    } else {
      setGameFinished(true);
      setShowResults(true);
    }
  };

  const renderWaitingScreen = () => (
    <View style={styles.centerContainer}>
      <Ionicons name="rocket" size={64} color="#667eea" />
      <Text style={styles.waitingTitle}>Quiz Empreendedor</Text>
      <Text style={styles.waitingSubtitle}>10 perguntas • 30 segundos cada</Text>
      <Text style={styles.waitingDescription}>
        Responda rápido para ganhar mais pontos!
      </Text>
      <TouchableOpacity style={styles.startButton} onPress={startGame}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.startButtonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.startButtonText}>Iniciar Quiz</Text>
          <Ionicons name="play" size={19} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    
    return (
      <View style={styles.questionContainer}>
        {/* Header com progresso e timer */}
        <View style={styles.quizHeader}>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {currentQuestion + 1}/{questions.length}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
                ]} 
              />
            </View>
          </View>

          <View style={styles.timerContainer}>
            <LinearGradient
              colors={timeLeft > 10 ? ['#43e97b', '#38f9d7'] : ['#f5576c', '#f093fb']}
              style={styles.timerCircle}
            >
              <Text style={styles.timerText}>{timeLeft}</Text>
            </LinearGradient>
          </View>

          <View style={styles.scoreContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.scoreText}>{score}</Text>
          </View>
        </View>

        {/* Pergunta */}
        <View style={styles.questionCard}>
          <Text style={styles.categoryBadge}>{question.category}</Text>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {/* Opções */}
        <View style={styles.optionsContainer}>
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option.id;
            const showCorrect = isAnswered && option.correct;
            const showWrong = isAnswered && isSelected && !option.correct;

            return (
              <TouchableOpacity
                key={option.id}
                activeOpacity={0.7}
                onPress={() => handleAnswerSelect(option.id)}
                disabled={isAnswered}
                style={styles.optionWrapper}
              >
                <LinearGradient
                  colors={
                    showCorrect ? ['#43e97b', '#38f9d7'] :
                    showWrong ? ['#f5576c', '#f093fb'] :
                    isSelected ? ['#667eea', '#764ba2'] :
                    ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']
                  }
                  style={styles.optionCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.optionLetter}>
                    <Text style={styles.optionLetterText}>{option.id.toUpperCase()}</Text>
                  </View>
                  <Text style={styles.optionText}>{option.text}</Text>
                  {showCorrect && <Ionicons name="checkmark-circle" size={19} color="#fff" />}
                  {showWrong && <Ionicons name="close-circle" size={19} color="#fff" />}
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Explicação */}
        {isAnswered && (
          <View style={styles.explanationCard}>
            <Ionicons 
              name={selectedAnswer && questions[currentQuestion].options.find(o => o.id === selectedAnswer)?.correct ? "checkmark-circle" : "information-circle"} 
              size={16} 
              color={selectedAnswer && questions[currentQuestion].options.find(o => o.id === selectedAnswer)?.correct ? "#43e97b" : "#667eea"} 
            />
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
        )}
      </View>
    );
  };

  const renderResults = () => {
    const correctAnswers = answers.filter(a => a.correct).length;
    const totalPoints = score;
    const averageTime = answers.reduce((sum, a) => sum + a.timeTaken, 0) / answers.length;

    // Mock ranking - top 10
    const mockRanking = [
      { position: 1, name: 'Ana Silva', score: totalPoints + 300 },
      { position: 2, name: 'João Pedro', score: totalPoints + 150 },
      { position: 3, name: 'Você', score: totalPoints, isUser: true },
      { position: 4, name: 'Maria Costa', score: totalPoints - 100 },
      { position: 5, name: 'Carlos Lima', score: totalPoints - 250 },
      { position: 6, name: 'Beatriz Souza', score: totalPoints - 350 },
      { position: 7, name: 'Rafael Dias', score: totalPoints - 450 },
      { position: 8, name: 'Julia Santos', score: totalPoints - 520 },
      { position: 9, name: 'Lucas Alves', score: totalPoints - 600 },
      { position: 10, name: 'Fernanda Reis', score: totalPoints - 700 },
    ];

    return (
      <Modal visible={showResults} animationType="slide" transparent={false}>
        <LinearGradient
          colors={['#1a1a2e', '#16213e', '#0f3460']}
          style={styles.container}
        >
          <View style={styles.resultsContainer}>
            {/* Score principal */}
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>Quiz Finalizado!</Text>
              <View style={styles.mainScoreCard}>
                <Text style={styles.mainScoreLabel}>Pontuação Total</Text>
                <Text style={styles.mainScoreValue}>{totalPoints}</Text>
                <View style={styles.resultsStats}>
                  <View style={styles.statItem}>
                    <Ionicons name="checkmark-circle" size={19} color="#43e97b" />
                    <Text style={styles.statValue}>{correctAnswers}/{questions.length}</Text>
                    <Text style={styles.statLabel}>Acertos</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="time" size={19} color="#667eea" />
                    <Text style={styles.statValue}>{averageTime.toFixed(1)}s</Text>
                    <Text style={styles.statLabel}>Tempo Médio</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Ranking Top 10 */}
            <View style={styles.rankingSection}>
              <Text style={styles.rankingTitle}>🏆 Top 10 Ranking</Text>
              <View style={styles.rankingList}>
                {mockRanking.map((player) => (
                  <View 
                    key={player.position}
                    style={[
                      styles.rankingItem,
                      player.isUser && styles.currentUserRankingItem
                    ]}
                  >
                    <Text style={styles.rankingPosition}>
                      {player.position === 1 ? '🥇' : player.position === 2 ? '🥈' : player.position === 3 ? '🥉' : `#${player.position}`}
                    </Text>
                    <Text style={[styles.rankingName, player.isUser && styles.currentUserText]}>
                      {player.name}
                    </Text>
                    <Text style={[styles.rankingScore, player.isUser && styles.currentUserText]}>
                      {player.score}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Botões */}
            <View style={styles.resultsButtons}>
              <TouchableOpacity 
                style={styles.resultButton} 
                onPress={() => {
                  setShowResults(false);
                  setGameStarted(false);
                  setGameFinished(false);
                }}
              >
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.resultButtonGradient}
                >
                  <Text style={styles.resultButtonText}>Jogar Novamente</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.resultButton} 
                onPress={() => navigation.goBack()}
              >
                <View style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>Voltar ao Menu</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    );
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      {!gameStarted && <NavigationHeader title="Quiz" />}
      
      {!gameStarted && renderWaitingScreen()}
      {gameStarted && !gameFinished && renderQuestion()}
      {gameFinished && renderResults()}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  waitingTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  waitingSubtitle: {
    fontSize: 14,
    color: '#a8b2d1',
    marginBottom: 16,
  },
  waitingDescription: {
    fontSize: 13,
    color: '#8892b0',
    textAlign: 'center',
    marginBottom: 32,
  },
  startButton: {
    width: width - 64,
    borderRadius: 12,
    overflow: 'hidden',
  },
  startButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  questionContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressContainer: {
    flex: 1,
    marginRight: 12,
  },
  progressText: {
    fontSize: 11,
    color: '#a8b2d1',
    marginBottom: 4,
    fontWeight: '600',
  },
  progressBar: {
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 3,
  },
  timerContainer: {
    marginHorizontal: 8,
  },
  timerCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoreContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  scoreText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
  },
  questionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    color: '#a8b2d1',
    fontSize: 10,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  questionText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
  },
  optionsContainer: {
    gap: 10,
  },
  optionWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  optionLetter: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetterText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  optionText: {
    flex: 1,
    fontSize: 13,
    color: '#fff',
    lineHeight: 18,
  },
  explanationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    gap: 8,
  },
  explanationText: {
    flex: 1,
    fontSize: 11,
    color: '#a8b2d1',
    lineHeight: 16,
  },
  resultsContainer: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  resultsHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  mainScoreCard: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  mainScoreLabel: {
    fontSize: 11,
    color: '#a8b2d1',
    marginBottom: 6,
  },
  mainScoreValue: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  resultsStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 3,
  },
  statLabel: {
    fontSize: 10,
    color: '#a8b2d1',
    marginTop: 2,
    textAlign: 'center',
  },
  rankingSection: {
    flex: 1,
  },
  rankingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 12,
  },
  rankingList: {
    gap: 8,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 10,
  },
  currentUserRankingItem: {
    backgroundColor: 'rgba(67, 233, 123, 0.2)',
    borderWidth: 2,
    borderColor: '#43e97b',
  },
  rankingPosition: {
    width: 40,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#a8b2d1',
  },
  rankingName: {
    flex: 1,
    fontSize: 11,
    color: '#fff',
  },
  rankingScore: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
  },
  currentUserText: {
    color: '#43e97b',
  },
  resultsButtons: {
    marginTop: 16,
    gap: 10,
    marginBottom: 24,
  },
  resultButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  resultButtonGradient: {
    paddingVertical: 13,
    alignItems: 'center',
  },
  resultButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 13,
    alignItems: 'center',
    borderRadius: 12,
  },
  secondaryButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#a8b2d1',
  },
});
