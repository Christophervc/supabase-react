import React, { useState } from "react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/authStore";

const Login = () => {
  const {
    loginWithGoogle,
    loginWithGitHub,
    loginWithMagicLink,
    loading,
    sent,
  } = useAuthStore();
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await loginWithMagicLink(email);
    setEmail("");
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-900 px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Sign in
            </CardTitle>
            <CardDescription className="text-center bg:gray-50 dark:bg-slate-900 text-sm text-gray-500">
              Choose your preferred sign in method
            </CardDescription>
          </CardHeader>
          <CardContent className="my-4">
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full cursor-pointer"
                disabled={loading}
                onClick={loginWithGoogle}
              >
                <svg
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Sign in with Google
              </Button>

              <Button
                variant="outline"
                className="w-full cursor-pointer"
                disabled={loading}
                onClick={loginWithGitHub}
              >
                <Github className="mr-2 h-4 w-4" />
                Login with GitHub
              </Button>
            </div>

            <div className="relative mt-4 mb-4">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="dark: px-2 text-muted-foreground bg:gray-50 dark:bg-slate-900 dark:text-slate-200">
                  Or continue with
                </span>
              </div>
            </div>
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Login with Magic Link"}
                </Button>
              </form>
            ) : (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Magic link sent! Check your email.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-gray-500">
              Don&apos;t have an account?{" "}
              <span className="underline font-medium hover:underline">
                Sign up
              </span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Login;
