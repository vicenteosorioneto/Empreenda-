import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { THEME, LEVEL_TIERS } from '../utils/theme';

/**
 * Sistema de avatar evolutivo
 * Conforme o usuário aprende, o avatar ganha itens visuais futuristas
 */
export const AVATAR_ITEMS = {
  // Skin (corpo)
  skins: {
    default: { name: 'Padrão', emoji: '🧑', unlockedAt: 0 },
    neon_blue: { name: 'Neon Azul', emoji: '👨‍💻', unlockedAt: 5000 },
    neon_purple: { name: 'Neon Roxo', emoji: '👩‍💼', unlockedAt: 10000 },
    hologram: { name: 'Holograma', emoji: '🤖', unlockedAt: 25000 },
  },

  // Capacetes/headgear
  helmets: {
    none: { name: 'Nenhum', emoji: '', unlockedAt: 0 },
    thinking_cap: { name: 'Gorro Pensador', emoji: '🎓', unlockedAt: 2000 },
    hacker_hood: { name: 'Capuz Hacker', emoji: '⚫', unlockedAt: 8000 },
    crown: { name: 'Coroa de Ouro', emoji: '👑', unlockedAt: 40000 },
    halo: { name: 'Halo Celestial', emoji: '✨', unlockedAt: 60000 },
  },

  // Acessórios no ombro/peito
  accessories: {
    none: { name: 'Nenhum', emoji: '', unlockedAt: 0 },
    badge: { name: 'Badge Inicial', emoji: '🎖️', unlockedAt: 1000 },
    rocket: { name: 'Mini Foguete', emoji: '🚀', unlockedAt: 6000 },
    shield: { name: 'Escudo Tech', emoji: '🛡️', unlockedAt: 15000 },
    diamond: { name: 'Diamante Flutuante', emoji: '💎', unlockedAt: 50000 },
  },

  // Armas (para gamificação visual)
  weapons: {
    none: { name: 'Nenhum', emoji: '', unlockedAt: 0 },
    pencil: { name: 'Lápis Mágico', emoji: '✏️', unlockedAt: 3000 },
    sword: { name: 'Espada de Negócios', emoji: '⚔️', unlockedAt: 12000 },
    staff: { name: 'Bastão da Inovação', emoji: '🔱', unlockedAt: 35000 },
  },

  // Efeitos (aura)
  auras: {
    none: { name: 'Nenhum', emoji: '', unlockedAt: 0 },
    spark: { name: 'Centelhas', emoji: '⚡', unlockedAt: 4000 },
    fire: { name: 'Fogo Verde', emoji: '🔥', unlockedAt: 7000 },
    glow: { name: 'Brilho Celestial', emoji: '✨', unlockedAt: 20000 },
    energy: { name: 'Energia Pura', emoji: '⭐', unlockedAt: 55000 },
  },
};

/**
 * Renderizador de Avatar com todos os itens
 */
export const AvatarRenderer = ({ 
  level = 1, 
  equippedItems = {},
  size = 'large' // 'small' | 'medium' | 'large'
}) => {
  const levelTier = LEVEL_TIERS.find(t => t.level === level) || LEVEL_TIERS[0];
  
  // Equipamento padrão
  const skin = equippedItems.skin || 'default';
  const helmet = equippedItems.helmet || 'none';
  const accessory = equippedItems.accessory || 'none';
  const weapon = equippedItems.weapon || 'none';
  const aura = equippedItems.aura || 'none';

  const sizes = {
    small: { container: 80, main: 48 },
    medium: { container: 120, main: 64 },
    large: { container: 160, main: 80 },
  };

  const s = sizes[size];

  const renderAura = () => {
    const auraItem = AVATAR_ITEMS.auras[aura];
    if (!auraItem || aura === 'none') return null;
    
    return (
      <View style={[
        styles.auraRing,
        { 
          width: s.container + 40, 
          height: s.container + 40,
          borderColor: levelTier.color,
        }
      ]}>
        <Text style={{ fontSize: s.main + 20 }}>{auraItem.emoji}</Text>
      </View>
    );
  };

  return (
    <View style={[
      styles.avatarContainer,
      { width: s.container, height: s.container }
    ]}>
      {renderAura()}
      
      <View style={styles.avatarContent}>
        {/* Helmet */}
        {helmet !== 'none' && (
          <Text style={{ 
            fontSize: s.main + 20, 
            position: 'absolute', 
            top: -10 
          }}>
            {AVATAR_ITEMS.helmets[helmet]?.emoji}
          </Text>
        )}

        {/* Main Skin */}
        <Text style={{ fontSize: s.main, color: levelTier.color }}>
          {AVATAR_ITEMS.skins[skin]?.emoji}
        </Text>

        {/* Accessory */}
        {accessory !== 'none' && (
          <Text style={{ 
            fontSize: s.main - 10, 
            position: 'absolute', 
            left: -5 
          }}>
            {AVATAR_ITEMS.accessories[accessory]?.emoji}
          </Text>
        )}

        {/* Weapon */}
        {weapon !== 'none' && (
          <Text style={{ 
            fontSize: s.main - 10, 
            position: 'absolute', 
            right: -5 
          }}>
            {AVATAR_ITEMS.weapons[weapon]?.emoji}
          </Text>
        )}
      </View>

      {/* Level badge */}
      <View style={[
        styles.levelBadge,
        { backgroundColor: levelTier.color }
      ]}>
        <Text style={styles.levelText}>{level}</Text>
      </View>
    </View>
  );
};

