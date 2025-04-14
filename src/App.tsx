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
    supabase.auth.onAuthStateChange((session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }, []);
 
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
