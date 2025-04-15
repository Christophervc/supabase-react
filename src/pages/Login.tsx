import React, {useState } from "react";
import { supabase } from "../supabase/client";

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


  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label>Email </label>
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
