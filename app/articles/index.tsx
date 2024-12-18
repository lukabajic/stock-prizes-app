import { useCallback, useEffect, useState } from 'react';

import { fetchArticlesFeed } from '@/services/articles';
import { FeedResponse } from '@/types/articles';
import { ErrorMessages } from '@/utils/constants';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

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

  console.log(data);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Link href="/articles/123">Go to Article 123</Link>
    </View>
  );
}
