# 📱 Buildando APK para Android - EMPREENDA+

## Opção 1: Build Cloud via Expo Application Services (Recomendado)

Siga estes passos para gerar o APK direto:

1. **Acesse**: https://docs.expo.dev/build/setup/
2. **Execute no terminal**:
   ```bash
   npm install -g eas-cli
   eas login
   eas build --platform android
   ```

## Opção 2: Usar Expo Go (Mais Rápido - Sem Build)

**JÁ DISPONÍVEL AGORA!**

O servidor Expo Go está rodando. Você pode:
- ✅ Escaneie o QR code: `exp://192.168.0.102:8081`
- ✅ Abra no Expo Go (app móvel)
- ✅ Teste todas as funcionalidades em tempo real

## Opção 3: Build Local com Gradle (Avançado)

Se tiver Android SDK instalado:

```bash
cd android
./gradlew assembleRelease
```

O APK estará em: `android/app/build/outputs/apk/release/app-release.apk`

## 🎯 Recomendação:

Use a **Opção 2 (Expo Go)** para testes rápidos, pois:
- ✅ QR code gerado
- ✅ Sem necessidade de build
- ✅ Recarregamento em tempo real (Hot Reload)
- ✅ Testes imediatos

Quando pronto para produção, use a **Opção 1** para gerar APK final.

## 📍 Status Atual:

- Server Expo: ✅ RODANDO em `exp://192.168.0.102:8081`
- Logo: ✅ ATUALIZADO (Controle de jogos verde)
- AsyncStorage: ✅ INTEGRADO
- Todas as Telas: ✅ FUNCIONAIS

