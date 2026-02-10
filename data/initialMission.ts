import { Mission } from '../types/onboarding';

// 🎮 MINI MISSÃO INICIAL - 5 perguntas rápidas sobre empreendedorismo
export const initialMission: Mission[] = [
  {
    id: 'm1',
    title: 'Primeira Missão',
    description: 'Vamos testar seus conhecimentos!',
    question: 'O que é mais importante ao começar um negócio?',
    options: [
      'Ter muito dinheiro',
      'Ter uma ideia que resolva um problema',
      'Ter um diploma universitário',
      'Conhecer pessoas famosas'
    ],
    correctOption: 1,
    explanation: 'Uma boa ideia que resolve um problema real é a base de qualquer negócio de sucesso!'
  },
  {
    id: 'm2',
    title: 'Primeira Missão',
    description: 'Continue!',
    question: 'Qual é o primeiro passo para validar uma ideia de negócio?',
    options: [
      'Criar um site profissional',
      'Conversar com potenciais clientes',
      'Alugar um escritório',
      'Fazer um MBA'
    ],
    correctOption: 1,
    explanation: 'Conversar com clientes em potencial ajuda a entender se sua ideia realmente resolve um problema!'
  },
  {
    id: 'm3',
    title: 'Primeira Missão',
    description: 'Você está indo bem!',
    question: 'O que significa MVP no mundo dos negócios?',
    options: [
      'Melhor Vendedor Profissional',
      'Mínimo Produto Viável',
      'Maior Valor Possível',
      'Modelo de Vendas Perfeito'
    ],
    correctOption: 1,
    explanation: 'MVP (Minimum Viable Product) é a versão mais simples do seu produto que pode ser testada!'
  },
  {
    id: 'm4',
    title: 'Primeira Missão',
    description: 'Quase lá!',
    question: 'Como um empreendedor aprende com os erros?',
    options: [
      'Desistindo do negócio',
      'Culpando outras pessoas',
      'Analisando o que deu errado e ajustando',
      'Fingindo que não aconteceu'
    ],
    correctOption: 2,
    explanation: 'Erros são oportunidades de aprendizado! Analisar e ajustar é fundamental.'
  },
  {
    id: 'm5',
    title: 'Primeira Missão',
    description: 'Última pergunta!',
    question: 'Qual é a característica mais importante de um empreendedor?',
    options: [
      'Ser perfeito',
      'Nunca errar',
      'Persistência e vontade de aprender',
      'Ter sorte'
    ],
    correctOption: 2,
    explanation: 'Persistência e vontade de aprender são essenciais. Empreender é uma jornada de aprendizado constante!'
  }
];
