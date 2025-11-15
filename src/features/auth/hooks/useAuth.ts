import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/features/auth/api/authApi";
import { SignInSchema } from "@/features/auth/schemas/authSchema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/api";
import { ApiError } from "@/lib/axios";

export const useSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignInSchema) => signIn(data),
    onSuccess: () => {
      toast.success("Login berhasil!");
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      let errorMessage = "Terjadi kesalahan yang tidak diketahui";

      if (error instanceof ApiError) {

        errorMessage = error.message;

        const rawData = error.data as ApiErrorResponse;

        if (rawData?.message) {
          errorMessage = rawData.message;
        }

      }
      toast.error(errorMessage);
    },
  });
};