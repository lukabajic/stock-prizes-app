import { useCallback, useEffect, useState } from 'react';

import { Error } from '@/components/Error';
import { ThemedView } from '@/components/ThemedView';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { ItemSeparator, ListHeaderComponent } from '@/components/home/List';
import { Loader } from '@/components/ui/Loader';
import { SvgBackground } from '@/components/ui/SvgBackground';
import { fetchArticlesFeed } from '@/services/articles';
import { FeedResponse } from '@/types/articles';
import { ErrorMessages } from '@/utils/constants';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ArticlesIndex() {
  const { top: topInset, bottom: bottomInset } = useSafeAreaInsets();
  const bottomTabBarHeight = useBottomTabBarHeight();

  const [data, setData] = useState<FeedResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    setLoading(true);

    try {
      const { data, error } = await fetchArticlesFeed();

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

  return (
    <ThemedView style={styles.container}>
      <View style={styles.container}>
        <SvgBackground style={styles.svgBackground} />

        <FlatList
          data={data.feed || []}
          renderItem={({ item }) => <ArticleCard item={item} />}
          keyExtractor={(_, index) => String(index)}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={[
            styles.list,
            {
              paddingTop: 40 + topInset,
              paddingBottom: bottomInset + bottomTabBarHeight,
            },
          ]}
        />
      </View>
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
  list: {
    paddingHorizontal: 24,
  },
});
