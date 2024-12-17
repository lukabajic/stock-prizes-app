import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Ticker } from "@/types/marketData";
import { ThemedText } from "../ThemedText";

type ListItemProps = {
  data: Ticker;
};

const formatPercentage = (value: string) => {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return value;
  return `${numericValue.toFixed(2)}%`;
};

const formatVolume = (value: string) => {
  const num = parseInt(value, 10);
  if (isNaN(num)) return value;
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
};

export const ListItem: React.FC<ListItemProps> = ({ data }) => {
  const backgroundColor = useThemeColor({}, "card");
  const primaryColor = useThemeColor({}, "primary");
  const notificationColor = useThemeColor({}, "notification");

  const changeColor =
    Number(data.change_amount) > 0 ? primaryColor : notificationColor;

  return (
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
          <Text style={styles.volumeText}>Volume:</Text>{" "}
          <Text>{formatVolume(data.volume)}</Text>
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    gap: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
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
