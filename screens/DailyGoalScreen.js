import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mascot } from '../components/Mascot';
import NotificationService from '../services/NotificationService';
import StorageService from '../services/StorageService';

// 🎯 DEFINIÇÃO DE META DIÁRIA + NOTIFICAÇÕES

const DailyGoalScreen = ({ navigation, route }) => {
  const { dailyMinutes } = route.params;
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedHour, setSelectedHour] = useState(20); // 20h por padrão

  const hours = [
    { hour: 7, label: '7h', emoji: '🌅', description: 'Manhã' },
    { hour: 12, label: '12h', emoji: '☀️', description: 'Almoço' },
    { hour: 18, label: '18h', emoji: '🌆', description: 'Tarde' },
    { hour: 20, label: '20h', emoji: '🌙', description: 'Noite' },
  ];

  const handleContinue = async () => {
    if (notificationsEnabled) {
      try {
        await NotificationService.scheduleDailyReminder(dailyMinutes, selectedHour);
      } catch (error) {
        console.log('Não foi possível agendar notificação, mas continuando...', error);
        // Continua o fluxo mesmo se a notificação falhar
      }
    }

    // Atualizar progresso
    const progress = await StorageService.getOnboardingProgress();
    if (progress) {
      await StorageService.saveOnboardingProgress({
        ...progress,
        goalSet: true,
        currentStep: 3,
      });
    }

    navigation.navigate('PlanSelection');
  };

  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B', '#334155']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Mascot
          size="medium"
          message={`Perfeito! Vamos definir sua meta de ${dailyMinutes} minutos por dia 🎯`}
          animated={true}
        />

        <View style={styles.goalCard}>
          <Text style={styles.goalEmoji}>🎯</Text>
          <Text style={styles.goalTitle}>Sua Meta Diária</Text>
          <View style={styles.goalValue}>
            <Text style={styles.goalNumber}>{dailyMinutes}</Text>
            <Text style={styles.goalUnit}>minutos/dia</Text>
          </View>
          <Text style={styles.goalDescription}>
            Pequenos passos diários levam a grandes conquistas!
          </Text>
        </View>

        <View style={styles.notificationCard}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>🔔 Lembretes Diários</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#64748B', true: '#8B5CF6' }}
              thumbColor={notificationsEnabled ? '#D946EF' : '#f4f3f4'}
            />
          </View>
          
          {notificationsEnabled && (
            <>
              <Text style={styles.notificationDescription}>
                Escolha o melhor horário para receber seu lembrete:
              </Text>
              
              <View style={styles.hoursContainer}>
                {hours.map((option) => (
                  <TouchableOpacity
                    key={option.hour}
                    style={[
                      styles.hourCard,
                      selectedHour === option.hour && styles.hourCardSelected,
                    ]}
                    onPress={() => setSelectedHour(option.hour)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.hourEmoji}>{option.emoji}</Text>
                    <Text style={[
                      styles.hourLabel,
                      selectedHour === option.hour && styles.hourLabelSelected
                    ]}>
                      {option.label}
                    </Text>
                    <Text style={styles.hourDescription}>{option.description}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <View style={styles.exampleBox}>
                <Text style={styles.exampleIcon}>💬</Text>
                <Text style={styles.exampleText}>
                  "🚀 10 min hoje podem mudar seu futuro!"
                </Text>
              </View>
            </>
          )}
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#8B5CF6', '#D946EF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Próximo Passo →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 48,
  },
  goalCard: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  goalEmoji: {
    fontSize: 51,
    marginBottom: 13,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E2E8F0',
    marginBottom: 13,
  },
  goalValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  goalNumber: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  goalUnit: {
    fontSize: 14,
    color: '#94A3B8',
    marginLeft: 6,
  },
  goalDescription: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  notificationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 13,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  notificationDescription: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 13,
  },
  hoursContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 13,
  },
  hourCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    padding: 13,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  hourCardSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
  },
  hourEmoji: {
    fontSize: 26,
    marginBottom: 6,
  },
  hourLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E2E8F0',
    marginBottom: 3,
  },
  hourLabelSelected: {
    color: '#8B5CF6',
  },
  hourDescription: {
    fontSize: 10,
    color: '#64748B',
  },
  exampleBox: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 10,
    padding: 11,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  exampleIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  exampleText: {
    flex: 1,
    fontSize: 11,
    color: '#E2E8F0',
    fontStyle: 'italic',
  },
  continueButton: {
    width: '100%',
    marginTop: 8,
  },
  buttonGradient: {
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default DailyGoalScreen;
