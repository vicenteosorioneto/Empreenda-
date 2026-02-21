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
    if (!progress || progress.energy.current <= 0) {
      alert('⚡ Energia insuficiente! Complete missões para ganhar XP.');
      return;
    }
    navigation.navigate('RPGMission', { missionId: 'mission_1' });
  };

  const handleOpenSkills = () => {
    navigation.navigate('SkillTree');
  };

  const handleMinigame = (gameName) => {
    navigation.navigate(gameName);
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
            <Text style={styles.levelLabel}>🎓 Nível {progress.character.level.currentLevel}</Text>
            <View style={styles.xpBar}>
              <View 
                style={[
                  styles.xpFill,
                  { width: `${(progress.character.level.currentXP / progress.character.level.xpToNextLevel) * 100}%` }
                ]}
              />
            </View>
            <Text style={styles.xpText}>
              {progress.character.level.currentXP}/{progress.character.level.xpToNextLevel} XP
            </Text>
          </View>

          <View style={styles.skillPointsContainer}>
            <Text style={styles.skillPointsLabel}>💎 {progress.character.level.skillPoints}</Text>
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
            value={progress.character.attributes.vision}
          />
          <AttributeBar 
            icon="📊"
            label="Gestão"
            value={progress.character.attributes.management}
          />
          <AttributeBar 
            icon="📱"
            label="Marketing"
            value={progress.character.attributes.marketing}
          />
          <AttributeBar 
            icon="💰"
            label="Finanças"
            value={progress.character.attributes.finance}
          />
          <AttributeBar 
            icon="👥"
            label="Liderança"
            value={progress.character.attributes.leadership}
          />
        </View>

        {/* Seção de Minigames */}
        <View style={styles.minigamesContainer}>
          <Text style={styles.minigamesTitle}>🎮 Minigames</Text>
          <Text style={styles.minigamesSubtitle}>
            Treine suas habilidades com jogos rápidos
          </Text>
          
          <View style={styles.minigamesGrid}>
            {/* Quiz Rápido */}
            <TouchableOpacity
              style={styles.minigameCard}
              onPress={() => handleMinigame('QuizRapido')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                style={styles.minigameGradient}
              >
                <Text style={styles.minigameIcon}>🧠</Text>
                <Text style={styles.minigameTitle}>Quiz Rápido</Text>
                <Text style={styles.minigameDescription}>
                  Teste seus conhecimentos
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Desafio Empreendedor */}
            <TouchableOpacity
              style={styles.minigameCard}
              onPress={() => handleMinigame('DesafioEmpreendedor')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.minigameGradient}
              >
                <Text style={styles.minigameIcon}>🚀</Text>
                <Text style={styles.minigameTitle}>Desafio</Text>
                <Text style={styles.minigameDescription}>
                  Resolva casos reais
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Roda da Inovação */}
            <TouchableOpacity
              style={styles.minigameCard}
              onPress={() => handleMinigame('InnovationWheel')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#F59E0B', '#D97706']}
                style={styles.minigameGradient}
              >
                <Text style={styles.minigameIcon}>⚡</Text>
                <Text style={styles.minigameTitle}>Roda Inovação</Text>
                <Text style={styles.minigameDescription}>
                  Gire e aprenda
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
  levelContainer: {
    flex: 1,
    marginRight: 8,
  },
  levelLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 6,
  },
  xpBar: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 3,
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 6,
  },
  xpText: {
    fontSize: 10,
    color: '#E2E8F0',
    textAlign: 'center',
  },
  skillPointsContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  skillPointsLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  skillPointsSubtext: {
    fontSize: 8,
    color: '#94A3B8',
  },
  characterCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 13,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  characterName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  characterClass: {
    fontSize: 13,
    color: '#8B5CF6',
    marginBottom: 10,
  },
  skillsButton: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 10,
  },
  skillsButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  mascotContainer: {
    marginBottom: 16,
  },
  economyContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 13,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  economyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 13,
  },
  economyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 13,
  },
  economyItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  economyIcon: {
    fontSize: 19,
    marginBottom: 3,
  },
  economyValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 2,
  },
  economyLabel: {
    fontSize: 10,
    color: '#94A3B8',
  },
  riskContainer: {
    marginTop: 6,
  },
  riskLabel: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 6,
  },
  riskBar: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 3,
  },
  riskFill: {
    height: '100%',
    backgroundColor: '#EF4444',
    borderRadius: 6,
  },
  riskText: {
    fontSize: 10,
    color: '#FCA5A5',
    textAlign: 'center',
  },
  attributesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 13,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  attributesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 13,
  },
  attributeBar: {
    marginBottom: 13,
  },
  attributeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  attributeIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  attributeLabel: {
    fontSize: 11,
    color: '#E2E8F0',
    flex: 1,
  },
  attributeValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  attributeBarBg: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  attributeBarFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
  },
  minigamesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 13,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  minigamesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  minigamesSubtitle: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 13,
  },
  minigamesGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  minigameCard: {
    flex: 1,
    borderRadius: 13,
    overflow: 'hidden',
  },
  minigameGradient: {
    padding: 13,
    alignItems: 'center',
    minHeight: 112,
    justifyContent: 'center',
  },
  minigameIcon: {
    fontSize: 29,
    marginBottom: 6,
  },
  minigameTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 3,
    textAlign: 'center',
  },
  minigameDescription: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  missionCard: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 13,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  missionDescription: {
    fontSize: 11,
    color: '#E2E8F0',
    marginBottom: 13,
    lineHeight: 16,
  },
  startButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 13,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default GameHubScreen;
