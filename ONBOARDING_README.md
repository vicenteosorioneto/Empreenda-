# 🎮 Onboarding Gamificado - Empreenda+

## 📋 Visão Geral

Sistema completo de onboarding gamificado que engaja o usuário desde o primeiro segundo, permitindo que ele jogue antes mesmo de criar uma conta.

## 🎯 Fluxo do Onboarding

```
1. 🚀 Splash Screen (com Mascote)
   ↓
2. 🎮 Mini Missão Intro
   ↓
3. 🎯 Mini Missão (5 perguntas - SEM LOGIN)
   ↓
4. 🏆 Resultado da Missão
   ↓
5. 📝 Revisão de Erros (se houver)
   ↓
6. 👤 Criação de Perfil Gamificada (4 etapas)
   - Objetivo
   - Tem ideia?
   - Motivação
   - Tempo diário
   ↓
7. 🎯 Configuração de Meta Diária + Notificações
   ↓
8. 💎 Seleção de Plano (Free ou Premium)
   ↓
9. ✅ Entrada no App Principal
```

## 🚫 Regras Importantes

1. **NUNCA** exigir login antes da mini missão
2. **SEMPRE** permitir jogar offline
3. **SEMPRE** salvar progresso localmente (AsyncStorage)
4. Sincronizar com backend apenas após login

## 📁 Estrutura de Arquivos

### Tipos (`/types/onboarding.ts`)
- `Mission` - Estrutura das missões
- `UserProfile` - Perfil do usuário
- `Mistake` - Erros cometidos
- `OnboardingProgress` - Progresso do onboarding
- `UserSubscription` - Assinatura (Free/Premium)

### Dados (`/data/`)
- `initialMission.ts` - 5 perguntas da mini missão
- `motivationalMessages.ts` - Mensagens do mascote

### Serviços (`/services/`)
- `StorageService.ts` - Persistência offline (AsyncStorage)
- `MotivationEngine.ts` - Sistema de streak e pontuação
- `NotificationService.ts` - Lembretes diários

### Componentes (`/components/`)
- `Mascot.js` - Mascote animado reutilizável

### Telas (`/screens/`)
1. `MiniMissionIntroScreen.js` - Introdução à missão
2. `MiniMissionScreen.js` - Quiz interativo (5 perguntas)
3. `MissionResultScreen.js` - Resultado com pontuação
4. `MistakeReviewScreen.js` - Revisão educacional de erros
5. `GameProfileScreen.js` - Criação de perfil em 4 etapas
6. `DailyGoalScreen.js` - Meta diária + notificações
7. `PlanSelectionScreen.js` - Paywall suave (Free/Premium)

## 🎨 Features Implementadas

### ✅ Mini Missão Jogável
- 5 perguntas sobre empreendedorismo
- Feedback imediato após cada resposta
- Contador de acertos e erros
- Funciona 100% offline
- Explicações educacionais

### ✅ Sistema de Motivação
- Streak de 4 acertos consecutivos
- Mensagens motivacionais aleatórias
- Modal animado do mascote
- Sistema de pontuação (0-100)

### ✅ Sistema de Erros Educacional
- Registra todos os erros
- Permite revisão ao final
- Mostra resposta correta vs escolhida
- Dicas de aprendizado

### ✅ Criação de Perfil Gamificada
- **SEM FORMULÁRIO** - apenas perguntas interativas
- 4 etapas simples e rápidas
- Progress indicator visual
- Cards animados e interativos

### ✅ Meta Diária + Notificações
- Escolha de tempo diário (5/10/15/30 min)
- Configuração de horário preferido
- Notificações diárias personalizadas
- Pode ativar/desativar

### ✅ Paywall Suave
- Plano Free sempre disponível
- Premium com 7 dias grátis
- Nenhuma trava imediata
- Comparação clara de recursos

### ✅ Offline First
- Todo progresso salvo localmente
- Sincronização posterior com backend
- Funciona sem conexão

## 🎮 Como Testar

```bash
# Instalar dependências
npm install

# Rodar no Expo Go
npm start

# Fluxo de teste:
1. Abrir o app
2. Aguardar Splash Screen (3s)
3. Jogar mini missão (5 perguntas)
4. Ver resultado
5. Revisar erros (se houver)
6. Criar perfil (4 etapas)
7. Configurar meta diária
8. Escolher plano
9. Entrar no app
```

## 📊 Storage Keys

O onboarding usa as seguintes chaves no AsyncStorage:

- `@empreenda_onboarding_progress` - Progresso geral
- `@empreenda_user_profile` - Perfil do usuário
- `@empreenda_user_subscription` - Plano escolhido
- `@empreenda_mission_mistakes` - Erros da missão
- `@empreenda_last_sync` - Última sincronização

## 🔔 Notificações

Sistema de lembretes diários configurável:

- Permissão solicitada no momento certo
- Horários sugeridos: 7h, 12h, 18h, 20h
- Mensagens motivacionais variadas
- Pode ser desativado a qualquer momento

## 💎 Planos

### Empreenda+ (Grátis)
- ✅ Missões básicas
- ✅ 5 trilhas de aprendizado
- ✅ Sistema de ranking
- ❌ Mentorias exclusivas
- ❌ Certificados
- ❌ Conteúdo premium

### Super Empreenda+ (Premium)
- ✅ TUDO do plano grátis
- ✅ Mentorias com especialistas
- ✅ Certificados oficiais
- ✅ Conteúdo premium ilimitado
- ✅ Análise de ideias por IA
- ✅ Plano de negócios personalizado
- 🎁 **7 DIAS GRÁTIS**

## 🚀 Próximos Passos (Backend)

Endpoints necessários para sincronização:

```typescript
POST /api/onboarding/progress
POST /api/user/profile
POST /api/user/subscription
GET  /api/missions
POST /api/missions/results
```

## 🎯 KPIs para Medir

- Taxa de conclusão do onboarding
- Tempo médio de onboarding
- Taxa de conversão (Free → Premium)
- Taxa de ativação de notificações
- Score médio na mini missão
- Taxa de revisão de erros

## 🐛 Troubleshooting

### Notificações não funcionam?
1. Verificar permissões no dispositivo
2. Testar com `NotificationService.sendImmediateNotification()`
3. Verificar logs do console

### Dados não persistem?
1. Verificar se AsyncStorage está instalado
2. Usar `StorageService` para debug
3. Limpar storage: `await StorageService.clearAllData()`

## 📝 Notas Importantes

- Mascote sempre presente para guiar o usuário
- UX fluida e sem atrito
- Gamificação presente em cada etapa
- Feedback imediato sempre que possível
- Design neon moderno e atrativo
- Totalmente responsivo

---

**Desenvolvido com ❤️ para engajar e educar jovens empreendedores**
