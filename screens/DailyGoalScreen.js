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
      await NotificationService.scheduleDailyReminder(dailyMinutes, selectedHour);
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
    padding: 20,
    paddingTop: 60,
  },
  goalCard: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  goalEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#E2E8F0',
    marginBottom: 16,
  },
  goalValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  goalNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  goalUnit: {
    fontSize: 18,
    color: '#94A3B8',
    marginLeft: 8,
  },
  goalDescription: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  notificationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  notificationDescription: {
    fontSize: 15,
    color: '#94A3B8',
    marginBottom: 16,
  },
  hoursContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  hourCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  hourCardSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
  },
  hourEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  hourLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E2E8F0',
    marginBottom: 4,
  },
  hourLabelSelected: {
    color: '#8B5CF6',
  },
  hourDescription: {
    fontSize: 12,
    color: '#64748B',
  },
  exampleBox: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  exampleIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  exampleText: {
    flex: 1,
    fontSize: 14,
    color: '#E2E8F0',
    fontStyle: 'italic',
  },
  continueButton: {
    width: '100%',
    marginTop: 10,
  },
  buttonGradient: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default DailyGoalScreen;
