import React, { useCallback, useEffect, useState } from 'react';

import { Error } from '@/components/Error';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { Chart } from '@/components/details/Chart';
import { Daily } from '@/components/details/Daily';
import { Header } from '@/components/details/Header';
import { KeyMetrics } from '@/components/details/KeyMetrics';
import { Overview } from '@/components/details/Overview';
import { Ratings } from '@/components/details/Ratings';
import { Target } from '@/components/details/Target';
import { Loader } from '@/components/ui/Loader';
import { fetchStockDetails } from '@/services/stocks';
import { Keys, StockDetails } from '@/types/marketData';
import { ErrorMessages } from '@/utils/constants';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

type RouteParams = {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
};

export default function TickerScreen() {
  const { ticker, ...params } = useLocalSearchParams<RouteParams>();

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

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <Loader />
      </ThemedView>
    );
  }

  if (error || !data)
    return (
      <ThemedView style={styles.container}>
        <Error onButtonPress={fetchData} buttonText="Try again">
          {error || ErrorMessages.UNKNOWN_ERROR}
        </Error>
      </ThemedView>
    );

  const lastRefreshed = data?.[Keys.MetaData]?.[Keys.LastRefreshed];

  return (
    <ParallaxScrollView>
      <View style={styles.data}>
        <Header {...params} ticker={ticker} Name={data.Name} />

        {lastRefreshed && (
          <Daily
            lastRefreshed={lastRefreshed}
            dailyData={data[Keys.TimeSeries][lastRefreshed]}
          />
        )}

        {data?.[Keys.TimeSeries] && <Chart chartData={data[Keys.TimeSeries]} />}

        <Overview
          sector={data.Sector}
          industry={data.Industry}
          description={data.Description}
          website={data.OfficialSite}
        />

        <KeyMetrics
          marketCap={data.MarketCapitalization}
          pERatio={data.PeRatio}
          eps={data.Eps}
          dividendYield={data.DividendYield}
          fiftyTwoWeekHigh={data['52WeekHigh']}
          fiftyTwoWeekLow={data['52WeekLow']}
        />

        <Ratings
          strongBuy={data.AnalystRatingStrongBuy}
          buy={data.AnalystRatingBuy}
          hold={data.AnalystRatingHold}
          sell={data.AnalystRatingSell}
          strongSell={data.AnalystRatingStrongSell}
        />

        <Target targetPrice={data.AnalystRatingBuy} />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  data: {
    paddingBottom: 80,
  },
});
