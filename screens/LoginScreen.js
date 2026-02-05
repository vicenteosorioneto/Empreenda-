import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Image 
} from 'react-native';
import Logo from '../components/Logo';

const LoginScreen = ({ navigation }) => {
  const [codigoEscolar, setCodigoEscolar] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (codigoEscolar && email) {
      navigation.replace('MainHub');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Logo size="medium" showText={true} />
        <Text style={styles.welcomeText}>
          Bem-vindo(a) à aventura empreendedora! 🌟
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>🏫 Código da Escola</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: ESC2024"
            value={codigoEscolar}
            onChangeText={setCodigoEscolar}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>� E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity 
          style={[
            styles.loginButton,
            (!codigoEscolar || !email) && styles.loginButtonDisabled
          ]}
          onPress={handleLogin}
          disabled={!codigoEscolar || !email}
        >
          <Text style={styles.loginButtonText}>
            🚀 Iniciar Jornada
          </Text>
        </TouchableOpacity>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.socialButtonText}>
              🔍 Entrar com Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footerText}>
        🎮 Prepare-se para uma aventura incrível de aprendizado!
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: '#0F172A',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  formContainer: {
    padding: 25,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  avatarSection: {
    marginBottom: 30,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  avatarCard: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  selectedAvatar: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  avatarEmoji: {
    fontSize: 30,
    marginBottom: 5,
  },
  avatarName: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#10B981',
    borderRadius: 25,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  loginButtonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
    elevation: 0,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialButtons: {
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  socialButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
});

export default LoginScreen;