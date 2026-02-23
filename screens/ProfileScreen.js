import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import NavigationHeader from '../components/NavigationHeader';
import { XPBar, MedalhaComponent } from '../components/Gamification';
import { 
  getUserStats, 
  getMissionsProgress, 
  getUserMedals,
  getSettings 
} from '../utils/storage';

const ProfileScreen = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState({
    nome: 'Jovem Empreendedor',
    avatar: '🦸‍♂️',
    nivel: 1,
    xp: 0,
    maxXP: 1000,
    trilhasConcluidas: 0,
    totalTrilhas: 5,
    medalhas: [],
    estatisticas: {
      diasConsecutivos: 0,
      pontosImpacto: 0,
      ideiasCriadas: 0,
      problemasSolucionados: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Carrega estatísticas do usuário
      const stats = await getUserStats();
      
      // Carrega progresso das missões
      const missionsProgress = await getMissionsProgress();
      
      // Carrega medalhas
      const medals = await getUserMedals();
      
      // Carrega configurações
      const settings = await getSettings();
      
      // Calcula progresso das trilhas
      const completedMissions = Object.keys(missionsProgress || {}).length;
      const trilhasConcluidas = Math.floor(completedMissions / 3); // 3 missões por trilha
      
      setUserProfile({
        nome: settings.username || 'Jovem Empreendedor',
        avatar: settings.avatar || '🦸‍♂️',
        nivel: stats.level || 1,
        xp: stats.totalXP || 0,
        maxXP: stats.level ? stats.level * 1000 : 1000,
        trilhasConcluidas,
        totalTrilhas: 5,
        medalhas: medals || [],
        estatisticas: {
          diasConsecutivos: stats.consecutiveDays || 0,
          pontosImpacto: stats.impactPoints || 0,
          ideiasCriadas: stats.ideasCreated || 0,
          problemasSolucionados: completedMissions
        }
      });
    } catch (error) {
      console.error('Erro ao carregar dados do perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <NavigationHeader 
        title="Meu Perfil" 
        rightComponent={
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        }
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Perfil do Usuário */}
        <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>{userProfile.avatar}</Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{userProfile.nivel}</Text>
          </View>
        </View>
        
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userProfile.nome}</Text>
          <Text style={styles.userTitle}>Empreendedor Nível {userProfile.nivel}</Text>
        </View>

        {/* Barra de XP */}
        <XPBar 
          currentXP={userProfile.xp} 
          maxXP={userProfile.maxXP} 
          level={userProfile.nivel}
          animated={true}
        />
      </View>

      {/* Estatísticas */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>📊 Minhas Estatísticas</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userProfile.estatisticas.diasConsecutivos}</Text>
            <Text style={styles.statLabel}>Dias Seguidos</Text>
            <Text style={styles.statIcon}>🔥</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userProfile.estatisticas.pontosImpacto}</Text>
            <Text style={styles.statLabel}>Pontos Impacto</Text>
            <Text style={styles.statIcon}>🌍</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userProfile.estatisticas.ideiasCriadas}</Text>
            <Text style={styles.statLabel}>Ideias Criadas</Text>
            <Text style={styles.statIcon}>💡</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userProfile.estatisticas.problemasSolucionados}</Text>
            <Text style={styles.statLabel}>Problemas Resolvidos</Text>
            <Text style={styles.statIcon}>✅</Text>
          </View>
        </View>
      </View>

      {/* Progresso das Trilhas */}
      <View style={styles.progressContainer}>
        <Text style={styles.sectionTitle}>🗺️ Progresso nas Trilhas</Text>
        
        <View style={styles.progressCard}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              {userProfile.trilhasConcluidas} de {userProfile.totalTrilhas} trilhas concluídas
            </Text>
            <Text style={styles.progressPercentage}>
              {Math.round((userProfile.trilhasConcluidas / userProfile.totalTrilhas) * 100)}%
            </Text>
          </View>
          
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${(userProfile.trilhasConcluidas / userProfile.totalTrilhas) * 100}%` }
              ]} 
            />
          </View>
          
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => navigation.navigate('MainHub')}
          >
            <Text style={styles.continueButtonText}>Continuar Jornada</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Medalhas */}
      <View style={styles.medalhasContainer}>
        <Text style={styles.sectionTitle}>🏆 Minhas Conquistas</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.medalhasGrid}>
            {userProfile?.medalhas && userProfile.medalhas.map((medalha, index) => (
              <MedalhaComponent
                key={index}
                tipo={medalha.tipo}
                titulo={medalha.titulo}
                descricao={medalha.descricao}
                conquistada={medalha.conquistada}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Ações Rápidas */}
      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>⚡ Ações Rápidas</Text>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Ranking')}
        >
          <Text style={styles.actionIcon}>🏆</Text>
          <Text style={styles.actionText}>Ver Ranking</Text>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Impact')}
        >
          <Text style={styles.actionIcon}>🌍</Text>
          <Text style={styles.actionText}>Impacto Global</Text>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Conquistas')}
        >
          <Text style={styles.actionIcon}>🏆</Text>
          <Text style={styles.actionText}>Minhas Conquistas</Text>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📜</Text>
          <Text style={styles.actionText}>Certificados</Text>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.actionIcon}>⚙️</Text>
          <Text style={styles.actionText}>Configurações</Text>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    padding: 8,
  },
  backIcon: {
    fontSize: 20,
    color: '#6B7280',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    fontSize: 16,
  },
  profileCard: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    backgroundColor: '#10B981',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  avatarEmoji: {
    fontSize: 40,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userTitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  statsContainer: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statNumber: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  statIcon: {
    fontSize: 16,
  },
  progressContainer: {
    margin: 16,
    marginTop: 0,
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 13,
    color: '#374151',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 5,
  },
  continueButton: {
    backgroundColor: '#10B981',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  medalhasContainer: {
    margin: 16,
    marginTop: 0,
  },
  medalhasGrid: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  actionsContainer: {
    margin: 16,
    marginTop: 0,
    marginBottom: 32,
  },
  actionButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 19,
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  actionArrow: {
    fontSize: 14,
    color: '#6B7280',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default ProfileScreen;