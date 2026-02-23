import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getUserStats } from '../utils/storage';

const { width } = Dimensions.get('window');

export default function FamilyDashboardScreen({ navigation }) {
  const [studentData, setStudentData] = useState({
    name: 'Aluno',
    level: 1,
    xp: 0,
    daysActive: 0,
    streak: 0,
    badges: 0,
    trilhasCompleted: 0,
    lastActivity: 'Hoje'
  });

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    const stats = await getUserStats();
    if (stats) {
      const activityHistory = await getData('activityHistory') || [];
      const daysActive = new Set(activityHistory.map(d => d.split('T')[0])).size;
      
      setStudentData({
        name: stats.name || 'Aluno',
        level: stats.level || 1,
        xp: stats.xp || 0,
        daysActive: daysActive,
        streak: stats.streak || 0,
        badges: stats.badges || 0,
        trilhasCompleted: stats.trilhasCompleted || 0,
        lastActivity: activityHistory.length > 0 ? formatDate(activityHistory[activityHistory.length - 1]) : 'Nunca'
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    return `${diffDays} dias atrás`;
  };

  const StatCard = ({ icon, label, value, color, gradient }) => (
    <LinearGradient colors={gradient} style={styles.statCard}>
      <Ionicons name={icon} size={26} color="#fff" />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </LinearGradient>
  );

  const ProgressBar = ({ label, current, total, color }) => {
    const percentage = (current / total) * 100;
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>{label}</Text>
          <Text style={styles.progressText}>{current}/{total}</Text>
        </View>
        <View style={styles.progressBarBg}>
          <LinearGradient
            colors={color}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressBarFill, { width: `${percentage}%` }]}
          />
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Painel da Família</Text>
        <TouchableOpacity onPress={() => loadStudentData()}>
          <Ionicons name="refresh" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.studentHeader}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.avatarCircle}
          >
            <Ionicons name="person" size={32} color="#fff" />
          </LinearGradient>
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>{studentData.name}</Text>
            <Text style={styles.studentLevel}>Nível {studentData.level}</Text>
            <Text style={styles.lastActivity}>Última atividade: {studentData.lastActivity}</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            icon="calendar"
            label="Dias Ativos"
            value={studentData.daysActive}
            gradient={['#4facfe', '#00f2fe']}
          />
          <StatCard
            icon="flame"
            label="Sequência"
            value={`${studentData.streak} dias`}
            gradient={['#fa709a', '#fee140']}
          />
          <StatCard
            icon="trophy"
            label="Medalhas"
            value={studentData.badges}
            gradient={['#30cfd0', '#330867']}
          />
          <StatCard
            icon="checkmark-circle"
            label="Trilhas"
            value={`${studentData.trilhasCompleted}/5`}
            gradient={['#a8edea', '#fed6e3']}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Progresso Geral</Text>
          
          <ProgressBar
            label="Experiência (XP)"
            current={studentData.xp}
            total={studentData.level * 1000}
            color={['#667eea', '#764ba2']}
          />
          
          <ProgressBar
            label="Trilhas Completas"
            current={studentData.trilhasCompleted}
            total={5}
            color={['#f093fb', '#f5576c']}
          />
          
          <ProgressBar
            label="Medalhas Conquistadas"
            current={studentData.badges}
            total={11}
            color={['#4facfe', '#00f2fe']}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Dicas de Acompanhamento</Text>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={19} color="#fbbf24" />
            <Text style={styles.tipText}>
              {studentData.streak >= 7 
                ? '🎉 Parabéns! Seu aluno está mantendo uma ótima sequência!'
                : studentData.daysActive < 3
                ? '💪 Incentive o uso diário para criar o hábito de aprendizado!'
                : '👍 Bom progresso! Continue incentivando a prática regular.'}
            </Text>
          </View>
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
              <Text style={styles.actionButtonText}>Ver Como Aluno</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const getData = async (key) => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const result = await AsyncStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  } catch (error) {
    return null;
  }
};

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
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 12,
    marginTop: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentInfo: {
    marginLeft: 12,
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  studentLevel: {
    fontSize: 13,
    color: '#00f2fe',
    marginTop: 2,
  },
  lastActivity: {
    fontSize: 10,
    color: '#a8b2d1',
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 16,
  },
  statCard: {
    width: (width - 36) / 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 10,
    color: '#f0f0f0',
    marginTop: 4,
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
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: '#a8b2d1',
  },
  progressText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#fbbf24',
  },
  tipText: {
    fontSize: 11,
    color: '#fef3c7',
    marginLeft: 10,
    flex: 1,
    lineHeight: 16,
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
