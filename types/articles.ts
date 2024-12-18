import { ExternalPathString } from 'expo-router';

interface Topic {
  topic: string;
  relevance_score: number;
}

interface TickerSentiment {
  ticker: string;
  relevance_score: number;
  ticker_sentiment_score: number;
  ticker_sentiment_label: string;
}

export interface Article {
  title: string;
  url: ExternalPathString;
  time_published: string;
  authors: string[];
  summary: string;
  banner_image: string | null;
  source: string;
  category_within_source: string | null;
  source_domain: string;
  topics: Topic[];
  overall_sentiment_score: number;
  overall_sentiment_label: string;
  ticker_sentiment: TickerSentiment[];
}

interface SentimentScoreDefinition {
  bearish: string;
  somewhat_bearish: string;
  neutral: string;
  somewhat_bullish: string;
  bullish: string;
}

type RelevanceScoreDefinition = string;

export interface FeedResponse {
  items: number;
  sentiment_score_definition: SentimentScoreDefinition;
  relevance_score_definition: RelevanceScoreDefinition;
  feed: Article[];
}
