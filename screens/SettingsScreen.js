import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import { 
  getSettings, 
  saveSettings, 
  clearAllData 
} from '../utils/storage';

const SettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    sound: true,
    hapticFeedback: true,
    darkMode: false,
    autoSaveProgress: true,
    offlineMode: false,
    analytics: true,
    reminders: true
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const savedSettings = await getSettings();
      if (savedSettings) {
        setSettings(prev => ({ ...prev, ...savedSettings }));
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSetting = async (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key]
    };
    
    setSettings(newSettings);
    
    try {
      await saveSettings(newSettings);
    } catch (error) {
      console.error('Erro ao salvar configuração:', error);
      // Reverter mudança se houver erro
      setSettings(settings);
      Alert.alert('Erro', 'Não foi possível salvar a configuração. Tente novamente.');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        }
      ]
    );
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Excluir Conta',
      'ATENÇÃO: Esta ação irá deletar todos os seus dados permanentemente. Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllData();
              Alert.alert(
                'Conta Excluída',
                'Todos os seus dados foram excluídos com sucesso.',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.reset({
                      index: 0,
                      routes: [{ name: 'Login' }],
                    })
                  }
                ]
              );
            } catch (error) {
              console.error('Erro ao excluir dados:', error);
              Alert.alert('Erro', 'Não foi possível excluir os dados. Tente novamente.');
            }
          }
        }
      ]
    );
  };

  const SettingItem = ({ title, subtitle, value, onToggle, icon, color = '#10B981' }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <View style={[styles.settingIcon, { backgroundColor: color + '20' }]}>
          <Text style={styles.settingEmoji}>{icon}</Text>
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#E5E7EB', true: color + '40' }}
        thumbColor={value ? color : '#9CA3AF'}
      />
    </View>
  );

  const ActionItem = ({ title, subtitle, icon, color = '#6B7280', onPress, danger = false }) => (
    <TouchableOpacity 
      style={[styles.actionItem, danger && styles.dangerItem]}
      onPress={onPress}
    >
      <View style={styles.settingInfo}>
        <View style={[
          styles.settingIcon, 
          { backgroundColor: danger ? '#FEE2E2' : color + '20' }
        ]}>
          <Text style={styles.settingEmoji}>{icon}</Text>
        </View>
        <View style={styles.settingText}>
          <Text style={[
            styles.settingTitle,
            danger && styles.dangerText
          ]}>
            {title}
          </Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Text style={[
        styles.actionArrow,
        danger && styles.dangerText
      ]}>→</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Carregando configurações...</Text>
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
        <Text style={styles.headerTitle}>⚙️ Configurações</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Seção Notificações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 Notificações</Text>
          
          <View style={styles.sectionCard}>
            <SettingItem
              title="Notificações Push"
              subtitle="Receba lembretes e atualizações"
              value={settings.notifications}
              onToggle={() => toggleSetting('notifications')}
              icon="🔔"
              color="#3B82F6"
            />
            
            <SettingItem
              title="Lembretes Diários"
              subtitle="Lembrete para continuar sua jornada"
              value={settings.reminders}
              onToggle={() => toggleSetting('reminders')}
              icon="⏰"
              color="#F59E0B"
            />
          </View>
        </View>

        {/* Seção Interface */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Interface</Text>
          
          <View style={styles.sectionCard}>
            <SettingItem
              title="Som"
              subtitle="Efeitos sonoros e música"
              value={settings.sound}
              onToggle={() => toggleSetting('sound')}
              icon="🔊"
              color="#10B981"
            />
            
            <SettingItem
              title="Vibração"
              subtitle="Feedback tátil nas interações"
              value={settings.hapticFeedback}
              onToggle={() => toggleSetting('hapticFeedback')}
              icon="📳"
              color="#8B5CF6"
            />
            
            <SettingItem
              title="Modo Escuro"
              subtitle="Interface com tema escuro"
              value={settings.darkMode}
              onToggle={() => toggleSetting('darkMode')}
              icon="🌙"
              color="#6B7280"
            />
          </View>
        </View>

        {/* Seção Dados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💾 Dados e Privacidade</Text>
          
          <View style={styles.sectionCard}>
            <SettingItem
              title="Salvamento Automático"
              subtitle="Salva progresso automaticamente"
              value={settings.autoSaveProgress}
              onToggle={() => toggleSetting('autoSaveProgress')}
              icon="💾"
              color="#10B981"
            />
            
            <SettingItem
              title="Modo Offline"
              subtitle="Permite uso sem internet"
              value={settings.offlineMode}
              onToggle={() => toggleSetting('offlineMode')}
              icon="📱"
              color="#6B7280"
            />
            
            <SettingItem
              title="Análise de Uso"
              subtitle="Ajuda a melhorar o aplicativo"
              value={settings.analytics}
              onToggle={() => toggleSetting('analytics')}
              icon="📊"
              color="#3B82F6"
            />
          </View>
        </View>

        {/* Seção Informações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ Informações</Text>
          
          <View style={styles.sectionCard}>
            <ActionItem
              title="Sobre o App"
              subtitle="Versão, desenvolvedores e créditos"
              icon="ℹ️"
              color="#3B82F6"
              onPress={() => {
                Alert.alert(
                  'EMPREENDA+ v1.0.0',
                  'Desenvolvido para inspirar jovens empreendedores.\n\n🚀 Transformando ideias em realidade!'
                );
              }}
            />
            
            <ActionItem
              title="Termos de Uso"
              subtitle="Leia nossos termos e condições"
              icon="📋"
              color="#6B7280"
              onPress={() => {
                Alert.alert('Termos de Uso', 'Redirecionando para os termos...');
              }}
            />
            
            <ActionItem
              title="Política de Privacidade"
              subtitle="Como tratamos seus dados"
              icon="🔒"
              color="#6B7280"
              onPress={() => {
                Alert.alert('Política de Privacidade', 'Redirecionando para a política...');
              }}
            />
            
            <ActionItem
              title="Suporte"
              subtitle="Precisa de ajuda? Entre em contato"
              icon="🆘"
              color="#F59E0B"
              onPress={() => {
                Alert.alert('Suporte', 'Entre em contato: suporte@empreendamais.com');
              }}
            />
          </View>
        </View>

        {/* Seção Conta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Conta</Text>
          
          <View style={styles.sectionCard}>
            <ActionItem
              title="Sair da Conta"
              subtitle="Fazer logout do aplicativo"
              icon="🚪"
              color="#F59E0B"
              onPress={handleLogout}
            />
            
            <ActionItem
              title="Excluir Conta"
              subtitle="Remover conta permanentemente"
              icon="🗑️"
              danger={true}
              onPress={handleDeleteAccount}
            />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>EMPREENDA+ v1.0.0</Text>
          <Text style={styles.footerSubtext}>
            Feito com ❤️ para jovens empreendedores
          </Text>
        </View>
      </ScrollView>
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
  placeholder: {
    width: 44,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dangerItem: {
    backgroundColor: '#FEF2F2',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  settingEmoji: {
    fontSize: 18,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  dangerText: {
    color: '#DC2626',
  },
  actionArrow: {
    fontSize: 18,
    color: '#6B7280',
    marginLeft: 10,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
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

export default SettingsScreen;