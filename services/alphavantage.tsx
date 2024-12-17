import { MarketData } from "@/types/marketData";
import { ErrorMessages } from "@/utils/constants";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

interface FetchTopGainersLosersResponse {
  data: MarketData | null;
  error: ErrorMessages | null;
}

export async function fetchTopGainersLosers(): Promise<FetchTopGainersLosersResponse> {
  try {
    const response = await fetch(
      `${apiUrl}/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`,
    );

    if (!response.ok) {
      return { data: null, error: ErrorMessages.RESPONSE_ERROR };
    }

    const data: MarketData = await response.json();

    return { data, error: null };
  } catch {
    return { data: null, error: ErrorMessages.NETWORK_ERROR };
  }
}
