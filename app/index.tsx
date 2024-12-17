import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { fetchTopGainersLosers } from "@/services/alphavantage";
import { useCallback, useEffect, useState } from "react";
import { MarketData } from "@/types/marketData";
import { ErrorMessages } from "@/utils/constants";

export default function HomeScreen() {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await fetchTopGainersLosers();

      setError(error);
      setData(data);
    } catch {
      setData(null);
      setError(ErrorMessages.UNKNOWN_ERROR);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Home</ThemedText>
      </ThemedView>

      {loading ? (
        <ThemedText>Loading...</ThemedText>
      ) : error ? (
        <ThemedText>Error: {error}</ThemedText>
      ) : (
        <ThemedText>Data Loaded</ThemedText>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
