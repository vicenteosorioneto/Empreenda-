import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function App() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const resetCounter = () => {
    setCounter(0);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>🚀 Empreenda+</Text>
            <Text style={styles.subtitle}>Teste do Expo Go</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Contador de Teste</Text>
              <Text style={styles.counterText}>{counter}</Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={incrementCounter}>
                  <Text style={styles.buttonText}>Incrementar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.button, styles.resetButton]} 
                  onPress={resetCounter}
                >
                  <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>📱 Como testar:</Text>
              <Text style={styles.infoText}>
                1. Instale o Expo Go no seu celular{'\n'}
                2. Execute "npm start" no terminal{'\n'}
                3. Escaneie o QR code que aparecerá{'\n'}
                4. O app abrirá automaticamente no Expo Go
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  counterText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 120,
  },
  resetButton: {
    backgroundColor: '#FF5722',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 15,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
});