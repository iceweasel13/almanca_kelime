// app/dashboard/profile/page.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

// shadcn chart (npx shadcn@latest add chart)
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
} from "recharts";

type StatCard = {
  label: string;
  value: number;
  sub: string;
  icon: React.ReactNode;
  iconBg: string;
  iconFg: string;
};

type LevelRow = {
  code: string;
  title: string;
  learned: number;
  total: number;
  colorClass: string; // progress bar color
};

const chartData = [
  { day: "Pzt", learned: 18 },
  { day: "Sal", learned: 22 },
  { day: "Çar", learned: 9 },
  { day: "Per", learned: 31 },
  { day: "Cum", learned: 14 },
  { day: "Cmt", learned: 27 },
  { day: "Bugün", learned: 35 },
];

const chartConfig: ChartConfig = {
  learned: {
    label: "Kelime",
    color: "var(--chart-3)",
  },
};

export default function ProfilePage() {
  // mock numbers
  const totalWords = 1250;
  const learnedWords = 420;
  const reviewWaiting = 15;
  const todayStudied = 35;

  const stats: StatCard[] = [
    {
      label: "TOPLAM",
      value: totalWords,
      sub: "Kelime",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M4 4h16v14H7l-3 3V4zm4 5h8v2H8V9zm0 4h6v2H8v-2z" />
        </svg>
      ),
      iconBg: "bg-blue-50",
      iconFg: "text-blue-600",
    },
    {
      label: "ÖĞRENİLEN",
      value: learnedWords,
      sub: "Kelime",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
        </svg>
      ),
      iconBg: "bg-emerald-50",
      iconFg: "text-emerald-600",
    },
    {
      label: "TEKRAR",
      value: reviewWaiting,
      sub: "Bekleyen",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 6V3L8 7l4 4V8c2.76 0 5 2.24 5 5a5 5 0 0 1-9.9 1H5.02A7 7 0 0 0 19 13c0-3.87-3.13-7-7-7z" />
        </svg>
      ),
      iconBg: "bg-orange-50",
      iconFg: "text-orange-600",
    },
    {
      label: "BUGÜN",
      value: todayStudied,
      sub: "Çalışılan",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2zm13 6H6v12h14V8z" />
        </svg>
      ),
      iconBg: "bg-violet-50",
      iconFg: "text-violet-600",
    },
  ];

  const levels: LevelRow[] = [
    {
      code: "A1.1",
      title: "Başlangıç",
      learned: 150,
      total: 150,
      colorClass: "bg-emerald-500",
    },
    {
      code: "A1.2",
      title: "Temel",
      learned: 120,
      total: 180,
      colorClass: "bg-blue-600",
    },
    {
      code: "A2.1",
      title: "Orta Öncesi",
      learned: 45,
      total: 200,
      colorClass: "bg-blue-600",
    },
    {
      code: "A2.2",
      title: "Orta",
      learned: 0,
      total: 220,
      colorClass: "bg-slate-300",
    },
  ];

  const learnedPct = Math.round(
    (learnedWords / totalWords) * 100
  );

  return (
    <div className="min-h-dvh bg-slate-100">
      {/* phone frame */}
      <div className="mx-auto flex min-h-dvh w-full max-w-[420px] flex-col bg-slate-100 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-4">
        {/* HEADER */}
        <header className="px-1 pb-2 pt-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-slate-900">
                Genel İlerleme
              </div>
              <div className="text-sm font-semibold text-slate-500">
                Tüm seviyelerdeki öğrenme durumun
              </div>
            </div>

            {/* settings icon removed intentionally */}
            <div className="h-9 w-9" />
          </div>
        </header>

        {/* STATS GRID */}
        <section className="mt-3 grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <Card
              key={s.label}
              className="rounded-2xl border-0 bg-white p-4 shadow-sm ring-1 ring-black/5"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-2xl",
                    s.iconBg,
                    s.iconFg
                  )}
                >
                  {s.icon}
                </div>
                <div className="text-xs font-extrabold tracking-widest text-slate-500">
                  {s.label}
                </div>
              </div>

              <div className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
                {s.value}
              </div>
              <div className="text-sm font-semibold text-slate-400">
                {s.sub}
              </div>
            </Card>
          ))}
        </section>

        {/* LEVEL PROGRESS */}
        <section className="mt-6">
          <div className="mb-3 text-base font-extrabold tracking-tight text-slate-900">
            Seviye Bazlı İlerleme
          </div>

          <Card className="rounded-2xl border-0 bg-white p-4 shadow-sm ring-1 ring-black/5">
            <div className="flex flex-col gap-4">
              {levels.map((l) => {
                const pct =
                  l.total === 0
                    ? 0
                    : Math.round(
                        (l.learned / l.total) * 100
                      );
                return (
                  <div key={l.code} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-extrabold text-slate-800">
                        {l.code} {l.title}
                      </div>
                      <div className="text-xs font-extrabold text-blue-600">
                        {l.learned}/{l.total} (%{pct})
                      </div>
                    </div>

                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div
                        className={cn(
                          "h-2 rounded-full",
                          l.colorClass
                        )}
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(0, pct)
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </section>

        {/* ACTIVITY CHART */}
        <section className="mt-6">
          <div className="mb-3 text-base font-extrabold tracking-tight text-slate-900">
            Çalışma Aktivitesi
          </div>

          <Card className="rounded-2xl border-0 bg-white p-4 shadow-sm ring-1 ring-black/5">
            <div className="text-sm font-extrabold text-slate-700">
              Son 7 Gün Çalışma
            </div>

            <div className="mt-4">
              <ChartContainer
                config={chartConfig}
                className="h-[180px] w-full"
              >
                <BarChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 8,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar
                    dataKey="learned"
                    fill="var(--color-learned)"
                    radius={8}
                  />
                </BarChart>
              </ChartContainer>

              <div className="mt-3 text-xs font-semibold text-slate-400">
                Bu hafta toplam{" "}
                <span className="font-extrabold text-slate-700">
                  {chartData.reduce(
                    (a, b) => a + b.learned,
                    0
                  )}
                </span>{" "}
                kelime çalıştın ·
              </div>
            </div>
          </Card>
        </section>

        {/* LOGOUT */}
        <div className="mt-auto pt-6">
          <Button
            className="h-14 w-full rounded-2xl bg-red-600 text-base font-extrabold text-white hover:bg-red-700"
            type="button"
            onClick={() => {
              // TODO: supabase.auth.signOut() + redirect
              // şimdilik mock:
              alert("Çıkış yapılacak (signOut bağlanmadı)");
            }}
          >
            Çıkış Yap
          </Button>
        </div>
      </div>
    </div>
  );
}
