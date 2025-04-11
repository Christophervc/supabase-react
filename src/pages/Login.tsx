import React, { useState } from "react";
import {client} from "../supabase/client";

const Login = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
        const result = await client.auth.signInWithOtp({
            email,
        });
        console.log(result);
    } catch (error) {
        console.log(error);
        
    }
    console.log(email);
  };

  return (
    <form onSubmit={handleSubmit}>
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
