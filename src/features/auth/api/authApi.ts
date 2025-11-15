import { api } from "@/lib/axios";
import { SignInSchema } from "@/features/auth/schemas/authSchema";
import { useAuthStore } from "@/lib/zustand/useAuthStore";
import { ApiSuccessResponse, AuthData } from "@/types/api";

export const signIn = async (data: SignInSchema): Promise<AuthData> => {
  const response = await api.post<ApiSuccessResponse<AuthData>>(
    "/auth/login",
    data
  );

  const authData = response.data.data;

  useAuthStore.getState().setToken(authData.access_token);
  useAuthStore.getState().setUser(authData.user);

  return authData;
};