# 🎯 SCRIPTS RÁPIDOS - EMPREENDA+ MVP

## 🚀 Comandos Essenciais para Demonstração

### 1. Iniciar o App (Desenvolvimento)
```bash
# Método 1: Expo Go (mais rápido para testar)
npx expo start

# Método 2: Com QR Code
npx expo start --tunnel

# Método 3: Diretamente no Android
npx expo start --android

# Método 4: Diretamente no iOS
npx expo start --ios
```

### 2. Limpar Cache (se houver problemas)
```bash
# Limpar cache do Expo
npx expo start -c

# Limpar node_modules e reinstalar
rm -rf node_modules
npm install

# Limpar tudo
rm -rf node_modules package-lock.json
npm install
npx expo start -c
```

### 3. Gerar Build para Demonstração
```bash
# Método 1: Build rápido (local)
./build-demo.sh
# Escolha opção 1 para APK debug rápido

# Método 2: Build otimizado (EAS)
npx eas build --platform android --profile preview

# Método 3: Build para web
npx expo export:web
npx serve web-build
```

### 4. Testes Rápidos
```bash
# Ver logs em tempo real
npx expo start --clear

# Testar em dispositivo específico
adb devices  # Ver dispositivos Android conectados
npx expo start --android --device

# Checar erros
npm run lint  # Se configurado
```

---

## 📱 Preparação do Dispositivo de Demo

### Android
```bash
# 1. Instalar Expo Go
# Baixar da Play Store: https://play.google.com/store/apps/details?id=host.exp.exponent

# 2. Ou usar APK direto
# Após gerar build, transferir APK para dispositivo:
adb install caminho/para/app.apk

# 3. Verificar dispositivo conectado
adb devices
```

### iOS
```bash
# 1. Instalar Expo Go
# Baixar da App Store

# 2. Ou usar TestFlight (builds EAS)
npx eas build --platform ios --profile preview
```

---

## 🎨 Criar Usuário Demo com Dados Realistas

### Script SQL/Storage para Usuário Demo
```javascript
// Executar no DevTools ou criar arquivo de seed

const demoUser = {
  id: 'demo_user_001',
  name: 'Maria Silva',
  email: 'maria.demo@empreenda.app',
  avatar: {
    hair: 'colorido',
    outfit: 'tech',
    accessory: 'oculos',
    background: 'cidade'
  },
  level: 5,
  totalXP: 5500,
  currentStreak: 12,
  maxStreak: 15,
  
  // Progresso nas trilhas
  trilhasProgress: {
    trilha1: { completed: true, progress: 100, xp: 800 },
    trilha2: { completed: true, progress: 100, xp: 750 },
    trilha3: { completed: false, progress: 60, xp: 450 },
    trilha4: { completed: false, progress: 30, xp: 200 },
    trilha5: { completed: false, progress: 0, xp: 0 }
  },
  
  // Medalhas conquistadas
  badges: [
    'explorador',
    'inovador',
    'lider_parcial',
    'velocidade',
    'sustentabilidade',
    'dedicacao_7dias',
    'quiz_master',
    'roda_vencedor'
  ],
  
  // Mini-jogos
  minigamesPlayed: 25,
  quizScore: 1200,
  
  // Ranking
  rankingPosition: 8,
  
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 dias atrás
};

// Salvar no AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

async function createDemoUser() {
  await AsyncStorage.setItem('userStats', JSON.stringify(demoUser));
  console.log('✅ Usuário demo criado!');
}

createDemoUser();
```

---

## 📸 Tirar Screenshots de Qualidade

### No Android (via ADB)
```bash
# Conectar dispositivo
adb devices

# Tirar screenshot
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png ./screenshots/

# Script para tirar múltiplas screenshots
mkdir -p screenshots
for i in {1..10}; do
  read -p "Prepare a tela e pressione Enter..."
  adb shell screencap -p /sdcard/screen_$i.png
  adb pull /sdcard/screen_$i.png ./screenshots/
  echo "Screenshot $i salvo!"
done
```

### No iOS (via Xcode ou dispositivo)
```bash
# Usar atalho: Cmd + Shift + 4 (simulador)
# Ou botão lateral + volume up (dispositivo)

# Screenshots vão para Desktop ou Fotos
```

### Telas Importantes para Screenshots
1. ✅ Splash Screen
2. ✅ Onboarding (seleção de avatar)
3. ✅ Hub principal (com progresso visível)
4. ✅ Trilha desbloqueada (aberta)
5. ✅ Trilha bloqueada (com indicador)
6. ✅ Mini-jogo (Roda da Inovação)
7. ✅ Quiz em andamento
8. ✅ Popup de conquista
9. ✅ Tela de perfil completa
10. ✅ Ranking (com usuário em posição boa)
11. ✅ Tela de medalhas
12. ✅ Avatar customizer

---

## 📊 Popular Dados de Ranking Mock

