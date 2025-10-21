import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Modal, TouchableOpacity } from 'react-native';

const XPBar = ({ currentXP, maxXP, level, animated = true }) => {
  const progressAnim = new Animated.Value(0);

  useEffect(() => {
    if (animated) {
      Animated.timing(progressAnim, {
        toValue: (currentXP / maxXP) * 100,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [currentXP, maxXP]);

  const progressWidth = animated 
    ? progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      })
    : `${(currentXP / maxXP) * 100}%`;

  return (
    <View style={styles.xpContainer}>
      <View style={styles.xpHeader}>
        <Text style={styles.levelText}>Nível {level}</Text>
        <Text style={styles.xpText}>{currentXP}/{maxXP} XP</Text>
      </View>
      <View style={styles.xpBar}>
        <Animated.View 
          style={[styles.xpProgress, { width: progressWidth }]} 
        />
      </View>
    </View>
  );
};

const MedalhaComponent = ({ tipo, titulo, descricao, conquistada = false }) => {
  const medalhas = {
    bronze: { emoji: '🥉', cor: '#CD7F32' },
    prata: { emoji: '🥈', cor: '#C0C0C0' },
    ouro: { emoji: '🥇', cor: '#FFD700' },
    diamante: { emoji: '💎', cor: '#B9F2FF' },
    especial: { emoji: '🏆', cor: '#FF6B6B' }
  };

  const medalha = medalhas[tipo] || medalhas.bronze;

  return (
    <View style={[
      styles.medalhaContainer,
      { 
        backgroundColor: conquistada ? medalha.cor + '20' : '#F3F4F6',
        borderColor: conquistada ? medalha.cor : '#D1D5DB'
      }
    ]}>
      <Text style={[
        styles.medalhaEmoji,
        { opacity: conquistada ? 1 : 0.3 }
      ]}>
        {medalha.emoji}
      </Text>
      <Text style={styles.medalhaTitle}>{titulo}</Text>
      <Text style={styles.medalhaDescription}>{descricao}</Text>
      {conquistada && (
        <View style={styles.conquistadaBadge}>
          <Text style={styles.conquistadaText}>Conquistada!</Text>
        </View>
      )}
    </View>
  );
};

const FeedbackPopup = ({ visible, tipo, titulo, xp, onClose }) => {
  const feedbackTypes = {
    sucesso: { emoji: '🎉', cor: '#10B981' },
    nivel: { emoji: '⭐', cor: '#F59E0B' },
    medalha: { emoji: '🏆', cor: '#EF4444' },
    missao: { emoji: '✅', cor: '#3B82F6' }
  };

  const feedback = feedbackTypes[tipo] || feedbackTypes.sucesso;

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.feedbackContainer, { borderColor: feedback.cor }]}>
          <Text style={styles.feedbackEmoji}>{feedback.emoji}</Text>
          <Text style={styles.feedbackTitle}>{titulo}</Text>
          {xp > 0 && (
            <Text style={styles.feedbackXP}>+{xp} XP</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const AvatarSelector = ({ avatars, selectedId, onSelect }) => {
  return (
    <View style={styles.avatarGrid}>
      {avatars.map((avatar) => (
        <TouchableOpacity
          key={avatar.id}
          style={[
            styles.avatarOption,
            selectedId === avatar.id && styles.avatarSelected
          ]}
          onPress={() => onSelect(avatar.id)}
        >
          <Text style={styles.avatarEmoji}>{avatar.emoji}</Text>
          <Text style={styles.avatarName}>{avatar.nome}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const ProgressTracker = ({ trilhas }) => {
  const totalTrilhas = trilhas.length;
  const trilhasCompletas = trilhas.filter(t => t.concluida).length;
  const progressoGeral = (trilhasCompletas / totalTrilhas) * 100;

  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressTitle}>Progresso Geral</Text>
      <View style={styles.progressCircle}>
        <Text style={styles.progressPercentage}>
          {Math.round(progressoGeral)}%
        </Text>
      </View>
      <Text style={styles.progressText}>
        {trilhasCompletas} de {totalTrilhas} trilhas concluídas
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // XP Bar Styles
  xpContainer: {
    marginVertical: 10,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  xpText: {
    fontSize: 14,
    color: '#6B7280',
  },
  xpBar: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 5,
    overflow: 'hidden',
  },
  xpProgress: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 5,
  },

  // Medalha Styles
  medalhaContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    borderWidth: 2,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  medalhaEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  medalhaTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  medalhaDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  conquistadaBadge: {
    backgroundColor: '#10B981',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 5,
  },
  conquistadaText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },

  // Feedback Popup Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  feedbackEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  feedbackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  feedbackXP: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
  },

  // Avatar Selector Styles
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  avatarOption: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  avatarSelected: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  avatarEmoji: {
    fontSize: 30,
    marginBottom: 5,
  },
  avatarName: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Progress Tracker Styles
  progressContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressPercentage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export { 
  XPBar, 
  MedalhaComponent, 
  FeedbackPopup, 
  AvatarSelector, 
  ProgressTracker 
};