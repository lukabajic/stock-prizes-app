import { Error } from '@/components/Error';
import ParallaxScrollView from '@/components/ParallaxScrollView';
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

import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

type RouteParams = {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
};

export default function TabTwoScreen() {
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

          {data && (
            <KeyMetrics
              marketCap={data.MarketCapitalization}
              pERatio={data.PeRatio}
              eps={data.Eps}
              dividendYield={data.DividendYield}
              fiftyTwoWeekHigh={data['52WeekHigh']}
              fiftyTwoWeekLow={data['52WeekLow']}
            />
          )}

          {data && (
            <Ratings
              strongBuy={data.AnalystRatingStrongBuy}
              buy={data.AnalystRatingBuy}
              hold={data.AnalystRatingHold}
              sell={data.AnalystRatingSell}
              strongSell={data.AnalystRatingStrongSell}
            />
          )}

          {data && <Target targetPrice={data.AnalystRatingBuy} />}
        </View>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  data: {
    paddingBottom: 80,
  },
});
