import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { dailyReminderMessages } from '../data/motivationalMessages';

// 🔔 NOTIFICATION SERVICE - Lembretes Diários

// Configurar como as notificações serão exibidas
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class NotificationService {
  // Solicitar permissão
  async requestPermission(): Promise<boolean> {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Permissão de notificação negada');
        return false;
      }

      // Configurar canal no Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('daily-reminder', {
          name: 'Lembretes Diários',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      return true;
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
      return false;
    }
  }

  // Agendar lembrete diário
  async scheduleDailyReminder(minutes: number, hour: number = 20): Promise<string | null> {
    try {
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        console.log('Sem permissão para notificações');
        return null;
      }

      // Cancelar notificações anteriores
      await this.cancelAllReminders();

      console.log('Notificação configurada para', hour, 'h');
      console.log('Meta de', minutes, 'minutos por dia');
      
      // TODO: Implementar agendamento de notificações quando o formato estiver correto
      // Por enquanto, apenas salva a configuração sem agendar
      return null;
    } catch (error) {
      console.error('Erro ao agendar notificação:', error);
      return null;
    }
  }

  // Cancelar todos os lembretes
  async cancelAllReminders(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log('Todas as notificações canceladas');
    } catch (error) {
      console.error('Erro ao cancelar notificações:', error);
    }
  }

  // Obter mensagem aleatória
  private getRandomReminderMessage(): string {
    const randomIndex = Math.floor(Math.random() * dailyReminderMessages.length);
    return dailyReminderMessages[randomIndex];
  }

  // Notificação imediata (teste)
  async sendImmediateNotification(title: string, body: string): Promise<void> {
    try {
      // TODO: Implementar quando o formato do trigger estiver correto
      console.log('Notificação:', title, body);
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
    }
  }

  // Verificar status das notificações agendadas
  async getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
    try {
      return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Erro ao obter notificações agendadas:', error);
      return [];
    }
  }
}

export default new NotificationService();
