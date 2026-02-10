import AsyncStorage from '@react-native-async-storage/async-storage';
import { Skill, SkillTree, SkillCategory, PlayerAttributes } from '../types/rpg';
import RPGEngine from './RPGEngine';

// 🌳 SKILL TREE MANAGER - Gerenciamento de Habilidades

const SKILLS_KEY = '@empreenda_skills';

class SkillTreeManager {
  // ==================== DESBLOQUEAR SKILL ====================

  async unlockSkill(skillId: string): Promise<{ success: boolean; message: string }> {
    const progress = await RPGEngine.loadProgress();
    if (!progress) {
      return { success: false, message: 'Progresso não encontrado' };
    }

    const skill = progress.character.skills[skillId];
    if (!skill) {
      return { success: false, message: 'Habilidade não encontrada' };
    }

    // Verificar se já está no nível máximo
    if (skill.level >= skill.maxLevel) {
      return { success: false, message: 'Habilidade no nível máximo' };
    }

    // Verificar pontos disponíveis
    if (progress.character.level.skillPoints < skill.cost) {
      return { success: false, message: 'Pontos insuficientes' };
    }

    // Verificar pré-requisitos
    const prerequisitesMet = this.checkPrerequisites(skill, progress.character.skills);
    if (!prerequisitesMet) {
      return { success: false, message: 'Pré-requisitos não atendidos' };
    }

    // Desbloquear/Upar skill
    skill.level++;
    skill.unlocked = true;
    progress.character.level.skillPoints -= skill.cost;

    // Aplicar efeitos
    if (skill.effects.attributes) {
      this.applyAttributeBonus(progress.character.attributes, skill.effects.attributes);
    }

    await RPGEngine.saveProgress(progress);

    // Registrar evento
    await RPGEngine.registerEvent({
      type: 'SKILL_UNLOCKED',
      data: { skillId, skill },
      timestamp: new Date().toISOString(),
    });

    return { success: true, message: `${skill.name} desbloqueada!` };
  }

  // ==================== VERIFICAÇÕES ====================

  private checkPrerequisites(skill: Skill, skillTree: SkillTree): boolean {
    if (!skill.prerequisites || skill.prerequisites.length === 0) {
      return true;
    }

    return skill.prerequisites.every((prereqId) => {
      const prereqSkill = skillTree[prereqId];
      return prereqSkill && prereqSkill.unlocked && prereqSkill.level > 0;
    });
  }

  private applyAttributeBonus(
    attributes: PlayerAttributes,
    bonus: Partial<PlayerAttributes>
  ): void {
    if (bonus.vision) attributes.vision = Math.min(100, attributes.vision + bonus.vision);
    if (bonus.management) attributes.management = Math.min(100, attributes.management + bonus.management);
    if (bonus.marketing) attributes.marketing = Math.min(100, attributes.marketing + bonus.marketing);
    if (bonus.finance) attributes.finance = Math.min(100, attributes.finance + bonus.finance);
    if (bonus.leadership) attributes.leadership = Math.min(100, attributes.leadership + bonus.leadership);
  }

  // ==================== HELPERS ====================

  async getAvailableSkills(): Promise<Skill[]> {
    const progress = await RPGEngine.loadProgress();
    if (!progress) return [];

    return Object.values(progress.character.skills).filter((skill) => {
      if (skill.unlocked) return false; // Já desbloqueada
      return this.checkPrerequisites(skill, progress.character.skills);
    });
  }

  async getUnlockedSkills(): Promise<Skill[]> {
    const progress = await RPGEngine.loadProgress();
    if (!progress) return [];

    return Object.values(progress.character.skills).filter((skill) => skill.unlocked);
  }

  async getSkillsByCategory(category: SkillCategory): Promise<Skill[]> {
    const progress = await RPGEngine.loadProgress();
    if (!progress) return [];

    return Object.values(progress.character.skills).filter(
      (skill) => skill.category === category
    );
  }

  // ==================== RESET ====================

  async resetSkills(): Promise<void> {
    const progress = await RPGEngine.loadProgress();
    if (!progress) return;

    // Resetar todas skills
    Object.values(progress.character.skills).forEach((skill) => {
      skill.level = 0;
      skill.unlocked = false;
    });

    // Devolver pontos
    const totalLevels = progress.character.level.currentLevel;
    progress.character.level.skillPoints = 3 + (totalLevels - 1) * 2;

    await RPGEngine.saveProgress(progress);
  }
}

export default new SkillTreeManager();
