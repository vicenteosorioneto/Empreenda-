#!/bin/bash

echo "🔨 Script para gerar APK do Empreenda+"
echo "======================================="
echo ""

echo "Escolha uma opção:"
echo "1) Testar no Expo Go (recomendado para testes rápidos)"
echo "2) Build na nuvem com EAS (requer conta Expo)"
echo "3) Ejetar e buildar localmente (requer Android SDK)"
echo ""
read -p "Digite sua escolha (1-3): " choice

case $choice in
  1)
    echo "Iniciando servidor Expo..."
    npm start
    ;;
  2)
    echo "Iniciando build na nuvem..."
    echo "Você precisará fazer login na sua conta Expo"
    npx eas-cli login
    npx eas-cli build --platform android --profile preview
    ;;
  3)
    echo "⚠️  ATENÇÃO: Isso irá ejetar seu projeto do Expo managed workflow"
    read -p "Tem certeza? (s/n): " confirm
    if [ "$confirm" = "s" ]; then
      npx expo prebuild --platform android
      cd android
      ./gradlew assembleRelease
      echo "✅ APK gerado em: android/app/build/outputs/apk/release/app-release.apk"
    else
      echo "Operação cancelada"
    fi
    ;;
  *)
    echo "Opção inválida"
    ;;
esac
