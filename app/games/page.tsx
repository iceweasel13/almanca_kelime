// app/dashboard/games/page.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type GameId =
  | "artikel-avcisi"
  | "anlami-bul"
  | "eslestir-patlat";

type GameCard = {
  id: GameId;
  title: string;
  subtitle: string;
  emoji: string;
  headerBg: string;
  pattern: "dots" | "grid" | "confetti";
};

const GAMES: GameCard[] = [
  {
    id: "artikel-avcisi",
    title: "Artikel Avcısı",
    subtitle: "Doğru artikeli seç",
    emoji: "🎯",
    headerBg: "bg-cyan-50",
    pattern: "dots",
  },
  {
    id: "anlami-bul",
    title: "Anlamı Bul",
    subtitle: "Kelimenin doğru anlamını seç",
    emoji: "🧠",
    headerBg: "bg-fuchsia-50",
    pattern: "grid",
  },
  {
    id: "eslestir-patlat",
    title: "Eşleştir & Patlat",
    subtitle: "Kelimeleri doğru eşleştir",
    emoji: "🎈",
    headerBg: "bg-orange-50",
    pattern: "confetti",
  },
];

function patternBg(pattern: GameCard["pattern"]) {
  if (pattern === "dots") {
    return {
      backgroundImage:
        "radial-gradient(rgb(6 182 212 / 0.45) 2px, transparent 2px)",
      backgroundSize: "24px 24px",
    } as React.CSSProperties;
  }
  if (pattern === "grid") {
    return {
      backgroundImage:
        "linear-gradient(0deg, transparent 24%, rgb(168 85 247 / 0.35) 25%, rgb(168 85 247 / 0.35) 26%, transparent 27%, transparent 74%, rgb(168 85 247 / 0.35) 75%, rgb(168 85 247 / 0.35) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgb(168 85 247 / 0.35) 25%, rgb(168 85 247 / 0.35) 26%, transparent 27%, transparent 74%, rgb(168 85 247 / 0.35) 75%, rgb(168 85 247 / 0.35) 76%, transparent 77%, transparent)",
      backgroundSize: "40px 40px",
    } as React.CSSProperties;
  }
  return {
    backgroundImage:
      "radial-gradient(rgb(251 146 60 / 0.6) 3px, transparent 3px)",
    backgroundSize: "30px 30px",
  } as React.CSSProperties;
}

export default function GamesPage() {
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-slate-50">
      <div className="mx-auto flex min-h-dvh w-full max-w-[420px] flex-col bg-slate-50 px-6 pb-24 pt-6">
        <header className="mb-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Oyunlar
          </h1>
          <p className="mt-1 text-lg font-medium text-slate-500">
            Oynayarak öğren
          </p>
        </header>

        <main className="flex flex-col gap-6">
          {GAMES.map((g) => (
            <article
              key={g.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={cn(
                  "relative flex h-44 w-full items-center justify-center overflow-hidden",
                  g.headerBg
                )}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={patternBg(g.pattern)}
                />
                <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl" />
                <div className="relative z-10 text-[80px] leading-none transition-transform duration-500 group-hover:scale-110">
                  {g.emoji}
                </div>
              </div>

              <div className="flex flex-col gap-4 p-5">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {g.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {g.subtitle}
                  </p>
                </div>

                <Button
                  onClick={() =>
                    router.push(
                      `/dashboard/games/${g.id}/setup`
                    )
                  }
                  className="h-11 w-full gap-2 rounded-xl bg-blue-600 text-white shadow-[0_4px_10px_rgba(37,99,235,0.2)] hover:bg-blue-700"
                >
                  <Play className="h-5 w-5" />
                  Oyna
                </Button>
              </div>
            </article>
          ))}
        </main>
      </div>
    </div>
  );
}
