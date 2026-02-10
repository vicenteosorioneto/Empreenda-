import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SKILLS_DATA } from '../data/skillsData';
import SkillTreeManager from '../services/SkillTreeManager';
import RPGEngine from '../services/RPGEngine';

// 🌳 SKILL TREE SCREEN

const CATEGORIES = {
  PITCH: { name: 'Pitch', emoji: '🎤', color: '#F59E0B' },
  FINANCE: { name: 'Finanças', emoji: '💰', color: '#10B981' },
  MARKETING: { name: 'Marketing', emoji: '📱', color: '#3B82F6' },
  LEADERSHIP: { name: 'Liderança', emoji: '👥', color: '#8B5CF6' },
  TECH: { name: 'Tecnologia', emoji: '💻', color: '#EC4899' },
};

const SkillTreeScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('PITCH');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const rpgProgress = await RPGEngine.loadProgress();
    setProgress(rpgProgress);
  };

  const handleSkillPress = (skill) => {
    setSelectedSkill(skill);
    setModalVisible(true);
  };

  const handleUnlockSkill = async () => {
    if (!selectedSkill) return;

    const result = await SkillTreeManager.unlockSkill(selectedSkill.id);
    
    if (result.success) {
      alert(`✅ ${selectedSkill.name} desbloqueada!`);
      await loadProgress();
      setModalVisible(false);
    } else {
      alert(`❌ ${result.error}`);
    }
  };

  const renderSkillCard = (skill) => {
    const isUnlocked = skill.unlocked;
    const canUnlock = progress && 
      progress.levels.skillPoints > 0 && 
      SkillTreeManager.checkPrerequisites(skill, progress.skillTree);
    
    return (
      <TouchableOpacity
        key={skill.id}
        style={[
          styles.skillCard,
          isUnlocked && styles.skillCardUnlocked,
        ]}
        onPress={() => handleSkillPress(skill)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={
            isUnlocked
              ? ['#10B981', '#059669']
              : canUnlock
              ? ['rgba(139, 92, 246, 0.3)', 'rgba(124, 58, 237, 0.3)']
              : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']
          }
          style={styles.skillCardGradient}
        >
          <View style={styles.skillHeader}>
            <Text style={styles.skillEmoji}>{skill.emoji}</Text>
            <View style={styles.skillInfo}>
              <Text style={[styles.skillName, !isUnlocked && styles.skillNameLocked]}>
                {skill.name}
              </Text>
              <Text style={styles.skillLevel}>Nível {skill.level}/{skill.maxLevel}</Text>
            </View>
          </View>

          {isUnlocked && (
            <View style={styles.unlockedBadge}>
              <Text style={styles.unlockedText}>✓ Desbloqueada</Text>
            </View>
          )}

          {!isUnlocked && canUnlock && (
            <View style={styles.canUnlockBadge}>
              <Text style={styles.canUnlockText}>✨ Disponível</Text>
            </View>
          )}

          <View style={styles.costContainer}>
            <Text style={styles.costText}>
              💎 {skill.cost} {skill.cost === 1 ? 'ponto' : 'pontos'}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderSkillModal = () => {
    if (!selectedSkill) return null;

    const isUnlocked = selectedSkill.unlocked;
    const canUnlock = progress && 
      progress.levels.skillPoints > 0 && 
      SkillTreeManager.checkPrerequisites(selectedSkill, progress.skillTree);
    const hasPrereqs = selectedSkill.prerequisites.length > 0;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={['#1E293B', '#334155']}
              style={styles.modalGradient}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalEmoji}>{selectedSkill.emoji}</Text>
                <Text style={styles.modalTitle}>{selectedSkill.name}</Text>
              </View>

              <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.modalDescription}>{selectedSkill.description}</Text>

                {hasPrereqs && (
                  <View style={styles.prereqsContainer}>
                    <Text style={styles.prereqsTitle}>📋 Pré-requisitos:</Text>
                    {selectedSkill.prerequisites.map((prereqId) => {
                      const prereq = SKILLS_DATA.find(s => s.id === prereqId);
                      const prereqUnlocked = progress?.skillTree[prereqId]?.unlocked;
                      return (
                        <View key={prereqId} style={styles.prereqItem}>
                          <Text style={styles.prereqIcon}>
                            {prereqUnlocked ? '✅' : '⬜'}
                          </Text>
                          <Text style={[styles.prereqText, prereqUnlocked && styles.prereqTextComplete]}>
                            {prereq?.name || prereqId}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}

                <View style={styles.effectsContainer}>
                  <Text style={styles.effectsTitle}>✨ Efeitos:</Text>
                  {Object.entries(selectedSkill.effects.attributes).map(([attr, value]) => {
                    if (value === 0) return null;
                    const icons = {
                      vision: '🔮',
                      management: '📊',
                      marketing: '📱',
                      finance: '💰',
                      leadership: '👥',
                    };
                    const names = {
                      vision: 'Visão',
                      management: 'Gestão',
                      marketing: 'Marketing',
                      finance: 'Finanças',
                      leadership: 'Liderança',
                    };
                    return (
                      <View key={attr} style={styles.effectItem}>
                        <Text style={styles.effectIcon}>{icons[attr]}</Text>
                        <Text style={styles.effectText}>
                          +{value} {names[attr]}
                        </Text>
                      </View>
                    );
                  })}
                  {selectedSkill.effects.passive && (
                    <View style={styles.passiveEffect}>
                      <Text style={styles.passiveIcon}>⚡</Text>
                      <Text style={styles.passiveText}>{selectedSkill.effects.passive}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.modalActions}>
                  {!isUnlocked && canUnlock && (
                    <TouchableOpacity
                      style={styles.unlockButton}
                      onPress={handleUnlockSkill}
                    >
                      <LinearGradient
                        colors={['#8B5CF6', '#7C3AED']}
                        style={styles.unlockButtonGradient}
                      >
                        <Text style={styles.unlockButtonText}>
                          🔓 Desbloquear ({selectedSkill.cost} pontos)
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}

                  {!isUnlocked && !canUnlock && (
                    <View style={styles.cannotUnlock}>
                      <Text style={styles.cannotUnlockText}>
                        {progress?.levels.skillPoints === 0
                          ? '❌ Sem pontos disponíveis'
                          : '❌ Complete os pré-requisitos'}
                      </Text>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </LinearGradient>
          </View>
        </View>
      </Modal>
    );
  };

  if (!progress) {
    return (
      <LinearGradient colors={['#0F172A', '#1E293B']} style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#0F172A', '#1E293B']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Árvore de Habilidades</Text>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>💎 {progress.levels.skillPoints}</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        style={styles.categoriesScroll}
        showsHorizontalScrollIndicator={false}
      >
        {Object.entries(CATEGORIES).map(([key, category]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.categoryTab,
              selectedCategory === key && styles.categoryTabActive,
            ]}
            onPress={() => setSelectedCategory(key)}
          >
            <Text style={styles.categoryEmoji}>{category.emoji}</Text>
            <Text style={[
              styles.categoryName,
              selectedCategory === key && styles.categoryNameActive,
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.skillsScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.skillsContainer}>
          {SkillTreeManager.getSkillsByCategory(selectedCategory).map(renderSkillCard)}
        </View>
      </ScrollView>

      {renderSkillModal()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  pointsBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  categoriesScroll: {
    maxHeight: 60,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 12,
  },
  categoryTabActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
  },
  categoryEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },
  categoryNameActive: {
    color: '#FFFFFF',
  },
  skillsScroll: {
    flex: 1,
  },
  skillsContainer: {
    padding: 20,
  },
  skillCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  skillCardUnlocked: {
    borderWidth: 2,
    borderColor: '#10B981',
  },
  skillCardGradient: {
    padding: 16,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillEmoji: {
    fontSize: 40,
    marginRight: 12,
  },
  skillInfo: {
    flex: 1,
  },
  skillName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  skillNameLocked: {
    color: '#94A3B8',
  },
  skillLevel: {
    fontSize: 12,
    color: '#64748B',
  },
  unlockedBadge: {
    backgroundColor: '#10B981',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  unlockedText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  canUnlockBadge: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  canUnlockText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  costContainer: {
    marginTop: 4,
  },
  costText: {
    fontSize: 14,
    color: '#E2E8F0',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '80%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  modalGradient: {
    flex: 1,
    padding: 24,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalScroll: {
    flex: 1,
  },
  modalDescription: {
    fontSize: 16,
    color: '#E2E8F0',
    lineHeight: 24,
    marginBottom: 20,
  },
  prereqsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  prereqsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  prereqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  prereqIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  prereqText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  prereqTextComplete: {
    color: '#10B981',
    textDecorationLine: 'line-through',
  },
  effectsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  effectsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  effectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  effectIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  effectText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  passiveEffect: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 12,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 8,
  },
  passiveIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  passiveText: {
    fontSize: 13,
    color: '#E2E8F0',
    flex: 1,
  },
  modalActions: {
    gap: 12,
  },
  unlockButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  unlockButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  unlockButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cannotUnlock: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cannotUnlockText: {
    fontSize: 14,
    color: '#FCA5A5',
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default SkillTreeScreen;
