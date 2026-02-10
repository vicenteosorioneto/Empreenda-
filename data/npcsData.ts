import { NPC, NPCType, Dialogue, DialogueOption } from '../types/rpg';

// 👥 NPCS DO JOGO

export const NPCS_DATA: { [npcId: string]: NPC } = {
  // ==================== MENTOR ====================
  mentor_maria: {
    id: 'mentor_maria',
    name: 'Maria Silva',
    type: 'MENTOR',
    emoji: '👩‍🏫',
    relationship: 70,
    dialogues: [],
  },

  // ==================== INVESTIDOR ====================
  investor_carlos: {
    id: 'investor_carlos',
    name: 'Carlos Investidor',
    type: 'INVESTOR',
    emoji: '💼',
    relationship: 50,
    dialogues: [],
  },

  // ==================== CLIENTE ====================
  client_ana: {
    id: 'client_ana',
    name: 'Ana Cliente',
    type: 'CLIENT',
    emoji: '👩‍💼',
    relationship: 60,
    dialogues: [],
  },

  // ==================== CONCORRENTE ====================
  competitor_joao: {
    id: 'competitor_joao',
    name: 'João Concorrente',
    type: 'COMPETITOR',
    emoji: '😎',
    relationship: 30,
    dialogues: [],
  },

  // ==================== PARCEIRO ====================
  partner_paula: {
    id: 'partner_paula',
    name: 'Paula Parceira',
    type: 'PARTNER',
    emoji: '🤝',
    relationship: 55,
    dialogues: [],
  },
};

// ==================== DIÁLOGOS ====================

