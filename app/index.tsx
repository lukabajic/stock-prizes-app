import { useCallback, useEffect, useMemo, useState } from 'react';

import { Error } from '@/components/Error';
import { ThemedView } from '@/components/ThemedView';
import {
  ItemSeparator,
  ListHeaderComponent,
  SectionHeaderComponent,
  SectionSeparator,
} from '@/components/home/List';
import { ListItem } from '@/components/home/ListItem';
import { Loader } from '@/components/ui/Loader';
import { SvgBackground } from '@/components/ui/SvgBackground';
import { useThemeColor } from '@/hooks/useThemeColor';
import { fetchTopGainersLosers } from '@/services/alphavantage';
import { MarketData, Ticker } from '@/types/marketData';
import { ErrorMessages } from '@/utils/constants';
import {
  Dimensions,
  RefreshControl,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const prepareSections = (data: MarketData | null) =>
  data
    ? [
        {
          title: 'Top Gainers',
          data: data.top_gainers,
        },
        {
          title: 'Top Losers',
          data: data.top_losers,
        },
        {
          title: 'Most Actively Traded',
          data: data.most_actively_traded,
        },
      ]
    : [];

export default function HomeScreen() {
  const { top: topInset } = useSafeAreaInsets();

  const primary = useThemeColor('primary');

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

      /**
       * Since I'm handling the responses from alphavantage
       * API on my API this is going to be either
       * { data: MarketData, error: null } or
       * { data: null, error: ErrorMessages }
       */
      setError(error);
      setData(data);
    } catch {
      setData(null);
      setError(ErrorMessages.UNKNOWN_ERROR);
    }
  }, []);

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

  /**
   * useMemo is used here primarily to show familiarity
   * In this case, it may not be necessary since
   * data doesn't change frequently
   */
  const sections = useMemo(() => prepareSections(data), [data]);

  return (
    <ThemedView style={styles.container}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error onButtonPress={initialLoad} buttonText="Try again">
          {error}
        </Error>
      ) : (
        <View style={styles.container}>
          <SvgBackground style={styles.svgBackground} />

          <SectionList
            style={[styles.sectionList, { paddingTop: 40 + topInset }]}
            contentInset={{ top: topInset }}
            contentOffset={{ y: -topInset, x: 0 }}
            sections={sections}
            keyExtractor={(item: Ticker) => item.ticker}
            renderItem={({ item }) => <ListItem data={item} />}
            ItemSeparatorComponent={ItemSeparator}
            SectionSeparatorComponent={SectionSeparator}
            ListHeaderComponent={ListHeaderComponent}
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
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  svgBackground: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    width: Dimensions.get('screen').width - 16,
  },
  sectionList: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
