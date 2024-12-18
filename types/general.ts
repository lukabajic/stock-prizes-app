import { ErrorMessages } from '@/utils/constants';

interface ErrorResponse {
  data: null;
  error: ErrorMessages;
}

interface SuccessResponse<T> {
  data: T;
  error: null;
}

export type FetchResponse<T> = ErrorResponse | SuccessResponse<T>;
