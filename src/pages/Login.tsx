import { useState } from "react";
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
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useAuthMutations } from "@/hooks/useAuth";
import { GoogleLogo, GithubLogo } from "@/components/shared";

export const Login = () => {
  const [email, setEmail] = useState("");
  const {
    sendMagicLink,
    isSendingMagicLink,
    isMagicLinkSent,
    loginGithub,
    loginGoogle,
  } = useAuthMutations();

  const handleMagicLinkSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    await sendMagicLink(email);
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
                onClick={() => loginGoogle()}
              >
                <GoogleLogo />
                Sign in with Google
              </Button>

              <Button
                variant="outline"
                className="w-full cursor-pointer"
                onClick={() => loginGithub()}
              >
                <GithubLogo />
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
            {!isMagicLinkSent ? (
              <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    disabled={isSendingMagicLink || isMagicLinkSent}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isSendingMagicLink || isMagicLinkSent}
                >
                  {isSendingMagicLink ? "Sending..." : "Login with Magic Link"}
                </Button>
              </form>
            ) : (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="shrink-0">
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
