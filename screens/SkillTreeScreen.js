import React, { useEffect, useState } from 'react';
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

const CATEGORIES = {
  PITCH: { name: 'Pitch', emoji: '🎤', color: '#F59E0B' },
  FINANCE: { name: 'Finanças', emoji: '💰', color: '#10B981' },
  MARKETING: { name: 'Marketing', emoji: '📱', color: '#3B82F6' },
  LEADERSHIP: { name: 'Liderança', emoji: '👥', color: '#8B5CF6' },
  TECH: { name: 'Tecnologia', emoji: '💻', color: '#EC4899' },
};

const ATTRIBUTE_ICONS = {
  vision: '🔮',
  management: '🧭',
  marketing: '📣',
  finance: '💰',
  leadership: '👥',
};

const ATTRIBUTE_NAMES = {
  vision: 'Visão',
  management: 'Gestão',
  marketing: 'Marketing',
  finance: 'Finanças',
  leadership: 'Liderança',
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
      setModalVisible(false);
      await loadProgress();
    } else {
      alert(result.message || 'Nao foi possivel desbloquear esta habilidade.');
    }
  };

  const renderSkillCard = (skill) => {
    const storedSkill = progress?.character?.skills?.[skill.id] || skill;
    const isUnlocked = storedSkill.unlocked;
    const canUnlock =
      progress &&
      progress.character.level.skillPoints >= skill.cost &&
      SkillTreeManager.checkPrerequisites(skill, progress.character.skills);

    return (
      <TouchableOpacity
        key={skill.id}
        activeOpacity={0.85}
        onPress={() => handleSkillPress(storedSkill)}
        style={[styles.skillCard, isUnlocked && styles.skillCardUnlocked]}
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
              <Text style={styles.skillLevel}>
                Nivel {storedSkill.level}/{skill.maxLevel}
              </Text>
            </View>
          </View>

          {isUnlocked && (
            <View style={styles.unlockedBadge}>
              <Text style={styles.unlockedText}>✓ Desbloqueada</Text>
            </View>
          )}

          {!isUnlocked && canUnlock && (
            <View style={styles.canUnlockBadge}>
              <Text style={styles.canUnlockText}>✨ Disponivel</Text>
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
    const canUnlock =
      progress &&
      progress.character.level.skillPoints >= selectedSkill.cost &&
      SkillTreeManager.checkPrerequisites(selectedSkill, progress.character.skills);
    const hasPrereqs = selectedSkill.prerequisites.length > 0;
    const effects = selectedSkill.effects?.attributes || {};
    const passiveEffect = selectedSkill.effects?.passive;

    return (
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient colors={['#1E293B', '#334155']} style={styles.modalGradient}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalEmoji}>{selectedSkill.emoji}</Text>
                <Text style={styles.modalTitle}>{selectedSkill.name}</Text>
              </View>

              <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.modalDescription}>{selectedSkill.description}</Text>

                {hasPrereqs && (
                  <View style={styles.prereqsContainer}>
                    <Text style={styles.prereqsTitle}>📋 Pre-requisitos:</Text>
                    {selectedSkill.prerequisites.map((prereqId) => {
                      const prereq = SKILLS_DATA[prereqId];
                      const prereqUnlocked = progress?.character?.skills?.[prereqId]?.unlocked;
                      return (
                        <View key={prereqId} style={styles.prereqItem}>
                          <Text style={styles.prereqIcon}>{prereqUnlocked ? '✅' : '⬜'}</Text>
                          <Text
                            style={[
                              styles.prereqText,
                              prereqUnlocked && styles.prereqTextComplete,
                            ]}
                          >
                            {prereq?.name || prereqId}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}

                <View style={styles.effectsContainer}>
                  <Text style={styles.effectsTitle}>✨ Efeitos:</Text>
                  {Object.entries(effects).map(([attr, value]) => {
                    if (!value) return null;
                    return (
                      <View key={attr} style={styles.effectItem}>
                        <Text style={styles.effectIcon}>{ATTRIBUTE_ICONS[attr] || '⭐'}</Text>
                        <Text style={styles.effectText}>
                          +{value} {ATTRIBUTE_NAMES[attr] || attr}
                        </Text>
                      </View>
                    );
                  })}

                  {passiveEffect && (
                    <View style={styles.passiveEffect}>
                      <Text style={styles.passiveIcon}>⚡</Text>
                      <Text style={styles.passiveText}>{passiveEffect}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.modalActions}>
                  {!isUnlocked && canUnlock && (
                    <TouchableOpacity style={styles.unlockButton} onPress={handleUnlockSkill}>
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
                        {progress?.character?.level?.skillPoints === 0
                          ? '❌ Sem pontos disponiveis'
                          : '❌ Complete os pre-requisitos'}
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
        <Text style={styles.title}>Arvore de Habilidades</Text>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>💎 {progress.character.level.skillPoints}</Text>
        </View>
      </View>

      <ScrollView horizontal style={styles.categoriesScroll} showsHorizontalScrollIndicator={false}>
        {Object.entries(CATEGORIES).map(([key, category]) => (
          <TouchableOpacity
            key={key}
            style={[styles.categoryTab, selectedCategory === key && styles.categoryTabActive]}
            onPress={() => setSelectedCategory(key)}
          >
            <Text style={styles.categoryEmoji}>{category.emoji}</Text>
            <Text
              style={[
                styles.categoryName,
                selectedCategory === key && styles.categoryNameActive,
              ]}
            >
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
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 48,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 19,
    color: '#FFFFFF',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pointsBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 13,
  },
  pointsText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  categoriesScroll: {
    maxHeight: 48,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 13,
    marginRight: 10,
  },
  categoryTabActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryName: {
    fontSize: 11,
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
    padding: 16,
  },
  skillCard: {
    marginBottom: 13,
    borderRadius: 13,
    overflow: 'hidden',
  },
  skillCardUnlocked: {
    borderWidth: 2,
    borderColor: '#10B981',
  },
  skillCardGradient: {
    padding: 13,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  skillEmoji: {
    fontSize: 32,
    marginRight: 10,
  },
  skillInfo: {
    flex: 1,
  },
  skillName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  skillNameLocked: {
    color: '#94A3B8',
  },
  skillLevel: {
    fontSize: 10,
    color: '#64748B',
  },
  unlockedBadge: {
    backgroundColor: '#10B981',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  unlockedText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  canUnlockBadge: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  canUnlockText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  costContainer: {
    marginTop: 3,
  },
  costText: {
    fontSize: 11,
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
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    overflow: 'hidden',
  },
  modalGradient: {
    flex: 1,
    padding: 19,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  modalEmoji: {
    fontSize: 51,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalScroll: {
    flex: 1,
  },
  modalDescription: {
    fontSize: 13,
    color: '#E2E8F0',
    lineHeight: 19,
    marginBottom: 16,
  },
  prereqsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 13,
    borderRadius: 10,
    marginBottom: 13,
  },
  prereqsTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  prereqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  prereqIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  prereqText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  prereqTextComplete: {
    color: '#10B981',
    textDecorationLine: 'line-through',
  },
  effectsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 13,
    borderRadius: 10,
    marginBottom: 16,
  },
  effectsTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  effectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  effectIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  effectText: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '600',
  },
  passiveEffect: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    padding: 10,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 6,
  },
  passiveIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  passiveText: {
    fontSize: 10,
    color: '#E2E8F0',
    flex: 1,
  },
  modalActions: {
    gap: 10,
  },
  unlockButton: {
    borderRadius: 13,
    overflow: 'hidden',
  },
  unlockButtonGradient: {
    paddingVertical: 13,
    alignItems: 'center',
  },
  unlockButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cannotUnlock: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  cannotUnlockText: {
    fontSize: 11,
    color: '#FCA5A5',
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 13,
    borderRadius: 13,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default SkillTreeScreen;
