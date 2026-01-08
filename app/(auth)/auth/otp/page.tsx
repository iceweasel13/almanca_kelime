"use client";

import * as React from "react";
import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function OtpPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const supabase = React.useMemo(() => createClient(), []);

  const email = React.useMemo(
    () => (sp.get("email") ?? "").trim().toLowerCase(),
    [sp]
  );

  const [code, setCode] = React.useState("");
  const [loadingVerify, setLoadingVerify] =
    React.useState(false);
  const [loadingResend, setLoadingResend] =
    React.useState(false);
  const [error, setError] = React.useState<string | null>(
    null
  );

  const [cooldown, setCooldown] = React.useState(30);

  // cooldown timer
  React.useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(
      () => setCooldown((s) => s - 1),
      1000
    );
    return () => clearInterval(t);
  }, [cooldown]);

  // email yoksa auth'a geri
  React.useEffect(() => {
    if (!email) {
      router.replace(
        "/auth?error=" +
          encodeURIComponent(
            "E-posta bulunamadı. Lütfen tekrar deneyin."
          )
      );
    }
  }, [email, router]);

  const handleVerify = async () => {
    if (!email) return;
    if (code.length !== 6) {
      setError("Lütfen 6 haneli kodu gir.");
      return;
    }

    try {
      setError(null);
      setLoadingVerify(true);

      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });

      if (error) {
        setError(
          error.message || "Kod hatalı veya süresi dolmuş."
        );
        return;
      }

      router.replace("/dashboard");
    } catch {
      setError("Doğrulama sırasında bir hata oluştu.");
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    if (cooldown > 0) return;

    try {
      setError(null);
      setLoadingResend(true);

      const emailRedirectTo = `${window.location.origin}/auth/callback`;

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo },
      });

      if (error) {
        setError(error.message);
        return;
      }

      setCooldown(30);
    } catch {
      setError("Kod tekrar gönderilirken bir hata oluştu.");
    } finally {
      setLoadingResend(false);
    }
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary">
      {/* soft bg */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-linear-to-b from-primary/5 to-transparent" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-dvh w-full flex-col overflow-hidden bg-background sm:my-6 sm:min-h-[800px] sm:max-w-[420px] sm:rounded-[32px] sm:border sm:border-border sm:shadow-2xl">
        {/* top nav */}
        <header className="flex items-center justify-between p-6 pt-8">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={() => router.back()}
          >
            <span className="sr-only">Geri</span>
            {/* arrow_left */}
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </Button>

          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-primary/20" />
            <div className="h-1.5 w-6 rounded-full bg-primary" />
            <div className="h-1.5 w-1.5 rounded-full bg-primary/20" />
          </div>

          <div className="h-10 w-10" />
        </header>

        <main className="flex flex-1 flex-col px-6 pb-8 pt-2">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              {/* mail icon */}
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>

            <h1 className="mb-3 text-3xl font-bold tracking-tight">
              Kodu Doğrula
            </h1>
            <p className="mx-auto max-w-[280px] text-base leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">
                {email}
              </span>{" "}
              adresine gönderilen 6 haneli kodu gir.
            </p>
          </div>

          {error ? (
            <div className="mb-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          <div className="mx-auto flex w-full max-w-[360px] flex-col items-center space-y-8">
            {/* OTP input */}
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(v) => {
                setError(null);
                setCode(v);
              }}
              inputMode="numeric"
              pattern="^[0-9]+$"
              containerClassName="justify-center"
              onComplete={() => {
                // otomatik verify istersen:
                // void handleVerify()
              }}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {/* verify button */}
            <div className="w-full pt-2">
              <Button
                className="h-14 w-full rounded-full text-base font-bold shadow-lg shadow-primary/20"
                onClick={handleVerify}
                disabled={
                  loadingVerify || code.length !== 6
                }
              >
                {loadingVerify
                  ? "Kontrol ediliyor..."
                  : "Giriş Yap"}
              </Button>
            </div>

            {/* resend */}
            <div className="text-center text-sm text-muted-foreground">
              Kodu almadın mı?
              <div className="mt-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="h-auto px-2 py-1 font-medium text-primary hover:text-primary"
                  onClick={handleResend}
                  disabled={loadingResend || cooldown > 0}
                >
                  {loadingResend
                    ? "Gönderiliyor..."
                    : `Tekrar gönder${
                        cooldown > 0
                          ? ` (00:${String(
                              cooldown
                            ).padStart(2, "0")})`
                          : ""
                      }`}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-10" />

          <div className="mt-8 flex justify-center">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              Gizlilik Politikası ve Kullanım Şartları
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
