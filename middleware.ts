import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@/utils/supabase/middleware";
import { redirect } from "next/navigation";

export async function middleware(request: NextRequest) {
  const { supabase, response } =
    createMiddlewareClient(request);

  const { data } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAuthed = !!data.user;

  // auth sayfaları
  const isAuthRoute =
    pathname === "/auth" || pathname.startsWith("/auth/");
  // korumalı sayfalar
  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/study") ||
    pathname.startsWith("/games") ||
    pathname.startsWith("/cards") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/rank");

  // Korumalı sayfalara giriş yapmadan erişim engellenir
  if (isProtected && !isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  // Giriş yapmış kullanıcılar auth sayfasına gidemez
  if (isAuthRoute && isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Giriş yapmış kullanıcılar ana sayfadan dashboard'a yönlendirilir
  if (pathname === "/" && isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
