import { Mission, Decision } from '../types/game';

// 🗺️ MISSÕES RPG - Jornada do Fundador

// MISSÃO 1: DESCOBERTA DE PROBLEMA
export const mission1Discovery: Mission = {
  id: 'mission_1_discovery',
  title: 'Capítulo 1: Descoberta de Problema',
  description: 'Todo grande negócio começa com um problema real',
  intro: 'Você acabou de decidir empreender. Mas antes de criar qualquer coisa, você precisa encontrar um problema que vale a pena resolver. Como você vai descobrir esse problema?',
  phase: 'DISCOVERY',
  energyCost: 2,
  completed: false,
  decisions: [
    {
      id: 'discovery_1',
      text: '🔍 Pesquisar estatísticas e relatórios de mercado',
      description: 'Analisar dados oficiais e estudos de caso',
      energyCost: 1,
      riskLevel: 'LOW',
      effects: {
        knowledge: 15,
        cash: -5,
        customerInterest: 0,
        motivation: 5,
      },
      consequenceText: 'Você adquiriu conhecimento teórico sólido, mas ainda não tem validação prática.',
    },
    {
      id: 'discovery_2',
      text: '💬 Conversar com 20 pessoas do público-alvo',
      description: 'Ir para a rua e entender problemas reais',
      energyCost: 1,
      riskLevel: 'MEDIUM',
      effects: {
        customerInterest: 25,
        knowledge: 10,
        cash: -3,
        motivation: 10,
        socialImpact: 5,
      },
      consequenceText: 'Você descobriu problemas reais e ganhou insights valiosos! As pessoas se mostraram interessadas.',
    },
    {
      id: 'discovery_3',
      text: '💡 Criar uma solução baseada na sua própria experiência',
      description: 'Resolver um problema que você mesmo tem',
      energyCost: 1,
      riskLevel: 'HIGH',
      effects: {
        motivation: 20,
        knowledge: 5,
        customerInterest: -10,
        cash: 0,
      },
      consequenceText: 'Você está motivado, mas pode estar criando uma solução sem demanda real...',
    },
    {
      id: 'discovery_4',
      text: '🎯 Observar tendências e apostar no futuro',
      description: 'Identificar onde o mercado está indo',
      energyCost: 1,
      riskLevel: 'MEDIUM',
      effects: {
        knowledge: 12,
        motivation: 15,
        cash: -5,
        customerInterest: 5,
        socialImpact: 3,
      },
      consequenceText: 'Você está de olho no futuro! Mas vai precisar validar se as pessoas já sentem esse problema hoje.',
    },
  ],
};

// MISSÃO 2: IDEAÇÃO
export const mission2Ideation: Mission = {
  id: 'mission_2_ideation',
  title: 'Capítulo 2: Ideação',
  description: 'Transforme o problema em uma solução inovadora',
  intro: 'Agora que você encontrou um problema real, é hora de criar uma solução! Como você vai abordar isso?',
  phase: 'IDEATION',
  energyCost: 2,
  completed: false,
  decisions: [
    {
      id: 'ideation_1',
      text: '🎨 Criar algo completamente novo e disruptivo',
      description: 'Inovar do zero sem olhar concorrência',
      energyCost: 1,
      riskLevel: 'HIGH',
      effects: {
        motivation: 25,
        knowledge: -5,
        cash: -10,
        customerInterest: -5,
        socialImpact: 10,
      },
      consequenceText: 'Inovação radical! Mas você vai precisar educar o mercado... isso custa tempo e dinheiro.',
    },
    {
      id: 'ideation_2',
      text: '🔄 Melhorar uma solução existente',
      description: 'Pegar algo que já funciona e fazer melhor',
      energyCost: 1,
      riskLevel: 'LOW',
      effects: {
        knowledge: 15,
        customerInterest: 15,
        cash: -3,
        motivation: 5,
      },
      consequenceText: 'Estratégia inteligente! Você vai competir com quem já existe, mas o mercado já está validado.',
    },
    {
      id: 'ideation_3',
      text: '🤝 Co-criar com potenciais clientes',
      description: 'Envolver o público na construção da solução',
      energyCost: 1,
      riskLevel: 'MEDIUM',
      effects: {
        customerInterest: 30,
        socialImpact: 15,
        knowledge: 10,
        cash: -5,
        motivation: 15,
      },
      consequenceText: 'Excelente! Você está construindo COM as pessoas que vão usar. Engajamento garantido!',
    },
    {
      id: 'ideation_4',
      text: '💻 Usar tecnologia para automatizar tudo',
      description: 'Criar uma solução tech-first',
      energyCost: 1,
      riskLevel: 'MEDIUM',
      effects: {
        knowledge: 20,
        cash: -15,
        customerInterest: 5,
        motivation: 10,
      },
      consequenceText: 'Tecnologia é poderosa, mas vai custar caro e levar tempo. Você tem fôlego financeiro?',
    },
  ],
};

