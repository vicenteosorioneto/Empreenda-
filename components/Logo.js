import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Logo = ({ size = 'large', showText = true }) => {
  const logoSize = size === 'large' ? 120 : size === 'medium' ? 80 : 50;
  const textSize = size === 'large' ? 28 : size === 'medium' ? 20 : 16;

  return (
    <View style={styles.container}>
      {/* Logo com bússola gamificada */}
      <View style={[styles.logoContainer, { width: logoSize, height: logoSize }]}>
        {/* Círculo externo da bússola */}
        <View style={[styles.compassOuter, { width: logoSize, height: logoSize }]}>
          {/* Círculo interno */}
          <View style={[styles.compassInner, { 
            width: logoSize * 0.7, 
            height: logoSize * 0.7 
          }]}>
            {/* Agulha da bússola */}
            <View style={styles.compassNeedle}>
              <View style={styles.needleNorth} />
              <View style={styles.needleSouth} />
            </View>
            
            {/* Marcações cardeais */}
            <Text style={[styles.cardinalN, { fontSize: logoSize * 0.15 }]}>N</Text>
            <Text style={[styles.cardinalE, { fontSize: logoSize * 0.1 }]}>E</Text>
            <Text style={[styles.cardinalS, { fontSize: logoSize * 0.1 }]}>S</Text>
            <Text style={[styles.cardinalW, { fontSize: logoSize * 0.1 }]}>W</Text>
          </View>
          
          {/* Efeito de brilho gamificado */}
          <View style={[styles.sparkle1, { 
            top: logoSize * 0.1, 
            right: logoSize * 0.2,
            width: logoSize * 0.08,
            height: logoSize * 0.08
          }]} />
          <View style={[styles.sparkle2, { 
            bottom: logoSize * 0.15, 
            left: logoSize * 0.1,
            width: logoSize * 0.06,
            height: logoSize * 0.06
          }]} />
        </View>
      </View>
      
      {/* Texto da logo */}
      {showText && (
        <View style={styles.textContainer}>
          <Text style={[styles.titleText, { fontSize: textSize }]}>
            EMPREENDA
            <Text style={styles.plusText}>+</Text>
          </Text>
          <Text style={[styles.subtitleText, { fontSize: textSize * 0.4 }]}>
            TRILHA JOVEM EMPREENDEDOR
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
  compassOuter: {
    borderRadius: 1000,
    backgroundColor: '#10B981', // Verde esmeralda
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 15,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  compassInner: {
    borderRadius: 1000,
    backgroundColor: '#F0F9FF', // Azul claro muito suave
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3B82F6', // Azul claro
    position: 'relative',
  },
  compassNeedle: {
    position: 'absolute',
    width: '60%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  needleNorth: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#EF4444', // Vermelho para norte
  },
  needleSouth: {
    position: 'absolute',
    bottom: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#6B7280', // Cinza para sul
  },
  cardinalN: {
    position: 'absolute',
    top: 5,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  cardinalE: {
    position: 'absolute',
    right: 8,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  cardinalS: {
    position: 'absolute',
    bottom: 5,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  cardinalW: {
    position: 'absolute',
    left: 8,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  sparkle1: {
    position: 'absolute',
    backgroundColor: '#FDE047', // Amarelo
    borderRadius: 1000,
    opacity: 0.9,
  },
  sparkle2: {
    position: 'absolute',
    backgroundColor: '#FDE047', // Amarelo
    borderRadius: 1000,
    opacity: 0.7,
  },
  textContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    color: '#1F2937',
    letterSpacing: 2,
    textAlign: 'center',
  },
  plusText: {
    color: '#10B981', // Verde esmeralda
  },
  subtitleText: {
    color: '#6B7280',
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default Logo;