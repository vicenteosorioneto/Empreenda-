import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  FlatList 
} from 'react-native';import { LinearGradient } from 'expo-linear-gradient';
import NavigationHeader from '../components/NavigationHeader';
const RankingScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('escola');
  
  const [rankings] = useState({
    escola: [
      { id: 1, nome: 'Ana Silva', avatar: '👑', xp: 3450, nivel: 7, medalhas: 12, posicao: 1 },
      { id: 2, nome: 'Carlos Santos', avatar: '🦸‍♂️', xp: 3200, nivel: 6, medalhas: 10, posicao: 2 },
      { id: 3, nome: 'Beatriz Costa', avatar: '🌟', xp: 2950, nivel: 6, medalhas: 9, posicao: 3 },
      { id: 4, nome: 'Diego Ferreira', avatar: '🚀', xp: 2750, nivel: 5, medalhas: 8, posicao: 4 },
      { id: 5, nome: 'Você', avatar: '🦸‍♂️', xp: 2250, nivel: 5, medalhas: 6, posicao: 5, isCurrentUser: true },
      { id: 6, nome: 'Elena Rodrigues', avatar: '💎', xp: 2100, nivel: 4, medalhas: 7, posicao: 6 },
      { id: 7, nome: 'Felipe Oliveira', avatar: '⚡', xp: 1850, nivel: 4, medalhas: 5, posicao: 7 },
      { id: 8, nome: 'Gabriela Souza', avatar: '🎯', xp: 1600, nivel: 3, medalhas: 4, posicao: 8 },
    ],
    regiao: [
      { id: 1, nome: 'Escola Inovação', avatar: '🏫', xp: 45600, estudantes: 120, medalhas: 156, posicao: 1 },
      { id: 2, nome: 'Instituto Futuro', avatar: '🏛️', xp: 42300, estudantes: 98, medalhas: 134, posicao: 2 },
      { id: 3, nome: 'Sua Escola', avatar: '🎓', xp: 38900, estudantes: 87, medalhas: 98, posicao: 3, isCurrentUser: true },
      { id: 4, nome: 'Colégio Progresso', avatar: '📚', xp: 35200, estudantes: 75, medalhas: 89, posicao: 4 },
      { id: 5, nome: 'Academia Criativa', avatar: '🎨', xp: 31800, estudantes: 65, medalhas: 76, posicao: 5 },
    ],
    global: [
      { id: 1, nome: 'São Paulo - SP', avatar: '🌆', xp: 892000, escolas: 45, estudantes: 5400, posicao: 1 },
      { id: 2, nome: 'Rio de Janeiro - RJ', avatar: '🏖️', xp: 756000, escolas: 38, estudantes: 4200, posicao: 2 },
      { id: 3, nome: 'Sua Região', avatar: '🏘️', xp: 623000, escolas: 28, estudantes: 3100, posicao: 3, isCurrentUser: true },
      { id: 4, nome: 'Belo Horizonte - MG', avatar: '⛰️', xp: 589000, escolas: 32, estudantes: 2800, posicao: 4 },
      { id: 5, nome: 'Brasília - DF', avatar: '🏛️', xp: 534000, escolas: 25, estudantes: 2400, posicao: 5 },
    ]
  });

  const tabs = [
    { id: 'escola', title: 'Escola', icon: '🏫' },
    { id: 'regiao', title: 'Região', icon: '🏘️' },
    { id: 'global', title: 'Global', icon: '🌍' },
  ];

  const renderRankingItem = ({ item, index }) => {
    const isTopThree = item.posicao <= 3;
    const isCurrentUser = item.isCurrentUser;
    
    return (
      <View style={[
        styles.rankingCard,
        isCurrentUser && styles.currentUserCard,
        isTopThree && styles.topThreeCard
      ]}>
        {/* Posição */}
        <View style={[
          styles.positionContainer,
          isTopThree && styles.topThreePosition
        ]}>
          {item.posicao === 1 && <Text style={styles.crownIcon}>👑</Text>}
          {item.posicao === 2 && <Text style={styles.medalIcon}>🥈</Text>}
          {item.posicao === 3 && <Text style={styles.medalIcon}>🥉</Text>}
          <Text style={[
            styles.positionText,
            isTopThree && styles.topThreePositionText
          ]}>
            {item.posicao}º
          </Text>
        </View>

        {/* Avatar */}
        <View style={[
          styles.avatarContainer,
          isCurrentUser && styles.currentUserAvatar
        ]}>
          <Text style={styles.avatarEmoji}>{item.avatar}</Text>
        </View>

        {/* Informações */}
        <View style={styles.infoContainer}>
          <Text style={[
            styles.nameText,
            isCurrentUser && styles.currentUserName
          ]}>
            {item.nome}
            {isCurrentUser && ' (Você)'}
          </Text>
          
          <View style={styles.statsRow}>
            <Text style={styles.xpText}>
              {activeTab === 'escola' && `${item.xp} XP`}
              {activeTab === 'regiao' && `${item.xp} XP • ${item.estudantes} estudantes`}
              {activeTab === 'global' && `${item.xp} XP • ${item.escolas} escolas`}
            </Text>
          </View>
          
          <View style={styles.badgesRow}>
            <Text style={styles.levelBadge}>
              {activeTab === 'escola' && `Nv.${item.nivel}`}
              {activeTab === 'regiao' && `${item.medalhas} medalhas`}
              {activeTab === 'global' && `${item.estudantes} estudantes`}
            </Text>
          </View>
        </View>

        {/* Medals ou indicador */}
        <View style={styles.rightInfo}>
          <Text style={styles.medalCount}>
            {activeTab === 'escola' && `🏆 ${item.medalhas}`}
            {activeTab === 'regiao' && `🏫 ${item.estudantes}`}
            {activeTab === 'global' && `🎓 ${item.estudantes}`}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🏆 Ranking</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText
            ]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sua posição atual */}
      <View style={styles.currentPositionCard}>
        <View style={styles.currentPositionHeader}>
          <Text style={styles.currentPositionTitle}>Sua Posição Atual</Text>
          <Text style={styles.currentPositionEmoji}>🎯</Text>
        </View>
        
        <View style={styles.currentPositionStats}>
          <View style={styles.currentStat}>
            <Text style={styles.currentStatNumber}>
              {rankings[activeTab].find(item => item.isCurrentUser)?.posicao}º
            </Text>
            <Text style={styles.currentStatLabel}>Posição</Text>
          </View>
          
          <View style={styles.currentStat}>
            <Text style={styles.currentStatNumber}>
              {rankings[activeTab].find(item => item.isCurrentUser)?.xp}
            </Text>
            <Text style={styles.currentStatLabel}>XP Total</Text>
          </View>
          
          <View style={styles.currentStat}>
            <Text style={styles.currentStatNumber}>
              {rankings[activeTab].length - rankings[activeTab].find(item => item.isCurrentUser)?.posicao}
            </Text>
            <Text style={styles.currentStatLabel}>Atrás de Você</Text>
          </View>
        </View>
      </View>

      {/* Lista de Ranking */}
      <FlatList
        data={rankings[activeTab]}
        renderItem={renderRankingItem}
        keyExtractor={item => item.id.toString()}
        style={styles.rankingList}
        showsVerticalScrollIndicator={false}
      />

      {/* Botão de ação */}
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => navigation.navigate('MainHub')}
      >
        <Text style={styles.actionButtonText}>🚀 Subir no Ranking</Text>
      </TouchableOpacity>
    </View>
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
    justifyContent: 'space-between',
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
    padding: 10,
  },
  backIcon: {
    fontSize: 24,
    color: '#6B7280',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  filterButton: {
    padding: 10,
  },
  filterIcon: {
    fontSize: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    margin: 20,
    marginBottom: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 15,
    padding: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tabIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  tabText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#10B981',
    fontWeight: 'bold',
  },
  currentPositionCard: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 10,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  currentPositionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  currentPositionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  currentPositionEmoji: {
    fontSize: 24,
  },
  currentPositionStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  currentStat: {
    alignItems: 'center',
  },
  currentStatNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 5,
  },
  currentStatLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  rankingList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  rankingCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  currentUserCard: {
    borderWidth: 2,
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  topThreeCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  positionContainer: {
    width: 50,
    alignItems: 'center',
    marginRight: 15,
  },
  topThreePosition: {
    backgroundColor: '#FEF3C7',
    borderRadius: 25,
    padding: 5,
  },
  crownIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  medalIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  positionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  topThreePositionText: {
    color: '#F59E0B',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#E5E7EB',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  currentUserAvatar: {
    backgroundColor: '#10B981',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  infoContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  currentUserName: {
    color: '#10B981',
  },
  statsRow: {
    marginBottom: 5,
  },
  xpText: {
    fontSize: 14,
    color: '#6B7280',
  },
  badgesRow: {
    flexDirection: 'row',
  },
  levelBadge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  rightInfo: {
    alignItems: 'center',
  },
  medalCount: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#10B981',
    margin: 20,
    borderRadius: 25,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RankingScreen;