// MISSÃO 3: VALIDAÇÃO
export const mission3Validation: Mission = {
  id: 'mission_3_validation',
  title: 'Capítulo 3: Validação com Clientes',
  description: 'Teste suas ideias antes de investir pesado',
  intro: 'Você tem uma ideia incrível! Mas será que os clientes realmente pagariam por isso? Hora de validar!',
  phase: 'VALIDATION',
  energyCost: 2,
  completed: false,
  decisions: [
    {
      id: 'validation_1',
      text: '📋 Criar uma landing page e medir interesse',
      description: 'Teste rápido e barato para medir demanda',
      energyCost: 1,
      riskLevel: 'LOW',
      effects: {
        customerInterest: 20,
        knowledge: 10,
        cash: -2,
        motivation: 10,
      },
      consequenceText: 'Você validou interesse! Mas interesse não é venda ainda...',
    },
    {
      id: 'validation_2',
      text: '💰 Pré-vender para clientes beta',
      description: 'Vender antes de construir',
      energyCost: 1,
      riskLevel: 'HIGH',
      effects: {
        cash: 25,
        customerInterest: 20,
        motivation: 25,
        knowledge: 5,
      },
      consequenceText: 'Incrível! Você vendeu antes de existir! Agora é entregar ou devolver o dinheiro...',
    },
    {
      id: 'validation_3',
      text: '🎁 Criar um MVP gratuito e coletar feedback',
      description: 'Construir algo simples para testar',
      energyCost: 1,
      riskLevel: 'MEDIUM',
      effects: {
        customerInterest: 25,
        knowledge: 15,
        cash: -10,
        motivation: 15,
        socialImpact: 10,
      },
      consequenceText: 'Você está aprendendo rápido! O feedback é ouro, mas você vai precisar monetizar logo.',
    },
    {
      id: 'validation_4',
      text: '📊 Fazer uma pesquisa detalhada de mercado',
      description: 'Coletar dados antes de agir',
      energyCost: 1,
      riskLevel: 'LOW',
      effects: {
        knowledge: 25,
        cash: -5,
        customerInterest: 5,
        motivation: 5,
      },
      consequenceText: 'Você tem dados! Mas cuidado para não ficar preso na análise... hora de agir.',
    },
  ],
};

// Lista de todas as missões
export const allMissions: Mission[] = [
  mission1Discovery,
  mission2Ideation,
  mission3Validation,
];

// Obter missão por ID
export const getMissionById = (id: string): Mission | undefined => {
  return allMissions.find((mission) => mission.id === id);
};

// Obter próxima missão
export const getNextMission = (currentMissionId: string): Mission | undefined => {
  const currentIndex = allMissions.findIndex((m) => m.id === currentMissionId);
  if (currentIndex === -1 || currentIndex === allMissions.length - 1) return undefined;
  return allMissions[currentIndex + 1];
};
