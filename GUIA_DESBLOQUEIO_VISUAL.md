# 🎮 Guia Visual: Como Desbloquear Próximas Trilhas

## 📚 Estrutura de Trilhas

```
┌─────────────────────────────────────────────────────┐
│  Mapa de Trilhas - EMPREENDA+                       │
└─────────────────────────────────────────────────────┘

    TRILHA 1                TRILHA 2               TRILHA 3
    ┌─────┐    50%+    ┌─────┐    75%+      ┌─────┐
    │ 💡  │ ────────→ │ 🎯  │ ─────────→  │ 🚀  │
    │  ID │          │ VAL │            │ MVP │
    │     │          │ IDA │            │     │
    └─────┘          └─────┘            └─────┘
   ✅ ABERTA        🔒 BLOQUEADA      🔒 BLOQUEADA
```

---

## 🎯 Fase 1: Identificação de Oportunidades

**Status:** ✅ SEMPRE DESBLOQUEADA (Primeira Trilha)

### Missões:
1. 🔍 Explorando Problemas Locais (100 XP)
2. 👥 Pesquisa de Mercado Básica (100 XP)
3. 💭 Seleção e Priorização (100 XP)

### Progresso Necessário para Desbloquear Trilha 2:
```
Completa 1 missão   = 33% ❌ Não desbloqueia
Completa 2 missões  = 66% ✅ DESBLOQUEIA Trilha 2!
Completa 3 missões  = 100% ✅ Trilha 1 Completa!
```

---

## 🔓 Como Aparecem as Trilhas na Tela

### Estado 1: BLOQUEADA (Muito Distante)
```
┌──────────────────────────────────┐
│  🔒 Validação de Ideias          │
│  Valide suas soluções com o...   │
├──────────────────────────────────┤
│  🔐 Desbloqueável ao completar   │
│  a trilha anterior               │
│                                  │
│  (Cartão cinza, não clicável)    │
└──────────────────────────────────┘
```

### Estado 2: QUASE DESBLOQUEADA (Faltam 25% ou menos)
```
┌──────────────────────────────────┐
│  ⚡ Validação de Ideias          │
│  Valide suas soluções com o...   │
├──────────────────────────────────┤
│  🌟 Faltam 17% para desbloquear! │
│  ████████░░ 83%                  │
│                                  │
│  Complete a trilha anterior...   │
└──────────────────────────────────┘
★ Borda colorida (indica progresso)
★ Opacidade aumentada
★ Símbolo ⚡ em vez de 🔒
```

### Estado 3: DESBLOQUEADA (Pronta para Iniciar)
```
┌──────────────────────────────────┐
│  🎯 Validação de Ideias          │
│  Valide suas soluções com o...   │
├──────────────────────────────────┤
│  Progresso: 0% (0/3 Missões)    │
│  ████░░░░░░░░░░░░░░░░ 0%        │
│                                  │
│  +300 XP Disponíveis             │
│                    [TAP PARA →]  │
└──────────────────────────────────┘
✅ Cor cheia (azul)
✅ Totalmente opaco
✅ 100% clicável
```

### Estado 4: EM PROGRESSO
```
┌──────────────────────────────────┐
│  🎯 Validação de Ideias          │
│  Valide suas soluções com o...   │
├──────────────────────────────────┤
│  Progresso: 67% (2/3 Missões)   │
│  ██████████░░░░░░░░░░░░ 67%     │
│                                  │
│  +300 XP Disponíveis             │
│                    [TAP PARA →]  │
└──────────────────────────────────┘
```

### Estado 5: COMPLETA
```
┌──────────────────────────────────┐
│  🎯 Validação de Ideias      ✅  │
│  Valide suas soluções com o...   │
├──────────────────────────────────┤
│  Progresso: 100% (3/3 Missões) │
│  ████████████████████████ 100%  │
│                                  │
│  +300 XP (COMPLETADO)            │
└──────────────────────────────────┘
✅ Badge "✅" no canto
✅ Barra 100% preenchida
```

---

## 🚀 Cenários Práticos

