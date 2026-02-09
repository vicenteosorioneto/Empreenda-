import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ImpactScreen = ({ navigation }) => {
  const [impactData] = useState({
    global: {
      estudantesAtivos: 124580,
      ideiasCreated: 45632,
      problemasResolvidos: 12847,
      projetosLancados: 3921,
      impactoAmbiental: 89340,
      empregosCriados: 2156
    },
    regional: {
      escolas: 28,
      estudantes: 3142,
      ideias: 987,
      projetos: 156,
      impactoLocal: 4520
    },
    pessoal: {
      diasAtivo: 45,
      ideiasCriadas: 12,
      problemasResolvidos: 8,
      pontosImpacto: 450,
      posicaoRanking: 5
    },
    conquistas: [
      {
        titulo: '🌱 Eco Warrior',
        descricao: 'Criou 5 soluções sustentáveis',
        impacto: '2.5 ton CO2 economizado',
        conquistada: true
      },
      {
        titulo: '💡 Inovador',
        descricao: '10 ideias validadas pela comunidade',
        impacto: '127 pessoas impactadas',
        conquistada: true
      },
      {
        titulo: '🤝 Colaborador',
        descricao: 'Formou 3 equipes de sucesso',
        impacto: '45 novos empreendedores',
        conquistada: true
      },
      {
        titulo: '🚀 Disruptor',
        descricao: 'Lançou projeto inovador',
        impacto: 'Em andamento',
        conquistada: false
      }
    ]
  });

  const StatCard = ({ title, value, subtitle, icon, color = '#10B981' }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        <Text style={styles.statIcon}>{icon}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  );

  const ImpactCard = ({ title, description, impact, conquered, color }) => (
    <View style={[
      styles.impactCard,
      !conquered && styles.impactCardLocked
    ]}>
      <View style={styles.impactHeader}>
        <Text style={styles.impactTitle}>{title}</Text>
        {conquered ? (
          <Text style={styles.conqueredBadge}>✅</Text>
        ) : (
          <Text style={styles.lockedBadge}>🔒</Text>
        )}
      </View>
      <Text style={styles.impactDescription}>{description}</Text>
      <View style={styles.impactFooter}>
        <Text style={[
          styles.impactValue,
          { color: conquered ? color : '#9CA3AF' }
        ]}>
          {impact}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🌍 Impacto Global</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareIcon}>📤</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Card - Impacto Pessoal */}
      <View style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <Text style={styles.heroTitle}>Seu Impacto</Text>
          <Text style={styles.heroEmoji}>🎯</Text>
        </View>
        
        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatNumber}>{impactData.pessoal.pontosImpacto}</Text>
            <Text style={styles.heroStatLabel}>Pontos de Impacto</Text>
          </View>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatNumber}>{impactData.pessoal.ideiasCriadas}</Text>
            <Text style={styles.heroStatLabel}>Ideias Criadas</Text>
          </View>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatNumber}>{impactData.pessoal.problemasResolvidos}</Text>
            <Text style={styles.heroStatLabel}>Problemas Resolvidos</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Ver Detalhes do Meu Impacto</Text>
        </TouchableOpacity>
      </View>

      {/* Estatísticas Globais */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>📊 Impacto Global da Comunidade</Text>
        
        <View style={styles.statsGrid}>
          <StatCard
            title="Estudantes Ativos"
            value={impactData.global.estudantesAtivos.toLocaleString()}
            subtitle="Aprendendo empreendedorismo"
            icon="👥"
            color="#3B82F6"
          />
          
          <StatCard
            title="Ideias Criadas"
            value={impactData.global.ideiasCreated.toLocaleString()}
            subtitle="Soluções inovadoras"
            icon="💡"
            color="#F59E0B"
          />
          
          <StatCard
            title="Problemas Resolvidos"
            value={impactData.global.problemasResolvidos.toLocaleString()}
            subtitle="Impacto real na sociedade"
            icon="✅"
            color="#10B981"
          />
          
          <StatCard
            title="Projetos Lançados"
            value={impactData.global.projetosLancados.toLocaleString()}
            subtitle="Negócios em funcionamento"
            icon="🚀"
            color="#8B5CF6"
          />
          
          <StatCard
            title="Impacto Ambiental"
            value={`${(impactData.global.impactoAmbiental / 1000).toFixed(1)}k`}
            subtitle="Toneladas CO2 economizadas"
            icon="🌱"
            color="#059669"
          />
          
          <StatCard
            title="Empregos Criados"
            value={impactData.global.empregosCriados.toLocaleString()}
            subtitle="Oportunidades geradas"
            icon="💼"
            color="#DC2626"
          />
        </View>
      </View>

      {/* Impacto Regional */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>🏘️ Sua Região</Text>
        
        <View style={styles.regionalCard}>
          <View style={styles.regionalStats}>
            <View style={styles.regionalStat}>
              <Text style={styles.regionalNumber}>{impactData.regional.escolas}</Text>
              <Text style={styles.regionalLabel}>Escolas</Text>
            </View>
            
            <View style={styles.regionalStat}>
              <Text style={styles.regionalNumber}>{impactData.regional.estudantes}</Text>
              <Text style={styles.regionalLabel}>Estudantes</Text>
            </View>
            
            <View style={styles.regionalStat}>
              <Text style={styles.regionalNumber}>{impactData.regional.ideias}</Text>
              <Text style={styles.regionalLabel}>Ideias</Text>
            </View>
            
            <View style={styles.regionalStat}>
              <Text style={styles.regionalNumber}>{impactData.regional.projetos}</Text>
              <Text style={styles.regionalLabel}>Projetos</Text>
            </View>
          </View>
          
          <Text style={styles.regionalImpact}>
            Impacto Local: {impactData.regional.impactoLocal} pessoas beneficiadas
          </Text>
        </View>
      </View>

      {/* Conquistas de Impacto */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>🏆 Suas Conquistas de Impacto</Text>
        
        <View style={styles.achievementsGrid}>
          {impactData.conquistas.map((conquista, index) => (
            <ImpactCard
              key={index}
              title={conquista.titulo}
              description={conquista.descricao}
              impact={conquista.impacto}
              conquered={conquista.conquistada}
              color="#10B981"
            />
          ))}
        </View>
      </View>

      {/* Desafios de Impacto */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>🎯 Próximos Desafios</Text>
        
        <View style={styles.challengesContainer}>
          <TouchableOpacity style={styles.challengeCard}>
            <Text style={styles.challengeIcon}>🌍</Text>
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeTitle}>Impacto Global</Text>
              <Text style={styles.challengeDescription}>
                Crie uma solução que possa ser replicada globalmente
              </Text>
              <Text style={styles.challengeReward}>+1000 pontos de impacto</Text>
            </View>
            <Text style={styles.challengeArrow}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.challengeCard}>
            <Text style={styles.challengeIcon}>🤝</Text>
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeTitle}>Colaboração</Text>
              <Text style={styles.challengeDescription}>
                Forme uma equipe com estudantes de outras escolas
              </Text>
              <Text style={styles.challengeReward}>+500 pontos de impacto</Text>
            </View>
            <Text style={styles.challengeArrow}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.challengeCard}>
            <Text style={styles.challengeIcon}>💚</Text>
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeTitle}>Sustentabilidade</Text>
              <Text style={styles.challengeDescription}>
                Desenvolva 3 soluções focadas em sustentabilidade
              </Text>
              <Text style={styles.challengeReward}>+750 pontos de impacto</Text>
            </View>
            <Text style={styles.challengeArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Call to Action */}
      <View style={styles.ctaContainer}>
        <TouchableOpacity 
          style={styles.ctaButton}
          onPress={() => navigation.navigate('MainHub')}
        >
          <Text style={styles.ctaButtonText}>🚀 Criar Mais Impacto</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    fontSize: 24,
    color: '#6B7280',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  shareButton: {
    padding: 10,
  },
  shareIcon: {
    fontSize: 20,
  },
  heroCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  heroEmoji: {
    fontSize: 30,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  heroStat: {
    alignItems: 'center',
  },
  heroStatNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 5,
  },
  heroStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  detailsButton: {
    backgroundColor: '#10B981',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    width: '48%',
    marginBottom: 15,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  statTitle: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statSubtitle: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  regionalCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  regionalStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  regionalStat: {
    alignItems: 'center',
  },
  regionalNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 5,
  },
  regionalLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  regionalImpact: {
    textAlign: 'center',
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  impactCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    width: '48%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  impactCardLocked: {
    backgroundColor: '#F9FAFB',
  },
  impactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  impactTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  conqueredBadge: {
    fontSize: 16,
  },
  lockedBadge: {
    fontSize: 14,
  },
  impactDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 10,
  },
  impactFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
  },
  impactValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  challengesContainer: {
    gap: 15,
  },
  challengeCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  challengeIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 5,
  },
  challengeReward: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: 'bold',
  },
  challengeArrow: {
    fontSize: 18,
    color: '#6B7280',
  },
  ctaContainer: {
    margin: 20,
    marginBottom: 40,
  },
  ctaButton: {
    backgroundColor: '#10B981',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  ctaButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ImpactScreen;