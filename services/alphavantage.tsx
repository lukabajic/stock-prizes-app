import { MarketData } from "@/types/marketData";
import { ErrorMessages } from "@/utils/constants";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

interface FetchTopGainersLosersResponse {
  data: MarketData | null;
  error: ErrorMessages | null;
}

export async function fetchTopGainersLosers(): Promise<FetchTopGainersLosersResponse> {
  try {
    const response = await fetch(`${apiUrl}/top-gainers-losers`);

    if (!response.ok) {
      return { data: null, error: ErrorMessages.RESPONSE_ERROR };
    }

    const data: MarketData = await response.json();

    return { data, error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: ErrorMessages.NETWORK_ERROR };
  }
}
