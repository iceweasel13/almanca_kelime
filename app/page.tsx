// app/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  // session yoksa welcome'a
  if (error || !data?.user) {
    redirect("/welcome");
  }

  // session varsa dashboard'a
  redirect("/dashboard");
}
