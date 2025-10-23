export const missions = {
  trilha1: {
    id: 'trilha1',
    title: '💡 Identificação de Oportunidades',
    description: 'Identifique desafios do mundo real',
    color: '#10B981',
    icon: '💡',
    missions: [
      {
        id: 'trilha1_mission1',
        title: 'Explorando Problemas Locais',
        description: 'Identifique 3 problemas do seu bairro que poderiam ser resolvidos com empreendedorismo.',
        content: `
🎯 **Objetivo:** Desenvolver olhar crítico para identificar oportunidades

📋 **Tarefa:** 
Caminhe pelo seu bairro (ou pense nele) e identifique problemas que você observa. Pode ser:
- Falta de serviços
- Processos ineficientes  
- Necessidades não atendidas
- Desperdícios
- Dificuldades das pessoas

💡 **Dica:** Os melhores negócios nascem de problemas reais que as pessoas enfrentam!
        `,
        quiz: [
          {
            question: 'Qual é o primeiro passo para identificar uma oportunidade de negócio?',
            options: [
              'Copiar uma ideia que já existe',
              'Observar problemas e necessidades não atendidas',
              'Pensar em algo completamente novo',
              'Perguntar para a família o que fazer'
            ],
            correct: 1,
            explanation: 'Observar problemas reais é a base para criar soluções que as pessoas realmente precisam!'
          },
          {
            question: 'Um bom problema para resolver é aquele que:',
            options: [
              'Só eu tenho',
              'É muito complicado de resolver',
              'Muitas pessoas enfrentam e pagaria para resolver',
              'Ninguém nunca tentou resolver'
            ],
            correct: 2,
            explanation: 'Problemas que afetam muitas pessoas e que elas pagariam para resolver são ótimas oportunidades!'
          },
          {
            question: 'Ao observar seu bairro, você deve focar em:',
            options: [
              'Apenas problemas grandes e complexos',
              'Problemas que você pode resolver sozinho',
              'Problemas reais que incomodam as pessoas',
              'Problemas que já têm muitas soluções'
            ],
            correct: 2,
            explanation: 'Focar em problemas reais é fundamental - eles são a fonte de oportunidades valiosas!'
          }
        ],
        xpReward: 100,
        type: 'observation'
      },
      {
        id: 'trilha1_mission2',
        title: 'Pesquisa de Mercado Básica',
        description: 'Converse com 5 pessoas sobre os problemas que você identificou.',
        content: `
🎯 **Objetivo:** Validar se outros também sentem os mesmos problemas

📋 **Tarefa:** 
Converse com 5 pessoas diferentes (família, amigos, vizinhos) sobre os problemas que você identificou:

1. Perguntaram se eles também enfrentam esses problemas
2. Descubra o quanto isso os incomoda
3. Pergunte se eles pagariam por uma solução
4. Anote as respostas

💡 **Perguntas úteis:**
- "Você já passou por esse problema?"
- "O quanto isso te incomoda de 1 a 10?"
- "Como você resolve isso hoje?"
- "Pagaria por uma solução?"
        `,
        quiz: [
          {
            question: 'Por que é importante conversar com outras pessoas sobre os problemas identificados?',
            options: [
              'Para confirmar que outros também têm o mesmo problema',
              'Para ser educado',
              'Para fazer amigos',
              'Para passar o tempo'
            ],
            correct: 0,
            explanation: 'Validar com outras pessoas confirma que existe uma demanda real pelo que você quer resolver!'
          },
          {
            question: 'Quantas pessoas você deve conversar para ter uma visão inicial?',
            options: [
              'Apenas 1 pessoa',
              'Pelo menos 5 pessoas',
              'Centenas de pessoas',
              'Ninguém, basta minha opinião'
            ],
            correct: 1,
            explanation: 'Conversar com pelo menos 5 pessoas diferentes te dá uma visão inicial diversificada!'
          },
          {
            question: 'Se uma pessoa diz que pagaria pela solução, isso significa:',
            options: [
              'Que definitivamente vai comprar',
              'Que existe potencial de mercado para investigar',
              'Que você deve começar a vender imediatamente',
              'Que o problema não é real'
            ],
            correct: 1,
            explanation: 'Interesse em pagar indica potencial, mas precisa ser validado com mais pessoas e testes!'
          }
        ],
        xpReward: 100,
        type: 'research'
      },
      {
        id: 'trilha1_mission3',
        title: 'Priorizando Oportunidades',
        description: 'Analise e priorize os problemas com maior potencial de negócio.',
        content: `
🎯 **Objetivo:** Aprender a escolher as melhores oportunidades

📋 **Tarefa:** 
Com base nas suas conversas, analise cada problema usando estes critérios:

**1. Frequência:** Quantas pessoas têm esse problema?
**2. Intensidade:** O quanto as incomoda?
**3. Disposição a pagar:** Pagariam por uma solução?
**4. Sua capacidade:** Você conseguiria resolver?

Crie um ranking dos 3 problemas com maior potencial!

💡 **Dica:** O melhor problema é aquele que:
- Muitas pessoas têm
- Incomoda bastante
- Pessoas pagariam para resolver
- Você tem condições de resolver
        `,
        quiz: [
          {
            question: 'Qual critério é MAIS importante para escolher um problema para resolver?',
            options: [
              'Que seja fácil de resolver',
              'Que muitas pessoas tenham e pagariam para resolver',
              'Que seja uma ideia original',
              'Que você ache interessante'
            ],
            correct: 1,
            explanation: 'Um problema que muitas pessoas têm E pagariam para resolver tem maior potencial de mercado!'
          },
          {
            question: 'Se um problema afeta muitas pessoas mas ninguém pagaria para resolver, você deve:',
            options: [
              'Focar nesse problema mesmo assim',
              'Procurar outro problema com melhor potencial',
              'Tentar convencer as pessoas a pagar',
              'Desistir de empreender'
            ],
            correct: 1,
            explanation: 'Sem disposição a pagar, não há modelo de negócio viável. Melhor buscar outros problemas!'
          },
          {
            question: 'Como você deve priorizar múltiplos problemas identificados?',
            options: [
              'Escolher o mais fácil',
              'Escolher o mais difícil',
              'Usar critérios como frequência, intensidade e disposição a pagar',
              'Escolher aleatoriamente'
            ],
            correct: 2,
            explanation: 'Usar critérios objetivos ajuda a escolher problemas com maior potencial de negócio!'
          }
        ],
        xpReward: 100,
        type: 'analysis'
      }
    ]
  },

  trilha2: {
    id: 'trilha2',
    title: '🎯 Validação de Ideias',
    description: 'Valide suas soluções com o mercado',
    color: '#3B82F6',
    icon: '🎯',
    missions: [
      {
        id: 'trilha2_mission1',
        title: 'Criando Soluções Criativas',
        description: 'Desenvolva 3 ideias diferentes para resolver o problema escolhido.',
        content: `
🎯 **Objetivo:** Desenvolver criatividade para gerar soluções inovadoras

📋 **Tarefa:** 
Para o problema que você priorizou, crie 3 soluções DIFERENTES:

**Técnica do "E se...?"**
- E se fosse um aplicativo?
- E se fosse um serviço presencial?
- E se fosse um produto físico?
- E se combinasse tecnologia com atendimento humano?

**Pense em:**
- Soluções simples e baratas
- Soluções tecnológicas
- Soluções que conectam pessoas
- Soluções que automatizam processos

💡 **Dica:** Não se apegue à primeira ideia! As melhores soluções vêm da terceira ou quarta tentativa.
        `,
        quiz: [
          {
            question: 'Quantas soluções você deve criar antes de escolher uma?',
            options: [
              'Apenas 1, a primeira é sempre a melhor',
              'Pelo menos 3 opções diferentes',
              'Exatamente 2 para comparar',
              'Não importa a quantidade'
            ],
            correct: 1,
            explanation: 'Criar múltiplas opções permite comparar e escolher a melhor solução!'
          },
          {
            question: 'Uma boa solução deve ser:',
            options: [
              'Complicada para impressionar',
              'Simples, eficaz e viável de implementar',
              'Exatamente igual às que já existem',
              'A mais cara possível'
            ],
            correct: 1,
            explanation: 'Simplicidade, eficácia e viabilidade são características de soluções bem-sucedidas!'
          },
          {
            question: 'Ao criar soluções, você deve considerar:',
            options: [
              'Apenas soluções tecnológicas',
              'Apenas soluções baratas',
              'Diferentes tipos: tecnológicas, presenciais, produtos, serviços',
              'Apenas soluções que você já viu antes'
            ],
            correct: 2,
            explanation: 'Diversificar tipos de soluções aumenta as chances de encontrar a melhor opção!'
          }
        ],
        xpReward: 100,
        type: 'creation'
      },
      {
        id: 'trilha2_mission2',
        title: 'Testando com Protótipos',
        description: 'Crie um protótipo simples de sua melhor ideia para testar.',
        content: `
🎯 **Objetivo:** Aprender a testar ideias antes de investir muito

📋 **Tarefa:** 
Escolha sua melhor solução e crie um "protótipo" simples:

**Se for um app:** Desenhe as telas no papel
**Se for um serviço:** Faça um roleplay (encenação)
**Se for um produto:** Use materiais simples para simular
**Se for digital:** Crie um rascunho ou apresentação

**Teste com 3 pessoas:**
1. Explique o problema
2. Mostre sua solução (protótipo)
3. Pergunte se faz sentido
4. Anote sugestões de melhoria

💡 **Dica:** Protótipos não precisam ser perfeitos! O objetivo é comunicar a ideia e receber feedback.
        `,
        quiz: [
          {
            question: 'Qual é o objetivo principal de um protótipo?',
            options: [
              'Impressionar investidores',
              'Testar e validar a ideia com baixo custo',
              'Mostrar que você sabe fazer',
              'Vender o produto final'
            ],
            correct: 1,
            explanation: 'Protótipos permitem testar ideias rapidamente e com baixo investimento!'
          },
          {
            question: 'Um protótipo deve ser:',
            options: [
              'Perfeito e sem erros',
              'Simples, mas que comunique a ideia principal',
              'Igual ao produto final',
              'Complexo para mostrar todas as funcionalidades'
            ],
            correct: 1,
            explanation: 'Protótipos simples são mais eficazes para testar conceitos e receber feedback!'
          },
          {
            question: 'Quantas pessoas você deve testar seu protótipo?',
            options: [
              'Nenhuma, confio na minha ideia',
              'Apenas 1 pessoa',
              'Pelo menos 3 pessoas diferentes',
              'Centenas de pessoas'
            ],
            correct: 2,
            explanation: 'Testar com pelo menos 3 pessoas diferentes oferece perspectivas variadas!'
          }
        ],
        xpReward: 100,
        type: 'prototyping'
      },
      {
        id: 'trilha2_mission3',
        title: 'Validação com Clientes',
        description: 'Valide sua solução com potenciais clientes reais.',
        content: `
🎯 **Objetivo:** Confirmar se as pessoas realmente querem sua solução

📋 **Tarefa:** 
Encontre 5 pessoas que TÊM o problema que você quer resolver:

**Perguntas para validação:**
1. "Você tem esse problema?" (confirmar)
2. "Como resolve hoje?" (entender comportamento atual)
3. "O que acha desta solução?" (mostrar protótipo)
4. "Usaria se existisse?" (testar interesse)
5. "Quanto pagaria?" (testar valor)

**Anote tudo:**
- Reações positivas e negativas
- Sugestões de melhoria
- Objeções levantadas
- Preços mencionados

💡 **Dica:** Feedback negativo é valioso! Ele te ajuda a melhorar antes de investir tempo e dinheiro.
        `,
        quiz: [
          {
            question: 'Por que validar com clientes reais é importante?',
            options: [
              'Para ter certeza de que há demanda real pela solução',
              'Para fazer marketing',
              'Para perder tempo',
              'Para complicar o processo'
            ],
            correct: 0,
            explanation: 'Validação confirma se existe demanda real, evitando investir em soluções que ninguém quer!'
          },
          {
            question: 'Se 4 de 5 pessoas disserem que não usariam sua solução, você deve:',
            options: [
              'Insistir na ideia mesmo assim',
              'Repensar e melhorar a solução',
              'Desistir completamente',
              'Procurar pessoas diferentes'
            ],
            correct: 1,
            explanation: 'Feedback negativo indica necessidade de melhorar ou repensar a solução!'
          },
          {
            question: 'A pergunta mais importante na validação é:',
            options: [
              '"O que acha da minha ideia?"',
              '"Você tem esse problema e usaria esta solução?"',
              '"Sou um bom empreendedor?"',
              '"Quanto dinheiro você tem?"'
            ],
            correct: 1,
            explanation: 'Confirmar o problema E o interesse na solução é a validação mais importante!'
          }
        ],
        xpReward: 100,
        type: 'validation'
      }
    ]
  },

  trilha3: {
    id: 'trilha3',
    title: '🚀 Desenvolvimento de MVP',
    description: 'Crie seu Mínimo Produto Viável',
    color: '#8B5CF6',
    icon: '🚀',
    missions: [
      {
        id: 'trilha3_mission1',
        title: 'Definindo o MVP',
        description: 'Defina qual será a versão mais simples da sua solução.',
        content: `
🎯 **Objetivo:** Aprender a criar a versão mínima que resolve o problema

📋 **Tarefa:** 
Com base na validação, defina seu MVP (Mínimo Produto Viável):

**Perguntas essenciais:**
- Qual é a ÚNICA funcionalidade principal?
- Qual é a forma mais simples de resolver o problema?
- O que é essencial vs. o que é "nice to have"?
- Como posso testar com menos recursos?

**Exemplo:**
- **Problema:** Dificuldade para encontrar diaristas
- **MVP:** Grupo no WhatsApp conectando diaristas e clientes
- **Não é MVP:** App completo com pagamento integrado

💡 **Dica:** O MVP deve ser a menor versão que ainda resolve o problema principal!
        `,
        quiz: [
          {
            question: 'O que significa MVP?',
            options: [
              'Melhor Produto Vendável',
              'Mínimo Produto Viável',
              'Máximo Produto Valioso',
              'Modelo Padrão de Vendas'
            ],
            correct: 1,
            explanation: 'MVP = Mínimo Produto Viável: a menor versão que ainda resolve o problema!'
          },
          {
            question: 'Um bom MVP deve:',
            options: [
              'Ter todas as funcionalidades possíveis',
              'Resolver apenas o problema principal com simplicidade',
              'Ser perfeito antes do lançamento',
              'Competir com soluções já estabelecidas'
            ],
            correct: 1,
            explanation: 'MVPs focam no essencial: resolver o problema principal de forma simples!'
          },
          {
            question: 'Por que começar com um MVP?',
            options: [
              'Para economizar tempo e dinheiro',
              'Para testar se a solução funciona',
              'Para receber feedback cedo',
              'Todas as alternativas acima'
            ],
            correct: 3,
            explanation: 'MVPs economizam recursos, permitem testes rápidos e feedback valioso!'
          }
        ],
        xpReward: 100,
        type: 'planning'
      },
      {
        id: 'trilha3_mission2',
        title: 'Construindo o MVP',
        description: 'Construa a primeira versão funcional da sua solução.',
        content: `
🎯 **Objetivo:** Colocar a mão na massa e criar algo real

📋 **Tarefa:** 
Construa seu MVP usando ferramentas simples:

**Exemplos de ferramentas:**
- **Site simples:** Google Sites, Wix
- **Loja online:** Instagram, WhatsApp Business
- **App básico:** Formulários Google, Typeform
- **Serviço local:** Flyers, boca a boca
- **Marketplace:** Facebook Marketplace, OLX

**Critérios do MVP:**
✅ Resolve o problema principal
✅ É funcional (pessoas podem usar)
✅ É simples de manter
✅ Permite coletar feedback

💡 **Dica:** Use ferramentas que você já conhece ou pode aprender rapidamente!
        `,
        quiz: [
          {
            question: 'Qual ferramenta você deve usar para construir seu MVP?',
            options: [
              'A mais cara e profissional',
              'A que você domina ou pode aprender rapidamente',
              'A que todos os concorrentes usam',
              'A mais complicada para impressionar'
            ],
            correct: 1,
            explanation: 'Use ferramentas familiares para construir seu MVP rapidamente!'
          },
          {
            question: 'Seu MVP está pronto quando:',
            options: [
              'Tem todas as funcionalidades planejadas',
              'Está perfeito e sem bugs',
              'Resolve o problema principal e permite feedback',
              'Impressiona todos que veem'
            ],
            correct: 2,
            explanation: 'Um MVP está pronto quando resolve o problema principal e permite coletar feedback!'
          },
          {
            question: 'Se você não sabe programar, pode criar um MVP?',
            options: [
              'Não, é impossível',
              'Sim, usando ferramentas simples como Google Sites, WhatsApp',
              'Só contratando programadores caros',
              'Só copiando de outros'
            ],
            correct: 1,
            explanation: 'Muitos MVPs podem ser criados com ferramentas simples, sem programação!'
          }
        ],
        xpReward: 100,
        type: 'development'
      },
      {
        id: 'trilha3_mission3',
        title: 'Testando e Iterando',
        description: 'Lance seu MVP para usuários reais e colete feedback.',
        content: `
🎯 **Objetivo:** Aprender através de testes com usuários reais

📋 **Tarefa:** 
Lance seu MVP para pelo menos 10 pessoas e colete feedback:

**Como lançar:**
1. Compartilhe com amigos e família primeiro
2. Poste em grupos relevantes (Facebook, WhatsApp)
3. Peça para cada usuário compartilhar com mais 1 pessoa
4. Ofereça algo gratuito ou com desconto no início

**Métricas para acompanhar:**
- Quantas pessoas usaram?
- Quantas usaram mais de uma vez?
- Qual feedback receberam?
- Que melhorias sugeriram?
- Alguém pagaria pela versão melhorada?

💡 **Dica:** Falhar rápido e barato é melhor que falhar devagar e caro!
        `,
        quiz: [
          {
            question: 'Quantas pessoas devem testar seu MVP inicialmente?',
            options: [
              'Apenas você mesmo',
              'Pelo menos 10 pessoas reais',
              'Milhares de pessoas',
              'Ninguém, você já sabe que funciona'
            ],
            correct: 1,
            explanation: 'Testar com pelo menos 10 pessoas dá insights valiosos sobre a solução!'
          },
          {
            question: 'Se seu MVP não funcionar como esperado, você deve:',
            options: [
              'Desistir imediatamente',
              'Analisar feedback e melhorar',
              'Culpar os usuários',
              'Fazer exatamente a mesma coisa'
            ],
            correct: 1,
            explanation: 'Feedback negativo é aprendizado valioso para melhorar a solução!'
          },
          {
            question: 'O principal objetivo de lançar um MVP é:',
            options: [
              'Ganhar muito dinheiro imediatamente',
              'Aprender com usuários reais e melhorar',
              'Impressionar concorrentes',
              'Provar que você está certo'
            ],
            correct: 1,
            explanation: 'MVPs são ferramentas de aprendizado para validar e melhorar soluções!'
          }
        ],
        xpReward: 100,
        type: 'testing'
      }
    ]
  },

  trilha4: {
    id: 'trilha4',
    title: '📊 Modelos de Negócio',
    description: 'Estruture seu plano de negócios',
    color: '#F59E0B',
    icon: '📊',
    missions: [
      {
        id: 'trilha4_mission1',
        title: 'Canvas do Modelo de Negócio',
        description: 'Estruture seu modelo de negócio usando o Business Model Canvas.',
        content: `
🎯 **Objetivo:** Organizar todos os elementos do seu negócio

📋 **Tarefa:** 
Preencha um Business Model Canvas simplificado:

**9 Elementos essenciais:**
1. **Clientes:** Quem tem o problema?
2. **Problema:** Que dor você resolve?
3. **Solução:** Como você resolve?
4. **Canal:** Como chega aos clientes?
5. **Receita:** Como ganha dinheiro?
6. **Recursos:** O que precisa para funcionar?
7. **Atividades:** O que você faz no dia a dia?
8. **Parcerias:** Quem pode ajudar?
9. **Custos:** Quanto custa manter?

💡 **Dica:** Use um papel grande ou ferramenta digital para visualizar tudo junto!
        `,
        quiz: [
          {
            question: 'O Business Model Canvas serve para:',
            options: [
              'Complicar o negócio',
              'Organizar e visualizar todos os elementos do negócio',
              'Impressionar investidores',
              'Perder tempo'
            ],
            correct: 1,
            explanation: 'O Canvas organiza todos os elementos do negócio de forma visual e clara!'
          },
          {
            question: 'Qual elemento é mais importante no Canvas?',
            options: [
              'Todos são importantes e conectados',
              'Apenas a receita',
              'Apenas os clientes',
              'Apenas a solução'
            ],
            correct: 0,
            explanation: 'Todos os elementos do Canvas são importantes e se conectam entre si!'
          },
          {
            question: 'Com que frequência você deve revisar seu Canvas?',
            options: [
              'Nunca, depois de pronto não muda',
              'Apenas quando der problema',
              'Regularmente, conforme aprende e evolui',
              'Só quando buscar investimento'
            ],
            correct: 2,
            explanation: 'O Canvas deve evoluir conforme você aprende mais sobre seu negócio!'
          }
        ],
        xpReward: 100,
        type: 'planning'
      },
      {
        id: 'trilha4_mission2',
        title: 'Precificação Estratégica',
        description: 'Defina como vai cobrar e quanto vai custar sua solução.',
        content: `
🎯 **Objetivo:** Aprender a definir preços que funcionam

📋 **Tarefa:** 
Pesquise e defina sua estratégia de preços:

**1. Pesquise concorrentes:**
- Quanto cobram soluções similares?
- Que modelos de preço usam?

**2. Calcule seus custos:**
- Custos para criar/produzir
- Custos para manter funcionando
- Seu tempo vale quanto?

**3. Teste disposição a pagar:**
- Pergunte para clientes: "Pagaria R$ X?"
- Teste diferentes faixas de preço
- Observe reações

**4. Escolha modelo:**
- Preço fixo, mensal, por uso, freemium?

💡 **Dica:** Comece com preços simples. Pode ajustar depois conforme aprende!
        `,
        quiz: [
          {
            question: 'Como você deve definir o preço da sua solução?',
            options: [
              'Copiar o preço dos concorrentes',
              'Pesquisar concorrentes, calcular custos e testar com clientes',
              'Escolher um número aleatório',
              'Sempre cobrar o mais barato possível'
            ],
            correct: 1,
            explanation: 'Precificação estratégica considera concorrentes, custos e percepção de valor dos clientes!'
          },
          {
            question: 'Se clientes disserem que seu preço está alto, você deve:',
            options: [
              'Baixar o preço imediatamente',
              'Entender por que acham alto e considerar ajustes',
              'Insistir no preço original',
              'Parar de vender'
            ],
            correct: 1,
            explanation: 'Entender objeções de preço ajuda a ajustar valor percebido ou encontrar o preço ideal!'
          },
          {
            question: 'Qual modelo de preço é melhor?',
            options: [
              'Sempre preço fixo',
              'Sempre assinatura mensal',
              'Depende do tipo de solução e comportamento dos clientes',
              'Sempre gratuito'
            ],
            correct: 2,
            explanation: 'O melhor modelo de preço depende da sua solução e como os clientes preferem pagar!'
          }
        ],
        xpReward: 100,
        type: 'strategy'
      },
      {
        id: 'trilha4_mission3',
        title: 'Plano Financeiro Básico',
        description: 'Crie projeções financeiras simples para os próximos 6 meses.',
        content: `
🎯 **Objetivo:** Entender a viabilidade financeira do negócio

📋 **Tarefa:** 
Crie um plano financeiro simples para 6 meses:

**1. Projeção de Vendas:**
- Quantos clientes espera por mês?
- Qual o ticket médio (valor por cliente)?
- Receita mensal = Clientes × Ticket médio

**2. Custos mensais:**
- Custos fixos (sempre paga, mesmo sem vender)
- Custos variáveis (aumenta com vendas)
- Total de custos por mês

**3. Cálculos importantes:**
- Lucro = Receita - Custos
- Ponto de equilíbrio = Quando lucro = 0
- Tempo para recuperar investimento inicial

💡 **Dica:** Seja conservador nas vendas e realista nos custos!
        `,
        quiz: [
          {
            question: 'O que é ponto de equilíbrio?',
            options: [
              'Quando você fica rico',
              'Quando receita = custos (não perde nem ganha)',
              'Quando tem muitos clientes',
              'Quando o produto está perfeito'
            ],
            correct: 1,
            explanation: 'Ponto de equilíbrio é quando a receita cobre exatamente todos os custos!'
          },
          {
            question: 'Para fazer projeções financeiras, você deve ser:',
            options: [
              'Otimista com vendas e pessimista com custos',
              'Conservador com vendas e realista com custos',
              'Pessimista com tudo',
              'Otimista com tudo'
            ],
            correct: 1,
            explanation: 'Projeções conservadoras evitam surpresas desagradáveis e permitem melhor planejamento!'
          },
          {
            question: 'Se seu plano mostrar prejuízo nos primeiros meses, você deve:',
            options: [
              'Desistir imediatamente',
              'Analisar se é normal e quando espera lucro',
              'Ignorar os números',
              'Aumentar os preços 500%'
            ],
            correct: 1,
            explanation: 'Muitos negócios têm prejuízo inicial. O importante é saber quando esperar lucro!'
          }
        ],
        xpReward: 100,
        type: 'financial'
      }
    ]
  },

  trilha5: {
    id: 'trilha5',
    title: '🎤 Faça seu Pitch',
    description: 'Apresente sua ideia ao mundo',
    color: '#EC4899',
    icon: '🎤',
    missions: [
      {
        id: 'trilha5_mission1',
        title: 'Estruturando seu Pitch',
        description: 'Organize sua apresentação seguindo a estrutura clássica de pitch.',
        content: `
🎯 **Objetivo:** Criar uma apresentação convincente da sua ideia

📋 **Tarefa:** 
Estruture seu pitch seguindo este roteiro:

**1. Problema (30 segundos)**
- Qual problema você resolve?
- Por que é importante?

**2. Solução (45 segundos)**
- Como você resolve?
- O que faz diferente?

**3. Mercado (30 segundos)**
- Quantas pessoas têm esse problema?
- Quanto vale este mercado?

**4. Modelo de Negócio (30 segundos)**
- Como ganha dinheiro?
- Quanto custa pro cliente?

**5. Pedido (15 segundos)**
- O que você precisa? (investimento, parceria, feedback)

💡 **Dica:** Pitch de 2-3 minutos é ideal para manter atenção!
        `,
        quiz: [
          {
            question: 'Um pitch deve começar falando sobre:',
            options: [
              'Sua história pessoal',
              'O problema que você resolve',
              'Quanto dinheiro quer ganhar',
              'Sua solução tecnológica'
            ],
            correct: 1,
            explanation: 'Começar com o problema cria conexão e mostra a relevância da sua solução!'
          },
          {
            question: 'Quanto tempo deve durar um pitch inicial?',
            options: [
              '30 segundos',
              '2-3 minutos',
              '10 minutos',
              '30 minutos'
            ],
            correct: 1,
            explanation: '2-3 minutos mantém atenção e permite apresentar os pontos essenciais!'
          },
          {
            question: 'O que é mais importante no pitch?',
            options: [
              'Mostrar que vai ficar rico',
              'Demonstrar que resolve um problema real',
              'Usar termos técnicos complicados',
              'Falar mal dos concorrentes'
            ],
            correct: 1,
            explanation: 'Demonstrar que resolve um problema real é a base de qualquer pitch convincente!'
          }
        ],
        xpReward: 100,
        type: 'presentation'
      },
      {
        id: 'trilha5_mission2',
        title: 'Criando Apresentação Visual',
        description: 'Desenvolva slides simples e impactantes para apoiar seu pitch.',
        content: `
🎯 **Objetivo:** Criar apoio visual que valorize sua apresentação

📋 **Tarefa:** 
Crie 5-7 slides simples:

**Slide 1:** Título + Seu nome
**Slide 2:** O Problema (use imagens/ícones)
**Slide 3:** Sua Solução (mockup ou foto)
**Slide 4:** Como Funciona (diagrama simples)
**Slide 5:** Resultados/Validação (números dos testes)
**Slide 6:** Próximos Passos + Pedido

**Dicas de design:**
- Máximo 7 palavras por slide
- Use imagens em vez de muito texto
- Fonte grande (mínimo 24pt)
- Cores do seu branding

💡 **Ferramentas gratuitas:** Canva, Google Slides, PowerPoint
        `,
        quiz: [
          {
            question: 'Quantas palavras você deve usar por slide?',
            options: [
              'Quantas forem necessárias',
              'Máximo 7 palavras',
              'Pelo menos 20 palavras',
              'Slides não precisam de texto'
            ],
            correct: 1,
            explanation: 'Máximo 7 palavras por slide mantém foco na sua fala e não na leitura!'
          },
          {
            question: 'O que é mais importante nos slides?',
            options: [
              'Texto detalhado',
              'Imagens e elementos visuais impactantes',
              'Muitas cores diferentes',
              'Efeitos de transição'
            ],
            correct: 1,
            explanation: 'Elementos visuais impactantes apoiam sua fala e prendem atenção da audiência!'
          },
          {
            question: 'Quantos slides você deve usar em um pitch de 3 minutos?',
            options: [
              '1-2 slides',
              '5-7 slides',
              '15-20 slides',
              '50 slides'
            ],
            correct: 1,
            explanation: '5-7 slides permitem abordar pontos essenciais sem pressa excessiva!'
          }
        ],
        xpReward: 100,
        type: 'design'
      },
      {
        id: 'trilha5_mission3',
        title: 'Apresentando com Confiança',
        description: 'Pratique e apresente seu pitch para pelo menos 3 pessoas.',
        content: `
🎯 **Objetivo:** Desenvolver confiança e habilidade de apresentação

📋 **Tarefa:** 
Pratique e apresente seu pitch:

**1. Ensaie sozinho:**
- Grave um vídeo de si mesmo
- Pratique sem olhar slides
- Cronometre o tempo

**2. Apresente para 3 pessoas:**
- Família, amigos, colegas
- Peça feedback específico
- Anote sugestões

**3. Critérios de avaliação:**
- Clareza da mensagem
- Confiança na apresentação
- Interesse gerado na audiência
- Perguntas que surgiram

**4. Melhore baseado no feedback**

💡 **Dica:** Nervosismo é normal! Prática traz confiança.
        `,
        quiz: [
          {
            question: 'Como melhorar sua confiança para apresentar?',
            options: [
              'Evitar apresentar para economizar tempo',
              'Praticar várias vezes e pedir feedback',
              'Decorar exatamente o que vai falar',
              'Apresentar apenas para desconhecidos'
            ],
            correct: 1,
            explanation: 'Prática regular e feedback construtivo são as melhores formas de ganhar confiança!'
          },
          {
            question: 'Se alguém fizer uma pergunta que você não sabe responder, deve:',
            options: [
              'Inventar uma resposta',
              'Admitir que não sabe e se comprometer a descobrir',
              'Mudar de assunto',
              'Ficar nervoso e parar de apresentar'
            ],
            correct: 1,
            explanation: 'Honestidade e compromisso com aprendizado são mais valiosos que respostas inventadas!'
          },
          {
            question: 'Qual é o principal objetivo de apresentar para pessoas próximas primeiro?',
            options: [
              'Impressioná-las',
              'Receber feedback honesto em ambiente seguro',
              'Ganhar investimento delas',
              'Provar que você está certo'
            ],
            correct: 1,
            explanation: 'Ambiente seguro permite receber feedback honesto e melhorar antes de apresentações importantes!'
          }
        ],
        xpReward: 100,
        type: 'practice'
      }
    ]
  }
};

export default missions;