import { useCallback, useEffect, useState } from 'react';

import { Error } from '@/components/Error';
import { ThemedView } from '@/components/ThemedView';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { ItemSeparator } from '@/components/home/List';
import { Loader } from '@/components/ui/Loader';
import { fetchArticlesFeed } from '@/services/articles';
import { FeedResponse } from '@/types/articles';
import { ErrorMessages } from '@/utils/constants';
import { FlatList, StyleSheet } from 'react-native';

export default function ArticlesIndex() {
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
    <FlatList
      data={data.feed || []}
      renderItem={({ item }) => <ArticleCard item={item} />}
      keyExtractor={(_, index) => String(index)}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 24,
  },
});
