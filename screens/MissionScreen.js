import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert,
  Animated
} from 'react-native';
import { XPBar, FeedbackPopup } from '../components/Gamification';
import { missions } from '../data/missions';
import { 
  getUserStats, 
  getMissionsProgress, 
  completeMission, 
  addXP,
  checkAndAwardMedals 
} from '../utils/storage';

const MissionScreen = ({ navigation, route }) => {
  const { trilha } = route.params;
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [userStats, setUserStats] = useState({ totalXP: 0, level: 1 });
  const [missionProgress, setMissionProgress] = useState(null);
  const [resposta, setResposta] = useState('');

  // Busca dados da trilha no sistema estruturado
  const trilhaData = missions[trilha.id];
  const currentMission = trilhaData?.missions[currentMissionIndex];

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const stats = await getUserStats();
      const progress = await getMissionsProgress();
      setUserStats(stats);
      setMissionProgress(progress);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const missaoAtual = currentMission || {
    titulo: '� Missão Especial',
    descricao: 'Uma missão especial para desenvolver suas habilidades empreendedoras.',
    instrucoes: [
      '💭 Observe ao seu redor: o que poderia ser melhorado?',
      '🌍 Pense em questões ambientais, sociais ou tecnológicas',
      '👥 Converse com amigos e família sobre os desafios que enfrentam',
      '📝 Descreva o problema de forma clara e específica'
    ],
    pergunta: 'Qual problema você identificou? Descreva em detalhes:',
    exemplos: [
      'Desperdício de comida na cantina da escola',
      'Falta de áreas verdes no bairro',
      'Dificuldade dos idosos em usar tecnologia'
    ],
    xpReward: 200,
    tipo: 'texto'
  };

  const handleSubmit = async () => {
    if (resposta.trim().length < 50) {
      Alert.alert(
        'Resposta muito curta',
        'Por favor, desenvolva mais sua resposta. Mínimo de 50 caracteres.'
      );
      return;
    }

    try {
      // Salva a resposta e completa a missão
      const missionId = `${trilha.id}_${currentMissionIndex}`;
      await completeMission(missionId, resposta);
      
      // Adiciona XP
      const xpGained = missaoAtual.xpReward || missaoAtual.xp || 200;
      await addXP(xpGained);
      
      // Verifica e concede medalhas
      await checkAndAwardMedals();
      
      setShowFeedback(true);
      
      // Volta para a tela anterior após um tempo
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
      Alert.alert(
        'Erro ao Completar Missão', 
        'Não foi possível salvar seu progresso. Por favor, tente novamente.'
      );
    }
  };

  if (!missaoAtual) {
    return (
      <View style={styles.container}>
        <Text>Missão em desenvolvimento...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header da Missão */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.missaoTitulo}>{missaoAtual.title || missaoAtual.titulo}</Text>
      </View>

      {/* Card da Missão */}
      <View style={styles.missaoCard}>
        <Text style={styles.missaoDescricao}>
          {missaoAtual.description || missaoAtual.descricao}
        </Text>
        
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>+{missaoAtual.xpReward || missaoAtual.xp || 200} XP</Text>
        </View>
      </View>

      {/* Instruções */}
      <View style={styles.instrucoesContainer}>
        <Text style={styles.sectionTitle}>📋 Como fazer:</Text>
        {(missaoAtual.instructions || missaoAtual.instrucoes || []).map((instrucao, index) => (
          <View key={index} style={styles.instrucaoItem}>
            <Text style={styles.instrucaoTexto}>{instrucao}</Text>
          </View>
        ))}
      </View>

      {/* Conteúdo da missão (se existir) */}
      {missaoAtual.content && (
        <View style={styles.instrucoesContainer}>
          <Text style={styles.sectionTitle}>📚 Conteúdo:</Text>
          <View style={styles.instrucaoItem}>
            <Text style={styles.instrucaoTexto}>{missaoAtual.content}</Text>
          </View>
        </View>
      )}

      {/* Exemplos */}
      {(missaoAtual.examples || missaoAtual.exemplos) && (
        <View style={styles.exemplosContainer}>
          <Text style={styles.sectionTitle}>💡 Exemplos para inspirar:</Text>
          {(missaoAtual.examples || missaoAtual.exemplos || []).map((exemplo, index) => (
            <View key={index} style={styles.exemploItem}>
              <Text style={styles.exemploTexto}>• {exemplo}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Área de Resposta */}
      <View style={styles.respostaContainer}>
        <Text style={styles.perguntaTexto}>
          {missaoAtual.question || missaoAtual.pergunta || 'Descreva sua resposta para esta missão:'}
        </Text>
        
        <TextInput
          style={styles.respostaInput}
          multiline={true}
          numberOfLines={8}
          placeholder="Digite sua resposta aqui... Seja criativo e detalhado!"
          value={resposta}
          onChangeText={setResposta}
          textAlignVertical="top"
        />
        
        <Text style={styles.caracteresInfo}>
          {resposta.length}/50 caracteres mínimos
        </Text>
      </View>

      {/* Botão de Envio */}
      <TouchableOpacity 
        style={[
          styles.submitButton,
          resposta.length < 50 && styles.submitButtonDisabled
        ]}
        onPress={handleSubmit}
        disabled={resposta.length < 50}
      >
        <Text style={styles.submitButtonText}>
          🚀 Concluir Missão
        </Text>
      </TouchableOpacity>

      {/* Dicas */}
      <View style={styles.dicasContainer}>
        <Text style={styles.dicasTitulo}>💡 Dicas:</Text>
        <Text style={styles.dicasTexto}>
          • Seja específico e detalhado{'\n'}
          • Use sua experiência pessoal{'\n'}
          • Pense no impacto positivo{'\n'}
          • Não tenha medo de ser criativo!
        </Text>
      </View>

      <FeedbackPopup
        visible={showFeedback}
        tipo="missao"
        titulo="Missão Concluída!"
        xp={missaoAtual.xpReward}
        onClose={() => setShowFeedback(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
    backgroundColor: 'white',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  backIcon: {
    fontSize: 20,
    color: '#6B7280',
  },
  missaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  missaoCard: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  missaoDescricao: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 19,
    marginBottom: 12,
  },
  xpBadge: {
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  xpText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 11,
  },
  instrucoesContainer: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  instrucaoItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  instrucaoTexto: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 16,
  },
  exemplosContainer: {
    margin: 16,
    marginTop: 0,
  },
  exemploItem: {
    backgroundColor: '#FEF3C7',
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  exemploTexto: {
    fontSize: 11,
    color: '#92400E',
  },
  respostaContainer: {
    margin: 16,
    marginTop: 0,
  },
  perguntaTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  respostaInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    fontSize: 13,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    minHeight: 96,
    marginBottom: 8,
  },
  caracteresInfo: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'right',
  },
  submitButton: {
    backgroundColor: '#10B981',
    margin: 16,
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dicasContainer: {
    margin: 16,
    marginTop: 0,
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 12,
    marginBottom: 32,
  },
  dicasTitulo: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  dicasTexto: {
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 16,
  },
});

export default MissionScreen;