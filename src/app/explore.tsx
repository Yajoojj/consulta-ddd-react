import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export default function ExploreScreen() {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: bottom + BottomTabInset },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText type="title">Sobre</ThemedText>
        </View>

        <View
          style={[styles.card, { backgroundColor: theme.backgroundElement }]}
        >
          <ThemedText type="subtitle">Consulta de DDD Brasil</ThemedText>
          <ThemedText style={styles.description}>
            Este aplicativo permite consultar códigos de DDD do Brasil, obtendo
            informações sobre a região e cidades através da Brasil API.
          </ThemedText>
        </View>

        <View
          style={[styles.card, { backgroundColor: theme.backgroundElement }]}
        >
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Funcionalidades
          </ThemedText>
          <ThemedText style={styles.feature}>
            • Busca de DDD por código
          </ThemedText>
          <ThemedText style={styles.feature}>
            • Informações de estado e cidades
          </ThemedText>
          <ThemedText style={styles.feature}>
            • Suporte a temas claro e escuro
          </ThemedText>
          <ThemedText style={styles.feature}>
            • Funciona em web, Android e iOS
          </ThemedText>
        </View>

        <View
          style={[styles.card, { backgroundColor: theme.backgroundElement }]}
        >
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Tecnologias
          </ThemedText>
          <ThemedText style={styles.tech}>React Native</ThemedText>
          <ThemedText style={styles.tech}>Expo v56</ThemedText>
          <ThemedText style={styles.tech}>TypeScript</ThemedText>
          <ThemedText style={styles.tech}>Brasil API</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.four,
    gap: Spacing.four,
  },
  header: {
    paddingVertical: Spacing.two,
  },
  card: {
    padding: Spacing.four,
    borderRadius: 16,
    gap: Spacing.two,
  },
  cardTitle: {
    marginBottom: Spacing.one,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
  feature: {
    fontSize: 15,
    lineHeight: 22,
    marginVertical: Spacing.one,
  },
  tech: {
    fontSize: 14,
    lineHeight: 20,
    marginVertical: Spacing.one,
  },
});
