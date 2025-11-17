import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/api";

type AuthState = {
  user: User | null;
  token: string | null;
  hydrated: boolean;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      hydrated: false,

      setUser: (user: User) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
      setHydrated: (v) => set({ hydrated: v }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
