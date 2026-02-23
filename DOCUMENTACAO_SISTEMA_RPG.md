# 🎮 Sistema de Jogo RPG - Empreenda+

## 📋 Visão Geral

Sistema completo de jogo RPG focado em empreendedorismo, onde o jogador toma **decisões estratégicas** (NÃO quiz) que impactam 5 indicadores da startup.

---

## 🏗️ Arquitetura Implementada

### **1. Tipos (types/game.ts)**

```typescript
// 5 Indicadores da Startup
interface GameStats {
  cash: number              // 💰 Caixa (0-100)
  customerInterest: number  // 😊 Interesse dos Clientes
  knowledge: number         // 🧠 Conhecimento
  motivation: number        // 🔥 Motivação
  socialImpact: number      // 🌱 Impacto Social
}

// Sistema de Energia (recarrega a cada 20h)
interface Energy {
  current: number
  max: number
  lastRecharge: string
}

// Perfis de Fundador (4 tipos)
type FounderProfile = 'INNOVATOR' | 'ANALYTICAL' | 'METHODICAL' | 'SOCIAL'

// Títulos de Progressão (6 níveis)
type FounderTitle = 'BEGINNER' | 'EXPLORER' | 'BUILDER' | 'VALIDATOR' | 'CEO_IN_TRAINING' | 'SERIAL_FOUNDER'

// Decisão RPG
interface Decision {
  id: string
  title: string
  description: string
  effects: Partial<GameStats>  // Mudanças nos indicadores
  risk: 'LOW' | 'MEDIUM' | 'HIGH'
  learningPoint: string
}
```

### **2. Serviços**

#### **GameManager.ts** (179 linhas)
Gerenciamento central do jogo:

- ✅ `initializeNewGame()` - Criar novo jogo com perfil
- ✅ `loadProgress()` - Carregar progresso salvo
- ✅ `rechargeEnergy()` - Recarregar energia (20h)
- ✅ `consumeEnergy()` - Consumir energia ao tomar decisão
- ✅ `updateStats()` - Aplicar efeitos de decisões
- ✅ `completeMission()` - Marcar missão como completa
- ✅ `calculateTitle()` - Calcular título baseado em missões
- ✅ `getTitleName()` - Obter nome traduzido do título

**Storage:** AsyncStorage com chave `@empreenda_game_progress`

#### **MascotEngine.ts** (171 linhas)
Reações do mascote NPC:

- ✅ `generateReaction()` - Gerar feedback baseado em decisão/risco
- ✅ `checkCriticalStats()` - Alertar quando stats < 20
- ✅ `getMissionIntro()` - Mensagem de introdução da missão
- ✅ `getProfileTip()` - Dica específica por perfil de fundador

**Tipos de Reação:**
- `SUCCESS` - Decisão positiva (verde)
- `WARNING` - Resultado misto (amarelo)
- `DANGER` - Decisão negativa (vermelho)
- `NEUTRAL` - Sem grande impacto

#### **OnboardingToGameBridge.ts** (NOVO - 118 linhas)
Integração entre onboarding e RPG:

- ✅ `mapOnboardingToFounderProfile()` - Mapear perfil do GameProfileScreen
- ✅ `initializeGameFromOnboarding()` - Iniciar jogo após onboarding
- ✅ `hasActiveGame()` - Verificar se tem jogo ativo
- ✅ `getInitialRoute()` - Determinar rota inicial

---

## 🎯 Missões e Decisões

### **data/rpgMissions.ts** (371 linhas)

**3 Missões Implementadas:**

#### 1️⃣ **Missão 1: Descoberta**
**Fase:** DISCOVERY  
**Energia:** 1  
**Decisões:** 4

1. **"Conversar com 20 pessoas da comunidade"**
   - Efeitos: +25 clientes, -3 caixa
   - Risco: LOW
   - Aprende: pesquisa de mercado

2. **"Pesquisar concorrentes online"**
   - Efeitos: +20 conhecimento, +5 caixa
   - Risco: LOW
   - Aprende: análise competitiva

3. **"Investir em curso de empreendedorismo"**
   - Efeitos: +30 conhecimento, -15 caixa
   - Risco: MEDIUM
   - Aprende: educação antecipa erros

4. **"Criar protótipo sem validar"**
   - Efeitos: +10 motivação, -20 caixa
   - Risco: HIGH
   - Aprende: risco de desperdiçar recursos

#### 2️⃣ **Missão 2: Ideação**
**Fase:** IDEATION  
**Energia:** 1  
**Decisões:** 4

1. **"Brainstorming com 3 amigos"**
   - Efeitos: +15 conhecimento, +10 motivação
   - Risco: LOW

2. **"Aplicar Design Thinking sozinho"**
   - Efeitos: +20 conhecimento, -5 motivação
   - Risco: MEDIUM

3. **"Contratar consultor especialista"**
   - Efeitos: +25 conhecimento, -30 caixa
   - Risco: HIGH

