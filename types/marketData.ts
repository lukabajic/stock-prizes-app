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

export interface DailyData {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface MetaData {
  symbol: string;
  lastRefreshed: string;
  timeZone: string;
}

export interface StockDetails {
  MetaData: MetaData;
  "Time Series (Daily)": Record<string, DailyData>;
  Symbol: string;
  Name: string;
  Description: string;
  Sector: string;
  Industry: string;
  OfficialSite: string;
  MarketCapitalization: string;
  PeRatio: string;
  Eps: string;
  DividendYield: string;
  "52WeekHigh": string;
  "52WeekLow": string;
}
