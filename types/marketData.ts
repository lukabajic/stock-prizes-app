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

// API endpoint returns an object with keys like this
// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo
export enum Keys {
  MetaData = "Meta Data",
  LastRefreshed = "3. Last Refreshed",
  TimeSeries = "Time Series (Daily)",
  Open = "1. open",
  High = "2. high",
  Low = "3. low",
  Close = "4. close",
  Volume = "5. volume",
}

export interface DailyData {
  [Keys.Open]: string;
  [Keys.High]: string;
  [Keys.Low]: string;
  [Keys.Close]: string;
  [Keys.Volume]: string;
}

export interface MetaData {
  [Keys.LastRefreshed]: string;
}

export interface StockDetails {
  [Keys.MetaData]: MetaData;
  [Keys.TimeSeries]: Record<string, DailyData>;
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
