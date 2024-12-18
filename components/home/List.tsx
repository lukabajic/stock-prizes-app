import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '../ThemedText';

export const ItemSeparator: React.FC = () => (
  <View style={styles.itemSeparator} />
);

export const SectionSeparator: React.FC = () => (
  <View style={styles.sectionSeparator} />
);

export const SectionHeaderComponent: React.FC<{ title: string }> = ({
  title,
}) => <ThemedText style={styles.sectionHeaderText}>{title}</ThemedText>;

export const ListHeaderComponent: React.FC = () => {
  return (
    <View style={styles.header}>
      <ThemedText style={styles.headerText}>Splint Invest</ThemedText>

      <TouchableOpacity></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 80,
  },
  headerText: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: 700,
    textAlign: 'center',
  },
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