```javascript
// Arquivo: scripts/populate-ranking.js

const mockUsers = [
  { name: 'João Pedro', level: 8, xp: 45000, avatar: 'avatar1' },
  { name: 'Ana Clara', level: 7, xp: 32000, avatar: 'avatar2' },
  { name: 'Lucas Santos', level: 7, xp: 28000, avatar: 'avatar3' },
  { name: 'Beatriz Lima', level: 6, xp: 18000, avatar: 'avatar4' },
  { name: 'Pedro Henrique', level: 6, xp: 15000, avatar: 'avatar5' },
  { name: 'Juliana Costa', level: 5, xp: 9000, avatar: 'avatar6' },
  { name: 'Rafael Souza', level: 5, xp: 7500, avatar: 'avatar1' },
  { name: 'Maria Silva', level: 5, xp: 5500, avatar: 'avatar2' }, // Demo user
  { name: 'Carlos Eduardo', level: 4, xp: 4200, avatar: 'avatar3' },
  { name: 'Fernanda Dias', level: 4, xp: 3800, avatar: 'avatar4' },
  { name: 'Gabriel Alves', level: 3, xp: 2100, avatar: 'avatar5' },
  { name: 'Isabela Rocha', level: 3, xp: 1800, avatar: 'avatar6' },
  { name: 'Thiago Martins', level: 2, xp: 900, avatar: 'avatar1' },
  { name: 'Larissa Nunes', level: 2, xp: 600, avatar: 'avatar2' },
  { name: 'Mateus Silva', level: 1, xp: 150, avatar: 'avatar3' }
];

async function populateRanking() {
  await AsyncStorage.setItem('ranking', JSON.stringify(mockUsers));
  console.log('✅ Ranking populado com 15 usuários!');
}

populateRanking();
```

---

## 🎥 Gravar Vídeo de Demonstração

### No Mac
```bash
# Usando QuickTime para gravar simulador iOS
# 1. Abrir QuickTime Player
# 2. Arquivo > Nova Gravação de Tela
# 3. Selecionar simulador iOS
# 4. Gravar demo de 2-3 minutos

# Converter para MP4 otimizado
ffmpeg -i demo.mov -vcodec h264 -acodec aac demo.mp4
```

### No Windows/Linux (Android)
```bash
# Gravar tela do dispositivo Android
adb shell screenrecord /sdcard/demo.mp4

# Aguardar gravação (max 3 minutos)
# Ctrl+C para parar

# Baixar vídeo
adb pull /sdcard/demo.mp4 ./demo.mp4

# Converter/otimizar (se necessário)
ffmpeg -i demo.mp4 -vf scale=720:-1 -b:v 1M demo_optimized.mp4
```

### Roteiro de Vídeo (2 minutos)
```
00:00-00:10: Splash Screen + Logo
00:10-00:30: Onboarding rápido
00:30-01:00: Hub principal + navegação nas trilhas
01:00-01:30: Mini-jogo (Roda da Inovação)
01:30-01:50: Conquista + XP ganhando
01:50-02:00: Perfil + ranking + fade out
```

---

## 📦 Checklist Pré-Demonstração (Execute na ordem)

```bash
# 1. Limpar e reconstruir
npm install
npx expo start -c

# 2. Criar usuário demo
# Executar script de população de dados (ver acima)

# 3. Testar fluxo completo
# Manualmente no dispositivo/simulador

# 4. Tirar screenshots
# Usar scripts acima

# 5. Gerar build
./build-demo.sh

# 6. Testar build instalado
# Instalar APK e testar

# 7. Preparar materiais
# PDFs, slides, vídeo
```

---

## 🔥 Comandos de Emergência (Se algo der errado)

### App não abre
```bash
# Reset completo
npx expo start -c
# Ou
rm -rf node_modules .expo .expo-shared
npm install
npx expo start
```

### Build falhou
```bash
# Verificar logs
npx eas build:list

# Tentar build local
npx expo prebuild
npx expo run:android
```

### Dados corrompidos
```bash
# Limpar AsyncStorage no app
# Adicionar no código temporariamente:
import AsyncStorage from '@react-native-async-storage/async-storage';
AsyncStorage.clear();

# Ou via ADB (Android)
adb shell pm clear host.exp.exponent  # Para Expo Go
adb shell pm clear com.seuapp  # Para standalone
```

### Performance ruim
```bash
# Modo de produção
npx expo start --no-dev --minify

# Verificar bundle size
npx expo export

# Profile de performance
npx react-native run-android --variant=release
```

---

## 📧 Scripts de Comunicação com Cliente

### Email de Envio (Template)
```
Assunto: 🎉 MVP EMPREENDA+ - Pronto para Demonstração!

Olá [Nome do Cliente],

Temos o prazer de informar que o MVP do EMPREENDA+ está pronto para demonstração!

📱 ACESSO:
• Link para download: [link do APK ou TestFlight]
• Usuário demo: maria.demo@empreenda.app
• Senha: Demo2026

📦 MATERIAIS ANEXOS:
✅ Guia de Apresentação (PDF)
✅ Lista de Funcionalidades Implementadas
✅ Screenshots do App (10 imagens)
✅ Vídeo de Demonstração (2 min)

🎯 AGENDA:
Estamos disponíveis para apresentação detalhada em:
• [Data/Hora 1]
• [Data/Hora 2]
• [Data/Hora 3]

Por favor, confirme qual horário é melhor para você.

Qualquer dúvida, estamos à disposição!

Atenciosamente,
[Seu Nome]
```

---

## 💡 Dicas Finais

### Antes da Demo
- [ ] Carregar dispositivo 100%
- [ ] Conectar WiFi estável
- [ ] Fechar outros apps
- [ ] Ativar modo não perturbe
- [ ] Aumentar brilho da tela
- [ ] Desligar rotação automática

### Durante a Demo
- [ ] Gravar a sessão (backup)
- [ ] Ter slides de apoio
- [ ] Preparar respostas para objeções
- [ ] Demonstrar com calma
- [ ] Deixar cliente interagir

### Depois da Demo
- [ ] Enviar materiais por email
- [ ] Follow-up em 24-48h
- [ ] Coletar feedback
- [ ] Agendar próximos passos

---

**Boa sorte na demonstração! 🚀**

*Execute estes scripts conforme necessário para preparar o MVP perfeitamente.*
