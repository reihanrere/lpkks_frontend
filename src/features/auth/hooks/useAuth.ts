import { authApi } from "@/features/auth/api/authApi";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      // Handle success
    },
  });
};