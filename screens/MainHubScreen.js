import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Animated 
} from 'react-native';
import Logo from '../components/Logo';

const MainHubScreen = ({ navigation }) => {
  const [userLevel] = useState(3);
  const [userXP] = useState(750);
  const [maxXP] = useState(1000);

  const trilhas = [
    {
      id: 1,
      title: '🔍 Descubra um Problema',
      description: 'Identifique desafios do mundo real',
      progress: 100,
      unlocked: true,
      completed: true,
      xp: 200,
      color: '#EF4444'
    },
    {
      id: 2,
      title: '💡 Crie uma Solução',
      description: 'Desenvolva ideias inovadoras',
      progress: 60,
      unlocked: true,
      completed: false,
      xp: 150,
      color: '#F59E0B'
    },
    {
      id: 3,
      title: '👥 Monte seu Time',
      description: 'Forme uma equipe incrível',
      progress: 0,
      unlocked: true,
      completed: false,
      xp: 0,
      color: '#3B82F6'
    },
    {
      id: 4,
      title: '✅ Valide sua Ideia',
      description: 'Teste e aprimore sua solução',
      progress: 0,
      unlocked: false,
      completed: false,
      xp: 0,
      color: '#8B5CF6'
    },
    {
      id: 5,
      title: '🎤 Faça seu Pitch',
      description: 'Apresente sua ideia ao mundo',
      progress: 0,
      unlocked: false,
      completed: false,
      xp: 0,
      color: '#EC4899'
    }
  ];

  const handleTrilhaPress = (trilha) => {
    if (trilha.unlocked) {
      navigation.navigate('Mission', { trilha });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header com perfil do usuário */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>🦸‍♂️</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Jovem Empreendedor</Text>
            <Text style={styles.userLevel}>Nível {userLevel}</Text>
          </View>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Barra de XP */}
        <View style={styles.xpContainer}>
          <Text style={styles.xpText}>XP: {userXP}/{maxXP}</Text>
          <View style={styles.xpBar}>
            <View 
              style={[
                styles.xpProgress, 
                { width: `${(userXP / maxXP) * 100}%` }
              ]} 
            />
          </View>
        </View>
      </View>

      {/* Mapa de Trilhas */}
      <View style={styles.mapContainer}>
        <Logo size="small" showText={false} />
        <Text style={styles.mapTitle}>🗺️ Mapa de Trilhas</Text>
        
        <View style={styles.trilhasContainer}>
          {trilhas.map((trilha, index) => (
            <View key={trilha.id} style={styles.trilhaWrapper}>
              {/* Linha conectora */}
              {index < trilhas.length - 1 && (
                <View style={styles.connectorLine} />
              )}
              
              <TouchableOpacity
                style={[
                  styles.trilhaCard,
                  { 
                    backgroundColor: trilha.unlocked ? trilha.color : '#D1D5DB',
                    opacity: trilha.unlocked ? 1 : 0.6 
                  }
                ]}
                onPress={() => handleTrilhaPress(trilha)}
                disabled={!trilha.unlocked}
              >
                <View style={styles.trilhaHeader}>
                  <Text style={styles.trilhaTitle}>{trilha.title}</Text>
                  {trilha.completed && (
                    <Text style={styles.completedBadge}>✅</Text>
                  )}
                  {!trilha.unlocked && (
                    <Text style={styles.lockedBadge}>🔒</Text>
                  )}
                </View>
                
                <Text style={styles.trilhaDescription}>
                  {trilha.description}
                </Text>
                
                {trilha.unlocked && (
                  <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>
                      Progresso: {trilha.progress}%
                    </Text>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { width: `${trilha.progress}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.xpReward}>+{trilha.xp} XP</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Seção de conquistas recentes */}
      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>🏆 Conquistas Recentes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementIcon}>🔍</Text>
            <Text style={styles.achievementText}>Explorador</Text>
          </View>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementIcon}>💡</Text>
            <Text style={styles.achievementText}>Inovador</Text>
          </View>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementIcon}>⭐</Text>
            <Text style={styles.achievementText}>Estrela</Text>
          </View>
        </ScrollView>
      </View>

      {/* Botões de navegação rápida */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('Ranking')}
        >
          <Text style={styles.quickActionIcon}>🏆</Text>
          <Text style={styles.quickActionText}>Ranking</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('Impact')}
        >
          <Text style={styles.quickActionIcon}>🌍</Text>
          <Text style={styles.quickActionText}>Impacto</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('DesafioEmpreendedor')}
        >
          <Text style={styles.quickActionIcon}>🎮</Text>
          <Text style={styles.quickActionText}>Mini-jogos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('Community')}
        >
          <Text style={styles.quickActionIcon}>👥</Text>
          <Text style={styles.quickActionText}>Comunidade</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#10B981',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  avatarEmoji: {
    fontSize: 30,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  userLevel: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingsButton: {
    padding: 10,
  },
  settingsIcon: {
    fontSize: 24,
  },
  xpContainer: {
    marginBottom: 10,
  },
  xpText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 5,
  },
  xpBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpProgress: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  mapContainer: {
    padding: 20,
    alignItems: 'center',
  },
  mapTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    marginTop: 10,
  },
  trilhasContainer: {
    width: '100%',
  },
  trilhaWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  connectorLine: {
    width: 4,
    height: 30,
    backgroundColor: '#D1D5DB',
    marginBottom: 10,
  },
  trilhaCard: {
    width: '90%',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  trilhaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  trilhaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  completedBadge: {
    fontSize: 20,
  },
  lockedBadge: {
    fontSize: 20,
  },
  trilhaDescription: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginBottom: 15,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressText: {
    fontSize: 12,
    color: 'white',
    marginBottom: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  xpReward: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  achievementsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  achievementCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  achievementIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  achievementText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    paddingBottom: 40,
  },
  quickActionButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  quickActionText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default MainHubScreen;