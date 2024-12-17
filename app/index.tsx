import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { fetchTopGainersLosers } from "@/services/alphavantage";
import { useCallback, useEffect, useState } from "react";
import { MarketData } from "@/types/marketData";

export default function HomeScreen() {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async (): Promise<void> => {
    if (!loading) setLoading(true);
    if (error) setError(null);

    try {
      const data = await fetchTopGainersLosers();
      if (data) setData(data);
      else setError("API returned no data");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
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
