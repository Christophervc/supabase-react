import { supabase } from "../supabase/client";

const redirectUrl = import.meta.env.VITE_SUPABASE_CALLBACK_URL as string;
const LoginGithubButton = () => {
  const handleGithubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo:
            redirectUrl,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error logging in with GitHub:", error);
    }
  }
  
  return <button onClick={handleGithubLogin}>Login with GitHub</button>;
};

export default LoginGithubButton;
