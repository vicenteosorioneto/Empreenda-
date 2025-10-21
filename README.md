# Empreenda+ - Projeto Expo

Este é um projeto básico React Native com Expo para testes no Expo Go.

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI
- App Expo Go instalado no celular

## 🚀 Como executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Instalar Expo CLI globalmente (se não tiver):**
   ```bash
   npm install -g @expo/cli
   ```

3. **Iniciar o projeto:**
   ```bash
   npm start
   # ou
   expo start
   ```

4. **Testar no celular:**
   - Abra o app Expo Go no seu celular
   - Escaneie o QR code que aparece no terminal ou navegador
   - O app será executado automaticamente

## 📱 Funcionalidades

- ✅ Contador interativo
- ✅ Interface responsiva
- ✅ Navegação segura (SafeAreaView)
- ✅ Estilização moderna
- ✅ Compatível com Expo Go

## 🛠️ Estrutura do Projeto

```
├── App.js              # Componente principal
├── app.json            # Configurações do Expo
├── package.json        # Dependências e scripts
├── babel.config.js     # Configuração do Babel
└── assets/             # Recursos (imagens, ícones)
```

## 📦 Dependências Principais

- **expo**: Framework para desenvolvimento React Native
- **react-native**: Framework mobile
- **expo-status-bar**: Controle da barra de status
- **react-native-safe-area-context**: Área segura para diferentes dispositivos

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Abre no emulador Android
- `npm run ios` - Abre no simulador iOS
- `npm run web` - Executa na web

## 💡 Dicas

1. Mantenha o Expo Go atualizado
2. Certifique-se de estar na mesma rede Wi-Fi
3. Use o tunnel se tiver problemas de conexão: `expo start --tunnel`

## 🐛 Troubleshooting

- **QR Code não funciona**: Tente usar o modo tunnel com `expo start --tunnel`
- **App não carrega**: Verifique se está na mesma rede Wi-Fi
- **Erro de dependências**: Execute `npm install` novamente