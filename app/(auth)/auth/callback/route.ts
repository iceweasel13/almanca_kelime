import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) return NextResponse.redirect(`${origin}/auth`);

  const supabase = await createClient();
  const { error } =
    await supabase.auth.exchangeCodeForSession(code);

  if (error) return NextResponse.redirect(`${origin}/auth`);
  return NextResponse.redirect(`${origin}${next}`);
}
