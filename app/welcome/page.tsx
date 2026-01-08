// app/(auth)/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden select-none bg-background text-foreground">
      {/* Background Gradient Effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[50%] rounded-full bg-primary/10 blur-[100px] opacity-70" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[60%] rounded-full bg-primary/10 blur-[100px] opacity-70" />
      </div>

      {/* Page Shell */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-0 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        {/* Top Section: Logo & Brand */}
        <div className="flex flex-none flex-col items-center justify-center pt-8 pb-4">
          <div className="mb-4 flex h-16 w-16 rotate-3 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
            {/* Material icon yerine shadcn/lucide */}
            <svg
              viewBox="0 0 24 24"
              className="h-10 w-10 text-primary-foreground"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
          </div>

          <h1 className="px-4 text-center text-[32px] font-bold leading-tight tracking-tight">
            Deutsch Flash
          </h1>
        </div>

        {/* Middle Section: Hero Illustration & Slogan */}
        <div className="relative flex flex-1 flex-col items-center justify-center px-6">
          <div className="relative mb-6 aspect-square w-full max-w-[320px]">
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-primary/5 to-primary/20" />

            {/* Next/Image de olur; burada sade tuttum */}
            <div
              aria-label="Illustration of a happy student learning German vocabulary with flashcards"
              className="absolute inset-0 z-10 h-full w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBEWvWC3aBbcgzOW424lGTMw0qHg0Pc7yWusuo1Hz1Z_HzcbXQZLkg482DUTU1OGQPw2HupiOHGmCWAXFGc7tQNd59EQ90JafTiLMWvMtY1LBCXT771Sv1DSlC11lgyTr9ImUX0hP4uq3RdKk41B_3UDiSV0z8xg8J_RH7DQgy8wAHYCa3-SR0ZStRYt1ppTSQvSoqsa_d9weBooBlSl8i051e6B5Sx3fblKcMhvO6eIrXCBvgS1SJnsExwOKnxZNMq5XQOyAC3CQ")',
              }}
            />
          </div>

          <div className="mx-auto max-w-[280px] text-center">
            <h2 className="text-xl font-medium leading-relaxed tracking-[-0.015em] text-muted-foreground">
              Almanca kelimeleri
              <br />
              oyunlarla öğren
            </h2>
          </div>
        </div>

        {/* Bottom Section: Actions */}
        <div className="flex w-full flex-none flex-col gap-4 px-6 py-6 pb-8">
          <Button
            asChild
            size="lg"
            className="h-14 w-full rounded-full shadow-xl shadow-primary/20 active:scale-[0.98] transition"
          >
            <Link
              href="/auth"
              className="flex items-center justify-center gap-2"
            >
              <span className="text-lg font-bold tracking-wide">
                Giriş Yap
              </span>
              <span
                aria-hidden
                className="translate-x-0 transition-transform group-hover:translate-x-1"
              >
                {/* ok ikonu */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
                </svg>
              </span>
            </Link>
          </Button>

          <div className="px-2 text-center">
            <p className="text-sm leading-normal text-muted-foreground">
              Hesabın yok mu?{" "}
              <span className="font-medium text-primary">
                Giriş yaparak otomatik oluşturulur.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
