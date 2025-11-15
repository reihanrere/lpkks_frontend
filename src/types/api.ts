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
 * Tipe generik untuk respons API yang sukses.
 * @template T - Tipe dari field 'data', bisa object atau array.
 */
export interface ApiSuccessResponse<T> {
  status: true;
  message: string;
  data: T;

  // Opsional: Tambahkan ini jika API Anda memiliki paginasi
  // meta?: {
  //   current_page: number;
  //   last_page: number;
  //   per_page: number;
  //   total: number;
  // };
}

/**
 * Tipe generik untuk respons API yang error.
 */
export interface ApiErrorResponse {
  status: false;
  message: string;

  errors?: Record<string, string[]>;
}