import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function UserTypeSelectionScreen({ navigation }) {
  const userTypes = [
    {
      type: 'student',
      label: 'Aluno',
      icon: 'school',
      gradient: ['#667eea', '#764ba2'],
      description: 'Acesse os desafios e aprenda'
    },
    {
      type: 'teacher',
      label: 'Professor',
      icon: 'person',
      gradient: ['#f093fb', '#f5576c'],
      description: 'Gerencie quizzes e turmas'
    },
    {
      type: 'family',
      label: 'Família',
      icon: 'people',
      gradient: ['#4facfe', '#00f2fe'],
      description: 'Acompanhe o progresso'
    },
    {
      type: 'school',
      label: 'Escola',
      icon: 'business',
      gradient: ['#43e97b', '#38f9d7'],
      description: 'Visão geral da instituição'
    }
  ];

  const handleSelection = (userType) => {
    navigation.navigate('CharacterSelection', { userType });
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo ao Empreenda+</Text>
        <Text style={styles.subtitle}>Quem é você?</Text>
      </View>

      <View style={styles.cardsContainer}>
        {userTypes.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => handleSelection(item.type)}
            style={styles.cardWrapper}
          >
            <LinearGradient
              colors={item.gradient}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.iconContainer}>
                <Ionicons name={item.icon} size={48} color="#fff" />
              </View>
              <Text style={styles.cardTitle}>{item.label}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.footer}>Selecione uma opção para continuar</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#a8b2d1',
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: (width - 60) / 2,
    marginBottom: 20,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 13,
    color: '#f0f0f0',
    textAlign: 'center',
  },
  footer: {
    fontSize: 14,
    color: '#8892b0',
    textAlign: 'center',
    marginBottom: 30,
  },
});
