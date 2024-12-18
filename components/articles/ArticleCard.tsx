import { useThemeColor } from '@/hooks/useThemeColor';
import { Article } from '@/types/articles';
import { Link } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '../ThemedText';

const formatTime = (time: string) => {
  const date = new Date(
    `${time.substring(0, 4)}-${time.substring(4, 6)}-${time.substring(6, 8)}`
  );

  return date.toDateString();
};

export const ArticleCard: React.FC<{ item: Article }> = ({ item }) => {
  const cardColor = useThemeColor('card');

  return (
    <Link href={item.url} target="_blank">
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                item.banner_image ||
                'https://via.placeholder.com/600x200?text=No+Image+Available',
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <ThemedText style={styles.title}>{item.title}</ThemedText>
        <View style={styles.meta}>
          <ThemedText style={styles.author}>
            {item.authors.join(', ')}
          </ThemedText>
          <ThemedText style={styles.date}>
            {formatTime(item.time_published)}
          </ThemedText>
        </View>
        <ThemedText style={styles.description} numberOfLines={3}>
          {item.summary}
        </ThemedText>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 150,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  author: {
    fontStyle: 'italic',
    fontSize: 14,
  },
  date: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
});
