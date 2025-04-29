import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route, useNavigate } from "react-router";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { supabase } from "./supabase/client";
import { useAuthStore } from "./store/authStore";

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
        navigate("/");
      } else if (event === "SIGNED_OUT") {
        navigate("/login");
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  /**

  useEffect(() => {

    supabase.auth.onAuthStateChange((session) => {
      //console.log(event, session)
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  */
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
