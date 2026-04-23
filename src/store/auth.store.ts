import { create } from "zustand";
import { Subscription, User } from "@supabase/supabase-js";
import { supabase } from "@/supabase/client";

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  initializeAuthListener: () => Subscription;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  initialized: false,
  initializeAuthListener: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({
        user: session?.user ?? null,
        initialized: true,
        loading: false,
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      set({
        user: session?.user ?? null,
        loading: false,
        initialized: true,
      });
    });

    return subscription;
  },
}));
