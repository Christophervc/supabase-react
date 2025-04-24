import React, { useState } from "react";
import { supabase } from "../supabase/client";
import LoginGithubButton from "../components/LoginGithubButton";

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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "50%"}}>
      <form
        onSubmit={handleSubmit}
        style={{display: "flex", flexDirection: "column", gap: "10px" }}
      >
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

        <LoginGithubButton />
      </form>
    </div>
  );
};

export default Login;
