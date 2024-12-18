import { StyleSheet, Text, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ticker } from '@/types/marketData';
import { ThemedText } from '../ThemedText';
import { formatPercentage } from '@/utils/formatters';
import { Section } from './Section';

interface HeaderProps extends Omit<Ticker, 'volume'> {
  Name: string;
}

export const Header: React.FC<HeaderProps> = ({
  price,
  change_amount,
  change_percentage,
  ticker,
  Name,
}) => {
  const primaryColor = useThemeColor({}, 'primary');
  const errorColor = useThemeColor({}, 'notification');
  const cardColor = useThemeColor({}, 'card');

  const changeColor = Number(change_amount) > 0 ? primaryColor : errorColor;

  return (
    <Section title={ticker} icon="tag.fill" titleStyles={styles.ticker}>
      <ThemedText style={styles.name}>{Name}</ThemedText>
      <View style={styles.data}>
        <ThemedText style={styles.priceText}>Current Price: </ThemedText>

        <ThemedText style={[styles.price, { backgroundColor: cardColor }]}>
          {price}
        </ThemedText>

        <ThemedText style={styles.amounts}>
          {Number(change_amount) > 0 ? ' ▲ ' : ' ▼ '}
          <Text style={{ color: changeColor }}>
            {change_amount} ({formatPercentage(change_percentage)})
          </Text>
        </ThemedText>
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 48,
  },
  ticker: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: 600,
  },
  name: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 8,
  },
  data: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    lineHeight: 22,
    fontSize: 16,
  },
  price: {
    height: 22,
    lineHeight: 16,
    fontSize: 16,
    padding: 3,
    borderRadius: 2,
  },
  amounts: {
    lineHeight: 22,
    fontSize: 16,
  },
});
