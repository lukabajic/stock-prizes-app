import { StyleSheet, Text } from 'react-native';

import { ThemedText } from '../ThemedText';
import { Section } from './Section';

interface TargetProps {
  targetPrice: string;
}

export const Target: React.FC<TargetProps> = ({ targetPrice }) => {
  return (
    <Section title="Target Price" icon="circle.inset.filled">
      <ThemedText>
        <Text style={styles.bold}>Analyst Target Price</Text>:{' '}
        <Text style={styles.thin}>{targetPrice}</Text>
      </ThemedText>
    </Section>
  );
};

const styles = StyleSheet.create({
  thin: {
    fontWeight: 300,
  },
  bold: {
    fontWeight: 600,
  },
});
