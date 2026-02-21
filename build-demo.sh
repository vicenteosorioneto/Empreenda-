#!/bin/bash

# Script de Build para Demonstração do MVP
# EMPREENDA+ App

echo "🚀 Iniciando build de demonstração..."
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se Expo está instalado
if ! command -v npx &> /dev/null; then
    echo -e "${RED}❌ npx não encontrado. Instale Node.js primeiro.${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Verificando dependências...${NC}"
npm list expo &> /dev/null
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Instalando dependências...${NC}"
    npm install
fi

echo ""
echo -e "${BLUE}🎯 Escolha o tipo de build:${NC}"
echo "1) APK Android (Debug) - Rápido, para teste"
echo "2) APK Android (Release) - Otimizado, para demo"
echo "3) AAB Android (Play Store) - Para produção"
echo "4) iOS (TestFlight) - Requer Mac"
echo "5) Web Build"
echo ""
read -p "Escolha uma opção (1-5): " choice

case $choice in
    1)
        echo -e "${GREEN}🤖 Gerando APK Android (Debug)...${NC}"
        echo ""
        echo "Opções:"
        echo "a) Build local (mais rápido, sem EAS)"
        echo "b) Build com EAS (melhor qualidade)"
        read -p "Escolha (a/b): " build_type
        
        if [ "$build_type" == "a" ]; then
            echo -e "${YELLOW}Executando build local...${NC}"
            npx expo export:android
        else
            echo -e "${YELLOW}Configurando EAS...${NC}"
            npx eas build --platform android --profile preview
        fi
        ;;
    2)
        echo -e "${GREEN}🤖 Gerando APK Android (Release)...${NC}"
        echo ""
        echo "Este build será otimizado e pode demorar 10-15 minutos."
        read -p "Continuar? (S/n): " confirm
        
        if [ "$confirm" != "n" ] && [ "$confirm" != "N" ]; then
            npx eas build --platform android --profile production
        fi
        ;;
    3)
        echo -e "${GREEN}🤖 Gerando AAB Android (Play Store)...${NC}"
        echo ""
        echo "⚠️  Certifique-se de ter configurado as credenciais."
        read -p "Continuar? (S/n): " confirm
        
        if [ "$confirm" != "n" ] && [ "$confirm" != "N" ]; then
            npx eas build --platform android --profile production
        fi
        ;;
    4)
        echo -e "${GREEN}🍎 Gerando build iOS...${NC}"
        echo ""
        echo "⚠️  Requer Mac e Apple Developer Account."
        read -p "Continuar? (S/n): " confirm
        
        if [ "$confirm" != "n" ] && [ "$confirm" != "N" ]; then
            npx eas build --platform ios
        fi
        ;;
    5)
        echo -e "${GREEN}🌐 Gerando build Web...${NC}"
        echo ""
        npx expo export:web
        echo ""
        echo -e "${GREEN}✅ Build web gerado em: web-build/${NC}"
        echo "Para testar: npx serve web-build"
        ;;
    *)
        echo -e "${RED}❌ Opção inválida${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Processo de build iniciado!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}📱 Enquanto o build é gerado:${NC}"
echo "  • Prepare o roteiro de apresentação"
echo "  • Tire screenshots do app"
echo "  • Teste o app no Expo Go"
echo "  • Revise os materiais de apoio"
echo ""
echo -e "${YELLOW}⏱️  Tempo estimado:${NC}"
echo "  • Local build: 2-5 minutos"
echo "  • EAS build: 10-20 minutos"
echo ""
echo -e "${BLUE}📊 Acompanhe o progresso em:${NC}"
echo "  • https://expo.dev (builds EAS)"
echo "  • Terminal (builds locais)"
echo ""
