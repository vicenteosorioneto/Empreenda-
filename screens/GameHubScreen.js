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
import { GameProgress } from '../types/game';
import { getMissionById } from '../data/rpgMissions';

// 🎮 HUB DO JOGO RPG - Tela Principal

const GameHubScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGameProgress();
  }, []);

  const loadGameProgress = async () => {
    try {
      // Recarregar energia se necessário
      await GameManager.rechargeEnergy();
      
      const gameProgress = await GameManager.loadProgress();
      setProgress(gameProgress);
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartMission = () => {
    if (!progress) return;

    const currentMission = getMissionById(progress.currentMissionId);
    if (!currentMission) return;

    if (GameManager.canStartMission(progress.energy, currentMission.energyCost)) {
      navigation.navigate('Mission', { missionId: currentMission.id });
    } else {
      // Mostrar alerta de energia insuficiente
      alert('⚡ Energia insuficiente! Volte amanhã para recarregar.');
    }
  };

  if (loading || !progress) {
    return (
      <LinearGradient colors={['#0F172A', '#1E293B']} style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </LinearGradient>
    );
  }

  const currentMission = getMissionById(progress.currentMissionId);
  const titleName = GameManager.getTitleName(progress.currentTitle);

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#334155']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header com energia e título */}
        <View style={styles.header}>
          <View style={styles.energyContainer}>
            <Text style={styles.energyLabel}>⚡ Energia</Text>
            <View style={styles.energyBar}>
              <View 
                style={[
                  styles.energyFill,
                  { width: `${(progress.energy.current / progress.energy.max) * 100}%` }
                ]}
              />
            </View>
            <Text style={styles.energyText}>
              {progress.energy.current}/{progress.energy.max}
            </Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.titleLabel}>🏆 Título</Text>
            <Text style={styles.titleText}>{titleName}</Text>
          </View>
        </View>

        {/* Mascote */}
        <View style={styles.mascotContainer}>
          <Mascot
            size="medium"
            message={`Bem-vindo de volta, ${titleName}! Pronto para continuar sua jornada?`}
            animated={true}
          />
        </View>

        {/* Status do jogo - Barras */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>📊 Status da sua Startup</Text>
          
          <StatBar 
            icon="💰"
            label="Caixa"
            value={progress.stats.cash}
            color="#10B981"
          />
          <StatBar 
            icon="😊"
            label="Interesse dos Clientes"
            value={progress.stats.customerInterest}
            color="#3B82F6"
          />
          <StatBar 
            icon="🧠"
            label="Conhecimento"
            value={progress.stats.knowledge}
            color="#8B5CF6"
          />
          <StatBar 
            icon="🔥"
            label="Motivação"
            value={progress.stats.motivation}
            color="#F59E0B"
          />
          <StatBar 
            icon="🌱"
            label="Impacto Social"
            value={progress.stats.socialImpact}
            color="#EC4899"
          />
        </View>

        {/* Missão atual */}
        {currentMission && (
          <View style={styles.missionCard}>
            <Text style={styles.missionPhase}>
              {currentMission.phase.replace('_', ' ')}
            </Text>
            <Text style={styles.missionTitle}>{currentMission.title}</Text>
            <Text style={styles.missionDescription}>{currentMission.description}</Text>

            <View style={styles.missionInfo}>
              <View style={styles.missionInfoItem}>
                <Text style={styles.missionInfoIcon}>⚡</Text>
                <Text style={styles.missionInfoText}>
                  {currentMission.energyCost} energia
                </Text>
              </View>
              <View style={styles.missionInfoItem}>
                <Text style={styles.missionInfoIcon}>🎯</Text>
                <Text style={styles.missionInfoText}>
                  {currentMission.decisions.length} decisões
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.startButton,
                progress.energy.current < currentMission.energyCost && styles.startButtonDisabled
              ]}
              onPress={handleStartMission}
              activeOpacity={0.8}
              disabled={progress.energy.current < currentMission.energyCost}
            >
              <LinearGradient
                colors={
                  progress.energy.current >= currentMission.energyCost
                    ? ['#8B5CF6', '#D946EF']
                    : ['#64748B', '#475569']
                }
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {progress.energy.current >= currentMission.energyCost
                    ? 'Iniciar Missão 🚀'
                    : 'Energia Insuficiente ⚡'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Progresso */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>📈 Seu Progresso</Text>
          <View style={styles.progressGrid}>
            <View style={styles.progressItem}>
              <Text style={styles.progressNumber}>{progress.completedMissions.length}</Text>
              <Text style={styles.progressLabel}>Missões Completas</Text>
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressNumber}>{progress.totalDecisions}</Text>
              <Text style={styles.progressLabel}>Decisões Tomadas</Text>
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressNumber}>{progress.dayStreak}</Text>
              <Text style={styles.progressLabel}>Dias Seguidos</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

// Componente de barra de status
const StatBar = ({ icon, label, value, color }) => (
  <View style={styles.statBar}>
    <View style={styles.statHeader}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}/100</Text>
    </View>
    <View style={styles.statBarBg}>
      <View 
        style={[
          styles.statBarFill,
          { width: `${value}%`, backgroundColor: color }
        ]}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  loadingText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  energyContainer: {
    flex: 1,
    marginRight: 10,
  },
  energyLabel: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 8,
  },
  energyBar: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 4,
  },
  energyFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 6,
  },
  energyText: {
    fontSize: 12,
    color: '#E2E8F0',
    textAlign: 'center',
  },
  titleContainer: {
    flex: 1,
    marginLeft: 10,
  },
  titleLabel: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 8,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B5CF6',
    textAlign: 'center',
  },
  mascotContainer: {
    marginBottom: 30,
  },
  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  statBar: {
    marginBottom: 16,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  statLabel: {
    flex: 1,
    fontSize: 14,
    color: '#E2E8F0',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  missionCard: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  missionPhase: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B5CF6',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  missionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  missionDescription: {
    fontSize: 15,
    color: '#E2E8F0',
    marginBottom: 16,
    lineHeight: 22,
  },
  missionInfo: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  missionInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  missionInfoIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  missionInfoText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  startButton: {
    width: '100%',
  },
  startButtonDisabled: {
    opacity: 0.6,
  },
  buttonGradient: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  progressGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressItem: {
    alignItems: 'center',
    flex: 1,
  },
  progressNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
});

export default GameHubScreen;
