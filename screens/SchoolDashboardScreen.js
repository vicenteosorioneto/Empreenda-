import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function SchoolDashboardScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('overview');

  const teachers = [
    { id: 1, name: 'Prof. Carlos Silva', students: 25, tasks: 8, status: 'ativo' },
    { id: 2, name: 'Profa. Maria Santos', students: 30, tasks: 12, status: 'ativo' },
    { id: 3, name: 'Prof. João Oliveira', students: 22, tasks: 5, status: 'inativo' },
  ];

  const classes = [
    { id: 1, name: '9º A', students: 28, teacher: 'Carlos Silva', avgProgress: 65 },
    { id: 2, name: '9º B', students: 25, teacher: 'Maria Santos', avgProgress: 78 },
    { id: 3, name: '8º A', students: 30, teacher: 'João Oliveira', avgProgress: 45 },
  ];

  const activities = [
    { id: 1, teacher: 'Maria Santos', task: 'Quiz de Inovação', class: '9º B', date: '22/02' },
    { id: 2, teacher: 'Carlos Silva', task: 'Plano de Negócios', class: '9º A', date: '23/02' },
    { id: 3, teacher: 'Maria Santos', task: 'Desafio Empreendedor', class: '9º B', date: '25/02' },
  ];

  const TopCard = ({ icon, label, value, color, gradient }) => (
    <LinearGradient colors={gradient} style={styles.topCard}>
      <Ionicons name={icon} size={26} color="#fff" />
      <Text style={styles.topCardValue}>{value}</Text>
      <Text style={styles.topCardLabel}>{label}</Text>
    </LinearGradient>
  );

  const TeacherCard = ({ teacher }) => (
    <View style={styles.listCard}>
      <LinearGradient
        colors={teacher.status === 'ativo' ? ['#f093fb', '#f5576c'] : ['#6B7280', '#4B5563']}
        style={styles.listAvatar}
      >
        <Ionicons name="person" size={19} color="#fff" />
      </LinearGradient>
      <View style={styles.listInfo}>
        <Text style={styles.listName}>{teacher.name}</Text>
        <Text style={styles.listDetails}>
          {teacher.students} alunos • {teacher.tasks} tarefas
        </Text>
      </View>
      <View style={[styles.statusDot, { 
        backgroundColor: teacher.status === 'ativo' ? '#10b981' : '#ef4444' 
      }]} />
    </View>
  );

  const ClassCard = ({ classData }) => (
    <View style={styles.listCard}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.listAvatar}
      >
        <Text style={styles.className}>{classData.name}</Text>
      </LinearGradient>
      <View style={styles.listInfo}>
        <Text style={styles.listName}>Turma {classData.name}</Text>
        <Text style={styles.listDetails}>
          {classData.students} alunos • Prof. {classData.teacher}
        </Text>
        <View style={styles.progressBarSmall}>
          <View style={[styles.progressFillSmall, { width: `${classData.avgProgress}%` }]} />
        </View>
      </View>
      <Text style={styles.progressPercent}>{classData.avgProgress}%</Text>
    </View>
  );

  const ActivityCard = ({ activity }) => (
    <View style={styles.activityCard}>
      <View style={styles.activityLeft}>
        <Ionicons name="clipboard-outline" size={19} color="#667eea" />
        <View style={styles.activityInfo}>
          <Text style={styles.activityTitle}>{activity.task}</Text>
          <Text style={styles.activityDetails}>
            {activity.teacher} • {activity.class}
          </Text>
        </View>
      </View>
      <Text style={styles.activityDate}>{activity.date}</Text>
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
        <Text style={styles.headerTitle}>Painel da Escola</Text>
        <Ionicons name="business" size={20} color="#fff" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topStats}>
          <TopCard
            icon="people"
            label="Total Alunos"
            value="83"
            gradient={['#667eea', '#764ba2']}
          />
          <TopCard
            icon="person"
            label="Professores"
            value={teachers.length}
            gradient={['#f093fb', '#f5576c']}
          />
          <TopCard
            icon="school"
            label="Turmas"
            value={classes.length}
            gradient={['#4facfe', '#00f2fe']}
          />
          <TopCard
            icon="clipboard"
            label="Atividades"
            value={activities.length}
            gradient={['#43e97b', '#38f9d7']}
          />
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'overview' && styles.tabActive]}
            onPress={() => setSelectedTab('overview')}
          >
            <Text style={[styles.tabText, selectedTab === 'overview' && styles.tabTextActive]}>
              Visão Geral
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'teachers' && styles.tabActive]}
            onPress={() => setSelectedTab('teachers')}
          >
            <Text style={[styles.tabText, selectedTab === 'teachers' && styles.tabTextActive]}>
              Professores
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'classes' && styles.tabActive]}
            onPress={() => setSelectedTab('classes')}
          >
            <Text style={[styles.tabText, selectedTab === 'classes' && styles.tabTextActive]}>
              Turmas
            </Text>
          </TouchableOpacity>
        </View>

        {selectedTab === 'overview' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📊 Resumo Geral</Text>
            <View style={styles.summaryCard}>
              <LinearGradient
                colors={['rgba(102, 126, 234, 0.15)', 'rgba(118, 75, 162, 0.15)']}
                style={styles.summaryGradient}
              >
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Taxa de Uso Ativo</Text>
                  <Text style={styles.summaryValue}>76%</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Progresso Médio</Text>
                  <Text style={styles.summaryValue}>63%</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Tarefas Ativas</Text>
                  <Text style={styles.summaryValue}>25</Text>
                </View>
              </LinearGradient>
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>📋 Atividades Recentes</Text>
            {activities.map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </View>
        )}

        {selectedTab === 'teachers' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>👨‍🏫 Professores</Text>
            {teachers.map(teacher => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </View>
        )}

        {selectedTab === 'classes' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎓 Turmas</Text>
            {classes.map(classData => (
              <ClassCard key={classData.id} classData={classData} />
            ))}
          </View>
        )}

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
  topStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 12,
  },
  topCard: {
    width: (width - 36) / 2,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  topCardValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  topCardLabel: {
    fontSize: 10,
    color: '#f0f0f0',
    marginTop: 4,
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 10,
    padding: 3,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#667eea',
  },
  tabText: {
    fontSize: 11,
    color: '#8892b0',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  summaryCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  summaryGradient: {
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#a8b2d1',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  listAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  className: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
  },
  listInfo: {
    flex: 1,
    marginLeft: 10,
  },
  listName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  listDetails: {
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
  progressPercent: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#00f2fe',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  activityInfo: {
    marginLeft: 10,
    flex: 1,
  },
  activityTitle: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  activityDetails: {
    fontSize: 10,
    color: '#8892b0',
    marginTop: 2,
  },
  activityDate: {
    fontSize: 10,
    color: '#667eea',
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
