import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useDDDSearch } from "@/hooks/useDDDSearch";
import { useTheme } from "@/hooks/use-theme";

export default function HomeScreen() {
  const [dddInput, setDddInput] = useState<string>("");
  const [submittedDdd, setSubmittedDdd] = useState<string>("");
  const { loading, data, error } = useDDDSearch(submittedDdd);
  const theme = useTheme();
  const accentColor = "#0A84FF";

  const handleSearch = () => {
    setSubmittedDdd(dddInput);
    Keyboard.dismiss();
  };

  const handleInputChange = (text: string) => {
    if (/^\d*$/.test(text)) {
      setDddInput(text);
    }
  };

  const renderCityItem = ({ item }: { item: string }) => (
    <View
      style={[
        styles.cityItem,
        {
          backgroundColor: theme.background,
          borderColor: theme.backgroundSelected,
        },
      ]}
    >
      <ThemedText>{item}</ThemedText>
    </View>
  );

  const renderHeroCard = () => (
    <View
      style={[
        styles.heroCard,
        {
          backgroundColor: theme.backgroundElement,
        },
      ]}
    >
      <ThemedText type="title" style={styles.title}>
        Consulta de DDD
      </ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.subtitle}>
        Digite um código com 2 dígitos para ver UF e cidades.
      </ThemedText>
    </View>
  );

  const renderFormCard = () => (
    <View
      style={[
        styles.formCard,
        {
          backgroundColor: theme.backgroundElement,
        },
      ]}
    >
      <ThemedText themeColor="textSecondary" style={styles.label}>
        Código DDD
      </ThemedText>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: theme.backgroundSelected,
            backgroundColor: theme.background,
            color: theme.text,
          },
        ]}
        placeholder="Ex.: 11"
        placeholderTextColor={theme.textSecondary}
        keyboardType="number-pad"
        maxLength={2}
        value={dddInput}
        onChangeText={handleInputChange}
        onSubmitEditing={() => dddInput.length === 2 && handleSearch()}
        editable={!loading}
        returnKeyType="search"
      />
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: accentColor },
          (!dddInput || loading) && styles.buttonDisabled,
        ]}
        onPress={handleSearch}
        disabled={loading || dddInput.length !== 2}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ThemedText style={styles.buttonText}>Buscar</ThemedText>
        )}
      </TouchableOpacity>
      <ThemedText themeColor="textSecondary" style={styles.helperText}>
        Somente números. O botão ativa quando houver 2 dígitos.
      </ThemedText>
    </View>
  );

  const renderError = () =>
    error ? (
      <View
        style={[
          styles.errorContainer,
          {
            backgroundColor: theme.backgroundElement,
            borderLeftColor: "#E11D48",
          },
        ]}
      >
        <ThemedText style={[styles.errorText, { color: "#BE123C" }]}>
          {error}
        </ThemedText>
      </View>
    ) : null;

  const renderResults = () =>
    submittedDdd && !loading && data && !error ? (
      <View
        style={[
          styles.resultsContainer,
          {
            backgroundColor: theme.backgroundElement,
          },
        ]}
      >
        <View style={styles.stateContainer}>
          <ThemedText themeColor="textSecondary" style={styles.label}>
            Estado (UF)
          </ThemedText>
          <ThemedText style={[styles.stateValue, { color: accentColor }]}>
            {data.state}
          </ThemedText>
        </View>

        <View style={styles.dddContainer}>
          <ThemedText themeColor="textSecondary" style={styles.label}>
            Código DDD
          </ThemedText>
          <ThemedText style={[styles.dddValue, { color: accentColor }]}>
            {data.area_code}
          </ThemedText>
        </View>

        <View style={styles.citiesContainer}>
          <ThemedText themeColor="textSecondary" style={styles.label}>
            Cidades ({data.cities.length})
          </ThemedText>
          <FlatList
            data={data.cities}
            renderItem={renderCityItem}
            keyExtractor={(item, index) => `${item}-${index}`}
            scrollEnabled={false}
            contentContainerStyle={styles.citiesList}
          />
        </View>
      </View>
    ) : null;

  const renderEmpty = () =>
    !submittedDdd && !data && !error && !loading ? (
      <View style={styles.emptyStateContainer}>
        <ThemedText themeColor="textSecondary" style={styles.emptyStateText}>
          Use o campo acima para pesquisar um DDD válido.
        </ThemedText>
      </View>
    ) : null;

  const renderLoading = () =>
    loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={accentColor} />
        <ThemedText themeColor="textSecondary" style={styles.loadingText}>
          Buscando informações...
        </ThemedText>
      </View>
    ) : null;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {renderHeroCard()}
            {renderFormCard()}
            {renderError()}
            {renderResults()}
            {renderEmpty()}
            {renderLoading()}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const cardShadow = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  android: {
    elevation: 6,
  },
  web: {},
});

const cardShadowSoft = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  android: {
    elevation: 3,
  },
  web: {},
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: Spacing.four,
    gap: Spacing.four,
  },
  heroCard: {
    padding: Spacing.four,
    borderRadius: 24,
    gap: Spacing.two,
    ...cardShadow,
  },
  formCard: {
    padding: Spacing.four,
    borderRadius: 24,
    gap: Spacing.two,
    ...cardShadowSoft,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  label: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontWeight: "700",
  },
  input: {
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    fontSize: 24,
    letterSpacing: 4,
    textAlign: "center",
    fontWeight: "600",
  },
  button: {
    paddingVertical: Spacing.three,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  helperText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  errorContainer: {
    borderLeftWidth: 4,
    padding: Spacing.three,
    borderRadius: 16,
    ...cardShadowSoft,
  },
  errorText: {
    fontSize: 14,
    fontWeight: "600",
  },
  resultsContainer: {
    padding: Spacing.four,
    borderRadius: 24,
    gap: Spacing.three,
    ...cardShadowSoft,
  },
  stateContainer: {
    gap: Spacing.one,
  },
  dddContainer: {
    gap: Spacing.one,
  },
  resultLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontWeight: "700",
  },
  stateValue: {
    fontSize: 42,
    lineHeight: 48,
    fontWeight: "800",
    marginTop: Spacing.one,
  },
  dddValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  citiesContainer: {
    gap: Spacing.two,
  },
  citiesList: {
    gap: Spacing.two,
  },
  cityItem: {
    padding: Spacing.three,
    borderRadius: 16,
    borderWidth: 1,
  },
  emptyStateContainer: {
    paddingVertical: Spacing.six,
    paddingHorizontal: Spacing.four,
    justifyContent: "center",
  },
  emptyStateText: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
  loadingContainer: {
    paddingVertical: Spacing.six,
    paddingHorizontal: Spacing.four,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.two,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