4. **"Participar de hackathon"**
   - Efeitos: +15 clientes, +20 motivação
   - Risco: LOW

#### 3️⃣ **Missão 3: Validação**
**Fase:** VALIDATION  
**Energia:** 2  
**Decisões:** 4

1. **"Criar landing page e testar"**
   - Efeitos: +20 clientes, -10 caixa
   - Risco: LOW

2. **"Fazer MVP em 48h"**
   - Efeitos: +30 clientes, -25 caixa, -15 motivação
   - Risco: HIGH

3. **"Pré-vender para clientes beta"**
   - Efeitos: +25 caixa, +15 clientes
   - Risco: HIGH

4. **"Entrevistar 10 clientes potenciais"**
   - Efeitos: +30 clientes, +10 conhecimento
   - Risco: LOW

---

## 🖥️ Telas Implementadas

### **1. GameHubScreen.js** (Hub Principal)

**Componentes:**
- ⚡ Barra de energia (visual)
- 🏆 Título atual do jogador
- 🤖 Mascote com mensagem de boas-vindas
- 📊 5 Barras de status (cash, clientes, conhecimento, motivação, impacto)
- 🎯 Card da missão atual com:
  - Fase da startup
  - Título e descrição
  - Custo de energia
  - Número de decisões
  - Botão "Iniciar Missão" (desabilitado se energia insuficiente)
- 📈 Progresso: missões completas, decisões tomadas, streak

**Navegação:**
- Clique em "Iniciar Missão" → `RPGMissionScreen`

### **2. RPGMissionScreen.js** (Decisões RPG)

**Componentes:**
- ← Botão voltar
- ⚡ Energia atual (mini display)
- ⚫⚫⚫⚪ Progresso de decisões
- 📍 Fase e Título da missão
- 🤖 Mascote com mensagem contextual
- 🎯 Decisão atual:
  - Título e descrição
  - Badge de risco (ALTO/MÉDIO/BAIXO)
  - Botão colorido por risco:
    - 🔴 Vermelho: ALTO RISCO
    - 🔵 Azul: MÉDIO RISCO
    - 🟢 Verde: BAIXO RISCO
  - Preview de efeitos (ícones + valores)
  - 💡 Ponto de aprendizado

**Após decisão:**
- 📊 Resultado com mudanças de stats
- 💬 Feedback do mascote
- ➡️ Botão "Próxima Decisão" ou "Finalizar Missão"

**Navegação:**
- Última decisão → `MissionCompleteScreen`

### **3. MissionCompleteScreen.js** (Conclusão)

**Componentes:**
- 🏆 Troféu animado (scale spring)
- 🎉 "Missão Completa!"
- 🤖 Mascote com parabenização
- 🎁 Recompensas:
  - ⬆️ Novo título (se evoluiu)
  - 🎯 Total de missões completas
  - 🔥 Streak de dias
- 📊 Status atual da startup (5 indicadores)
- ➡️ Botão "Continuar Jornada"

**Navegação:**
- Clique em "Continuar" → `GameHub`

---

## 🎨 Design System

### **Cores Principais**
```javascript
// Gradientes
['#0F172A', '#1E293B', '#334155'] // Background
['#8B5CF6', '#D946EF']            // Botões principais (roxo → pink)
['#EF4444', '#DC2626']            // Alto risco (vermelho)
['#3B82F6', '#2563EB']            // Médio risco (azul)
['#10B981', '#059669']            // Baixo risco (verde)

// Stats
#10B981 - Cash (verde)
#3B82F6 - Clientes (azul)
#8B5CF6 - Conhecimento (roxo)
#F59E0B - Motivação (laranja)
#EC4899 - Impacto Social (pink)
```

### **Componentes Reutilizáveis**
- `<StatBar>` - Barra de status com ícone, label e valor
- `<Mascot>` - Mascote animado com mensagem
- `LinearGradient` - Fundo e botões
- Cards com bordas de 16-20px e opacidade 0.05-0.1

---

## 🔄 Fluxo Completo

```
1. Onboarding (7 telas)
   ↓ [GameProfileScreen coleta: goal, idea, motivation, dailyMinutes]
   ↓
2. OnboardingToGameBridge.initializeGameFromOnboarding()
   ↓ [Mapeia perfil → INNOVATOR/ANALYTICAL/METHODICAL/SOCIAL]
   ↓
3. GameManager.initializeNewGame()
   ↓ [Cria GameProgress com stats iniciais, energia, missão 1]
   ↓
4. GameHub (tela principal)
   ↓ [Mostra energia, stats, missão atual]
   ↓
5. Clique "Iniciar Missão"
   ↓
6. RPGMissionScreen
   ↓ [Loop de 4 decisões]
   ↓ [Cada decisão: consume energia, altera stats, feedback mascote]
   ↓
7. MissionCompleteScreen
   ↓ [Mostra recompensas, novos títulos, stats finais]
   ↓
8. Volta ao GameHub
   ↓ [Próxima missão desbloqueada]
```

---

