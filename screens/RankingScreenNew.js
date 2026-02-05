import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import NavigationHeader from '../components/NavigationHeader';
import { getData } from '../utils/storage';

const { width } = Dimensions.get('window');

export default function RankingScreenNew({ navigation }) {
  const [activeTab, setActiveTab] = useState('turma'); // 'turma' ou 'escola'
  const [rankingData, setRankingData] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    loadUserData();
    loadRankingData();
  }, [activeTab]);

  const loadUserData = async () => {
    const data = await getData('userData');
    setUserData(data);
  };

  const loadRankingData = async () => {
    // Mock data - será substituído por dados reais do Firebase
    const mockClassRanking = [
      { id: 1, name: 'Maria Silva', points: 2850, avatar: '👩', level: 15, trend: 'up' },
      { id: 2, name: 'João Santos', points: 2720, avatar: '👨', level: 14, trend: 'up' },
      { id: 3, name: 'Ana Costa', points: 2650, avatar: '👧', level: 14, trend: 'down' },
      { id: 4, name: 'Pedro Lima', points: 2480, avatar: '🧑', level: 13, trend: 'up' },
      { id: 5, name: 'Você', points: 2350, avatar: '🎯', level: 12, trend: 'same', isCurrentUser: true },
      { id: 6, name: 'Lucas Souza', points: 2280, avatar: '👦', level: 12, trend: 'down' },
      { id: 7, name: 'Beatriz Alves', points: 2150, avatar: '👩', level: 11, trend: 'up' },
      { id: 8, name: 'Carlos Dias', points: 2050, avatar: '🧑', level: 11, trend: 'same' },
      { id: 9, name: 'Fernanda Reis', points: 1980, avatar: '👧', level: 10, trend: 'up' },
      { id: 10, name: 'Rafael Gomes', points: 1850, avatar: '👨', level: 10, trend: 'down' },
    ];

    const mockSchoolRanking = [
      { id: 1, name: 'Turma 3º A', points: 15850, avatar: '🏆', students: 32, trend: 'up' },
      { id: 2, name: 'Turma 2º B', points: 14720, avatar: '🥈', students: 30, trend: 'up' },
      { id: 3, name: 'Turma 3º B', points: 13650, avatar: '🥉', students: 28, trend: 'down' },
      { id: 4, name: 'Turma 1º A', points: 12480, avatar: '📚', students: 35, trend: 'up' },
      { id: 5, name: 'Sua Turma', points: 11350, avatar: '🎯', students: 25, trend: 'same', isCurrentUser: true },
    ];

    setRankingData(activeTab === 'turma' ? mockClassRanking : mockSchoolRanking);
    
    // Encontrar posição do usuário
    const currentUserIndex = activeTab === 'turma' 
      ? mockClassRanking.findIndex(item => item.isCurrentUser)
      : mockSchoolRanking.findIndex(item => item.isCurrentUser);
    
    setUserPosition(currentUserIndex + 1);
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <Ionicons name="trending-up" size={16} color="#43e97b" />;
      case 'down': return <Ionicons name="trending-down" size={16} color="#f5576c" />;
      default: return <Ionicons name="remove" size={16} color="#a8b2d1" />;
    }
  };

  const getMedalColor = (position) => {
    switch (position) {
      case 1: return ['#FFD700', '#FFA500'];
      case 2: return ['#C0C0C0', '#808080'];
      case 3: return ['#CD7F32', '#8B4513'];
      default: return ['#667eea', '#764ba2'];
    }
  };

  const renderRankingItem = (item, index) => {
    const isTop3 = index < 3;
    const isCurrentUser = item.isCurrentUser;

    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.7}
        style={[
          styles.rankingItem,
          isCurrentUser && styles.currentUserItem
        ]}
      >
        <LinearGradient
          colors={isTop3 ? getMedalColor(index + 1) : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
          style={styles.itemGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.rankingPosition}>
            {isTop3 ? (
              <Text style={styles.positionEmoji}>
                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
              </Text>
            ) : (
              <Text style={[styles.positionNumber, isCurrentUser && styles.currentUserText]}>
                #{index + 1}
              </Text>
            )}
          </View>

          <Text style={styles.avatar}>{item.avatar}</Text>

          <View style={styles.itemInfo}>
            <Text style={[styles.itemName, isCurrentUser && styles.currentUserText]}>
              {item.name}
            </Text>
            {activeTab === 'escola' ? (
              <Text style={styles.itemSubtext}>{item.students} alunos</Text>
            ) : (
              <View style={styles.levelBadge}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.levelText}>Nível {item.level}</Text>
              </View>
            )}
          </View>

          <View style={styles.itemRight}>
            <View style={styles.pointsContainer}>
              <Text style={[styles.points, isCurrentUser && styles.currentUserText]}>
                {item.points.toLocaleString()}
              </Text>
              <Text style={styles.pointsLabel}>pts</Text>
            </View>
            <View style={styles.trendContainer}>
              {getTrendIcon(item.trend)}
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <NavigationHeader title="Ranking" />

      <View style={styles.header}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'turma' && styles.activeTab]}
            onPress={() => setActiveTab('turma')}
          >
            <Ionicons 
              name="people" 
              size={20} 
              color={activeTab === 'turma' ? '#fff' : '#a8b2d1'} 
            />
            <Text style={[styles.tabText, activeTab === 'turma' && styles.activeTabText]}>
              Minha Turma
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'escola' && styles.activeTab]}
            onPress={() => setActiveTab('escola')}
          >
            <Ionicons 
              name="school" 
              size={20} 
              color={activeTab === 'escola' ? '#fff' : '#a8b2d1'} 
            />
            <Text style={[styles.tabText, activeTab === 'escola' && styles.activeTabText]}>
              Toda Escola
            </Text>
          </TouchableOpacity>
        </View>

        {userPosition && (
          <View style={styles.userPositionCard}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.positionCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.positionCardLabel}>Sua Posição</Text>
              <Text style={styles.positionCardValue}>#{userPosition}</Text>
            </LinearGradient>
          </View>
        )}
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.rankingList}>
          {rankingData.map((item, index) => renderRankingItem(item, index))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 4,
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(102, 126, 234, 0.5)',
  },
  tabText: {
    fontSize: 14,
    color: '#a8b2d1',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  userPositionCard: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  positionCardGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  positionCardLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  positionCardValue: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  rankingList: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  rankingItem: {
    marginBottom: 12,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  currentUserItem: {
    borderWidth: 2,
    borderColor: '#43e97b',
  },
  itemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  rankingPosition: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  positionEmoji: {
    fontSize: 24,
  },
  positionNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a8b2d1',
  },
  avatar: {
    fontSize: 32,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  itemSubtext: {
    fontSize: 12,
    color: '#a8b2d1',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  levelText: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '600',
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  pointsContainer: {
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  pointsLabel: {
    fontSize: 11,
    color: '#a8b2d1',
  },
  trendContainer: {
    marginTop: 2,
  },
  currentUserText: {
    color: '#43e97b',
  },
});
