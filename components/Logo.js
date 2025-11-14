import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Logo = ({ size = 'large', showText = true }) => {
  const logoSize = size === 'large' ? 120 : size === 'medium' ? 80 : 50;
  const textSize = size === 'large' ? 28 : size === 'medium' ? 20 : 16;

  return (
    <View style={styles.container}>
      {/* Círculo de fundo com estrelas */}
      <View style={[styles.logoContainer, { width: logoSize, height: logoSize }]}>
        <View style={[styles.circleBackground, { 
          width: logoSize, 
          height: logoSize,
          borderRadius: logoSize / 2
        }]}>
          
          {/* Estrelas decorativas */}
          <View style={[styles.star, styles.star1, { 
            width: logoSize * 0.08, 
            height: logoSize * 0.08,
            top: logoSize * 0.15,
            left: logoSize * 0.25
          }]}>
            <Text style={[styles.starText, { fontSize: logoSize * 0.06 }]}>✦</Text>
          </View>
          <View style={[styles.star, styles.star2, { 
            width: logoSize * 0.06, 
            height: logoSize * 0.06,
            top: logoSize * 0.25,
            right: logoSize * 0.2
          }]}>
            <Text style={[styles.starText, { fontSize: logoSize * 0.04 }]}>✦</Text>
          </View>
          <View style={[styles.star, styles.star3, { 
            width: logoSize * 0.05, 
            height: logoSize * 0.05,
            bottom: logoSize * 0.3,
            left: logoSize * 0.15
          }]}>
            <Text style={[styles.starText, { fontSize: logoSize * 0.035 }]}>✦</Text>
          </View>
          <View style={[styles.star, styles.star4, { 
            width: logoSize * 0.07, 
            height: logoSize * 0.07,
            bottom: logoSize * 0.2,
            right: logoSize * 0.25
          }]}>
            <Text style={[styles.starText, { fontSize: logoSize * 0.05 }]}>✦</Text>
          </View>
          <View style={[styles.star, styles.star5, { 
            width: logoSize * 0.04, 
            height: logoSize * 0.04,
            top: logoSize * 0.4,
            left: logoSize * 0.8
          }]}>
            <Text style={[styles.starText, { fontSize: logoSize * 0.03 }]}>✦</Text>
          </View>
          
          {/* Controle de jogos */}
          <View style={[styles.gamepadBody, { 
            width: logoSize * 0.5, 
            height: logoSize * 0.32,
            borderRadius: logoSize * 0.08
          }]}>
            {/* Grips laterais */}
            <View style={[styles.leftGrip, {
              width: logoSize * 0.12,
              height: logoSize * 0.2,
              left: -logoSize * 0.04,
              bottom: -logoSize * 0.06,
              borderRadius: logoSize * 0.06
            }]} />
            <View style={[styles.rightGrip, {
              width: logoSize * 0.12,
              height: logoSize * 0.2,
              right: -logoSize * 0.04,
              bottom: -logoSize * 0.06,
              borderRadius: logoSize * 0.06
            }]} />
            
            {/* D-Pad esquerdo */}
            <View style={[styles.dpadContainer, {
              left: logoSize * 0.08,
              top: logoSize * 0.08,
              width: logoSize * 0.12,
              height: logoSize * 0.12
            }]}>
              <View style={[styles.dpadVertical, {
                width: logoSize * 0.04,
                height: logoSize * 0.12,
                borderRadius: logoSize * 0.01
              }]} />
              <View style={[styles.dpadHorizontal, {
                width: logoSize * 0.12,
                height: logoSize * 0.04,
                borderRadius: logoSize * 0.01
              }]} />
            </View>
            
            {/* Botão central amarelo */}
            <View style={[styles.centerButton, {
              width: logoSize * 0.08,
              height: logoSize * 0.08,
              borderRadius: logoSize * 0.04
            }]} />
            
            {/* Botões direitos */}
            <View style={[styles.buttonsContainer, {
              right: logoSize * 0.08,
              top: logoSize * 0.08,
              width: logoSize * 0.12,
              height: logoSize * 0.12
            }]}>
              <View style={[styles.actionButton, styles.buttonGreen, {
                width: logoSize * 0.035,
                height: logoSize * 0.035,
                borderRadius: logoSize * 0.02,
                top: 0,
                right: logoSize * 0.04
              }]} />
              <View style={[styles.actionButton, styles.buttonBlue, {
                width: logoSize * 0.035,
                height: logoSize * 0.035,
                borderRadius: logoSize * 0.02,
                bottom: 0,
                right: logoSize * 0.04
              }]} />
              <View style={[styles.actionButton, styles.buttonYellow, {
                width: logoSize * 0.035,
                height: logoSize * 0.035,
                borderRadius: logoSize * 0.02,
                top: logoSize * 0.04,
                left: 0
              }]} />
              <View style={[styles.actionButton, styles.buttonRed, {
                width: logoSize * 0.035,
                height: logoSize * 0.035,
                borderRadius: logoSize * 0.02,
                top: logoSize * 0.04,
                right: 0
              }]} />
            </View>
          </View>
        </View>
      </View>
      
      {/* Texto da logo */}
      {showText && (
        <View style={styles.textContainer}>
          <Text style={[styles.titleText, { fontSize: textSize }]}>
            EMPREENDA
            <Text style={styles.plusText}>+</Text>
          </Text>
          <Text style={[styles.subtitleText, { fontSize: textSize * 0.5 }]}>
            Gamify Your Future
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  circleBackground: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 3,
    borderColor: '#10B981', // Borda verde como na imagem
    position: 'relative',
  },
  star: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  star1: {},
  star2: {},
  star3: {},
  star4: {},
  star5: {},
  starText: {
    color: '#FCD34D', // Amarelo dourado para as estrelas
    fontWeight: 'bold',
  },
  gamepadBody: {
    backgroundColor: '#10B981', // Verde principal exato da imagem
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    position: 'relative',
  },
  leftGrip: {
    position: 'absolute',
    backgroundColor: '#0D9488', // Verde mais escuro para grips
  },
  rightGrip: {
    position: 'absolute',
    backgroundColor: '#0D9488', // Verde mais escuro para grips
  },
  dpadContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dpadVertical: {
    position: 'absolute',
    backgroundColor: '#FFFFFF', // Branco como na imagem
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dpadHorizontal: {
    position: 'absolute',
    backgroundColor: '#FFFFFF', // Branco como na imagem
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  centerButton: {
    position: 'absolute',
    backgroundColor: '#FCD34D', // Botão amarelo central
    borderWidth: 2,
    borderColor: '#F59E0B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonsContainer: {
    position: 'absolute',
  },
  actionButton: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonGreen: {
    backgroundColor: '#22C55E', // Verde
  },
  buttonBlue: {
    backgroundColor: '#3B82F6', // Azul  
  },
  buttonYellow: {
    backgroundColor: '#EAB308', // Amarelo
  },
  buttonRed: {
    backgroundColor: '#EF4444', // Vermelho
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  titleText: {
    fontWeight: '900', // Mais bold como na imagem
    color: '#1F2937', // Cinza escuro
    letterSpacing: 2,
    textAlign: 'center',
    fontFamily: 'System', // Fonte sistema para consistência
  },
  plusText: {
    color: '#10B981', // Verde igual ao controle
    fontWeight: '900',
  },
  subtitleText: {
    color: '#9CA3AF', // Cinza mais claro para o slogan  
    fontWeight: '400',
    letterSpacing: 0.5,
    marginTop: 3,
    textAlign: 'center',
    fontStyle: 'italic', // Itálico como no design
  },
});

export default Logo;