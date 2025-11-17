import ProtectedRoute from "@/components/layouts/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <div></div>
    </ProtectedRoute>
  );
}
