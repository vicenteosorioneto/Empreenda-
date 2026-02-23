import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  Animated,
  ScrollView
} from 'react-native';
import { getRandomQuestions } from '../data/quizQuestions';

const QuizRapido = ({ onComplete, navigation }) => {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [tempo, setTempo] = useState(15);
  const [jokenIniciado, setJokenIniciado] = useState(false);
  const [modoAlternativo, setModoAlternativo] = useState(false);
  const [perguntasAlternativas, setPerguntasAlternativas] = useState([]);

  const perguntas = [
    {
      pergunta: "Qual dessas ideias é mais sustentável?",
      opcoes: [
        "App de carona solidária para reduzir poluição",
        "Fábrica de descartáveis de plástico",
        "Mineração em área preservada",
        "Fast fashion com roupas baratas"
      ],
      respostaCorreta: 0,
      explicacao: "Apps de carona reduzem o número de carros nas ruas, diminuindo a poluição!"
    },
    {
      pergunta: "O que caracteriza um empreendedor social?",
      opcoes: [
        "Busca apenas lucro financeiro",
        "Resolve problemas sociais e ambientais",
        "Trabalha sozinho sempre",
        "Evita mudanças na comunidade"
      ],
      respostaCorreta: 1,
      explicacao: "Empreendedores sociais focam em gerar impacto positivo na sociedade!"
    },
    {
      pergunta: "Qual a melhor forma de validar uma ideia?",
      opcoes: [
        "Implementar sem pesquisa",
        "Conversar com possíveis usuários",
        "Copiar ideias existentes",
        "Decidir sozinho se é boa"
      ],
      respostaCorreta: 1,
      explicacao: "Conversar com o público-alvo é essencial para entender suas necessidades!"
    },
    {
      pergunta: "O que é economia circular?",
      opcoes: [
        "Economia que gira em círculos",
        "Reduzir, reutilizar e reciclar recursos",
        "Fazer negócios em praças redondas",
        "Sistema econômico fechado"
      ],
      respostaCorreta: 1,
      explicacao: "Economia circular maximiza o uso de recursos e minimiza desperdícios!"
    }
  ];

  useEffect(() => {
    let timer;
    if (jokenIniciado && tempo > 0 && respostaSelecionada === null) {
      timer = setTimeout(() => setTempo(tempo - 1), 1000);
    } else if (tempo === 0 && respostaSelecionada === null) {
      handleProximaPergunta();
    }
    return () => clearTimeout(timer);
  }, [tempo, jokenIniciado, respostaSelecionada]);

  const iniciarJogo = () => {
    setJokenIniciado(true);
    setTempo(15);
    setModoAlternativo(false);
  };

  const iniciarModoAlternativo = () => {
    const questions = getRandomQuestions(10);
    setPerguntasAlternativas(questions);
    setModoAlternativo(true);
    setJokenIniciado(true);
    setPerguntaAtual(0);
    setPontuacao(0);
    setTempo(15);
  };

  const selecionarResposta = (index) => {
    if (respostaSelecionada !== null) return;
    
    setRespostaSelecionada(index);
    
    if (index === perguntas[perguntaAtual].respostaCorreta) {
      setPontuacao(pontuacao + 10);
    }

    // Mostrar feedback por 2 segundos
    setTimeout(() => {
      handleProximaPergunta();
    }, 2000);
  };

  const handleProximaPergunta = () => {
    const perguntasAtivas = modoAlternativo ? perguntasAlternativas : perguntas;
    
    if (perguntaAtual < perguntasAtivas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
      setRespostaSelecionada(null);
      setTempo(15);
    } else {
      finalizarJogo();
    }
  };

  const finalizarJogo = () => {
    const perguntasAtivas = modoAlternativo ? perguntasAlternativas : perguntas;
    const porcentagem = (pontuacao / (perguntasAtivas.length * 10)) * 100;
    let xpGanho = Math.round(pontuacao * 2);
    
    Alert.alert(
      "Quiz Concluído! 🎉",
      `Pontuação: ${pontuacao}/${perguntasAtivas.length * 10}\n` +
      `Acertos: ${porcentagem.toFixed(0)}%\n` +
      `XP Ganho: +${xpGanho}`,
      [
        {
          text: "Voltar ao Menu",
          onPress: () => {
            if (navigation) {
              navigation.goBack();
            }
            if (onComplete) {
              onComplete(xpGanho);
            }
          }
        },
        {
          text: "Jogar Novamente",
          onPress: () => {
            setPerguntaAtual(0);
            setPontuacao(0);
            setRespostaSelecionada(null);
            setTempo(15);
            setJokenIniciado(false);
            setModoAlternativo(false);
          }
        }
      ]
    );
  };

  if (!jokenIniciado) {
    return (
      <View style={styles.container}>
        <View style={styles.intro}>
          <Text style={styles.titulo}>🧠 Quiz Rápido</Text>
          <Text style={styles.descricao}>
            Teste seus conhecimentos sobre empreendedorismo social e sustentabilidade!
          </Text>
          <View style={styles.regras}>
            <Text style={styles.regraItem}>⏱️ 15 segundos por pergunta</Text>
            <Text style={styles.regraItem}>🎯 {perguntas.length} perguntas</Text>
            <Text style={styles.regraItem}>⭐ +10 pontos por acerto</Text>
            <Text style={styles.regraItem}>🏆 Ganhe XP baseado na pontuação</Text>
          </View>
          <TouchableOpacity style={styles.botaoIniciar} onPress={iniciarJogo}>
            <Text style={styles.textoBotao}>🚀 Começar Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.botaoIniciar, { backgroundColor: '#8B5CF6', marginTop: 12 }]} 
            onPress={iniciarModoAlternativo}
          >
            <Text style={styles.textoBotao}>📚 Quiz Alternativo (10 perguntas)</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const perguntasAtivas = modoAlternativo ? perguntasAlternativas : perguntas;
  const pergunta = perguntasAtivas[perguntaAtual];

  return (
    <View style={styles.container}>
      {/* Header do Quiz */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation && navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.progresso}>
          <Text style={styles.progressoTexto}>
            {perguntaAtual + 1} / {perguntas.length}
          </Text>
          <View style={styles.barraProgresso}>
            <View 
              style={[
                styles.progressoFill,
                { width: `${((perguntaAtual + 1) / perguntas.length) * 100}%` }
              ]} 
            />
          </View>
        </View>
        
        <View style={styles.tempoContainer}>
          <Text style={[
            styles.tempo,
            tempo <= 5 && styles.tempoUrgente
          ]}>
            ⏱️ {tempo}s
          </Text>
        </View>
        
        <View style={styles.pontuacaoContainer}>
          <Text style={styles.pontuacao}>🏆 {pontuacao}</Text>
        </View>
      </View>

      {/* Pergunta */}
      <View style={styles.perguntaContainer}>
        <Text style={styles.perguntaTexto}>
          {modoAlternativo ? pergunta.question : pergunta.pergunta}
        </Text>
      </View>

      {/* Opções de Resposta */}
      <ScrollView style={styles.opcoesContainer}>
        {modoAlternativo ? (
          // Modo alternativo com opções a, b, c, d
          ['a', 'b', 'c', 'd'].map((letra, index) => (
            <TouchableOpacity
              key={letra}
              style={[
                styles.opcao,
                respostaSelecionada !== null && letra === pergunta.correctAnswer && styles.opcaoCorreta,
                respostaSelecionada === index && letra !== pergunta.correctAnswer && styles.opcaoIncorreta,
              ]}
              onPress={() => selecionarResposta(index)}
              disabled={respostaSelecionada !== null}
            >
              <Text style={styles.opcaoLetra}>{letra.toUpperCase()}</Text>
              <Text style={styles.opcaoTexto}>{pergunta[letra]}</Text>
            </TouchableOpacity>
          ))
        ) : (
          // Modo tradicional com opcoes array
          pergunta.opcoes.map((opcao, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.opcao,
                respostaSelecionada !== null && index === pergunta.respostaCorreta && styles.opcaoCorreta,
                respostaSelecionada === index && index !== pergunta.respostaCorreta && styles.opcaoIncorreta,
              ]}
              onPress={() => selecionarResposta(index)}
              disabled={respostaSelecionada !== null}
            >
              <Text style={styles.opcaoTexto}>{opcao}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Feedback */}
      {respostaSelecionada !== null && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTexto}>
            {respostaSelecionada === pergunta.respostaCorreta ? "✅ Correto!" : "❌ Incorreto!"}
          </Text>
          <Text style={styles.explicacao}>
            {pergunta.explicacao}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
    padding: 16,
  },
  intro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  descricao: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 19,
  },
  regras: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    width: '100%',
  },
  regraItem: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 6,
    lineHeight: 16,
  },
  botaoIniciar: {
    backgroundColor: '#10B981',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  textoBotao: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  progresso: {
    flex: 1,
    marginRight: 12,
  },
  progressoTexto: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  barraProgresso: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressoFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  tempoContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  tempo: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  tempoUrgente: {
    color: '#EF4444',
  },
  pontuacaoContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pontuacao: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  perguntaContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  perguntaTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 22,
  },
  opcoesContainer: {
    flex: 1,
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  opcaoCorreta: {
    backgroundColor: '#F0FDF4',
    borderColor: '#10B981',
  },
  opcaoIncorreta: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  opcaoLetra: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8B5CF6',
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
    marginRight: 10,
  },
  opcaoTexto: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 18,
  },
  feedbackContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  feedbackTexto: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  explicacao: {
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 16,
    textAlign: 'center',
  },
});

export default QuizRapido;