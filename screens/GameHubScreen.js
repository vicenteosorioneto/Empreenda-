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
import RPGEngine from '../services/RPGEngine';
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
      const rpgProgress = await RPGEngine.loadProgress();
      
      // Se não existe progresso ou personagem, ir para criação
      if (!rpgProgress || !rpgProgress.character) {
        navigation.replace('CharacterCreation');
        return;
      }
      
      setProgress(rpgProgress);
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
      // Em caso de erro, ir para criação de personagem
      navigation.replace('CharacterCreation');
    } finally {
      setLoading(false);
    }
  };

  const handleStartMission = () => {
    if (!progress || progress.energy <= 0) {
      alert('⚡ Energia insuficiente! Complete missões para ganhar XP.');
      return;
    }
    navigation.navigate('Mission', { missionId: 'mission_1' });
  };

  const handleOpenSkills = () => {
    navigation.navigate('SkillTree');
  };

  if (loading || !progress || !progress.character) {
    return (
      <LinearGradient colors={['#0F172A', '#1E293B']} style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#334155']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header com nível e XP */}
        <View style={styles.header}>
          <View style={styles.levelContainer}>
            <Text style={styles.levelLabel}>🎓 Nível {progress.levels.currentLevel}</Text>
            <View style={styles.xpBar}>
              <View 
                style={[
                  styles.xpFill,
                  { width: `${(progress.levels.currentXP / progress.levels.xpForNextLevel) * 100}%` }
                ]}
              />
            </View>
            <Text style={styles.xpText}>
              {progress.levels.currentXP}/{progress.levels.xpForNextLevel} XP
            </Text>
          </View>

          <View style={styles.skillPointsContainer}>
            <Text style={styles.skillPointsLabel}>💎 {progress.levels.skillPoints}</Text>
            <Text style={styles.skillPointsSubtext}>Pontos</Text>
          </View>
        </View>

        {/* Informações do Personagem */}
        <View style={styles.characterCard}>
          <Text style={styles.characterName}>{progress.character.name}</Text>
          <Text style={styles.characterClass}>
            {progress.character.class === 'VISIONARY' && '🔮 Visionário'}
            {progress.character.class === 'STRATEGIST' && '♟️ Estrategista'}
            {progress.character.class === 'EXECUTOR' && '⚡ Executor'}
            {progress.character.class === 'INNOVATOR' && '💡 Inovador'}
          </Text>
          
          <TouchableOpacity style={styles.skillsButton} onPress={handleOpenSkills}>
            <Text style={styles.skillsButtonText}>🌳 Habilidades</Text>
          </TouchableOpacity>
        </View>

        {/* Mascote */}
        <View style={styles.mascotContainer}>
          <Mascot
            size="medium"
            message={`Olá ${progress.character.name}! Sua empresa está em ${progress.economy.money > 1000 ? 'ótima forma' : 'desenvolvimento'}. Continue assim!`}
            animated={true}
          />
        </View>

        {/* Economia e Status */}
        <View style={styles.economyContainer}>
          <Text style={styles.economyTitle}>💼 Empresa</Text>
          <View style={styles.economyGrid}>
            <View style={styles.economyItem}>
              <Text style={styles.economyIcon}>💰</Text>
              <Text style={styles.economyValue}>R$ {progress.economy.money}</Text>
              <Text style={styles.economyLabel}>Caixa</Text>
            </View>
            <View style={styles.economyItem}>
              <Text style={styles.economyIcon}>📈</Text>
              <Text style={styles.economyValue}>R$ {progress.economy.revenue}</Text>
              <Text style={styles.economyLabel}>Receita/mês</Text>
            </View>
            <View style={styles.economyItem}>
              <Text style={styles.economyIcon}>📉</Text>
              <Text style={styles.economyValue}>R$ {progress.economy.expenses}</Text>
              <Text style={styles.economyLabel}>Despesas/mês</Text>
            </View>
            <View style={styles.economyItem}>
              <Text style={styles.economyIcon}>⏱️</Text>
              <Text style={styles.economyValue}>{progress.economy.runway} meses</Text>
              <Text style={styles.economyLabel}>Runway</Text>
            </View>
          </View>
          
          <View style={styles.riskContainer}>
            <Text style={styles.riskLabel}>⚠️ Risco</Text>
            <View style={styles.riskBar}>
              <View 
                style={[
                  styles.riskFill,
                  { width: `${progress.economy.risk}%` }
                ]}
              />
            </View>
            <Text style={styles.riskText}>{progress.economy.risk}%</Text>
          </View>
        </View>

        {/* Atributos */}
        <View style={styles.attributesContainer}>
          <Text style={styles.attributesTitle}>✨ Atributos</Text>
          <AttributeBar 
            icon="🔮"
            label="Visão"
            value={progress.attributes.vision}
          />
          <AttributeBar 
            icon="📊"
            label="Gestão"
            value={progress.attributes.management}
          />
          <AttributeBar 
            icon="📱"
            label="Marketing"
            value={progress.attributes.marketing}
          />
          <AttributeBar 
            icon="💰"
            label="Finanças"
            value={progress.attributes.finance}
          />
          <AttributeBar 
            icon="👥"
            label="Liderança"
            value={progress.attributes.leadership}
          />
        </View>

        {/* Botão de Missão */}
        <View style={styles.missionCard}>
          <Text style={styles.missionTitle}>🎯 Continuar Jornada</Text>
          <Text style={styles.missionDescription}>
            Enfrente desafios e tome decisões estratégicas
          </Text>

          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartMission}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#8B5CF6', '#D946EF']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Iniciar Missão 🚀</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

// Componente de barra de atributo
const AttributeBar = ({ icon, label, value }) => (
  <View style={styles.attributeBar}>
    <View style={styles.attributeHeader}>
      <Text style={styles.attributeIcon}>{icon}</Text>
      <Text style={styles.attributeLabel}>{label}</Text>
      <Text style={styles.attributeValue}>{value}/100</Text>
    </View>
    <View style={styles.attributeBarBg}>
      <View 
        style={[
          styles.attributeBarFill,
          { width: `${value}%` }
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
    alignItems: 'center',
    marginBottom: 20,
  },
  levelContainer: {
    flex: 1,
    marginRight: 10,
  },
  levelLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 8,
  },
  xpBar: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 4,
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 6,
  },
  xpText: {
    fontSize: 12,
    color: '#E2E8F0',
    textAlign: 'center',
  },
  skillPointsContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  skillPointsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  skillPointsSubtext: {
    fontSize: 10,
    color: '#94A3B8',
  },
  characterCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  characterName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  characterClass: {
    fontSize: 16,
    color: '#8B5CF6',
    marginBottom: 12,
  },
  skillsButton: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  skillsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  mascotContainer: {
    marginBottom: 20,
  },
  economyContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  economyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  economyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  economyItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  economyIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  economyValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 2,
  },
  economyLabel: {
    fontSize: 12,
    color: '#94A3B8',
  },
  riskContainer: {
    marginTop: 8,
  },
  riskLabel: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 8,
  },
  riskBar: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 4,
  },
  riskFill: {
    height: '100%',
    backgroundColor: '#EF4444',
    borderRadius: 6,
  },
  riskText: {
    fontSize: 12,
    color: '#FCA5A5',
    textAlign: 'center',
  },
  attributesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  attributesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  attributeBar: {
    marginBottom: 16,
  },
  attributeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  attributeIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  attributeLabel: {
    fontSize: 14,
    color: '#E2E8F0',
    flex: 1,
  },
  attributeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  attributeBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  attributeBarFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
  },
  missionCard: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  missionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  missionDescription: {
    fontSize: 14,
    color: '#E2E8F0',
    marginBottom: 16,
    lineHeight: 20,
  },
  startButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default GameHubScreen;
