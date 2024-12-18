import { useThemeColor } from '@/hooks/useThemeColor';
import { ExternalPathString, Link } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { ThemedText } from '../ThemedText';
import { Section } from './Section';

interface OverviewProps {
  sector: string;
  industry: string;
  description?: string;
  website?: ExternalPathString | 'None';
}

export const Overview: React.FC<OverviewProps> = ({
  sector,
  industry,
  website,
  description,
}) => {
  const primaryColor = useThemeColor('primary');

  return (
    <Section title="Company Overview" icon="building.2.fill">
      <ThemedText style={styles.row}>
        <Text style={styles.bold}>Sector</Text>:{' '}
        <Text style={styles.thin}>{sector}</Text>
      </ThemedText>
      <ThemedText style={styles.row}>
        <Text style={styles.bold}>Industry</Text>:{' '}
        <Text style={styles.thin}>{industry}</Text>
      </ThemedText>
      {description && (
        <ThemedText style={styles.row}>
          <Text style={styles.bold}>Description</Text>:{' '}
          <Text style={styles.thin}>{description}</Text>
        </ThemedText>
      )}
      {website && (
        <ThemedText style={styles.row}>
          <Text style={styles.bold}>Official Website</Text>:{' '}
          {website === 'None' ? (
            <Text style={styles.thin}>{website}</Text>
          ) : (
            <Link
              href={website}
              target="_blank"
              style={[styles.link, { color: primaryColor }]}
            >
              {website}
            </Link>
          )}
        </ThemedText>
      )}
    </Section>
  );
};

const styles = StyleSheet.create({
  row: {
    marginBottom: 8,
  },
  bold: {
    fontWeight: 600,
  },
  thin: {
    fontWeight: 300,
  },
  link: {
    fontWeight: 500,
  },
});
