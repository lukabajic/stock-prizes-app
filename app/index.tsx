import {
  RefreshControl,
  SectionList,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Error } from "@/components/Error";
import { ThemedView } from "@/components/ThemedView";
import { fetchTopGainersLosers } from "@/services/alphavantage";
import { useCallback, useEffect, useState } from "react";
import { MarketData, Ticker } from "@/types/marketData";
import { ErrorMessages } from "@/utils/constants";
import { ListItem } from "@/components/home/ListItem";
import {
  ItemSeparator,
  SectionHeaderComponent,
  SectionSeparator,
} from "@/components/home/List";
import { Loader } from "@/components/Loader";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function HomeScreen() {
  const { top: topInset } = useSafeAreaInsets();
  const primary = useThemeColor({}, "primary");

  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initialLoad();
  }, []);

  const fetchData = useCallback(async (): Promise<void> => {
    setError(null);

    try {
      const { data, error } = await fetchTopGainersLosers();

      setError(error);
      setData(data);
    } catch {
      setData(null);
      setError(ErrorMessages.UNKNOWN_ERROR);
    }
  }, [loading]);

  const initialLoad = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

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
    <ThemedView>
      {loading ? (
        <Loader style={styles.loader} />
      ) : error ? (
        <Error onButtonPress={initialLoad} buttonText="Try again">
          {error}
        </Error>
      ) : (
        <SectionList
          style={[styles.sectionList, { paddingTop: 40 + topInset }]}
          sections={sections}
          keyExtractor={(item: Ticker) => item.ticker}
          renderItem={({ item }) => <ListItem data={item} />}
          ItemSeparatorComponent={ItemSeparator}
          SectionSeparatorComponent={SectionSeparator}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section }) => (
            <SectionHeaderComponent title={section.title} />
          )}
          refreshControl={
            <RefreshControl
              tintColor={primary}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  loader: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionList: {
    paddingHorizontal: 24,
  },
});
