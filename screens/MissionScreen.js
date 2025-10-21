import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Alert 
} from 'react-native';
import { FeedbackPopup } from '../components/Gamification';

const MissionScreen = ({ navigation, route }) => {
  const { trilha } = route.params;
  const [resposta, setResposta] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const missoes = {
    1: {
      titulo: '🔍 Descubra um Problema',
      descricao: 'Identifique um problema real na sua comunidade, escola ou meio ambiente que você gostaria de resolver.',
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
    },
    2: {
      titulo: '💡 Crie uma Solução',
      descricao: 'Agora é hora de usar sua criatividade! Desenvolva uma solução inovadora para o problema que você identificou.',
      instrucoes: [
        '🧠 Use sua criatividade - não existem ideias ruins!',
        '🔧 Pense em soluções práticas e viáveis',
        '💚 Considere o impacto positivo da sua ideia',
        '🚀 Seja inovador - como a tecnologia pode ajudar?'
      ],
      pergunta: 'Qual sua solução criativa? Explique como funcionaria:',
      exemplos: [
        'App para redistribuir comida não consumida',
        'Projeto de hortas comunitárias verticais',
        'Curso de tecnologia para terceira idade'
      ],
      xpReward: 250,
      tipo: 'texto'
    },
    3: {
      titulo: '👥 Monte seu Time',
      descricao: 'Todo empreendedor precisa de uma equipe! Identifique as habilidades necessárias e quem poderia fazer parte do seu time.',
      instrucoes: [
        '🎯 Liste as habilidades necessárias para o projeto',
        '👥 Pense em colegas que têm essas habilidades',
        '🤝 Considere pessoas que compartilham sua paixão',
        '⚖️ Balance diferentes perspectivas e talentos'
      ],
      pergunta: 'Quem faria parte do seu time e por quê?',
      exemplos: [
        'João (programador), Maria (designer), Ana (marketing)',
        'Colega que ama plantas + amigo que entende de redes sociais',
        'Professor de informática + alunos voluntários'
      ],
      xpReward: 200,
      tipo: 'texto'
    }
  };

  const missaoAtual = missoes[trilha.id];

  const handleSubmit = () => {
    if (resposta.trim().length < 50) {
      Alert.alert(
        'Resposta muito curta',
        'Por favor, desenvolva mais sua resposta. Mínimo de 50 caracteres.'
      );
      return;
    }

    setShowFeedback(true);
    
    // Simular progresso na trilha
    setTimeout(() => {
      navigation.goBack();
    }, 3000);
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
        <Text style={styles.missaoTitulo}>{missaoAtual.titulo}</Text>
      </View>

      {/* Card da Missão */}
      <View style={styles.missaoCard}>
        <Text style={styles.missaoDescricao}>
          {missaoAtual.descricao}
        </Text>
        
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>+{missaoAtual.xpReward} XP</Text>
        </View>
      </View>

      {/* Instruções */}
      <View style={styles.instrucoesContainer}>
        <Text style={styles.sectionTitle}>📋 Como fazer:</Text>
        {missaoAtual.instrucoes.map((instrucao, index) => (
          <View key={index} style={styles.instrucaoItem}>
            <Text style={styles.instrucaoTexto}>{instrucao}</Text>
          </View>
        ))}
      </View>

      {/* Exemplos */}
      <View style={styles.exemplosContainer}>
        <Text style={styles.sectionTitle}>💡 Exemplos para inspirar:</Text>
        {missaoAtual.exemplos.map((exemplo, index) => (
          <View key={index} style={styles.exemploItem}>
            <Text style={styles.exemploTexto}>• {exemplo}</Text>
          </View>
        ))}
      </View>

      {/* Área de Resposta */}
      <View style={styles.respostaContainer}>
        <Text style={styles.perguntaTexto}>
          {missaoAtual.pergunta}
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
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  backIcon: {
    fontSize: 24,
    color: '#6B7280',
  },
  missaoTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  missaoCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  missaoDescricao: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 15,
  },
  xpBadge: {
    backgroundColor: '#10B981',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  xpText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  instrucoesContainer: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  instrucaoItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  instrucaoTexto: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  exemplosContainer: {
    margin: 20,
    marginTop: 0,
  },
  exemploItem: {
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  exemploTexto: {
    fontSize: 14,
    color: '#92400E',
  },
  respostaContainer: {
    margin: 20,
    marginTop: 0,
  },
  perguntaTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 15,
  },
  respostaInput: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    minHeight: 120,
    marginBottom: 10,
  },
  caracteresInfo: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
  },
  submitButton: {
    backgroundColor: '#10B981',
    margin: 20,
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dicasContainer: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#F3F4F6',
    padding: 15,
    borderRadius: 15,
    marginBottom: 40,
  },
  dicasTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 10,
  },
  dicasTexto: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});

export default MissionScreen;