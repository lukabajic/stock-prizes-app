import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Ticker } from '@/types/marketData';
import { ThemedText } from '../ThemedText';
import { Link } from 'expo-router';
import { formatPercentage, formatVolume } from '@/utils/formatters';

type ListItemProps = {
  data: Ticker;
};

export const ListItem: React.FC<ListItemProps> = ({ data }) => {
  const backgroundColor = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');
  const errorColor = useThemeColor({}, 'notification');

  const changeColor =
    Number(data.change_amount) > 0 ? primaryColor : errorColor;

  return (
    <Link
      href={{
        pathname: '/details/[ticker]',
        // Passing all params here to avoid another request
        // to alphavantage API, since I have limited requests
        params: {
          ticker: data.ticker,
          price: data.price,
          change_amount: data.change_amount,
          change_percentage: data.change_percentage,
        },
      }}
    >
      <View style={[styles.card, { backgroundColor }]}>
        <View style={styles.cardRow}>
          <ThemedText style={styles.ticker}>{data.ticker}</ThemedText>
          <ThemedText style={styles.price}>{data.price}</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <Text style={[styles.change, { color: changeColor }]}>
            {data.change_amount} ({formatPercentage(data.change_percentage)})
          </Text>
          <ThemedText style={styles.volume}>
            <Text style={styles.volumeText}>Volume:</Text>{' '}
            <Text>{formatVolume(data.volume)}</Text>
          </ThemedText>
        </View>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    gap: 32,

    /**
     * https://ethercreative.github.io/react-native-shadow-generator/ (Bookmarked)
     * Nice tool that I use whenever I need box elevation on RN
     */
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ticker: {
    fontSize: 20,
    fontWeight: 600,
  },
  price: {
    fontSize: 20,
    fontWeight: 700,
  },
  change: {
    fontSize: 18,
    fontWeight: 500,
  },
  volume: {
    fontSize: 18,
  },
  volumeText: {
    fontWeight: 500,
  },
});
