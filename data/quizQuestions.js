// Banco de perguntas de empreendedorismo
export const quizQuestions = [
  {
    id: 1,
    category: 'Fundamentos',
    difficulty: 'easy',
    question: 'O que é empreendedorismo?',
    options: [
      { id: 'a', text: 'Apenas abrir uma empresa', correct: false },
      { id: 'b', text: 'Identificar oportunidades e criar valor', correct: true },
      { id: 'c', text: 'Ganhar muito dinheiro rapidamente', correct: false },
      { id: 'd', text: 'Trabalhar sozinho sempre', correct: false }
    ],
    explanation: 'Empreendedorismo é sobre identificar oportunidades e criar valor para a sociedade.'
  },
  {
    id: 2,
    category: 'Planejamento',
    difficulty: 'medium',
    question: 'Qual a principal função de um plano de negócios?',
    options: [
      { id: 'a', text: 'Decoração para o escritório', correct: false },
      { id: 'b', text: 'Guiar decisões estratégicas da empresa', correct: true },
      { id: 'c', text: 'Impressionar investidores apenas', correct: false },
      { id: 'd', text: 'Cumprir burocracias legais', correct: false }
    ],
    explanation: 'O plano de negócios serve como guia estratégico para tomada de decisões.'
  },
  {
    id: 3,
    category: 'Marketing',
    difficulty: 'medium',
    question: 'O que significa "público-alvo"?',
    options: [
      { id: 'a', text: 'Todas as pessoas do mundo', correct: false },
      { id: 'b', text: 'Apenas seus amigos e família', correct: false },
      { id: 'c', text: 'Grupo específico de consumidores interessados no produto', correct: true },
      { id: 'd', text: 'Pessoas que já compraram antes', correct: false }
    ],
    explanation: 'Público-alvo é o grupo específico de pessoas com maior probabilidade de comprar seu produto.'
  },
  {
    id: 4,
    category: 'Inovação',
    difficulty: 'hard',
    question: 'Qual característica NÃO é essencial para inovação?',
    options: [
      { id: 'a', text: 'Criatividade', correct: false },
      { id: 'b', text: 'Disposição para correr riscos', correct: false },
      { id: 'c', text: 'Ter muito dinheiro inicial', correct: true },
      { id: 'd', text: 'Resolver problemas reais', correct: false }
    ],
    explanation: 'Inovação não depende necessariamente de grandes investimentos iniciais.'
  },
  {
    id: 5,
    category: 'Finanças',
    difficulty: 'medium',
    question: 'O que é capital de giro?',
    options: [
      { id: 'a', text: 'Dinheiro para construir uma sede', correct: false },
      { id: 'b', text: 'Recursos para operação diária da empresa', correct: true },
      { id: 'c', text: 'Salário dos donos', correct: false },
      { id: 'd', text: 'Investimento em marketing', correct: false }
    ],
    explanation: 'Capital de giro são os recursos necessários para manter as operações diárias.'
  },
  {
    id: 6,
    category: 'Liderança',
    difficulty: 'easy',
    question: 'Qual a melhor definição de liderança empreendedora?',
    options: [
      { id: 'a', text: 'Mandar em todos', correct: false },
      { id: 'b', text: 'Inspirar e guiar a equipe rumo aos objetivos', correct: true },
      { id: 'c', text: 'Fazer tudo sozinho', correct: false },
      { id: 'd', text: 'Delegar tudo para outros', correct: false }
    ],
    explanation: 'Liderança é sobre inspirar, motivar e guiar a equipe.'
  },
  {
    id: 7,
    category: 'Networking',
    difficulty: 'easy',
    question: 'Por que networking é importante para empreendedores?',
    options: [
      { id: 'a', text: 'Só para fazer amigos', correct: false },
      { id: 'b', text: 'Para vender produtos para conhecidos', correct: false },
      { id: 'c', text: 'Criar conexões, oportunidades e parcerias', correct: true },
      { id: 'd', text: 'Não é importante', correct: false }
    ],
    explanation: 'Networking abre portas para oportunidades, parcerias e crescimento.'
  },
  {
    id: 8,
    category: 'Análise',
    difficulty: 'hard',
    question: 'O que é uma análise SWOT?',
    options: [
      { id: 'a', text: 'Um tipo de investimento', correct: false },
      { id: 'b', text: 'Análise de Forças, Fraquezas, Oportunidades e Ameaças', correct: true },
      { id: 'c', text: 'Sistema de vendas online', correct: false },
      { id: 'd', text: 'Método de contratação', correct: false }
    ],
    explanation: 'SWOT analisa aspectos internos (Forças/Fraquezas) e externos (Oportunidades/Ameaças).'
  },
  {
    id: 9,
    category: 'MVP',
    difficulty: 'hard',
    question: 'O que significa MVP (Minimum Viable Product)?',
    options: [
      { id: 'a', text: 'Produto completamente finalizado', correct: false },
      { id: 'b', text: 'Versão mais simples funcional para testar mercado', correct: true },
      { id: 'c', text: 'Produto mais caro possível', correct: false },
      { id: 'd', text: 'Marketing viral poderoso', correct: false }
    ],
    explanation: 'MVP é a versão mínima funcional usada para validar ideias com clientes reais.'
  },
  {
    id: 10,
    category: 'Pitch',
    difficulty: 'medium',
    question: 'Quanto tempo deve durar um elevator pitch?',
    options: [
      { id: 'a', text: '30 segundos a 2 minutos', correct: true },
      { id: 'b', text: '15 minutos', correct: false },
      { id: 'c', text: '1 hora', correct: false },
      { id: 'd', text: 'O tempo que for necessário', correct: false }
    ],
    explanation: 'Elevator pitch deve ser curto e impactante, como uma viagem de elevador.'
  }
];

export const getRandomQuestions = (count = 10) => {
  const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getQuestionsByCategory = (category) => {
  return quizQuestions.filter(q => q.category === category);
};

export const getQuestionsByDifficulty = (difficulty) => {
  return quizQuestions.filter(q => q.difficulty === difficulty);
};