export const DIALOGUES_DATA: { [dialogueId: string]: Dialogue } = {
  // Mentor - Introdução
  mentor_intro: {
    id: 'mentor_intro',
    npcId: 'mentor_maria',
    text: 'Olá! Bem-vindo ao mundo do empreendedorismo. Estou aqui para te guiar nessa jornada. Primeira lição: validar sua ideia é mais importante do que aperfeiçoá-la. O que você prefere fazer primeiro?',
    options: [
      {
        id: 'opt_validate',
        text: 'Ir para rua conversar com potenciais clientes',
        consequences: {
          relationship: 10,
          attributes: { marketing: 5, vision: 3 },
        },
        nextDialogueId: 'mentor_validation_path',
      },
      {
        id: 'opt_refine',
        text: 'Refinar mais minha ideia antes de mostrar',
        consequences: {
          relationship: -5,
          attributes: { vision: 2 },
        },
        nextDialogueId: 'mentor_warning_perfection',
      },
      {
        id: 'opt_ask',
        text: 'Me conte mais sobre validação',
        consequences: {
          relationship: 5,
          attributes: { management: 3 },
        },
        nextDialogueId: 'mentor_explain_validation',
      },
    ],
    context: 'Primeira conversa com o mentor',
  },

  mentor_validation_path: {
    id: 'mentor_validation_path',
    npcId: 'mentor_maria',
    text: 'Excelente escolha! Conversar com clientes reais é o melhor caminho. Lembre-se: você não está vendendo ainda, está aprendendo. Faça perguntas abertas e escute mais do que fala.',
    options: [
      {
        id: 'opt_continue',
        text: 'Entendido! Vou começar hoje.',
        consequences: {
          relationship: 10,
          money: -50,
          attributes: { marketing: 3 },
        },
      },
    ],
  },

  mentor_warning_perfection: {
    id: 'mentor_warning_perfection',
    npcId: 'mentor_maria',
    text: 'Cuidado com o perfeccionismo. Muitas startups morrem antes de lançar porque ficam refinando eternamente. Lembre-se: feito é melhor que perfeito.',
    options: [
      {
        id: 'opt_understand',
        text: 'Você tem razão. Vou validar primeiro.',
        consequences: {
          relationship: 5,
          attributes: { management: 3 },
        },
        nextDialogueId: 'mentor_validation_path',
      },
    ],
  },

  // Investidor - Primeira reunião
  investor_pitch: {
    id: 'investor_pitch',
    npcId: 'investor_carlos',
    text: 'Então, você quer investimento? Me convença em 2 minutos. Qual é o problema que você resolve e quanto você já validou?',
    options: [
      {
        id: 'opt_pitch_strong',
        text: 'Resolvo X, conversei com 50 clientes, 30 demonstraram interesse e 5 estão dispostos a pagar.',
        consequences: {
          relationship: 20,
          reputation: 15,
          money: 5000,
        },
        nextDialogueId: 'investor_interested',
      },
      {
        id: 'opt_pitch_weak',
        text: 'Tenho uma ideia revolucionária que vai mudar o mundo!',
        consequences: {
          relationship: -15,
          reputation: -5,
        },
        nextDialogueId: 'investor_rejected',
      },
      {
        id: 'opt_pitch_honest',
        text: 'Ainda estou validando, mas tenho tração inicial de 10 early adopters.',
        consequences: {
          relationship: 5,
          reputation: 5,
        },
        nextDialogueId: 'investor_advice',
      },
    ],
    context: 'Primeira reunião com investidor',
  },

  investor_interested: {
    id: 'investor_interested',
    npcId: 'investor_carlos',
    text: 'Impressionante! Você fez a lição de casa. Vamos agendar uma conversa mais aprofundada. Prepare seu pitch deck e suas métricas.',
    options: [
      {
        id: 'opt_accept',
        text: 'Perfeito! Vou preparar tudo.',
        consequences: {
          relationship: 5,
          money: 5000,
        },
      },
    ],
  },

  investor_rejected: {
    id: 'investor_rejected',
    npcId: 'investor_carlos',
    text: 'Desculpe, mas só ideias não valem nada. Volte quando tiver validação real e clientes pagando. Boa sorte.',
    options: [
      {
        id: 'opt_learn',
        text: 'Entendi. Vou trabalhar na validação.',
        consequences: {
          relationship: 0,
          attributes: { management: 5 },
        },
      },
    ],
  },

  // Cliente - Descoberta
  client_discovery: {
    id: 'client_discovery',
    npcId: 'client_ana',
    text: 'Olá! Você disse que quer entender meus problemas no dia a dia de trabalho. Por onde quer começar?',
    options: [
      {
        id: 'opt_ask_problem',
        text: 'Qual é o maior desafio que você enfrenta hoje?',
        consequences: {
          relationship: 10,
          attributes: { vision: 5, marketing: 3 },
        },
        nextDialogueId: 'client_explains_problem',
      },
      {
        id: 'opt_sell',
        text: 'Tenho uma solução perfeita para você!',
        consequences: {
          relationship: -10,
          reputation: -5,
        },
        nextDialogueId: 'client_annoyed',
      },
      {
        id: 'opt_ask_workflow',
        text: 'Pode me mostrar como você trabalha hoje?',
        consequences: {
          relationship: 15,
          attributes: { vision: 8, management: 4 },
        },
        nextDialogueId: 'client_shows_workflow',
      },
    ],
    context: 'Entrevista de descoberta de cliente',
  },

  client_explains_problem: {
    id: 'client_explains_problem',
    npcId: 'client_ana',
    text: 'Meu maior problema é organizar todas as tarefas da equipe. Uso 5 ferramentas diferentes e ainda assim perco informações importantes.',
    options: [
      {
        id: 'opt_deep_dive',
        text: 'Quanto tempo você perde por dia com isso?',
        consequences: {
          relationship: 5,
          attributes: { vision: 3 },
        },
      },
    ],
  },

  // Concorrente - Primeiro contato
  competitor_encounter: {
    id: 'competitor_encounter',
    npcId: 'competitor_joao',
    text: 'Vi que você também está nesse mercado. Interessante... O que te faz pensar que vai conseguir competir comigo?',
    options: [
      {
        id: 'opt_aggressive',
        text: 'Vou te esmagar com minha inovação!',
        consequences: {
          relationship: -20,
          reputation: -10,
        },
      },
      {
        id: 'opt_collaborative',
        text: 'O mercado é grande o suficiente para ambos. Que tal trocarmos experiências?',
        consequences: {
          relationship: 15,
          reputation: 10,
        },
        nextDialogueId: 'competitor_respects',
      },
      {
        id: 'opt_differentiate',
        text: 'Meu foco é diferente. Atendo um nicho específico que você não cobre.',
        consequences: {
          relationship: 5,
          attributes: { marketing: 5 },
        },
      },
    ],
    context: 'Encontro com concorrente em evento',
  },

  competitor_respects: {
    id: 'competitor_respects',
    npcId: 'competitor_joao',
    text: 'Gostei da sua atitude. Empreendedores inteligentes colaboram. Vamos marcar um café?',
    options: [
      {
        id: 'opt_accept',
        text: 'Com certeza! Vai ser ótimo.',
        consequences: {
          relationship: 10,
          reputation: 5,
        },
      },
    ],
  },
};

// Helper para inicializar NPCs com seus diálogos
export const initializeNPCs = (): { [npcId: string]: NPC } => {
  const npcs = { ...NPCS_DATA };

  // Associar diálogos aos NPCs
  Object.values(DIALOGUES_DATA).forEach((dialogue) => {
    if (npcs[dialogue.npcId]) {
      npcs[dialogue.npcId].dialogues.push(dialogue);
    }
  });

  return npcs;
};
