// 🎉 MENSAGENS MOTIVACIONAIS DO MASCOTE

export const motivationalMessages = [
  '🔥 Você está arrasando! Continue assim!',
  '⭐ Incrível! Você tem potencial empreendedor!',
  '🚀 Essa sequência de acertos mostra que você veio para vencer!',
  '💪 Mandou muito bem! Empreendedores de sucesso pensam assim!',
  '🎯 Perfeito! Você está no caminho certo!',
  '✨ Impressionante! Seu futuro é promissor!',
  '🏆 Show! Você entende de negócios!',
  '💡 Brilhante! Suas ideias vão longe!',
  '🌟 Excelente! Você nasceu para empreender!',
  '🎊 Uau! Você está dominando o jogo!'
];

export const getRandomMotivation = (): string => {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
};

export const dailyReminderMessages = [
  '🚀 10 min hoje podem mudar seu futuro!',
  '💡 Sua ideia está esperando por você!',
  '🎯 Pequenos passos diários levam a grandes conquistas!',
  '⭐ Que tal aprender algo novo hoje?',
  '🔥 Continue sua jornada empreendedora!',
  '💪 Você está mais perto do seu sonho!',
  '🌟 Aprenda, pratique, conquiste!',
  '🚀 Hora de dar mais um passo rumo ao sucesso!'
];
