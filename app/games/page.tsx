// app/dashboard/games/page.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronRight, Play, X } from "lucide-react";

type GameId =
  | "artikel-avcisi"
  | "anlami-bul"
  | "eslestir-patlat";

type GameCard = {
  id: GameId;
  title: string;
  subtitle: string;
  emoji: string;
  // tailwind bg for the top image area
  headerBg: string;
  // optional decorative pattern style
  pattern: "dots" | "grid" | "confetti";
};

type LevelKey =
  | "a1-1"
  | "a1-2"
  | "a2-1"
  | "a2-2"
  | "b1-1"
  | "b1-2";

type LevelMeta = {
  key: LevelKey;
  code: string; // A1.1 etc
  title: string; // Başlangıç etc
  percent: number; // 0-100
};

type UnitMeta = {
  unitNo: number;
  name: string;
  words: number;
  minutes: number;
  progressPct: number;
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

const LEVELS: LevelMeta[] = [
  {
    key: "a1-1",
    code: "A1.1",
    title: "Başlangıç",
    percent: 45,
  },
  {
    key: "a1-2",
    code: "A1.2",
    title: "Temel",
    percent: 10,
  },
  {
    key: "a2-1",
    code: "A2.1",
    title: "Orta Öncesi",
    percent: 22,
  },
  { key: "a2-2", code: "A2.2", title: "Orta", percent: 0 },
  { key: "b1-1", code: "B1.1", title: "İleri", percent: 0 },
  {
    key: "b1-2",
    code: "B1.2",
    title: "İleri 2",
    percent: 0,
  },
];

// Mock units per level (sonra DB’den gelecek)
const UNITS_BY_LEVEL: Record<LevelKey, UnitMeta[]> = {
  "a1-1": [
    {
      unitNo: 1,
      name: "Tanışma",
      words: 25,
      minutes: 5,
      progressPct: 80,
    },
    {
      unitNo: 2,
      name: "Sayılar",
      words: 30,
      minutes: 7,
      progressPct: 15,
    },
    {
      unitNo: 3,
      name: "Yiyecekler",
      words: 45,
      minutes: 10,
      progressPct: 0,
    },
  ],
  "a1-2": [
    {
      unitNo: 1,
      name: "Aile",
      words: 35,
      minutes: 8,
      progressPct: 0,
    },
    {
      unitNo: 2,
      name: "Günlük Rutin",
      words: 40,
      minutes: 10,
      progressPct: 0,
    },
    {
      unitNo: 3,
      name: "Saatler",
      words: 28,
      minutes: 6,
      progressPct: 0,
    },
  ],
  "a2-1": [
    {
      unitNo: 1,
      name: "Şehir",
      words: 60,
      minutes: 12,
      progressPct: 0,
    },
    {
      unitNo: 2,
      name: "Alışveriş",
      words: 55,
      minutes: 12,
      progressPct: 0,
    },
  ],
  "a2-2": [
    {
      unitNo: 1,
      name: "Seyahat",
      words: 70,
      minutes: 14,
      progressPct: 0,
    },
    {
      unitNo: 2,
      name: "Sağlık",
      words: 65,
      minutes: 13,
      progressPct: 0,
    },
  ],
  "b1-1": [
    {
      unitNo: 1,
      name: "İş Hayatı",
      words: 80,
      minutes: 16,
      progressPct: 0,
    },
    {
      unitNo: 2,
      name: "Haberler",
      words: 90,
      minutes: 18,
      progressPct: 0,
    },
  ],
  "b1-2": [
    {
      unitNo: 1,
      name: "Tartışma",
      words: 100,
      minutes: 20,
      progressPct: 0,
    },
    {
      unitNo: 2,
      name: "Sunum",
      words: 95,
      minutes: 19,
      progressPct: 0,
    },
  ],
};

function ringStyle(percent: number) {
  // conic-gradient ile ring
  return {
    background: `conic-gradient(rgb(37 99 235) ${
      percent * 3.6
    }deg, rgb(226 232 240) 0deg)`,
  } as React.CSSProperties;
}

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

  const [open, setOpen] = React.useState(false);
  const [activeGame, setActiveGame] =
    React.useState<GameCard | null>(null);

  const [selectedLevel, setSelectedLevel] =
    React.useState<LevelKey | null>(null);
  const [selectedUnit, setSelectedUnit] = React.useState<
    number | null
  >(null);

  const units = selectedLevel
    ? UNITS_BY_LEVEL[selectedLevel]
    : [];
  const openUnitsCount = units.length;

  const canStart = Boolean(
    activeGame && selectedLevel && selectedUnit
  );

  const openPicker = (game: GameCard) => {
    setActiveGame(game);
    setSelectedLevel(null);
    setSelectedUnit(null);
    setOpen(true);
  };

  const startGame = () => {
    if (!activeGame || !selectedLevel || !selectedUnit)
      return;
    setOpen(false);
    router.push(
      `/dashboard/games/${activeGame.id}?level=${selectedLevel}&unit=${selectedUnit}`
    );
  };

  return (
    <div className="min-h-dvh bg-slate-50">
      {/* phone frame */}
      <div className="mx-auto flex min-h-dvh w-full max-w-[420px] flex-col bg-slate-50 px-6 pb-24 pt-6">
        {/* header */}
        <header className="mb-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Oyunlar
          </h1>
          <p className="mt-1 text-lg font-medium text-slate-500">
            Oynayarak öğren
          </p>
        </header>

        {/* game cards */}
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
                  onClick={() => openPicker(g)}
                  className="h-11 w-full gap-2 rounded-xl bg-blue-600 text-white shadow-[0_4px_10px_rgba(37,99,235,0.2)] hover:bg-blue-700"
                >
                  <Play className="h-5 w-5" />
                  Oyna
                </Button>
              </div>
            </article>
          ))}
        </main>

        {/* Selection Dialog (Ortak) */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-[420px] rounded-3xl p-0">
            <div className="rounded-3xl bg-white">
              <DialogHeader className="px-5 pt-5">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-base font-extrabold text-slate-900">
                    Seviye ve Ünite
                  </DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full"
                    onClick={() => setOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {activeGame
                    ? `${activeGame.title} için seviye ve ünite seç`
                    : "Devam etmek için seçim yap"}
                </p>
              </DialogHeader>

              <div className="mt-3 border-t border-slate-100" />

              {/* Step 1: Levels */}
              <section className="px-5 pt-4">
                <h2 className="text-sm font-extrabold text-slate-900">
                  Seviye Seçin
                </h2>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  {LEVELS.map((lvl) => {
                    const active =
                      selectedLevel === lvl.key;
                    return (
                      <button
                        key={lvl.key}
                        type="button"
                        onClick={() => {
                          setSelectedLevel(lvl.key);
                          setSelectedUnit(null);
                        }}
                        className={cn(
                          "relative rounded-2xl bg-white p-4 text-left ring-1 transition",
                          active
                            ? "ring-blue-600 shadow-[0_8px_22px_rgba(37,99,235,0.14)]"
                            : "ring-slate-200 hover:ring-slate-300"
                        )}
                      >
                        {/* ring progress */}
                        <div className="flex items-center justify-between">
                          <div
                            className="relative h-12 w-12 rounded-full p-[3px]"
                            style={ringStyle(lvl.percent)}
                          >
                            <div className="grid h-full w-full place-items-center rounded-full bg-white">
                              <span className="text-xs font-extrabold text-slate-900">
                                {lvl.code.split(".")[0]}
                              </span>
                            </div>
                          </div>

                          {active ? (
                            <div className="grid h-6 w-6 place-items-center rounded-full bg-blue-600 text-white">
                              <span className="text-[12px] font-black">
                                ✓
                              </span>
                            </div>
                          ) : (
                            <div className="h-6 w-6" />
                          )}
                        </div>

                        <div className="mt-3">
                          <div className="text-base font-extrabold text-slate-900">
                            {lvl.title}
                          </div>
                          <div className="mt-1 text-xs font-bold text-slate-500">
                            %{lvl.percent} Tamamlandı
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Step 2: Units */}
              <section className="px-5 pb-5 pt-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-extrabold text-slate-900">
                    Üniteler{" "}
                    {selectedLevel
                      ? `(${selectedLevel
                          .toUpperCase()
                          .replace("-", ".")})`
                      : ""}
                  </h2>
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-blue-50 text-blue-700"
                  >
                    {selectedLevel
                      ? `${openUnitsCount} Ünite Açık`
                      : "Seviye seç"}
                  </Badge>
                </div>

                <div
                  className={cn(
                    "mt-3 space-y-3 overflow-auto pr-1",
                    "max-h-[260px]"
                  )}
                  style={{
                    scrollbarWidth: "thin",
                  }}
                >
                  {selectedLevel ? (
                    units.map((u) => {
                      const active =
                        selectedUnit === u.unitNo;
                      return (
                        <button
                          key={`${selectedLevel}-${u.unitNo}`}
                          type="button"
                          onClick={() =>
                            setSelectedUnit(u.unitNo)
                          }
                          className={cn(
                            "w-full rounded-2xl bg-white p-4 text-left shadow-sm ring-1 transition",
                            active
                              ? "ring-blue-600"
                              : "ring-slate-200 hover:ring-slate-300"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                                <span className="text-sm font-extrabold">
                                  {u.unitNo}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-extrabold text-slate-900">{`Ünite ${u.unitNo}: ${u.name}`}</div>
                                <div className="mt-1 text-xs font-bold text-slate-500">
                                  {u.words} Kelime •{" "}
                                  {u.minutes} dk
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="text-xs font-extrabold text-slate-500">
                                {u.progressPct}%
                              </div>
                              <ChevronRight className="h-5 w-5 text-slate-300" />
                            </div>
                          </div>

                          <div className="mt-3">
                            <Progress
                              value={u.progressPct}
                              className="h-2 bg-slate-200"
                            />
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-500">
                      Üniteleri görmek için önce seviye seç.
                    </div>
                  )}
                </div>

                {/* Start Button */}
                <Button
                  onClick={startGame}
                  disabled={!canStart}
                  className={cn(
                    "mt-5 h-12 w-full rounded-2xl text-base font-extrabold",
                    "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400"
                  )}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Oyuna Başla
                </Button>
              </section>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
