import { MascotReaction, RiskLevel, GameStats } from '../types/game';

// 🤖 MASCOTE ENGINE - Sistema de Reações do NPC

class MascotEngine {
  // Gerar reação baseada na decisão
  generateReaction(
    riskLevel: RiskLevel,
    statsChange: Partial<GameStats>,
    currentStats: GameStats
  ): MascotReaction {
    const totalChange = this.calculateTotalImpact(statsChange);
    const isPositive = totalChange > 0;
    const criticalStats = this.checkCriticalStats(currentStats);

    // Reação baseada em risco e resultado
    if (criticalStats.length > 0) {
      return this.getCriticalReaction(criticalStats);
    }

    if (riskLevel === 'HIGH') {
      return this.getHighRiskReaction(isPositive);
    }

    if (riskLevel === 'MEDIUM') {
      return this.getMediumRiskReaction(isPositive);
    }

    return this.getLowRiskReaction(isPositive);
  }

  // Calcular impacto total das mudanças
  private calculateTotalImpact(statsChange: Partial<GameStats>): number {
    return Object.values(statsChange).reduce((sum, val) => sum + (val || 0), 0);
  }

  // Verificar stats críticos (abaixo de 20)
  private checkCriticalStats(stats: GameStats): string[] {
    const critical: string[] = [];
    if (stats.cash < 20) critical.push('💰 Caixa');
    if (stats.customerInterest < 20) critical.push('😊 Clientes');
    if (stats.motivation < 20) critical.push('🔥 Motivação');
    return critical;
  }

  // Reação crítica
  private getCriticalReaction(criticalStats: string[]): MascotReaction {
    const messages = [
      `⚠️ Atenção! Seu ${criticalStats[0]} está muito baixo!`,
      `🚨 Cuidado! ${criticalStats[0]} precisa de atenção urgente!`,
      `⏰ Momento crítico! ${criticalStats[0]} está em risco!`,
    ];

    return {
      type: 'DANGER',
      message: messages[Math.floor(Math.random() * messages.length)],
      emoji: '🚨',
    };
  }

  // Reações para alto risco
  private getHighRiskReaction(isPositive: boolean): MascotReaction {
    if (isPositive) {
      const messages = [
        '🔥 Arriscado, mas funcionou! Você é corajoso!',
        '💪 Decisão ousada! Muitos não teriam essa coragem.',
        '🎯 Alto risco, alta recompensa! Brilhante!',
        '⚡ Você apostou alto e ganhou! Isso é empreender!',
      ];
      return {
        type: 'SUCCESS',
        message: messages[Math.floor(Math.random() * messages.length)],
        emoji: '🔥',
      };
    } else {
      const messages = [
        '😰 Essa decisão te custou caro... Mas aprendizado vem disso!',
        '💭 Arriscado demais... Muitos quebram aqui.',
        '⚠️ Ousadia tem seu preço. Vamos recuperar!',
        '📉 Alto risco nem sempre compensa. Vamos ajustar!',
      ];
      return {
        type: 'DANGER',
        message: messages[Math.floor(Math.random() * messages.length)],
        emoji: '😰',
      };
    }
  }

  // Reações para médio risco
  private getMediumRiskReaction(isPositive: boolean): MascotReaction {
    if (isPositive) {
      const messages = [
        '✨ Boa escolha! Equilibrou risco e resultado.',
        '👍 Decisão sólida! Isso é pensar como empreendedor.',
        '🎯 Perfeito! Você está no caminho certo.',
        '💡 Excelente! Risco calculado é a chave.',
      ];
      return {
        type: 'SUCCESS',
        message: messages[Math.floor(Math.random() * messages.length)],
        emoji: '✨',
      };
    } else {
      const messages = [
        '🤔 Hmm, poderia ser melhor. Vamos ajustar!',
        '💭 Não foi ideal, mas dá pra recuperar.',
        '📊 Resultado misto. Aprendizado é valioso!',
        '⚖️ Nem tudo sai perfeito. Siga em frente!',
      ];
      return {
        type: 'WARNING',
        message: messages[Math.floor(Math.random() * messages.length)],
        emoji: '🤔',
      };
    }
  }

  // Reações para baixo risco
  private getLowRiskReaction(isPositive: boolean): MascotReaction {
    if (isPositive) {
      const messages = [
        '😊 Seguro e efetivo! Bom trabalho.',
        '📈 Decisão prudente! Crescimento consistente.',
        '✅ Caminho seguro sempre vale a pena.',
        '🌱 Passo a passo, você está crescendo!',
      ];
      return {
        type: 'SUCCESS',
        message: messages[Math.floor(Math.random() * messages.length)],
        emoji: '😊',
      };
    } else {
      const messages = [
        '💭 Decisão segura, mas o impacto foi pequeno.',
        '📊 Sem grandes riscos, sem grandes ganhos.',
        '🤷 Resultado neutro. Tá tudo bem!',
        '⚖️ Estável, mas poderia ousar mais.',
      ];
      return {
        type: 'NEUTRAL',
        message: messages[Math.floor(Math.random() * messages.length)],
        emoji: '💭',
      };
    }
  }

  // Mensagem de introdução da missão
  getMissionIntro(missionTitle: string, phase: string): string {
    const intros: { [key: string]: string } = {
      DISCOVERY: `🔍 Bem-vindo à ${missionTitle}! É hora de descobrir um problema real que vale a pena resolver.`,
      IDEATION: `💡 Agora vem ${missionTitle}! Vamos transformar o problema em uma solução inovadora.`,
      VALIDATION: `✅ ${missionTitle} chegou! Hora de testar suas ideias com clientes reais.`,
      MVP: `🚀 ${missionTitle}! Vamos construir o mínimo necessário para validar a solução.`,
      PRICING: `💰 ${missionTitle}! Momento de definir quanto vale sua solução.`,
      PITCH: `🎤 ${missionTitle}! Hora de convencer investidores e parceiros.`,
      SCALE: `📈 ${missionTitle}! Agora é crescer e impactar mais pessoas!`,
    };

    return intros[phase] || `🎮 Bem-vindo à ${missionTitle}!`;
  }

  // Dica baseada no perfil do fundador
  getProfileTip(profile: string, situation: string): string {
    const tips: { [key: string]: { [key: string]: string } } = {
      VISIONARY: {
        decision: 'Como visionário, pense grande! Mas não esqueça da execução.',
        danger: 'Suas grandes ideias são valiosas, mas cuidado com o pragmatismo!',
        success: 'Sua visão está se concretizando! Continue sonhando alto.',
      },
      ANALYTICAL: {
        decision: 'Use seus dados! A análise é seu maior trunfo.',
        danger: 'Não paralise por análise. Às vezes é preciso arriscar.',
        success: 'Sua análise pagou! Decisões baseadas em dados vencem.',
      },
      EXECUTOR: {
        decision: 'Hora de agir! Sua força é fazer acontecer.',
        danger: 'Velocidade é boa, mas direção também importa!',
        success: 'Você fez acontecer! Execução impecável.',
      },
      SOCIAL: {
        decision: 'Pense nas pessoas! Seu networking é poderoso.',
        danger: 'Seus relacionamentos são fortes, mas números também contam!',
        success: 'Suas conexões fazem a diferença! Continue construindo pontes.',
      },
    };

    return tips[profile]?.[situation] || 'Você está indo bem! Continue assim.';
  }
}

export default new MascotEngine();
