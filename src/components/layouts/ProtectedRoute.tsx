"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/zustand/useAuthStore";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token, hydrated } = useAuthStore();

  useEffect(() => {
    if (!hydrated) return;
    if (!token) router.replace("/sign-in");
  }, [token, hydrated, router]);

  if (!hydrated) return null;

  return <>{token ? children : null}</>;
}
