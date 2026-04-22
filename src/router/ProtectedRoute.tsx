import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/auth.store";
import { Spinner } from "@/components/ui/spinner";

export const ProtectedRoute = () => {
  const { user, initialized, loading } = useAuthStore();

  // 1. Mientras Supabase verifica la sesión inicial, mostramos un spinner a pantalla completa
  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Spinner size={"large"} className="h-12 w-12 text-indigo-600" />
      </div>
    );
  }
  // 2. Si ya cargó y NO hay usuario, lo mandamos al login de inmediato (replace borra el historial)
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  // 3. Si hay usuario, renderizamos la ruta hija home
  return <Outlet />;
};
