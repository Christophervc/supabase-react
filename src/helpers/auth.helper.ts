import { supabase } from "@/supabase/client";
import type { User } from "@supabase/supabase-js";

let cachedUser: User | null = null;
let isLoading = false;
let loadingPromise: Promise<User | null> | null = null;

export const getCurrentUser = async (): Promise<User | null> => {
  if (cachedUser) return cachedUser;
  if (isLoading && loadingPromise) return loadingPromise;

  isLoading = true;
  loadingPromise = callGetUser();
  const user = await loadingPromise;
  isLoading = false;
  loadingPromise = null;
  return user;
};

async function callGetUser(): Promise<User | null> {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error);
      return null;
    }
    cachedUser = user;
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export function clearUserCache() {
  cachedUser = null;
}

export function setUserCache(user: User | null): void {
  cachedUser = user;
}

export function initAuthListener() {
  supabase.auth.onAuthStateChange((event, session) => {
    if (
      event === "SIGNED_IN" ||
      event === "SIGNED_OUT" ||
      event === "TOKEN_REFRESHED"
    ) {
      cachedUser = session?.user ?? null;
    }
  });
}
