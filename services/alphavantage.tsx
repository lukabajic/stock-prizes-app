import { fetch } from "expo/fetch";
import { MarketData } from "@/types/marketData";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export const fetchTopGainersLosers = async (): Promise<MarketData | null> => {
  try {
    const response = await fetch(
      `${apiUrl}/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`,
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json: MarketData = await response.json();
    console.log(json);

    return json;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};
