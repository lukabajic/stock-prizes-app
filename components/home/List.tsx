import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

export const ItemSeparator: React.FC = () => (
  <View style={styles.itemSeparator} />
);

export const SectionSeparator: React.FC = () => (
  <View style={styles.sectionSeparator} />
);

export const SectionHeaderComponent: React.FC<{ title: string }> = ({
  title,
}) => (
  <ThemedView style={styles.sectionHeaderWrapper}>
    <ThemedText style={styles.sectionHeaderText}>{title}</ThemedText>
  </ThemedView>
);

const styles = StyleSheet.create({
  sectionSeparator: {
    height: 24,
  },
  itemSeparator: {
    height: 8,
  },
  sectionHeaderText: {
    fontSize: 24,
    fontWeight: 600,
  },
});
