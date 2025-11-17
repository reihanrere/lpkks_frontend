export interface User {
  id: number;
  name: string;
  email: string;
  nim: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthData {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

/**
 * Generic pagination metadata
 */
export interface PaginationMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from?: number;
  to?: number;
}

/**
 * Generic paginated response
 */
export interface PaginatedData<T> {
  data: T[];
  pagination: PaginationMeta;
}

/**
 * Generic success response
 */
export interface ApiSuccessResponse<T> {
  status: true;
  message: string;
  data: T;
}

/**
 * Generic error response
 */
export interface ApiErrorResponse {
  status: false;
  message: string;
  errors?: Record<string, string[]>;
}