/**
 * Tela de customização de avatar
 */
export const AvatarCustomizer = ({
  currentEquipment = {},
  unlockedItems = [],
  totalXP = 0,
  onEquip = () => {},
}) => {
  const [selectedCategory, setSelectedCategory] = useState('skins');

  const itemCategories = [
    { key: 'skins', label: '👨‍💼 Aparência', emoji: '👨‍💼' },
    { key: 'helmets', label: '🎓 Capacetes', emoji: '🎓' },
    { key: 'accessories', label: '🎖️ Acessórios', emoji: '🎖️' },
    { key: 'weapons', label: '⚔️ Armas', emoji: '⚔️' },
    { key: 'auras', label: '✨ Auras', emoji: '✨' },
  ];

  const getCategoryItems = () => {
    return AVATAR_ITEMS[selectedCategory] || {};
  };

  const isUnlocked = (itemKey) => {
    return (Array.isArray(unlockedItems) && unlockedItems.includes(itemKey)) || 
           AVATAR_ITEMS[selectedCategory][itemKey]?.unlockedAt === 0;
  };

  const items = getCategoryItems();
  const equipment = currentEquipment || {};

  return (
    <View style={styles.customizer}>
      <Text style={styles.customizerTitle}>⚙️ Personalize seu Avatar</Text>

      {/* Category Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryTabs}
      >
        {Array.isArray(itemCategories) && itemCategories.map(category => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryTab,
              selectedCategory === category.key && styles.categoryTabActive,
            ]}
            onPress={() => setSelectedCategory(category.key)}
          >
            <Text style={styles.categoryTabText}>{category.emoji}</Text>
            <Text style={styles.categoryTabLabel}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Items Grid */}
      <ScrollView style={styles.itemsGrid}>
        {items && Object.entries(items).map(([key, item]) => {
          const unlocked = isUnlocked(key);
          const isEquipped = equipment[selectedCategory] === key;

          const handlePress = async () => {
            if (!unlocked) return;
            try {
              await Promise.resolve(onEquip(selectedCategory, key));
            } catch (err) {
              console.error('Erro ao equipar item do avatar:', err);
              Alert.alert('Erro', 'Não foi possível aplicar o item do avatar. Tente novamente.');
            }
          };

          return (
            <TouchableOpacity
              key={key}
              disabled={!unlocked}
              style={[
                styles.itemCard,
                !unlocked && styles.itemCardLocked,
                isEquipped && styles.itemCardEquipped,
              ]}
              onPress={handlePress}
            >
              <Text style={styles.itemEmoji}>{item.emoji}</Text>
              <Text style={styles.itemName}>{item.name}</Text>

              {!unlocked && (
                <Text style={styles.itemLockInfo}>
                  🔒 {item.unlockedAt} XP
                </Text>
              )}

              {isEquipped && (
                <Text style={styles.itemEquipped}>✓ Equipado</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Preview */}
      <View style={styles.previewSection}>
        <Text style={styles.previewLabel}>Pré-visualização:</Text>
        <AvatarRenderer 
          equippedItems={currentEquipment}
          size="large"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  auraRing: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  avatarContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  customizer: {
    flex: 1,
    backgroundColor: THEME.colors.lightBg,
    padding: THEME.spacing.lg,
  },
  customizerTitle: {
    fontSize: THEME.fontSize.xl,
    fontWeight: THEME.fontWeight.bold,
    marginBottom: THEME.spacing.lg,
    color: THEME.colors.textPrimary,
  },
  categoryTabs: {
    marginBottom: THEME.spacing.lg,
  },
  categoryTab: {
    paddingVertical: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.lg,
    marginRight: THEME.spacing.md,
    backgroundColor: THEME.colors.lightCard,
    borderRadius: THEME.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryTabActive: {
    backgroundColor: THEME.colors.neonBlue,
    borderColor: THEME.colors.neonBlue,
  },
  categoryTabText: {
    fontSize: 20,
    marginBottom: THEME.spacing.xs,
  },
  categoryTabLabel: {
    fontSize: THEME.fontSize.xs,
    color: THEME.colors.textSecondary,
  },
  itemsGrid: {
    flex: 1,
    marginBottom: THEME.spacing.lg,
  },
  itemCard: {
    backgroundColor: THEME.colors.lightCard,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    marginBottom: THEME.spacing.md,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  itemCardLocked: {
    opacity: 0.5,
    backgroundColor: '#F3F4F6',
  },
  itemCardEquipped: {
    borderColor: THEME.colors.neonGreen,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  itemEmoji: {
    fontSize: 40,
    marginBottom: THEME.spacing.sm,
  },
  itemName: {
    fontSize: THEME.fontSize.base,
    fontWeight: THEME.fontWeight.semibold,
    color: THEME.colors.textPrimary,
    marginBottom: THEME.spacing.sm,
  },
  itemLockInfo: {
    fontSize: THEME.fontSize.xs,
    color: THEME.colors.textSecondary,
  },
  itemEquipped: {
    fontSize: THEME.fontSize.xs,
    color: THEME.colors.neonGreen,
    marginTop: THEME.spacing.sm,
    fontWeight: THEME.fontWeight.bold,
  },
  previewSection: {
    alignItems: 'center',
    paddingVertical: THEME.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  previewLabel: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.textSecondary,
    marginBottom: THEME.spacing.md,
  },
});
