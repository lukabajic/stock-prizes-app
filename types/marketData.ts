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

// Represents Daily Time Series Data
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

export interface CompanyOverview {
  name: string;
  description: string;
  sector: string;
  industry: string;
  officialSite: string;
  marketCapitalization: string;
  peRatio: string;
  eps: string;
  dividendYield: string;
  fiftyTwoWeekHigh: string;
  fiftyTwoWeekLow: string;
}

export interface StockDetails {
  metaData: MetaData;
  timeSeriesDaily: Record<string, DailyData>;
  companyOverview: CompanyOverview;
}
