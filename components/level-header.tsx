"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type LevelHeaderProps = {
  code: string; // A1.1
  title: string; // Beginner
  languageLabel?: string; // German (sabit)
  unitCount: number; // 4
  learned: number; // 15
  total: number; // 45
};

export function LevelHeader({
  code,
  title,
  languageLabel = "German",
  unitCount,
  learned,
  total,
}: LevelHeaderProps) {
  const router = useRouter();
  const pct =
    total <= 0
      ? 0
      : Math.min(100, Math.round((learned / total) * 100));

  return (
    <section className=" bg-slate-50 p-5 ">
      {/* top bar */}
      <div className="relative flex items-center justify-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="absolute -left-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full "
        >
          <span className="sr-only">Geri</span>
          <ArrowLeft className="h-6 w-6" />
        </Button>

        <div className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
          {code}
        </div>

        {/* sağ taraf spacer: başlığın ortada kalması için */}
        <div className="absolute right-0 top-1/2 h-11 w-11 -translate-y-1/2" />
      </div>

      {/* title row */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
            {languageLabel} • {unitCount} Units
          </p>
        </div>

        <div className="text-3xl font-extrabold text-blue-600">
          {pct}%
        </div>
      </div>

      {/* progress */}
      <div className="mt-4">
        <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-3 rounded-full bg-blue-600 transition-all"
            style={{ width: `${pct}%` }}
            aria-label="Seviye ilerleme"
          />
        </div>
      </div>
    </section>
  );
}
