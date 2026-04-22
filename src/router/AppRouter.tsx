import Login from "@/pages/Login";
import { BrowserRouter, Route, Routes } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import { NotFound } from "@/pages/NotFound";
import { Home } from "@/pages/Home";

export const AppRouter = () => {
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
