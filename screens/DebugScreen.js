import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { 
  getUserStats, 
  getMissionsProgress, 
  getUserMedals,
  getSettings,
  clearAllData,
  addXP,
  completeMission,
  awardMedal
} from '../utils/storage';
import { populateDemoData, clearAllData as clearMockData, showCurrentData } from '../data/mockData';

const DebugScreen = ({ navigation }) => {
  const [debugData, setDebugData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDebugData();
  }, []);

  const loadDebugData = async () => {
    try {
      setLoading(true);
      const [stats, missions, medals, settings] = await Promise.all([
        getUserStats(),
        getMissionsProgress(),
        getUserMedals(),
        getSettings()
      ]);

      setDebugData({
        stats,
        missions,
        medals,
        settings
      });
    } catch (error) {
      console.error('Erro ao carregar dados de debug:', error);
    } finally {
      setLoading(false);
    }
  };

  const testStorage = async () => {
    try {
      // Testa adicionar XP
      await addXP(100);
      
      // Testa completar uma missão
      await completeMission('test_mission', 'Esta é uma resposta de teste');
      
      // Testa conceder medalha
      await awardMedal('primeiro_passo');
      
      Alert.alert('Sucesso', 'Testes de storage executados com sucesso!');
      loadDebugData();
    } catch (error) {
      Alert.alert('Erro', `Erro nos testes: ${error.message}`);
    }
  };

  const clearData = async () => {
    Alert.alert(
      'Limpar Dados',
      'Tem certeza que deseja limpar todos os dados?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllData();
              Alert.alert('Sucesso', 'Todos os dados foram limpos!');
              loadDebugData();
            } catch (error) {
              Alert.alert('Erro', `Erro ao limpar dados: ${error.message}`);
            }
          }
        }
      ]
    );
  };

  const populateDemo = async () => {
    try {
      Alert.alert(
        '🎭 Popular Dados Demo',
        'Isso vai criar:\n• Usuário Maria Silva (Nível 5)\n• 8 medalhas desbloqueadas\n• 2 trilhas completas\n• Ranking com 15 usuários\n\nContinuar?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Popular',
            onPress: async () => {
              const result = await populateDemoData();
              if (result.success) {
                Alert.alert(
                  '✅ Sucesso!',
                  'Dados demo populados!\nReinicie o app para ver as mudanças.',
                  [
                    { 
                      text: 'Reiniciar Agora', 
                      onPress: () => {
                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'Splash' }],
                        });
                      }
                    },
                    { text: 'Depois', style: 'cancel' }
                  ]
                );
              } else {
                Alert.alert('Erro', result.error || 'Erro ao popular dados');
              }
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const showData = async () => {
    try {
      const data = await showCurrentData();
      const summary = `📊 Dados Atuais:\n\nNível: ${data.userStats?.level || 'N/A'}\nXP: ${data.userStats?.totalXP || 0}\nMedalhas: ${data.badges?.length || 0}\nRanking: ${data.ranking?.length || 0} usuários`;
      Alert.alert('Dados do Storage', summary);
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Carregando dados de debug...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Debug Storage</Text>
      </View>

      {/* Dados do Usuário */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Estatísticas do Usuário</Text>
        <Text style={styles.debugText}>
          {JSON.stringify(debugData.stats, null, 2)}
        </Text>
      </View>

      {/* Progresso das Missões */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Progresso das Missões</Text>
        <Text style={styles.debugText}>
          {JSON.stringify(debugData.missions, null, 2)}
        </Text>
      </View>

      {/* Medalhas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Medalhas</Text>
        <Text style={styles.debugText}>
          {JSON.stringify(debugData.medals, null, 2)}
        </Text>
      </View>

      {/* Configurações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Configurações</Text>
        <Text style={styles.debugText}>
          {JSON.stringify(debugData.settings, null, 2)}
        </Text>
      </View>

      {/* Botões de Teste */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.demoButton} onPress={populateDemo}>
          <Text style={styles.buttonText}>🎭 Popular Dados Demo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoButton} onPress={showData}>
          <Text style={styles.buttonText}>📊 Ver Dados Atuais</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.testButton} onPress={testStorage}>
          <Text style={styles.buttonText}>🧪 Testar Storage</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.refreshButton} onPress={loadDebugData}>
          <Text style={styles.buttonText}>🔄 Recarregar Dados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={clearData}>
          <Text style={styles.buttonText}>🗑️ Limpar Dados</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01080eff',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#010714ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginRight: 15,
    padding: 5,
  },
  backIcon: {
    fontSize: 24,
    color: '#00050fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  section: {
    margin: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  debugText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#374151',
    backgroundColor: '#000308ff',
    padding: 10,
    borderRadius: 8,
  },
  buttonsContainer: {
    margin: 20,
    marginBottom: 40,
  },
  demoButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  infoButton: {
    backgroundColor: '#06B6D4',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  testButton: {
    backgroundColor: '#10B981',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#EF4444',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DebugScreen;