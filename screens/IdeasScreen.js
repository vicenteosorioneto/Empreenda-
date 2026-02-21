import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import NavigationHeader from '../components/NavigationHeader';
import { getData, saveData } from '../utils/storage';

export default function IdeasScreen({ navigation }) {
  const [ideas, setIdeas] = useState([]);
  const [newIdea, setNewIdea] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    const savedIdeas = await getData('ideas');
    if (savedIdeas) {
      setIdeas(savedIdeas);
    }
  };

  const saveIdeas = async (updatedIdeas) => {
    await saveData('ideas', updatedIdeas);
    setIdeas(updatedIdeas);
  };

  const addIdea = () => {
    if (!newIdea.trim()) {
      Alert.alert('Atenção', 'Digite uma ideia primeiro!');
      return;
    }

    const idea = {
      id: Date.now(),
      text: newIdea.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedIdeas = [idea, ...ideas];
    saveIdeas(updatedIdeas);
    setNewIdea('');
  };

  const deleteIdea = (id) => {
    Alert.alert(
      'Confirmar',
      'Deseja realmente excluir esta ideia?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const updatedIdeas = ideas.filter(i => i.id !== id);
            saveIdeas(updatedIdeas);
          }
        }
      ]
    );
  };

  const updateIdea = () => {
    if (!newIdea.trim()) {
      Alert.alert('Atenção', 'Digite uma ideia primeiro!');
      return;
    }

    const updatedIdeas = ideas.map(idea =>
      idea.id === editing
        ? { ...idea, text: newIdea.trim(), updatedAt: new Date().toISOString() }
        : idea
    );

    saveIdeas(updatedIdeas);
    setNewIdea('');
    setEditing(null);
  };

  const startEdit = (idea) => {
    setNewIdea(idea.text);
    setEditing(idea.id);
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <NavigationHeader title="Minhas Ideias" />

      <View style={styles.content}>
        {/* Input de nova ideia */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escreva sua ideia aqui..."
            placeholderTextColor="#8892b0"
            value={newIdea}
            onChangeText={setNewIdea}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={editing ? updateIdea : addIdea}
          >
            <LinearGradient
              colors={['#f093fb', '#f5576c']}
              style={styles.addButtonGradient}
            >
              <Ionicons name={editing ? "checkmark" : "add"} size={24} color="#fff" />
              <Text style={styles.addButtonText}>{editing ? 'Atualizar' : 'Adicionar'}</Text>
            </LinearGradient>
          </TouchableOpacity>
          {editing && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setEditing(null);
                setNewIdea('');
              }}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Lista de ideias salvas */}
        <View style={styles.ideasHeader}>
          <Text style={styles.ideasTitle}>💡 Ideias Salvas</Text>
          <Text style={styles.ideasCount}>{ideas.length}</Text>
        </View>

        <ScrollView style={styles.ideasList} showsVerticalScrollIndicator={false}>
          {ideas.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="bulb-outline" size={60} color="#667eea" />
              <Text style={styles.emptyText}>Nenhuma ideia salva ainda</Text>
              <Text style={styles.emptySubtext}>Comece anotando suas ideias inovadoras!</Text>
            </View>
          ) : (
            ideas.map((idea) => (
              <View key={idea.id} style={styles.ideaCard}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                  style={styles.ideaCardGradient}
                >
                  <Text style={styles.ideaText}>{idea.text}</Text>
                  <Text style={styles.ideaDate}>
                    {new Date(idea.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>
                  <View style={styles.ideaActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => startEdit(idea)}
                    >
                      <Ionicons name="create-outline" size={20} color="#667eea" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => deleteIdea(idea.id)}
                    >
                      <Ionicons name="trash-outline" size={20} color="#f5576c" />
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    fontSize: 13,
    minHeight: 80,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  addButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  addButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 11,
    gap: 6,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelButton: {
    marginTop: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 11,
    color: '#a8b2d1',
  },
  ideasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ideasTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  ideasCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#667eea',
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  ideasList: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#a8b2d1',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 11,
    color: '#8892b0',
    marginTop: 6,
  },
  ideaCard: {
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  ideaCardGradient: {
    padding: 13,
  },
  ideaText: {
    fontSize: 13,
    color: '#fff',
    lineHeight: 19,
    marginBottom: 8,
  },
  ideaDate: {
    fontSize: 10,
    color: '#8892b0',
    marginBottom: 8,
  },
  ideaActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    padding: 6,
  },
});
