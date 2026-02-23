import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { saveData } from '../utils/storage';

export default function ClassAndSchoolSelectionScreen({ navigation, route }) {
  const { userType, character } = route.params;
  const [selectedClass, setSelectedClass] = useState(null);
  const [schoolId, setSchoolId] = useState('');
  const [classCode, setClassCode] = useState('');

  const classes = [
    { id: '9ano', label: '9º Ano', subtitle: 'Fundamental II', gradient: ['#667eea', '#764ba2'] },
    { id: '1ano', label: '1º Ano', subtitle: 'Ensino Médio', gradient: ['#f093fb', '#f5576c'] },
    { id: '2ano', label: '2º Ano', subtitle: 'Ensino Médio', gradient: ['#4facfe', '#00f2fe'] },
    { id: '3ano', label: '3º Ano', subtitle: 'Ensino Médio', gradient: ['#43e97b', '#38f9d7'] },
  ];

  const handleContinue = async () => {
    if (!selectedClass) {
      Alert.alert('Atenção', 'Por favor, selecione sua turma');
      return;
    }
    if (!schoolId.trim()) {
      Alert.alert('Atenção', 'Por favor, insira o ID da escola');
      return;
    }
    if (!classCode.trim()) {
      Alert.alert('Atenção', 'Por favor, insira o código da turma');
      return;
    }

    // Salvar informações do usuário
    const userData = {
      userType,
      character,
      class: selectedClass,
      schoolId: schoolId.trim(),
      classCode: classCode.trim(),
      createdAt: new Date().toISOString(),
    };

    await saveData('userData', userData);
    
    // Navegar para o Login ou MainHub
    navigation.navigate('Login');
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Informações Escolares</Text>
        <Text style={styles.subtitle}>Complete seu perfil para acessar o conteúdo</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Seleção de Turma */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecione sua turma</Text>
          <View style={styles.classGrid}>
            {classes.map((classItem) => (
              <TouchableOpacity
                key={classItem.id}
                activeOpacity={0.8}
                onPress={() => setSelectedClass(classItem.id)}
                style={styles.classWrapper}
              >
                <LinearGradient
                  colors={classItem.gradient}
                  style={[
                    styles.classCard,
                    selectedClass === classItem.id && styles.selectedCard
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  {selectedClass === classItem.id && (
                    <View style={styles.selectedBadge}>
                      <Ionicons name="checkmark-circle" size={19} color="#fff" />
                    </View>
                  )}
                  <Text style={styles.classLabel}>{classItem.label}</Text>
                  <Text style={styles.classSubtitle}>{classItem.subtitle}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ID da Escola */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ID da Escola</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="business" size={16} color="#a8b2d1" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Digite o ID da escola"
              placeholderTextColor="#8892b0"
              value={schoolId}
              onChangeText={setSchoolId}
              autoCapitalize="characters"
            />
          </View>
          <Text style={styles.helperText}>
            Entre em contato com a coordenação para obter o ID
          </Text>
        </View>

        {/* Código da Turma */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Código da Turma</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="key" size={16} color="#a8b2d1" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Digite o código da turma"
              placeholderTextColor="#8892b0"
              value={classCode}
              onChangeText={setClassCode}
              autoCapitalize="characters"
            />
          </View>
          <Text style={styles.helperText}>
            Código fornecido pelo professor para acesso ao ranking da turma
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.continueButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.continueButtonText}>Continuar</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#a8b2d1',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  classGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  classWrapper: {
    width: '48%',
    marginBottom: 12,
  },
  classCard: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#fff',
  },
  selectedBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  classLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 3,
  },
  classSubtitle: {
    fontSize: 10,
    color: '#f0f0f0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 13,
    paddingVertical: 12,
  },
  helperText: {
    fontSize: 10,
    color: '#8892b0',
    marginTop: 6,
    fontStyle: 'italic',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  continueButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  continueButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    gap: 8,
  },
  continueButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});
