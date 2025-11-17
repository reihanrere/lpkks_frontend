import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/lib/zustand/useAuthStore";
import { env } from "@/lib/env";

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown
  ) {
    super(message);
  }
}

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor → uniform error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const apiError = new ApiError(
      error.response?.status || 500,
      error.response?.data?.message || "Something went wrong",
      error.response?.data
    );

    if (process.env.NODE_ENV === "development") {
      console.error("❌ API Error:", apiError);
    }

    // optional: auto logout kalau 401
    if (apiError.status === 401) {
      const { logout } = useAuthStore.getState();
      logout();
    }

    return Promise.reject(apiError);
  }
);
