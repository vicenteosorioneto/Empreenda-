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
              {conquista.tipo ? conquista.tipo.toUpperCase() : 'TIPO'}
            </Text>
          </View>
          
          <View style={[
            styles.raridadeBadge,
            { backgroundColor: getRarityColor(conquista.raridade) }
          ]}>
            <Text style={styles.raridadeBadgeText}>
              {conquista.raridade ? conquista.raridade.toUpperCase() : 'COMUM'}
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
  filterButton: {
    padding: 8,
  },
  filterIcon: {
    fontSize: 16,
  },
  statsContainer: {
    padding: 16,
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
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
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
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
    fontSize: 13,
    marginBottom: 3,
  },
  tabText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#10B981',
    fontWeight: 'bold',
  },
  conquistasList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  conquistaCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
    marginBottom: 12,
  },
  conquistaIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  conquistaEmoji: {
    fontSize: 22,
  },
  lockedEmoji: {
    fontSize: 19,
  },
  conquistaInfo: {
    flex: 1,
    marginRight: 8,
  },
  conquistaTitulo: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  conquistaDescricao: {
    fontSize: 11,
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
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  tipoBadgeText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
  raridadeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  raridadeBadgeText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
  conquistaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  xpReward: {
    backgroundColor: '#10B981',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  xpText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  dataConquista: {
    fontSize: 10,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  dicitaButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  dicitaText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  ctaButton: {
    backgroundColor: '#10B981',
    margin: 16,
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  ctaButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
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

export default ConquistasScreen;