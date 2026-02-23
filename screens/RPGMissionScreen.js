import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mascot } from '../components/Mascot';
import GameManager from '../services/GameManager';
import MascotEngine from '../services/MascotEngine';
import { getMissionById } from '../data/rpgMissions';
import { GameProgress, Mission, Decision } from '../types/game';

// 🎯 TELA DE MISSÃO RPG - Decisões estratégicas

const RPGMissionScreen = ({ route, navigation }) => {
  const { missionId } = route.params;
  
  const [mission, setMission] = useState(null);
  const [progress, setProgress] = useState(null);
  const [currentDecisionIndex, setCurrentDecisionIndex] = useState(0);
  const [mascotMessage, setMascotMessage] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [lastDecisionResult, setLastDecisionResult] = useState(null);

  useEffect(() => {
    loadMission();
  }, []);

  const loadMission = async () => {
    try {
      const missionData = getMissionById(missionId);
      const gameProgress = await GameManager.loadProgress();
      
      setMission(missionData);
      setProgress(gameProgress);
      
      // Mensagem inicial do mascote
      const intro = MascotEngine.getMissionIntro(gameProgress.founderProfile);
      setMascotMessage(intro);
    } catch (error) {
      console.error('Erro ao carregar missão:', error);
    }
  };

  const handleDecision = async (decision) => {
    if (!progress || !mission) return;

    try {
      // 1. Consumir energia
      const consumedEnergy = await GameManager.consumeEnergy(mission.energyCost);
      if (!consumedEnergy) {
        alert('⚡ Energia insuficiente!');
        return;
      }

      // 2. Aplicar efeitos da decisão
      const updatedProgress = await GameManager.updateStats(decision.effects);

      // 3. Gerar reação do mascote
      const reaction = MascotEngine.generateReaction(
        decision,
        decision.effects,
        updatedProgress
      );

      // 4. Salvar resultado
      setLastDecisionResult({
        decision,
        reaction,
        statsChange: decision.effects,
      });
      setMascotMessage(reaction.message);
      setShowResult(true);
      setProgress(updatedProgress);

      // 5. Avançar para próxima decisão ou completar missão
      if (currentDecisionIndex === mission.decisions.length - 1) {
        // Última decisão - completar missão
        setTimeout(() => {
          handleMissionComplete();
        }, 3000);
      }
    } catch (error) {
      console.error('Erro ao processar decisão:', error);
    }
  };

  const handleNextDecision = () => {
    setShowResult(false);
    setCurrentDecisionIndex(currentDecisionIndex + 1);
    
    // Resetar mensagem do mascote
    if (progress) {
      const intro = MascotEngine.getMissionIntro(progress.founderProfile);
      setMascotMessage(intro);
    }
  };

  const handleMissionComplete = async () => {
    try {
      if (!mission) return;

      await GameManager.completeMission(mission.id);
      
      navigation.replace('MissionComplete', {
        missionId: mission.id,
        missionTitle: mission.title,
      });
    } catch (error) {
      console.error('Erro ao completar missão:', error);
    }
  };

  if (!mission || !progress) {
    return (
      <LinearGradient colors={['#0F172A', '#1E293B']} style={styles.container}>
        <Text style={styles.loadingText}>Carregando missão...</Text>
      </LinearGradient>
    );
  }

  const currentDecision = mission.decisions[currentDecisionIndex];

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#334155']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
          
          <View style={styles.energyMini}>
            <Text style={styles.energyMiniText}>
              ⚡ {progress.energy.current}/{progress.energy.max}
            </Text>
          </View>
        </View>

        {/* Progresso da missão */}
        <View style={styles.progressBar}>
          {mission.decisions.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index <= currentDecisionIndex && styles.progressDotActive,
              ]}
            />
          ))}
        </View>

        <Text style={styles.missionPhase}>
          {mission.phase.replace('_', ' ')}
        </Text>
        <Text style={styles.missionTitle}>{mission.title}</Text>

        {/* Mascote com mensagem */}
        <View style={styles.mascotContainer}>
          <Mascot
            size="medium"
            message={mascotMessage}
            animated={true}
          />
        </View>

        {/* Resultado da decisão anterior */}
        {showResult && lastDecisionResult && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Resultado da Decisão</Text>
            <Text style={styles.resultText}>{lastDecisionResult.decision.title}</Text>
            
            <View style={styles.statsChanges}>
              {Object.entries(lastDecisionResult.statsChange).map(([key, value]) => {
                if (value === 0) return null;
                
                const statLabels = {
                  cash: '💰 Caixa',
                  customerInterest: '😊 Clientes',
                  knowledge: '🧠 Conhecimento',
                  motivation: '🔥 Motivação',
                  socialImpact: '🌱 Impacto',
                };

                return (
                  <View key={key} style={styles.statChange}>
                    <Text style={styles.statChangeLabel}>{statLabels[key]}</Text>
                    <Text style={[
                      styles.statChangeValue,
                      value > 0 ? styles.statChangePositive : styles.statChangeNegative,
                    ]}>
                      {value > 0 ? '+' : ''}{value}
                    </Text>
                  </View>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextDecision}
            >
              <LinearGradient
                colors={['#8B5CF6', '#D946EF']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {currentDecisionIndex === mission.decisions.length - 1
                    ? 'Finalizar Missão 🏆'
                    : 'Próxima Decisão →'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Decisão atual */}
        {!showResult && currentDecision && (
          <View style={styles.decisionCard}>
            <Text style={styles.decisionTitle}>{currentDecision.title}</Text>
            <Text style={styles.decisionDescription}>
              {currentDecision.description}
            </Text>

            <View style={styles.optionsContainer}>
              <Text style={styles.optionsLabel}>O que você decide fazer?</Text>
              
              {/* Botão de tomar decisão */}
              <TouchableOpacity
                style={[
                  styles.choiceButton,
                  currentDecision.risk === 'HIGH' && styles.choiceButtonRisky,
                  currentDecision.risk === 'LOW' && styles.choiceButtonSafe,
                ]}
                onPress={() => handleDecision(currentDecision)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={
                    currentDecision.risk === 'HIGH'
                      ? ['#EF4444', '#DC2626']
                      : currentDecision.risk === 'LOW'
                      ? ['#10B981', '#059669']
                      : ['#3B82F6', '#2563EB']
                  }
                  style={styles.choiceGradient}
                >
                  <View style={styles.choiceContent}>
                    <View style={styles.choiceHeader}>
                      <Text style={styles.choiceRisk}>
                        {currentDecision.risk === 'HIGH' && '⚠️ ALTO RISCO'}
                        {currentDecision.risk === 'MEDIUM' && '⚡ MÉDIO RISCO'}
                        {currentDecision.risk === 'LOW' && '✅ BAIXO RISCO'}
                      </Text>
                    </View>
                    
                    <Text style={styles.choiceTitle}>Tomar esta decisão</Text>
                    
                    <View style={styles.effectsPreview}>
                      {Object.entries(currentDecision.effects).map(([key, value]) => {
                        if (value === 0) return null;
                        
                        const icons = {
                          cash: '💰',
                          customerInterest: '😊',
                          knowledge: '🧠',
                          motivation: '🔥',
                          socialImpact: '🌱',
                        };

                        return (
                          <Text key={key} style={styles.effectText}>
                            {icons[key]} {value > 0 ? '+' : ''}{value}
                          </Text>
                        );
                      })}
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {/* Informação sobre a decisão */}
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  💡 {currentDecision.learningPoint}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 48,
  },
  loadingText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 13,
  },
  backButtonText: {
    fontSize: 13,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  energyMini: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  energyMiniText: {
    fontSize: 11,
    color: '#F59E0B',
    fontWeight: '600',
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 16,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressDotActive: {
    backgroundColor: '#8B5CF6',
  },
  missionPhase: {
    fontSize: 10,
    fontWeight: '600',
    color: '#8B5CF6',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 6,
  },
  missionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  mascotContainer: {
    marginBottom: 24,
  },
  resultCard: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 16,
    padding: 19,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 6,
  },
  resultText: {
    fontSize: 13,
    color: '#E2E8F0',
    marginBottom: 13,
  },
  statsChanges: {
    marginBottom: 16,
  },
  statChange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  statChangeLabel: {
    fontSize: 11,
    color: '#E2E8F0',
  },
  statChangeValue: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  statChangePositive: {
    color: '#10B981',
  },
  statChangeNegative: {
    color: '#EF4444',
  },
  nextButton: {
    width: '100%',
  },
  decisionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 19,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  decisionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  decisionDescription: {
    fontSize: 12,
    color: '#E2E8F0',
    lineHeight: 18,
    marginBottom: 19,
  },
  optionsContainer: {
    gap: 10,
  },
  optionsLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 10,
  },
  choiceButton: {
    width: '100%',
    marginBottom: 10,
  },
  choiceButtonRisky: {
    // Estilos para decisão de alto risco
  },
  choiceButtonSafe: {
    // Estilos para decisão segura
  },
  choiceGradient: {
    borderRadius: 13,
    overflow: 'hidden',
  },
  choiceContent: {
    padding: 16,
  },
  choiceHeader: {
    marginBottom: 10,
  },
  choiceRisk: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  choiceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  effectsPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  effectText: {
    fontSize: 11,
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 5,
  },
  infoBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 10,
    padding: 13,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  infoText: {
    fontSize: 11,
    color: '#93C5FD',
    lineHeight: 16,
  },
  buttonGradient: {
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default RPGMissionScreen;
