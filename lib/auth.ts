import { createServerClientInstance } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { User } from "@supabase/supabase-js";

export async function getUser(): Promise<User | null> {
  try {
    const supabase = await createServerClientInstance();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function getSession() {
  try {
    const supabase = await createServerClientInstance();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch {
    return null;
  }
}
