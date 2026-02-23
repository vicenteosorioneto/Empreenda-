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
import { Ionicons } from '@expo/vector-icons';
import Logo from '../components/Logo';

const LoginScreen = ({ navigation }) => {
  const [emailInstitucional, setEmailInstitucional] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (emailInstitucional && senha) {
      navigation.replace('MainHub');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Logo size="medium" showText={true} />
        <Text style={styles.welcomeText}>
          Bem-vindo(a) à aventura empreendedora! 🌟
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>📧 Email Institucional</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email institucional"
            value={emailInstitucional}
            onChangeText={setEmailInstitucional}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>🔐 Senha</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Digite sua senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <Ionicons 
                name={showPassword ? "eye" : "eye-off"} 
                size={20} 
                color="#6B7280" 
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={[
            styles.loginButton,
            (!emailInstitucional || !senha) && styles.loginButtonDisabled
          ]}
          onPress={handleLogin}
          disabled={!emailInstitucional || !senha}
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
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: '#0F172A',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    fontSize: 13,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  avatarSection: {
    marginBottom: 24,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  avatarCard: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  selectedAvatar: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  avatarEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  avatarName: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#10B981',
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
    elevation: 0,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  socialButtons: {
    marginBottom: 16,
  },
  googleButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  socialButtonText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 11,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    paddingRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 13,
  },
  eyeButton: {
    padding: 8,
  },
});

export default LoginScreen;