import { Login } from "@/pages/Login";
import { BrowserRouter, Route, Routes } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import { NotFound } from "@/pages/NotFound";
import { Home } from "@/pages/Home";
import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";

export const AppRouter = () => {
  const initializeAuthListener = useAuthStore(
    (state) => state.initializeAuthListener,
  );

  useEffect(() => {
    const subscription = initializeAuthListener();
    return () => {
      subscription.unsubscribe();
    };
  }, [initializeAuthListener]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        {/* Rutas privadas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