## ⚙️ Mecânicas do Jogo

### **Sistema de Energia**
- **Max:** Baseado em dailyMinutes (10-60 min → 1-3 energia)
- **Consumo:** 1-2 energia por missão
- **Recarga:** A cada 20 horas
- **Cálculo:** `Math.ceil(dailyMinutes / 20)`

### **Sistema de Stats**
- **Range:** 0-100 para cada indicador
- **Efeitos:** Decisões aplicam +/- em múltiplos stats
- **Crítico:** Alerta quando < 20
- **Balanceamento:** Decisões perigosas = maior impacto

### **Sistema de Progressão**
- **Títulos:** 6 níveis baseados em missões completas
  - 0 missões: Fundador Iniciante
  - 1-2: Explorador de Ideias
  - 3-4: Construtor de MVP
  - 5-6: Validador
  - 7-8: CEO em Formação
  - 9+: Fundador em Série
- **Streak:** Dias consecutivos jogando
- **XP/Medals:** (TODO - será implementado)

### **Perfis de Fundador**
Cada perfil recebe dicas específicas do mascote:

1. **INNOVATOR** (Inovador)
   - Perfil: Rápido, ousado, criativo
   - Dica: "Velocidade é sua força, mas valide antes!"

2. **ANALYTICAL** (Analítico)
   - Perfil: Equilibrado, dados, decisões informadas
   - Dica: "Seus dados são valiosos, mas não paralise!"

3. **METHODICAL** (Metódico)
   - Perfil: Planejado, estruturado, processos
   - Dica: "Planejamento é forte, mas teste rápido!"

4. **SOCIAL** (Social)
   - Perfil: Networking, impacto, relacionamentos
   - Dica: "Suas conexões são poder, mas números contam!"

---

## 📦 Arquivos Criados

```
types/
  └── game.ts (105 linhas) ✅

services/
  ├── GameManager.ts (198 linhas) ✅
  ├── MascotEngine.ts (193 linhas) ✅
  └── OnboardingToGameBridge.ts (118 linhas) ✅

data/
  └── rpgMissions.ts (371 linhas) ✅

screens/
  ├── GameHubScreen.js (471 linhas) ✅
  ├── RPGMissionScreen.js (579 linhas) ✅
  └── MissionCompleteScreen.js (327 linhas) ✅

Total: ~2,562 linhas de código
```

---

## ✅ Status de Implementação

### **Completado**
- ✅ Sistema de tipos completo
- ✅ GameManager com todas as funções
- ✅ MascotEngine com reações dinâmicas
- ✅ 3 missões com 12 decisões únicas
- ✅ 3 telas principais (Hub, Mission, Complete)
- ✅ Integração AsyncStorage
- ✅ Sistema de energia com recarga
- ✅ 5 indicadores da startup
- ✅ 4 perfis de fundador
- ✅ 6 títulos de progressão
- ✅ Ponte onboarding → RPG
- ✅ Rotas no App.js

### **Pendente (Backend)**
- ⏳ API Node.js para sincronização
- ⏳ Sistema de autenticação
- ⏳ Ranking global
- ⏳ Sincronização multi-dispositivo

### **Melhorias Futuras (Frontend)**
- 💡 Animações Lottie mais elaboradas
- 💡 Sons e efeitos sonoros
- 💡 Tutorial interativo
- 💡 Mais missões (fases: TRACTION, SCALE, EXIT)
- 💡 Sistema de conquistas/medals
- 💡 Gráficos de progresso histórico
- 💡 Compartilhar resultados sociais

---

## 🚀 Como Testar

### **1. Via Onboarding Completo**
```
Splash → Mini Mission → Profile → Goal → Plan → UserType → ... → GameHub
```

### **2. Via Inicialização Direta (Debug)**
```javascript
import GameManager from './services/GameManager';

// No SplashScreen ou DebugScreen
await GameManager.initializeNewGame(30, 'INNOVATOR');
navigation.navigate('GameHub');
```

### **3. Reset para Teste**
```javascript
import GameManager from './services/GameManager';
await GameManager.resetGame();
```

---

## 🎯 Próximos Passos

1. ✅ **Testar fluxo completo** no Expo Go
2. 📝 **Documentar integração** onboarding → RPG
3. 🔗 **Conectar PlanSelectionScreen** ao bridge
4. 🔀 **Merge feat/rpg-game-system** → develop
5. 🔀 **Merge feat/gamified-onboarding** → develop
6. 🧪 **Testar build APK** com sistema completo
7. 🚀 **Deploy backend** (separado, futuro)

---

## 📚 Referências

- **Design:** Baseado em jogos RPG mobile (Habitica, Step)
- **UX:** Inspirado em apps de educação gamificados
- **Cores:** Tailwind CSS palette
- **Animações:** React Native Animated API + Lottie

---

**Criado por:** GitHub Copilot & Vicente  
**Data:** 2024  
**Branch:** feat/rpg-game-system  
**Status:** ✅ Completo (Frontend Only)
