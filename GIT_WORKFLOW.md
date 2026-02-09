# 🔀 Fluxo de Trabalho Git - Empreenda+

## 📋 Estrutura de Branches

```
main (produção)
  ↑
  └── develop (desenvolvimento)
        ↑
        ├── feat/nova-funcionalidade
        ├── fix/correcao-bug
        └── refactor/melhoria-codigo
```

## 🎯 Branches Principais

### `main` - Produção
- **Apenas código 100% testado e funcionando**
- Aqui é onde geramos os APKs de produção
- **NUNCA** commitar diretamente nesta branch
- Só recebe merges da `develop` após testes completos

### `develop` - Desenvolvimento
- **Branch de integração contínua**
- Aqui você testa todas as funcionalidades juntas
- Onde você puxa e integra as features antes de ir pra produção
- Pode rodar e testar o app normalmente

## 🚀 Fluxo de Trabalho

### 1️⃣ Criar Nova Funcionalidade
```bash
# Sempre partir da develop atualizada
git checkout develop
git pull origin develop

# Criar nova branch de feature
git checkout -b feat/nome-da-funcionalidade

# Trabalhar e fazer commits
git add .
git commit -m "feat: descrição da funcionalidade"
git push origin feat/nome-da-funcionalidade
```

### 2️⃣ Integrar Feature na Develop
```bash
# Voltar para develop
git checkout develop

# Puxar atualizações
git pull origin develop

# Fazer merge da feature
git merge feat/nome-da-funcionalidade

# Testar se tudo funciona!
npm start

# Se tudo ok, enviar para o repositório
git push origin develop
```

### 3️⃣ Publicar em Produção (Main)
```bash
# Apenas quando TUDO estiver testado na develop
git checkout main
git pull origin main

# Fazer merge da develop
git merge develop

# Gerar APK de produção
npx eas-cli build --platform android --profile production

# Enviar para repositório
git push origin main
```

## 📝 Convenção de Nomes de Branches

- **feat/** - Novas funcionalidades
  - Exemplo: `feat/sistema-ranking`, `feat/quiz-timer`

- **fix/** - Correções de bugs
  - Exemplo: `fix/conquistas-error`, `fix/login-crash`

- **refactor/** - Melhorias de código (sem mudar funcionalidade)
  - Exemplo: `refactor/clean-components`, `refactor/optimize-storage`

- **docs/** - Documentação
  - Exemplo: `docs/readme-update`, `docs/api-guide`

## ⚠️ Regras Importantes

1. **NUNCA** commitar direto na `main`
2. **SEMPRE** criar branches a partir da `develop`
3. **SEMPRE** testar na `develop` antes de mergear na `main`
4. **DELETAR** branches de features após merge (opcional, mas recomendado)
5. Usar mensagens de commit descritivas

## 🔄 Comandos Úteis

```bash
# Ver todas as branches
git branch -a

# Ver branch atual
git branch

# Deletar branch local (após merge)
git branch -d feat/nome-branch

# Deletar branch remota (após merge)
git push origin --delete feat/nome-branch

# Ver diferenças entre branches
git diff develop..feat/minha-feature

# Ver histórico visual
git log --oneline --graph --all --decorate
```

## 🎯 Resumo do Dia a Dia

**Para desenvolver:**
```bash
develop → criar feat/xxx → trabalhar → mergear em develop → testar
```

**Para produção:**
```bash
develop (tudo testado) → mergear em main → gerar APK
```

## 🆘 Em Caso de Conflitos

```bash
# Se houver conflito ao mergear
git status  # ver arquivos em conflito
# Resolver conflitos manualmente nos arquivos
git add .
git commit -m "merge: resolve conflitos"
git push
```

---

**Dúvidas?** Este fluxo garante que a `main` sempre funciona perfeitamente! 🚀
