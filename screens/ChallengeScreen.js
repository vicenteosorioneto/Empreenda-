import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import NavigationHeader from '../components/NavigationHeader';

const CHALLENGE_TIME = 900; // 15 minutos em segundos

export default function ChallengeScreen({ navigation }) {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_TIME);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Perguntas difíceis V/F
  const questions = [
    {
      id: 1,
      question: 'A metodologia Lean Startup prioriza a construção de um produto perfeito antes de testá-lo com clientes reais.',
      answer: false,
      explanation: 'Lean Startup prioriza MVP (Produto Mínimo Viável) e validação rápida com clientes.'
    },
    {
      id: 2,
      question: 'O Canvas de Proposta de Valor deve ser preenchido antes do Business Model Canvas.',
      answer: true,
      explanation: 'É recomendado entender a proposta de valor antes de definir o modelo de negócio completo.'
    },
    {
      id: 3,
      question: 'Uma startup que alcança o "Product-Market Fit" deve imediatamente escalar todas as suas operações.',
      answer: false,
      explanation: 'Após o PMF, deve-se validar processos e garantir sustentabilidade antes de escalar agressivamente.'
    },
    {
      id: 4,
      question: 'O termo "Pivô" significa abandonar completamente a ideia original do negócio.',
      answer: false,
      explanation: 'Pivô é uma mudança estratégica mantendo a visão, não abandonar completamente a ideia.'
    },
    {
      id: 5,
      question: 'Investidores anjo geralmente investem em estágios mais iniciais que fundos de Venture Capital.',
      answer: true,
      explanation: 'Investidores anjo investem em estágios seed/pré-seed, VCs investem em séries A, B, C...'
    },
    {
      id: 6,
      question: 'O Valuation de uma startup sempre deve ser baseado apenas em sua receita atual.',
      answer: false,
      explanation: 'Valuation considera potencial de mercado, tração, equipe, tecnologia e projeções futuras.'
    },
    {
      id: 7,
      question: 'Blue Ocean Strategy busca competir em mercados já existentes com preços mais baixos.',
      answer: false,
      explanation: 'Blue Ocean cria novos espaços de mercado inexplorados, evitando competição direta.'
    },
    {
      id: 8,
      question: 'CAC (Custo de Aquisição de Cliente) deve sempre ser menor que o LTV (Lifetime Value).',
      answer: true,
      explanation: 'Para um negócio saudável, o valor que o cliente gera deve superar o custo de adquiri-lo.'
    },
    {
      id: 9,
      question: 'Bootstrapping significa iniciar um negócio sem investimento externo, usando recursos próprios.',
      answer: true,
      explanation: 'Bootstrapping é autofinanciamento, crescendo organicamente sem investidores externos.'
    },
    {
      id: 10,
      question: 'O termo "Unicórnio" refere-se a qualquer startup que alcança 10 milhões em receita.',
      answer: false,
      explanation: 'Unicórnio é uma startup avaliada em mais de 1 bilhão de dólares.'
    },
  ];

  useEffect(() => {
    if (started && timeLeft > 0 && !finished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && started) {
      finishChallenge();
    }
  }, [timeLeft, started, finished]);

  const startChallenge = () => {
    setStarted(true);
    setTimeLeft(CHALLENGE_TIME);
    setCurrentQuestion(0);
    setAnswers([]);
    setScore(0);
    setFinished(false);
  };

  const handleAnswer = (answer) => {
    const question = questions[currentQuestion];
    const isCorrect = answer === question.answer;
    
    setSelectedAnswer(answer);
    setAnswers([...answers, { questionId: question.id, answer, correct: isCorrect }]);
    
    if (isCorrect) {
      setScore(score + 100);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        finishChallenge();
      }
    }, 2000);
  };

  const finishChallenge = () => {
    setFinished(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!started) {
    return (
      <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
        <NavigationHeader title="Desafio" />
        <View style={styles.centerContainer}>
          <Ionicons name="trophy" size={80} color="#FFD700" />
          <Text style={styles.waitingTitle}>Desafio Empreendedor</Text>
          <Text style={styles.waitingSubtitle}>10 perguntas V/F difíceis</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="time" size={24} color="#43e97b" />
              <Text style={styles.infoText}>15 minutos para completar</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="alert-circle" size={24} color="#f5576c" />
              <Text style={styles.infoText}>Perguntas muito difíceis</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="star" size={24} color="#FFD700" />
              <Text style={styles.infoText}>100 pontos por acerto</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.startButton} onPress={startChallenge}>
            <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.startButtonGradient}>
              <Text style={styles.startButtonText}>Iniciar Desafio</Text>
              <Ionicons name="arrow-forward" size={24} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  if (finished) {
    const correctAnswers = answers.filter(a => a.correct).length;
    const percentage = (correctAnswers / questions.length) * 100;

    return (
      <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Desafio Concluído!</Text>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreValue}>{score}</Text>
            <Text style={styles.scoreLabel}>Pontos</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{correctAnswers}/{questions.length}</Text>
                <Text style={styles.statLabel}>Acertos</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{percentage.toFixed(0)}%</Text>
                <Text style={styles.statLabel}>Aproveitamento</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{formatTime(CHALLENGE_TIME - timeLeft)}</Text>
                <Text style={styles.statLabel}>Tempo Usado</Text>
              </View>
            </View>
          </View>
          <View style={styles.resultsButtons}>
            <TouchableOpacity style={styles.resultButton} onPress={() => { setStarted(false); setFinished(false); }}>
              <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.resultButtonGradient}>
                <Text style={styles.resultButtonText}>Tentar Novamente</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
              <Text style={styles.secondaryButtonText}>Voltar ao Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }

  const question = questions[currentQuestion];
  const timeColor = timeLeft < 180 ? '#f5576c' : timeLeft < 420 ? '#FFD700' : '#43e97b';

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>{currentQuestion + 1}/{questions.length}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${((currentQuestion + 1) / questions.length) * 100}%` }]} />
          </View>
        </View>
        <View style={styles.timerBox}>
          <Ionicons name="time" size={20} color={timeColor} />
          <Text style={[styles.timerText, { color: timeColor }]}>{formatTime(timeLeft)}</Text>
        </View>
        <View style={styles.scoreBox}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.scoreText}>{score}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <Ionicons name="help-circle" size={24} color="#667eea" />
            <Text style={styles.questionNumber}>Questão {currentQuestion + 1}</Text>
          </View>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        <View style={styles.answersContainer}>
          <TouchableOpacity
            style={styles.answerButton}
            onPress={() => handleAnswer(true)}
            disabled={selectedAnswer !== null}
          >
            <LinearGradient
              colors={
                selectedAnswer === true
                  ? question.answer === true
                    ? ['#43e97b', '#38f9d7']
                    : ['#f5576c', '#f093fb']
                  : selectedAnswer === false && question.answer === true
                  ? ['#43e97b', '#38f9d7']
                  : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']
              }
              style={styles.answerGradient}
            >
              <Ionicons 
                name="checkmark-circle" 
                size={32} 
                color={selectedAnswer !== null && question.answer === true ? '#fff' : '#43e97b'} 
              />
              <Text style={styles.answerText}>VERDADEIRO</Text>
              {selectedAnswer !== null && question.answer === true && (
                <Ionicons name="checkmark" size={28} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.answerButton}
            onPress={() => handleAnswer(false)}
            disabled={selectedAnswer !== null}
          >
            <LinearGradient
              colors={
                selectedAnswer === false
                  ? question.answer === false
                    ? ['#43e97b', '#38f9d7']
                    : ['#f5576c', '#f093fb']
                  : selectedAnswer === true && question.answer === false
                  ? ['#43e97b', '#38f9d7']
                  : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']
              }
              style={styles.answerGradient}
            >
              <Ionicons 
                name="close-circle" 
                size={32} 
                color={selectedAnswer !== null && question.answer === false ? '#fff' : '#f5576c'} 
              />
              <Text style={styles.answerText}>FALSO</Text>
              {selectedAnswer !== null && question.answer === false && (
                <Ionicons name="checkmark" size={28} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {selectedAnswer !== null && (
          <View style={styles.explanationCard}>
            <Ionicons name="information-circle" size={24} color="#667eea" />
            <View style={styles.explanationContent}>
              <Text style={styles.explanationTitle}>Explicação:</Text>
              <Text style={styles.explanationText}>{question.explanation}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  waitingTitle: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginTop: 20, marginBottom: 10 },
  waitingSubtitle: { fontSize: 18, color: '#a8b2d1', marginBottom: 30 },
  infoCard: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 20, padding: 25, marginBottom: 30, width: '100%' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, gap: 15 },
  infoText: { fontSize: 16, color: '#fff', flex: 1 },
  startButton: { width: '100%', borderRadius: 15, overflow: 'hidden' },
  startButtonGradient: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 18, gap: 10 },
  startButtonText: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20 },
  progressInfo: { flex: 1, marginRight: 15 },
  progressText: { fontSize: 14, color: '#a8b2d1', marginBottom: 5, fontWeight: '600' },
  progressBar: { height: 6, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#667eea', borderRadius: 3 },
  timerBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, gap: 6, marginRight: 10 },
  timerText: { fontSize: 16, fontWeight: 'bold' },
  scoreBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 215, 0, 0.2)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, gap: 6 },
  scoreText: { fontSize: 16, fontWeight: 'bold', color: '#FFD700' },
  content: { flex: 1, paddingHorizontal: 20 },
  questionCard: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 20, padding: 25, marginBottom: 25 },
  questionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, gap: 10 },
  questionNumber: { fontSize: 16, fontWeight: 'bold', color: '#667eea' },
  questionText: { fontSize: 20, fontWeight: 'bold', color: '#fff', lineHeight: 30 },
  answersContainer: { gap: 15, marginBottom: 25 },
  answerButton: { borderRadius: 20, overflow: 'hidden' },
  answerGradient: { flexDirection: 'row', alignItems: 'center', padding: 25, gap: 15 },
  answerText: { flex: 1, fontSize: 20, fontWeight: 'bold', color: '#fff' },
  explanationCard: { flexDirection: 'row', backgroundColor: 'rgba(102, 126, 234, 0.2)', borderRadius: 15, padding: 20, gap: 15, marginBottom: 30 },
  explanationContent: { flex: 1 },
  explanationTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  explanationText: { fontSize: 14, color: '#a8b2d1', lineHeight: 22 },
  resultsContainer: { flex: 1, paddingTop: 80, paddingHorizontal: 20 },
  resultsTitle: { fontSize: 32, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 30 },
  scoreCard: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 25, padding: 30, alignItems: 'center', marginBottom: 30 },
  scoreValue: { fontSize: 64, fontWeight: 'bold', color: '#FFD700', marginBottom: 10 },
  scoreLabel: { fontSize: 18, color: '#a8b2d1', marginBottom: 25 },
  statsRow: { flexDirection: 'row', gap: 30 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 5 },
  statLabel: { fontSize: 13, color: '#a8b2d1' },
  resultsButtons: { gap: 12 },
  resultButton: { borderRadius: 15, overflow: 'hidden' },
  resultButtonGradient: { paddingVertical: 16, alignItems: 'center' },
  resultButtonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  secondaryButton: { paddingVertical: 16, alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 15 },
  secondaryButtonText: { fontSize: 18, fontWeight: 'bold', color: '#a8b2d1' },
});
