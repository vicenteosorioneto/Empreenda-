import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import NavigationHeader from '../components/NavigationHeader';
import { getUserMedals } from '../utils/storage';
import medals from '../data/medals';

const { width } = Dimensions.get('window');

const ConquistasScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('todas');
  const [conquistas, setConquistas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConquistas();
  }, []);

  const loadConquistas = async () => {
    try {
      setLoading(true);
      
      // Carrega medalhas do usuário
      const userMedals = await getUserMedals();
      
      // Converte medalhas do objeto para array e combina com o status do usuário
      const medalsArray = Array.isArray(medals) ? medals : Object.values(medals);
      const allMedals = medalsArray.map(medal => {
        const userMedal = userMedals.find(um => um.id === medal.id);
        return {
          ...medal,
          conquistada: !!userMedal,
          dataConquista: userMedal?.dateAwarded,
          progresso: userMedal?.progress || 0
        };
      });
      
      setConquistas(allMedals);
    } catch (error) {
      console.error('Erro ao carregar conquistas:', error);
      // Fallback para dados mock se houver erro
      const medalsArray = Array.isArray(medals) ? medals : Object.values(medals);
      setConquistas(medalsArray.map(medal => ({ ...medal, conquistada: false, progresso: 0 })));
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'todas', title: 'Todas', icon: '🏆' },
    { id: 'conquistadas', title: 'Minhas', icon: '✅' },
    { id: 'bloqueadas', title: 'Futuras', icon: '🔒' },
  ];

  const getBadgeColor = (tipo) => {
    const colors = {
      bronze: '#CD7F32',
      prata: '#C0C0C0',
      ouro: '#FFD700',
      diamante: '#B9F2FF',
      especial: '#8B5CF6',
      lendario: '#EF4444'
    };
    return colors[tipo] || '#6B7280';
  };

  const getRarityColor = (raridade) => {
    const colors = {
      comum: '#6B7280',
      raro: '#3B82F6',
      épico: '#8B5CF6',
      lendário: '#EF4444'
    };
    return colors[raridade] || '#6B7280';
  };

  const getFilteredConquistas = () => {
    switch (activeTab) {
      case 'conquistadas':
        return conquistas.filter(c => c.conquistada);
      case 'bloqueadas':
        return conquistas.filter(c => !c.conquistada);
      default:
        return conquistas;
    }
  };

  const ConquistaCard = ({ conquista }) => (
    <View style={[
      styles.conquistaCard,
      !conquista.conquistada && styles.conquistaCardLocked
    ]}>
      <View style={styles.conquistaHeader}>
        <View style={[
          styles.conquistaIcon,
          { backgroundColor: getBadgeColor(conquista.tipo) + '20' }
        ]}>
          <Text style={[
            styles.conquistaEmoji,
            !conquista.conquistada && styles.lockedEmoji
          ]}>
            {conquista.conquistada ? conquista.icon : '🔒'}
          </Text>
        </View>
        
        <View style={styles.conquistaInfo}>
          <Text style={[
            styles.conquistaTitulo,
            !conquista.conquistada && styles.lockedText
          ]}>
            {conquista.titulo}
          </Text>
          <Text style={[
            styles.conquistaDescricao,
            !conquista.conquistada && styles.lockedText
          ]}>
            {conquista.descricao}
          </Text>
        </View>
        
        <View style={styles.conquistaBadges}>
          <View style={[
            styles.tipoBadge,
            { backgroundColor: getBadgeColor(conquista.tipo) }
          ]}>
            <Text style={styles.tipoBadgeText}>
              {conquista.tipo.toUpperCase()}
            </Text>
          </View>
          
          <View style={[
            styles.raridadeBadge,
            { backgroundColor: getRarityColor(conquista.raridade) }
          ]}>
            <Text style={styles.raridadeBadgeText}>
              {conquista.raridade.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.conquistaFooter}>
        <View style={styles.xpReward}>
          <Text style={styles.xpText}>+{conquista.xpReward} XP</Text>
        </View>
        
        {conquista.conquistada && conquista.dataConquista && (
          <Text style={styles.dataConquista}>
            Conquistada em {new Date(conquista.dataConquista).toLocaleDateString('pt-BR')}
          </Text>
        )}
        
        {!conquista.conquistada && (
          <TouchableOpacity style={styles.dicitaButton}>
            <Text style={styles.dicitaText}>Ver Dica</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const estatisticas = {
    totalConquistas: conquistas.length,
    conquistadas: conquistas.filter(c => c.conquistada).length,
    xpTotal: conquistas.filter(c => c.conquistada).reduce((acc, c) => acc + c.xpReward, 0),
    porcentagem: Math.round((conquistas.filter(c => c.conquistada).length / conquistas.length) * 100)
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Carregando conquistas...</Text>
      </View>
    );
  }

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
        <Text style={styles.headerTitle}>🏆 Conquistas</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>🏅</Text>
        </TouchableOpacity>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{estatisticas.conquistadas}</Text>
            <Text style={styles.statLabel}>Conquistadas</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{estatisticas.totalConquistas}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{estatisticas.xpTotal}</Text>
            <Text style={styles.statLabel}>XP Ganho</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{estatisticas.porcentagem}%</Text>
            <Text style={styles.statLabel}>Completo</Text>
          </View>
        </View>
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

      {/* Lista de Conquistas */}
      <FlatList
        data={getFilteredConquistas()}
        renderItem={({ item }) => <ConquistaCard conquista={item} />}
        keyExtractor={item => item.id.toString()}
        style={styles.conquistasList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {/* Call to Action */}
      <TouchableOpacity 
        style={styles.ctaButton}
        onPress={() => navigation.navigate('MainHub')}
      >
        <Text style={styles.ctaButtonText}>🚀 Conquistar Mais</Text>
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
  statsContainer: {
    padding: 20,
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
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
    fontSize: 16,
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
  conquistasList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  conquistaCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  conquistaCardLocked: {
    backgroundColor: '#F9FAFB',
    opacity: 0.7,
  },
  conquistaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  conquistaIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  conquistaEmoji: {
    fontSize: 28,
  },
  lockedEmoji: {
    fontSize: 24,
  },
  conquistaInfo: {
    flex: 1,
    marginRight: 10,
  },
  conquistaTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  conquistaDescricao: {
    fontSize: 14,
    color: '#6B7280',
  },
  lockedText: {
    color: '#9CA3AF',
  },
  conquistaBadges: {
    alignItems: 'flex-end',
    gap: 5,
  },
  tipoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tipoBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  raridadeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  raridadeBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  conquistaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 15,
  },
  xpReward: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  xpText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dataConquista: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  dicitaButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dicitaText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ctaButton: {
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
  ctaButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#6B7280',
  },
});

export default ConquistasScreen;