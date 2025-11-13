import axios, { type AxiosError } from "axios";

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
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: string }>) => {
    const apiError = new ApiError(
      error.response?.status || 500,
      error.response?.data?.message || "Something went wrong",
      error.response?.data
    );

    // Log error untuk development
    if (process.env.NODE_ENV === "development") {
      console.error("API Error:", apiError);
    }

    return Promise.reject(apiError);
  }
);
