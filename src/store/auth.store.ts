/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { supabase } from "../supabase/client";
import { User } from "@supabase/supabase-js";
import { loginWithGoogle,  loginWithGitHub , loginWithMagicLink } from "@/services/auth.service";

interface AuthState {
  user: User | null;
  loading: boolean;
  sent: boolean;
  error: string | null;
  initialized: boolean;
  getUser: () => Promise<User | null>;
  logout: () => Promise<void>;
  loginWithMagicLink: (email: string) => Promise<void>;
  loginWithGitHub: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
  const initialize = async () => {
    try {
      set({ loading: true });
      const { data, error } = await supabase.auth.getUser();

      if (error) throw error;

      set({ user: data.user, loading: false, initialized: true });
    } catch (error: any) {
      console.error("Auth initialization error:", error);
      set({ error: error.message, loading: false, initialized: true });
    }
  };

  initialize();


  return {
    user: null,
    loading: true,
    error: null,
    initialized: false,
    sent: false,

    loginWithMagicLink: async (email: string) => {
      try {
        set({ loading: true, error: null, sent: false });
        await loginWithMagicLink(email);
        set({ loading: false, sent: true });
      } catch (error: any) {
        console.log(error);
        set({ error: error.message, loading: false, sent: false });
      }
    },

    loginWithGitHub: async () => {
      try {
        set({ loading: true, error: null });
        await loginWithGitHub();
        set({ loading: false });
      } catch (error: any) {
        console.error("Error logging in with GitHub:", error);
        set({ error: error.message, loading: false });
      }
    },

    loginWithGoogle: async () => {
      try {
        set({ loading: true, error: null });
        await loginWithGoogle();
        set({ loading: false });
      } catch (error: any) {
        console.error("Error logging in with Google:", error);
        set({ error: error.message, loading: false });
      }
    },

    getUser: async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) throw error;

        set({ user: data.user });
        return data.user;
      } catch (error: any) {
        set({ error: error.message });
        return null;
      }
    },

    logout: async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        set({ user: null });
      } catch (error: any) {
        set({ error: error.message });
      }
    },
  };
});
