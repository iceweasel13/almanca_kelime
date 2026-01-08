"use client";

import * as React from "react";
import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function AuthPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const supabase = React.useMemo(() => createClient(), []);

  const [email, setEmail] = React.useState("");
  const [loadingGoogle, setLoadingGoogle] =
    React.useState(false);
  const [loadingOtp, setLoadingOtp] = React.useState(false);
  const [error, setError] = React.useState<string | null>(
    null
  );

  // optional: /auth?error=... ile gelirse göster
  React.useEffect(() => {
    const err = sp.get("error");
    if (err) setError(decodeURIComponent(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isEmailValid = React.useMemo(() => {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  const handleGoogle = async () => {
    try {
      setError(null);
      setLoadingGoogle(true);

      const redirectTo = `${window.location.origin}/auth/callback`;

      const { error } = await supabase.auth.signInWithOAuth(
        {
          provider: "google",
          options: { redirectTo },
        }
      );

      if (error) setError(error.message);
      // başarılıysa supabase redirect yapar
    } catch (e) {
      setError(
        "Google ile giriş sırasında bir hata oluştu."
      );
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleSendOtp = async () => {
    try {
      setError(null);
      setLoadingOtp(true);

      // Magic link/OTP dönüşü callback’e gelsin
      const emailRedirectTo = `${window.location.origin}/auth/callback`;

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo },
      });

      if (error) {
        setError(error.message);
        return;
      }

      // Code-input ekranı (senin akışın)
      router.push(
        `/auth/otp?email=${encodeURIComponent(email)}`
      );
    } catch (e) {
      setError("Kod gönderilirken bir hata oluştu.");
    } finally {
      setLoadingOtp(false);
    }
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary">
      {/* Decorative header elements */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-linear-to-b from-primary/5 to-transparent" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      {/* Mobile container */}
      <div className="relative mx-auto flex min-h-dvh w-full flex-col overflow-hidden bg-background sm:my-6 sm:min-h-[800px] sm:max-w-[420px] sm:rounded-[32px] sm:border sm:border-border sm:shadow-2xl">
        <div className="relative z-10 flex h-full flex-col px-6 pb-8 pt-10">
          {/* Header */}
          <div className="mb-10 mt-6 flex flex-col items-center">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background shadow-sm">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 text-primary"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 10.2L4.24 9 12 4.8 19.76 9 12 13.2zM6 12.5v4.2c0 .8 2.7 2.3 6 2.3s6-1.5 6-2.3v-4.2l-6 3.3-6-3.3z" />
              </svg>
            </div>

            <h1 className="text-center text-[32px] font-bold leading-tight tracking-tight">
              Giriş Yap
            </h1>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              Almanca öğrenmeye devam et
            </p>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-5">
            {/* Error */}
            {error ? (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            ) : null}

            {/* Google login */}
            <Button
              className="relative h-14 w-full justify-center rounded-full shadow-lg shadow-primary/20"
              type="button"
              onClick={handleGoogle}
              disabled={loadingGoogle}
            >
              <span className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-sm">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </span>

              <span className="ml-8 text-base font-bold tracking-[0.015em]">
                {loadingGoogle
                  ? "Yönlendiriliyor..."
                  : "Google ile Giriş Yap"}
              </span>
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-4 py-2">
              <Separator className="flex-1" />
              <p className="text-sm font-medium text-muted-foreground">
                veya
              </p>
              <Separator className="flex-1" />
            </div>

            {/* Email OTP */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label
                  className="ml-2 text-sm font-bold"
                  htmlFor="email"
                >
                  E-posta
                </Label>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-muted-foreground">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[22px] w-[22px]"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>

                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="E-posta adresin"
                    className="h-14 rounded-full pl-14 text-base font-medium"
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="secondary"
                className="h-14 w-full rounded-full text-base font-bold"
                disabled={!isEmailValid || loadingOtp}
                onClick={handleSendOtp}
              >
                {loadingOtp
                  ? "Gönderiliyor..."
                  : "Tek Kullanımlık Kod Gönder (OTP)"}
              </Button>

              <p className="px-6 text-center text-xs leading-relaxed text-muted-foreground">
                Şifre yok. Mailine tek kullanımlık kod
                göndeririz.
              </p>
            </div>

            <div className="mt-auto" />

            <div className="mt-8 flex justify-center">
              <Link
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                Gizlilik Politikası ve Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
