import { api } from "@/lib/axios";
import { LoginSchema } from "@/features/auth/schemas/authSchema";

export const authApi = {
  login: (data: LoginSchema) => api.post('/auth/login', data),
  // register: (data: RegisterSchema) => api.post('/auth/register', data),
};