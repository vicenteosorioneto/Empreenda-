import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// 🐾 COMPONENTE DO MASCOTE

export const Mascot = ({ size = 'medium', message, animated = false, style }) => {
  const sizeStyles = {
    small: { container: 80, icon: 40, text: 12 },
    medium: { container: 120, icon: 60, text: 14 },
    large: { container: 160, icon: 80, text: 16 },
  };

  const currentSize = sizeStyles[size];

  return (
    <View style={[styles.container, style]}>
      {/* Avatar do mascote */}
      <View style={[styles.mascotAvatar, { width: currentSize.container, height: currentSize.container }]}>
        <Text style={[styles.mascotEmoji, { fontSize: currentSize.icon }]}>
          🦉
        </Text>
      </View>

      {/* Balão de fala */}
      {message && (
        <View style={styles.speechBubble}>
          <View style={styles.speechTriangle} />
          <Text style={[styles.messageText, { fontSize: currentSize.text }]}>
            {message}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  mascotAvatar: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(139, 92, 246, 0.4)',
    marginBottom: 16,
  },
  mascotEmoji: {
    fontSize: 60,
  },
  speechBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    maxWidth: '90%',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  speechTriangle: {
    position: 'absolute',
    top: -8,
    left: '50%',
    marginLeft: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(255, 255, 255, 0.95)',
  },
  messageText: {
    fontSize: 14,
    color: '#1E293B',
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default Mascot;
