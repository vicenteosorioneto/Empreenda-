# 🎯 Sistema de Desbloqueio de Trilhas - EMPREENDA+

## 📋 Como Funciona Atualmente

### Estrutura de Desbloqueio (Linha 52 - MainHubScreen.js):

```javascript
unlocked: index === 0 || trilhas[index - 1]?.progress > 50
```

**Lógica:**
- ✅ **Trilha 1** (Identificação de Oportunidades): SEMPRE desbloqueada (primeira)
- 🔒 **Trilha 2** (Validação de Ideias): Desbloqueada quando Trilha 1 > 50% de progresso
- 🔒 **Trilha 3** (Desenvolvimento MVP): Desbloqueada quando Trilha 2 > 50% de progresso
- 🔒 **Trilhas Posteriores**: Mesmo padrão em cascata

---

## 🎮 Fluxo Completo para Desbloquear "Validação de Ideias"

### Passo 1: Completar Missões da Trilha 1
O usuário precisa completar as 3 missões de "Identificação de Oportunidades":

1. **Explorando Problemas Locais** (100 XP)
   - Identificar 3 problemas do bairro
   - Responder 3 quiz questions
   - Ganhar 100 XP

2. **Pesquisa de Mercado Básica** (100 XP)
   - Conversar com 5 pessoas
   - Responder 3 quiz questions
   - Ganhar 100 XP

3. **Identificação de Oportunidades** (100 XP)
   - Anotar observações
   - Responder 3 quiz questions
   - Ganhar 100 XP

**Total: 300 XP + 9 Quiz Questions**

### Passo 2: Atingir 50% de Progresso

Progresso = (Missões Completadas / Total de Missões) × 100

```
Exemplo:
- 2 de 3 missões = 66% ✅ DESBLOQUEIA Trilha 2
- 1 de 3 missões = 33% ❌ NÃO desbloqueia ainda
```

### Passo 3: Trilha 2 Desbloqueada!