### Cenário 1: Usuário Novo
```
Dia 1 - Abertura do App:
✅ Trilha 1 - Desbloqueada (disponível)
🔒 Trilha 2 - Bloqueada 
🔒 Trilha 3 - Bloqueada
🔒 Trilha 4 - Bloqueada

↓ Usuário completa 1 missão (33%)

✅ Trilha 1 - 33% (1/3)
🔒 Trilha 2 - Bloqueada

↓ Usuário completa 2ª missão (66%)

✅ Trilha 1 - 66% (2/3)
⚡ Trilha 2 - ⚠️ QUASE desbloqueada! Faltam 34%
🔒 Trilha 3 - Bloqueada

↓ Usuário clica em Trilha 2

⚡ Trilha 2 - ⚡ DESBLOQUEADA! 0% (0/3)
✅ Trilha 1 - 66%
```

---

## 📊 Sistema de Progresso

### Como é Calculado:
```javascript
Progresso = (Missões Completadas / Total de Missões) × 100

Exemplo Trilha 1:
- 3 missões no total
- Usuário completou 2
- Progresso = (2/3) × 100 = 66%
```

### Limites de Desbloqueio:
```
Trilha 2 desbloqueia quando: Trilha 1 ≥ 50%
Trilha 3 desbloqueia quando: Trilha 2 ≥ 50%
Trilha 4 desbloqueia quando: Trilha 3 ≥ 50%
...
```

---

## 💡 Dicas para o Usuário

### Para Desbloquear Rápido:
1. ✅ Acesse a Trilha 1 (já está desbloqueada)
2. 📝 Complete pelo menos 2 das 3 missões
3. 📱 Volte para a tela de trilhas
4. 🎯 Trilha 2 estará esperando você!

### O que Ganhar:
- 🎯 **XP:** 100 XP por missão completada
- 🏆 **Medalhas:** Desbloqueadas ao completar milestones
- ⭐ **Progresso:** Seu perfil mostra seu avanço
- 🎮 **Próximas Trilhas:** Novas oportunidades de aprendizado

---

## 🎬 Animações Esperadas

### Quando uma Trilha é Desbloqueada:
1. 🌟 Efeito de brilho/destaque
2. 📍 Mudança de cor (cinza → cor da trilha)
3. ⚡ Ícone de desbloqueio
4. 📢 Notificação (se ativada)
5. 🎉 Feedback sonoro (opcional)

---

## 🔄 Fluxo Completo: Trilha 1 → Trilha 2 → Trilha 3

```
1. START: Trilha 1 Aberta
   ├─ Missão 1: Explorando Problemas ✅ 100 XP
   ├─ Missão 2: Pesquisa de Mercado → 66% (⚡ Quase!)
   └─ Missão 3: Priorização (bloqueada)
   
   → 🌟 TRITON 2 DESBLOQUEADA!

2. Trilha 2 Aberta (Validação de Ideias)
   ├─ Missão 1: Soluções Criativas ✅ 100 XP
   ├─ Missão 2: Protótipos → 66% (⚡ Quase!)
   └─ Missão 3: Validação com Clientes
   
   → 🌟 TRILHA 3 DESBLOQUEADA!

3. Trilha 3 Aberta (Desenvolvimento MVP)
   ├─ Missão 1: Plano de Negócios
   ├─ Missão 2: Protótipo MVP
   └─ Missão 3: Teste com Usuários
   
   → 🏆 TRILHA COMPLETA!
```

---

## 📱 Ação do Usuário

### Para DESBLOQUEAR Validação de Ideias:

```
┌────────────────────────────────┐
│ Tela de Trilhas                │
│                                │
│ ✅ Trilha 1 - 33%             │
│    Explorando Problemas        │
│    [TAP PARA CONTINUAR →]     │
│                                │
│ ⚠️ Trilha 2 - Bloqueada        │
│    Validação de Ideias         │
│    Faltam 17%...              │
│    (Não clicável)              │
└────────────────────────────────┘
        ↓ Clica em Trilha 1
        ↓ Completa Missão 2
        ↓ Retorna à tela de Trilhas
        ↓ BOOM! 🎉 Trilha 2 está aberta!
```

---

## ✨ Conclusão

**Sistema de Desbloqueio é:**
- ✅ **Progressivo:** Um passo por vez
- ✅ **Visual:** Mostra claramente o progresso
- ✅ **Gamificado:** Usa cores, ícones e animações
- ✅ **Motivador:** Mostra quanto falta para desbloquear
- ✅ **Intuitivo:** Usuário entende naturalmente
- ✅ **Flexível:** Pode completar a qualquer ritmo

**A pessoa consegue desbloquear** apenas completando as missões da trilha anterior!

