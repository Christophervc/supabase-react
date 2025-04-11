import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router";


const Login = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await supabase.auth.signInWithOtp({
        email,
      });
    } catch (error) {
      console.log(error);
    }
    console.log(email);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (supabase.auth.getUser() != null) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label htmlFor="email">Email </label>
      <input
        type="email"
        name="email"
        placeholder="your@email.com"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
