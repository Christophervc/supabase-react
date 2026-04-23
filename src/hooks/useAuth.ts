import {
  loginWithGitHub,
  loginWithGoogle,
  loginWithMagicLink,
} from "@/services/auth.service";
import { supabase } from "@/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAuthMutations = () => {
  const queryClient = useQueryClient();

  const magicLinkMutation = useMutation({
    mutationKey: ["magicLink"],
    mutationFn: (email: string) => loginWithMagicLink(email),
    onSuccess: () => {
      toast.success("Magic link sent successfully");
    },
    onError: (error) => {
      if (error.message.toLowerCase().includes("rate limit")) {
        toast.error("Too many attempts. Please try again in a few minutes.");
      } else {
        toast.error("Failed to send magic link");
      }
    },
  });

  const googleMutation = useMutation({
    mutationKey: ["loginGoogle"],
    mutationFn: () => loginWithGoogle(),
  });

  const githubMutation = useMutation({
    mutationKey: ["loginGithub"],
    mutationFn: () => loginWithGitHub(),
  });

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.clear();
      toast.info("Logged out successfully");
    },
  });

  return {
    sendMagicLink: magicLinkMutation.mutateAsync,
    isSendingMagicLink: magicLinkMutation.isPending,
    isMagicLinkSent: magicLinkMutation.isSuccess,
    magicLinkError: magicLinkMutation.error,

    loginGoogle: googleMutation.mutate,
    loginGithub: githubMutation.mutate,
    logout: logoutMutation.mutate,
  };
};
