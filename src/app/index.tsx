import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useDDDSearch } from '@/hooks/useDDDSearch';

export default function HomeScreen() {
  const [dddInput, setDddInput] = useState<string>('');
  const { loading, data, error } = useDDDSearch(dddInput);

  const handleSearch = () => {
    // A busca é feita automaticamente via hook quando o input muda
    // Este botão é principalmente para UX - permite ao usuário acionar manualmente
  };

  const handleInputChange = (text: string) => {
    // Aceita apenas números
    const numericOnly = text.replace(/[^0-9]/g, '').slice(0, 2);
    setDddInput(numericOnly);
  };

  const renderCityItem = ({ item }: { item: string }) => (
    <View style={styles.cityItem}>
      <ThemedText>{item}</ThemedText>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Consulta de Localidades
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Busque cidades por código DDD
          </ThemedText>
        </View>

        {/* Campo de entrada */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite o DDD (ex: 11)"
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={2}
            value={dddInput}
            onChangeText={handleInputChange}
            editable={!loading}
          />
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSearch}
            disabled={loading || !dddInput}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={styles.buttonText}>Buscar</ThemedText>
            )}
          </TouchableOpacity>
        </View>

        {/* Mensagem de erro */}
        {error && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </View>
        )}

        {/* Resultados */}
        {data && !error && (
          <View style={styles.resultsContainer}>
            {/* Estado (UF) */}
            <View style={styles.stateContainer}>
              <ThemedText style={styles.label}>Estado (UF):</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.stateValue}>
                {data.state}
              </ThemedText>
            </View>

            {/* Código DDD */}
            <View style={styles.dddContainer}>
              <ThemedText style={styles.label}>Código DDD:</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.dddValue}>
                {data.area_code}
              </ThemedText>
            </View>

            {/* Lista de cidades */}
            <View style={styles.citiesContainer}>
              <ThemedText style={styles.label}>
                Cidades ({data.cities.length}):
              </ThemedText>
              <FlatList
                data={data.cities}
                renderItem={renderCityItem}
                keyExtractor={(item, index) => `${item}-${index}`}
                scrollEnabled={false}
                style={styles.citiesList}
              />
            </View>
          </View>
        )}

        {/* Mensagem de estado inicial */}
        {!data && !error && !loading && (
          <View style={styles.emptyStateContainer}>
            <ThemedText style={styles.emptyStateText}>
              Digite um código DDD (2 dígitos) para consultar as cidades disponíveis
            </ThemedText>
          </View>
        )}

        {/* Estado de carregamento */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#999" />
            <ThemedText style={styles.loadingText}>
              Buscando informações...
            </ThemedText>
          </View>
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
  },
  header: {
    marginBottom: Spacing.four,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.one,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: '#c62828',
    padding: Spacing.three,
    borderRadius: Spacing.two,
    marginBottom: Spacing.four,
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
  resultsContainer: {
    gap: Spacing.three,
  },
  stateContainer: {
    backgroundColor: '#f5f5f5',
    padding: Spacing.three,
    borderRadius: Spacing.two,
  },
  dddContainer: {
    backgroundColor: '#f5f5f5',
    padding: Spacing.three,
    borderRadius: Spacing.two,
  },
  citiesContainer: {
    gap: Spacing.two,
  },
  citiesList: {
    gap: Spacing.one,
  },
  cityItem: {
    backgroundColor: '#f5f5f5',
    padding: Spacing.two,
    borderRadius: Spacing.two,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  label: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: Spacing.one,
  },
  stateValue: {
    fontSize: 24,
    color: '#007AFF',
  },
  dddValue: {
    fontSize: 20,
    color: '#666',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
  },
  emptyStateText: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
  },
  loadingText: {
    opacity: 0.7,
  },
});
