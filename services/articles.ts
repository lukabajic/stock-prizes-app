import { FeedResponse } from '@/types/articles';
import { FetchResponse } from '@/types/general';
import { ErrorMessages } from '@/utils/constants';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function fetchTopGainersLosers(): Promise<
  FetchResponse<FeedResponse>
> {
  try {
    const response = await fetch(`${apiUrl}/articles`);

    if (!response.ok) {
      return { data: null, error: ErrorMessages.RESPONSE_ERROR };
    }

    const data: FeedResponse = await response.json();

    return { data, error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: ErrorMessages.NETWORK_ERROR };
  }
}
