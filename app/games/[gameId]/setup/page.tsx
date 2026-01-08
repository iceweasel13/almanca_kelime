// app/dashboard/games/[gameId]/setup/page.tsx
"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Play,
  ChevronRight,
} from "lucide-react";

type LevelKey =
  | "a1-1"
  | "a1-2"
  | "a2-1"
  | "a2-2"
  | "b1-1"
  | "b1-2";

type LevelMeta = {
  key: LevelKey;
  code: string;
  title: string;
  percent: number;
};
type UnitMeta = {
  unitNo: number;
  name: string;
  words: number;
  minutes: number;
  progressPct: number;
};

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
  return {
    background: `conic-gradient(rgb(37 99 235) ${
      percent * 3.6
    }deg, rgb(226 232 240) 0deg)`,
  } as React.CSSProperties;
}

export default function GameSetupPage() {
  const router = useRouter();
  const params = useParams<{ gameId: string }>();
  const gameId = params.gameId;

  const [selectedLevel, setSelectedLevel] =
    React.useState<LevelKey | null>(null);
  const [selectedUnit, setSelectedUnit] = React.useState<
    number | null
  >(null);

  const units = selectedLevel
    ? UNITS_BY_LEVEL[selectedLevel]
    : [];
  const canStart = Boolean(selectedLevel && selectedUnit);

  const start = () => {
    if (!selectedLevel || !selectedUnit) return;
    router.push(
      `/dashboard/games/${gameId}?level=${selectedLevel}&unit=${selectedUnit}`
    );
  };

  return (
    <div className="min-h-dvh bg-slate-50">
      <div className="mx-auto flex min-h-dvh w-full max-w-[420px] flex-col bg-slate-50 px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-4">
        {/* Header (geri + başlık) */}
        <header className="rounded-3xl bg-white px-4 pt-4 shadow-sm ring-1 ring-black/5">
          <div className="relative flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 h-10 w-10 rounded-2xl"
              onClick={() => router.back()}
              type="button"
            >
              <span className="sr-only">Geri</span>
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="text-sm font-extrabold tracking-tight text-slate-900">
              Seviye ve Ünite
            </div>
          </div>

          <div className="pb-4 pt-3">
            <div className="text-2xl font-extrabold tracking-tight text-slate-900">
              Seviye Seçin
            </div>
          </div>
        </header>

        {/* Levels */}
        <section className="mt-4">
          <div className="grid grid-cols-2 gap-3">
            {LEVELS.map((lvl) => {
              const active = selectedLevel === lvl.key;
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

        {/* Units */}
        <section className="mt-5">
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
                ? `${units.length} Ünite Açık`
                : "Seviye seç"}
            </Badge>
          </div>

          <div
            className="mt-3 space-y-3 overflow-auto pr-1"
            style={{
              maxHeight: 260,
              scrollbarWidth: "thin",
            }}
          >
            {selectedLevel ? (
              units.map((u) => {
                const active = selectedUnit === u.unitNo;
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
                            {u.words} Kelime • {u.minutes}{" "}
                            dk
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

          <Button
            onClick={start}
            disabled={!canStart}
            className={cn(
              "mt-5 h-14 w-full rounded-2xl text-base font-extrabold",
              "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400"
            )}
          >
            <Play className="mr-2 h-5 w-5" />
            Oyuna Başla
          </Button>
        </section>
      </div>
    </div>
  );
}
