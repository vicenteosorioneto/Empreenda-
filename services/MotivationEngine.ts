// 🔥 MOTIVATION ENGINE - Sistema de Streak e Motivação

export class MotivationEngine {
  private static STREAK_THRESHOLD = 4; // A cada 4 acertos consecutivos

  // Verificar se deve mostrar motivação
  static checkStreak(correctAnswers: number): boolean {
    return correctAnswers > 0 && correctAnswers % this.STREAK_THRESHOLD === 0;
  }

  // Calcular pontuação
  static calculateScore(correct: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((correct / total) * 100);
  }

  // Avaliar desempenho
  static getPerformanceLevel(score: number): {
    level: string;
    message: string;
    emoji: string;
  } {
    if (score >= 90) {
      return {
        level: 'EXCEPCIONAL',
        message: 'Você dominou o conteúdo! 🏆',
        emoji: '🏆'
      };
    } else if (score >= 70) {
      return {
        level: 'ÓTIMO',
        message: 'Muito bom! Continue assim! 🌟',
        emoji: '🌟'
      };
    } else if (score >= 50) {
      return {
        level: 'BOM',
        message: 'Bom trabalho! Você pode melhorar! 💪',
        emoji: '💪'
      };
    } else {
      return {
        level: 'PRECISA MELHORAR',
        message: 'Continue praticando! Você consegue! 📚',
        emoji: '📚'
      };
    }
  }

  // Calcular streak atual
  static calculateCurrentStreak(answers: boolean[]): number {
    let streak = 0;
    for (let i = answers.length - 1; i >= 0; i--) {
      if (answers[i]) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }
}
