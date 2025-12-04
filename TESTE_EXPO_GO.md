# 📱 Como Testar no Expo Go - QR Code & Instruções

## 🚀 Opção 1: QR Code (Recomendado)

### Passo 1: Instale o Expo Go
- **Android**: https://play.google.com/store/apps/details?id=host.exp.exponent
- **iOS**: https://apps.apple.com/us/app/expo-go/id1054959411

### Passo 2: Inicie o Servidor

Execute no terminal dentro da pasta `Empreenda-`:

```bash
npm start
# ou
expo start
```

Você verá algo como:
```
┌─────────────────────────────────────────┐
│                                         │
│   Starting on http://localhost:8081    │
│                                         │
│   Scan this QR code with Expo Go       │
│                                         │
│   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄     │
│   █ ▄▄▄▄▄ █ ▀ ▀▀█▀ ▀ █ ▄▄▄▄▄ █       │
│   █ █   █ █▀▀  █ ▀▀ ▀█ █   █ █       │
│   █ █▄▄▄█ █  ▀ █ ▄▄▀ █ █▄▄▄█ █       │
│   █▄▄▄▄▄▄▄█ █ █ █ █▄█ █▄▄▄▄▄▄▄█       │
│   █ ▀▄▄  ▀▀█▀ ▀ █▀█  █▀ █▄▀ █        │
│   ▀▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄    │
│                                         │
└─────────────────────────────────────────┘
```

### Passo 3: Escaneie o QR Code

**Android:**
1. Abra o Expo Go
2. Toque em "Scan QR code"
3. Aponte a câmera para o QR code no terminal
4. Espere carregar

**iOS:**
1. Abra a câmera do iPhone
2. Aponte para o QR code
3. Toque na notificação "Open in Expo Go"
4. Espere carregar

---

## 🎮 Opção 2: Simulador Local

### Android Emulator
```bash
npm run android
# ou
expo start --android
```

### iOS Simulator (macOS)
```bash
npm run ios
# ou
expo start --ios
```

---

## 💻 Opção 3: Web

```bash
expo start --web
# Abrirá automaticamente em http://localhost:19006
```

---

## 🔧 Solução de Problemas

### "Port 8081 is already in use"
```bash
# Use outra porta:
expo start --port 8082
```

### "Unable to find expo in this project"
```bash
# Instale expo:
npm install expo
```

### "Module not found"
```bash
# Reinstale dependências:
rm -rf node_modules
npm install
```

### App congela ou não abre
```bash
# Limpe o cache:
expo start --clear
```

---

## ✅ O Que Você Verá

Ao abrir o app no Expo Go, você verá:

1. **Splash Screen** (1-2 segundos)
   - Logo do Empreenda
   - Animação de carregamento

2. **Tela Principal (MainHubScreenNeon)** ✨
   - Background escuro neon (#0F172A)
   - Gradiente azul→roxo no topo
   - Avatar flutuante
   - Badges pulsando
   - Cores vibrantes

3. **Recursos Visíveis**
   - 🎨 Cores neon em destaque
   - ✨ Cards com brilho
   - 🎭 Avatar flutuante suave
   - 📊 Stats em 3 cards pulsantes
   - 🗺️ Trilhas com borders neon
   - 🎮 Mini-games em grid
   - 🏆 Botões de navegação

---

## 📱 Testar Diferentes Telas

Dentro do app, toque para navegar:

- **🏆 Ranking** - Toque no botão "Ranking"
- **🌍 Impacto** - Toque no botão "Impacto"
- **🎖️ Conquistas** - Toque no botão "Conquistas"
- **⚙️ Perfil** - Toque no botão "Perfil"

---

## 🎮 Testar Mini-Jogos

1. Toque em "Mini-Jogos Rápidos"
2. Selecione qualquer mini-jogo
3. Veja as animações funcionarem:
   - Roda girando
   - Botões respondendo
   - Feedback visual completo

---

## 📊 Testes de Performance

Observe no Expo Go:

- ✅ **Animações suaves** - Sem travamento
- ✅ **Transições rápidas** - Sem delay
- ✅ **Cores vibrantes** - Sem distorção
- ✅ **Touch responsivo** - Feedback imediato

---

## 🐛 Debug & Console

Para ver logs no terminal:

```bash
# Já aparece no terminal quando você roda expo start
# Veja mensagens de log aqui
```

No Expo Go, toque em "Logs" para ver console do app.

---

## 🔄 Hot Reload

Ao salvar um arquivo:
- ✅ App recarrega automaticamente
- ✅ Mantém o estado
- ✅ Sem perder progresso

Pressione no terminal:
- `r` - Recarregar
- `s` - Selecionar plataforma
- `w` - Abrir no web

---

## 📸 Capturar Screenshots

**Android:**
- Pressione Volume Down + Power

**iOS:**
- Pressione Side Button + Volume Up

**Windows:**
- Print Screen

---

## 🚀 Pronto para Testar!

### Resumo Rápido:

1. ✅ Terminal aberto na pasta `Empreenda-`
2. ✅ Execute: `npm start`
3. ✅ Veja o QR code
4. ✅ Abra Expo Go no celular
5. ✅ Escaneie o QR code
6. ✅ Veja seu app neon! ✨

---

## 💡 Dicas Importantes

- **Rede**: Celular e PC devem estar na mesma rede WiFi
- **Firewall**: Pode bloquear - desative se necessário
- **USB**: Pode usar USB em vez de WiFi
- **Cache**: Limpe se tiver problemas
- **Versão**: Expo Go e npm devem estar atualizados

---

**Pronto para testar? Comece agora! 🎉**

Qualquer dúvida, consulte o terminal do Expo Go para mensagens de erro.
