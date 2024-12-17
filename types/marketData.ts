export interface Ticker {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
}

export interface MarketData {
  metadata: string;
  last_updated: string;
  top_gainers: Ticker[];
  top_losers: Ticker[];
  most_actively_traded: Ticker[];
}
