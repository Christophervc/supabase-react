import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route, useNavigate } from "react-router";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { supabase } from "./supabase/client";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });
    const {data: { subscription }} = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        navigate("/", { replace: true });
      } else if (event === "SIGNED_OUT") {
        navigate("/login");
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
