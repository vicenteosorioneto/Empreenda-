import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function TeacherDashboardScreen({ navigation }) {
  const [students, setStudents] = useState([
    { id: 1, name: 'Ana Silva', level: 3, xp: 2500, progress: 45, status: 'ativo' },
    { id: 2, name: 'Bruno Costa', level: 5, xp: 4200, progress: 80, status: 'ativo' },
    { id: 3, name: 'Carla Souza', level: 2, xp: 1200, progress: 25, status: 'inativo' },
    { id: 4, name: 'Daniel Alves', level: 4, xp: 3800, progress: 60, status: 'ativo' },
    { id: 5, name: 'Elena Martins', level: 6, xp: 5500, progress: 95, status: 'ativo' },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Quiz de Empreendedorismo', dueDate: '25/02', completed: false },
    { id: 2, title: 'Plano de Negócios', dueDate: '28/02', completed: false },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle,
        dueDate: new Date().toLocaleDateString('pt-BR').substring(0, 5),
        completed: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setShowAddTask(false);
      Alert.alert('✅ Tarefa Adicionada', `"${newTaskTitle}" foi adicionada com sucesso!`);
    }
  };

  const StudentCard = ({ student }) => (
    <TouchableOpacity 
      style={styles.studentCard}
      onPress={() => Alert.alert(
        student.name,
        `Nível: ${student.level}\nXP: ${student.xp}\nProgresso: ${student.progress}%\nStatus: ${student.status}`
      )}
    >
      <LinearGradient
        colors={student.status === 'ativo' ? ['#667eea', '#764ba2'] : ['#6B7280', '#4B5563']}
        style={styles.studentAvatar}
      >
        <Text style={styles.studentInitial}>{student.name.charAt(0)}</Text>
      </LinearGradient>
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{student.name}</Text>
        <Text style={styles.studentLevel}>Nível {student.level} • {student.xp} XP</Text>
        <View style={styles.progressBarSmall}>
          <View style={[styles.progressFillSmall, { width: `${student.progress}%` }]} />
        </View>
      </View>
      <View style={[styles.statusDot, { backgroundColor: student.status === 'ativo' ? '#10b981' : '#ef4444' }]} />
    </TouchableOpacity>
  );

  const TaskCard = ({ task }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskLeft}>
        <TouchableOpacity
          style={[styles.checkbox, task.completed && styles.checkboxChecked]}
          onPress={() => {
            const updated = tasks.map(t => 
              t.id === task.id ? { ...t, completed: !t.completed } : t
            );
            setTasks(updated);
          }}
        >
          {task.completed && <Ionicons name="checkmark" size={13} color="#fff" />}
        </TouchableOpacity>
        <View style={styles.taskInfo}>
          <Text style={[styles.taskTitle, task.completed && styles.taskCompleted]}>
            {task.title}
          </Text>
          <Text style={styles.taskDate}>Prazo: {task.dueDate}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => {
        Alert.alert('Excluir Tarefa', 'Deseja excluir esta tarefa?', [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Excluir', style: 'destructive', onPress: () => {
            setTasks(tasks.filter(t => t.id !== task.id));
          }}
        ]);
      }}>
        <Ionicons name="trash-outline" size={16} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Painel do Professor</Text>
        <Ionicons name="school" size={20} color="#fff" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.miniStat}>
            <Ionicons name="people" size={22} color="#fff" />
            <Text style={styles.miniStatValue}>{students.length}</Text>
            <Text style={styles.miniStatLabel}>Alunos</Text>
          </LinearGradient>
          <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.miniStat}>
            <Ionicons name="checkmark-done" size={22} color="#fff" />
            <Text style={styles.miniStatValue}>{students.filter(s => s.status === 'ativo').length}</Text>
            <Text style={styles.miniStatLabel}>Ativos</Text>
          </LinearGradient>
          <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.miniStat}>
            <Ionicons name="clipboard" size={22} color="#fff" />
            <Text style={styles.miniStatValue}>{tasks.length}</Text>
            <Text style={styles.miniStatLabel}>Tarefas</Text>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>👨‍🎓 Meus Alunos</Text>
          </View>
          {students.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📋 Tarefas da Turma</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowAddTask(!showAddTask)}
            >
              <Ionicons name={showAddTask ? "close" : "add"} size={19} color="#fff" />
            </TouchableOpacity>
          </View>

          {showAddTask && (
            <View style={styles.addTaskForm}>
              <TextInput
                style={styles.input}
                placeholder="Título da tarefa..."
                placeholderTextColor="#8892b0"
                value={newTaskTitle}
                onChangeText={setNewTaskTitle}
              />
              <TouchableOpacity onPress={addTask}>
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.addTaskButton}
                >
                  <Text style={styles.addTaskButtonText}>Adicionar</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('MainHub')}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.actionButtonGradient}
            >
              <Ionicons name="game-controller" size={19} color="#fff" />
              <Text style={styles.actionButtonText}>Visualizar Como Aluno</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 12,
  },
  miniStat: {
    width: (width - 36) / 3,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  miniStatValue: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 6,
  },
  miniStatLabel: {
    fontSize: 10,
    color: '#f0f0f0',
    marginTop: 3,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    width: 29,
    height: 29,
    borderRadius: 14,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  studentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentInitial: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  studentInfo: {
    flex: 1,
    marginLeft: 10,
  },
  studentName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  studentLevel: {
    fontSize: 10,
    color: '#a8b2d1',
    marginTop: 2,
  },
  progressBarSmall: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginTop: 6,
  },
  progressFillSmall: {
    height: '100%',
    backgroundColor: '#00f2fe',
    borderRadius: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 19,
    height: 19,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#667eea',
  },
  taskInfo: {
    marginLeft: 10,
    flex: 1,
  },
  taskTitle: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#8892b0',
  },
  taskDate: {
    fontSize: 10,
    color: '#8892b0',
    marginTop: 2,
  },
  addTaskForm: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 6,
    padding: 10,
    color: '#fff',
    fontSize: 12,
    marginBottom: 8,
  },
  addTaskButton: {
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  addTaskButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 24,
  },
  actionButton: {
    marginBottom: 10,
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    borderRadius: 10,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
});
