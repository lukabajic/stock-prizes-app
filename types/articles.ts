type Topic = {
  topic: string;
  relevance_score: number;
};

type TickerSentiment = {
  ticker: string;
  relevance_score: number;
  ticker_sentiment_score: number;
  ticker_sentiment_label: string;
};

type Article = {
  title: string;
  url: string;
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
};

type SentimentScoreDefinition = {
  bearish: string;
  somewhat_bearish: string;
  neutral: string;
  somewhat_bullish: string;
  bullish: string;
};

type RelevanceScoreDefinition = string;

type FeedResponse = {
  items: number;
  sentiment_score_definition: SentimentScoreDefinition;
  relevance_score_definition: RelevanceScoreDefinition;
  feed: Article[];
};
