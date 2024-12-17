import { StyleSheet, View } from "react-native";
import { Route, useLocalSearchParams } from "expo-router";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { fetchStockDetails } from "@/services/alphavantage";
import { useCallback, useEffect, useState } from "react";
import { StockDetails } from "@/types/marketData";
import { ErrorMessages } from "@/utils/constants";
import { Loader } from "@/components/ui/Loader";
import { Error } from "@/components/Error";
import { Header } from "@/components/details/Header";

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

      if (data) {
        setError(null);
        setData(data);
      } else {
        setError(error);
        setData(null);
      }
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
          {data && <Header {...params} Symbol={data.Symbol} Name={data.Name} />}
        </View>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  data: {},
});