Quando atingir 50%+ na Trilha 1:
- 🔓 Trilha 2 fica disponível para clique
- 📍 Cor muda de cinza (#D1D5DB) para cor da trilha (#3B82F6)
- 👁️ Ícone de cadeado 🔒 desaparece
- ✨ Barra de progresso aparece

---

## 🚀 Melhorias Sugeridas

### 1. Sistema de Pré-Requisitos Mais Detalhado

**Criar um arquivo `requirements.js`:**

```javascript
export const trilhaRequirements = {
  trilha1: {
    required: false, // Primeira trilha
    minimumProgress: 0,
    predecessors: [],
    unlockMessage: "Disponível desde o início!"
  },
  trilha2: {
    required: true,
    minimumProgress: 50, // 50% da trilha anterior
    predecessors: ['trilha1'],
    unlockMessage: "Complete 50% da Trilha 1 para desbloquear"
  },
  trilha3: {
    required: true,
    minimumProgress: 75, // Mais difícil
    predecessors: ['trilha2'],
    unlockMessage: "Complete 75% da Trilha 2 para desbloquear"
  }
};
```

### 2. Mostrar Progresso de Desbloqueio

Quando uma trilha está QUASE desbloqueada:

```javascript
// Na renderização da trilha bloqueada:
{!trilha.unlocked && trilha.almostUnlocked && (
  <View style={styles.unlockedProgressContainer}>
    <Text style={styles.unlockedProgressText}>
      Faltam {trilha.progressNeeded}% para desbloquear!
    </Text>
    <View style={styles.unlockedProgressBar}>
      <View style={[
        styles.unlockedProgressFill,
        { width: `${trilha.currentProgress}%` }
      ]} />
    </View>
  </View>
)}
```

### 3. Animar Desbloqueio

Quando uma trilha é desbloqueada:

```javascript
// Usar Animated para efeito visual
const scaleAnim = useRef(new Animated.Value(0.8)).current;

useEffect(() => {
  if (justUnlocked) {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1.1, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
    
    // Reproduzir som/vibração
    showNotification("🎉 Trilha Desbloqueada!");
  }
}, [justUnlocked]);
```

### 4. Implementar Checkpoints

Ao invés de apenas "progressó", criar checkpoints:

```javascript
trilha2_checkpoint1: "Gerar Soluções", // 25% completado
trilha2_checkpoint2: "Prototipar Ideia", // 50% completado
trilha2_checkpoint3: "Validar com Clientes", // 75% completado
trilha2_checkpoint4: "Trilha Concluída", // 100% completado
```

---

## 📊 Estatísticas de Progresso

**Exemplo Real:**

```
Trilha 1: Identificação de Oportunidades
├─ Explorando Problemas Locais ✅ 100%
├─ Pesquisa de Mercado Básica ✅ 100%
└─ Identificação de Oportunidades ⏳ 0%
   Progresso: 66% 🔓 DESBLOQUEADA

Trilha 2: Validação de Ideias
├─ Criando Soluções Criativas 🔒
├─ Testando com Protótipos 🔒
└─ Validação com Clientes 🔒
   Progresso: 0% 🔐 DESBLOQUEADA em breve (66/100)
```

---

## 🔧 Implementação Técnica

### Arquivo: `utils/progressUtils.js` (criar novo)

```javascript
export const calculateTrilhaUnlockStatus = (trilhaIndex, trilhas) => {
  if (trilhaIndex === 0) return true; // Primeira sempre desbloqueada
  
  const previousTrilha = trilhas[trilhaIndex - 1];
  if (!previousTrilha) return false;
  
  const previousProgress = previousTrilha.progress || 0;
  const requiresProgress = 50; // Configurável
  
  return {
    unlocked: previousProgress >= requiresProgress,
    almostUnlocked: previousProgress >= (requiresProgress - 25),
    progressNeeded: Math.max(0, requiresProgress - previousProgress),
    currentProgress: previousProgress
  };
};

export const getUnlockMessage = (status, trilhaIndex) => {
  if (status.unlocked) {
    return "✅ Desbloqueada!";
  }
  
  if (status.almostUnlocked) {
    return `Faltam ${status.progressNeeded}% para desbloquear`;
  }
  
  return `Complete a trilha anterior para acessar`;
};
```

---

## 📱 UX/UI Melhorado

### Cartão de Trilha Bloqueada:

```
┌─────────────────────────────┐
│  🔒 Validação de Ideias     │
│  (Bloqueada)                │
├─────────────────────────────┤
│ Faltam 17% para desbloquear │
│ Progresso da anterior: 33%  │
│ ████░░░░░░ 33%             │
├─────────────────────────────┤
│ "Complete a Trilha 1 para   │
│  aprender a validar ideias" │
└─────────────────────────────┘
```

### Cartão de Trilha Desbloqueada:

```
┌─────────────────────────────┐
│ 🎯 Validação de Ideias  ✨  │
│ Valide suas soluções        │
├─────────────────────────────┤
│ Progresso:                  │
│ ███░░░░░░░░░░░░░░░░ 15%    │
├─────────────────────────────┤
│ 3 Missões                   │
│ +300 XP Disponíveis         │
│                             │
│ [TAP PARA COMEÇAR →]        │
└─────────────────────────────┘
```

---

## 🎯 Resumo para o Usuário

**Para desbloquear "Validação de Ideias":**

1. ✅ Complete pelo menos 1-2 missões de "Identificação de Oportunidades"
2. ✅ Isso vai levar você a 50%+ de progresso nessa trilha
3. 🔓 Automaticamente "Validação de Ideias" fica disponível
4. 📱 Você verá a mudança na tela de trilhas (cor, sem cadeado)
5. 🚀 Clique para começar a próxima trilha!

**Tempo estimado:** 30-60 minutos para completar metade da Trilha 1

---

## 🔗 Arquivos Envolvidos

- `screens/MainHubScreen.js` (linha 52) - Lógica de desbloqueio
- `data/missions.js` - Estrutura das missões
- `utils/storage.js` - Salva progresso
- `components/Gamification.js` - Feedback visual

---

**Próximo Passo:** Quer que eu implemente as melhorias sugeridas para tornar o desbloqueio mais visual e gamificado?
