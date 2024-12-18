import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { fetchStockDetails } from '@/services/alphavantage';
import { useCallback, useEffect, useState } from 'react';
import { Keys, StockDetails } from '@/types/marketData';
import { ErrorMessages } from '@/utils/constants';
import { Loader } from '@/components/ui/Loader';
import { Error } from '@/components/Error';
import { Header } from '@/components/details/Header';
import { Daily } from '@/components/details/Daily';
import { Overview } from '@/components/details/Overview';
import { Chart } from '@/components/details/Chart';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

type RouteParams = {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
};

export default function TabTwoScreen() {
  const { ticker, ...params } = useLocalSearchParams<RouteParams>();

  const textColor = useThemeColor('text');

  const [data, setData] = useState<StockDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    setLoading(true);

    try {
      const { data, error } = await fetchStockDetails(ticker);

      setData(data);
      setError(error);
    } catch {
      setData(null);
      setError(ErrorMessages.UNKNOWN_ERROR);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const lastRefreshed = data?.[Keys.MetaData]?.[Keys.LastRefreshed];

  return (
    <ParallaxScrollView>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error onButtonPress={fetchData} buttonText="Try again">
          {error}
        </Error>
      ) : (
        <>
          <IconSymbol name="chevron.backward" size={24} color={textColor} />
          <View style={styles.data}>
            {data && <Header {...params} ticker={ticker} Name={data.Name} />}

            {lastRefreshed && (
              <Daily
                lastRefreshed={lastRefreshed}
                dailyData={data[Keys.TimeSeries][lastRefreshed]}
              />
            )}

            {data?.[Keys.TimeSeries] && (
              <Chart chartData={data[Keys.TimeSeries]} />
            )}

            {data && (
              <Overview
                sector={data.Sector}
                industry={data.Industry}
                description={data.Description}
                website={data.OfficialSite}
              />
            )}
          </View>
        </>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  data: {
    paddingTop: 40,
    paddingBottom: 80,
  },
});
