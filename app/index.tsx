import { SectionList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { fetchTopGainersLosers } from "@/services/alphavantage";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MarketData, Ticker } from "@/types/marketData";
import { ErrorMessages } from "@/utils/constants";
import { ListItem } from "@/components/home/ListItem";
import {
  ItemSeparator,
  SectionHeaderComponent,
  SectionSeparator,
} from "@/components/home/List";

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

  const sections = data
    ? [
        {
          title: "Top Gainers",
          data: data.top_gainers,
        },
        {
          title: "Top Losers",
          data: data.top_losers,
        },
        {
          title: "Most Actively Traded",
          data: data.most_actively_traded,
        },
      ]
    : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView>
        {loading ? (
          <ThemedText>Loading...</ThemedText>
        ) : error ? (
          <ThemedText>Error: {error}</ThemedText>
        ) : (
          <SectionList
            style={styles.sectionList}
            sections={sections}
            keyExtractor={(item: Ticker) => item.ticker}
            renderItem={({ item }) => <ListItem data={item} />}
            renderSectionHeader={({ section }) => (
              <SectionHeaderComponent title={section.title} />
            )}
            stickySectionHeadersEnabled={false}
            ItemSeparatorComponent={ItemSeparator}
            SectionSeparatorComponent={SectionSeparator}
          />
        )}
      </ThemedView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  sectionList: {
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
});
