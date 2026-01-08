// app/dashboard/rank/page.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

type RankUser = {
  id: string;
  name: string;
  learned: number;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "U";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

function format(n: number) {
  return n.toLocaleString("tr-TR");
}

export default function RankPage() {
  const meId = "me";

  // mock data (learned desc)
  const users: RankUser[] = [
    { id: meId, name: "Nihat", learned: 420 },
    {
      id: "u2",
      name: "Ayşe Demir",
      learned: 512,
    },
    {
      id: "u3",
      name: "Mehmet Kaya",
      learned: 498,
    },
    {
      id: "u4",
      name: "Elif Yılmaz",
      learned: 465,
    },
    {
      id: "u5",
      name: "Can Arslan",
      learned: 440,
    },
    {
      id: "u6",
      name: "Zeynep Şahin",
      learned: 401,
    },
    {
      id: "u7",
      name: "Kerem Aydın",
      learned: 372,
    },
    {
      id: "u8",
      name: "Ece Aksoy",
      learned: 318,
    },
    { id: "u9", name: "Mert Koç", learned: 287 },
    {
      id: "u10",
      name: "Selin Öz",
      learned: 255,
    },
    {
      id: "u11",
      name: "Bora Çelik",
      learned: 210,
    },
  ]
    .slice()
    .sort((a, b) => b.learned - a.learned);

  const top3 = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <div className="min-h-dvh bg-slate-100">
      {/* phone frame */}
      <div className="mx-auto flex min-h-dvh w-full max-w-[420px] flex-col bg-slate-100 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-4">
        {/* HEADER */}
        <header className="pt-2">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Sıralama
          </h1>
        </header>

        {/* TOP 3 */}
        <section className="mt-3 grid grid-cols-3 gap-3">
          {top3.map((u, i) => {
            const rank = i + 1;
            return (
              <Card
                key={u.id}
                className={cn(
                  "rounded-2xl border-0 bg-white p-3 shadow-sm ring-1 ring-black/5",
                  u.id === meId && "ring-2 ring-primary/30"
                )}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "rounded-full px-2 py-1 text-xs font-extrabold",
                      rank === 1 &&
                        "bg-amber-50 text-amber-700",
                      rank === 2 &&
                        "bg-slate-100 text-slate-700",
                      rank === 3 &&
                        "bg-orange-50 text-orange-700"
                    )}
                  >
                    #{rank}
                  </div>
                </div>

                <div className="mt-2 line-clamp-1 text-sm font-extrabold text-slate-900">
                  {u.name}
                </div>

                <div className="mt-2">
                  <div className="text-lg font-extrabold tracking-tight text-slate-900">
                    {format(u.learned)}
                  </div>
                  <div className="text-xs font-semibold text-slate-400">
                    Kelime
                  </div>
                </div>
              </Card>
            );
          })}
        </section>

        {/* LIST (scroll inside, thin scrollbar) */}
        <section className="mt-4">
          <Card className="rounded-2xl border-0 bg-white p-2 shadow-sm ring-1 ring-black/5">
            {/* thin scrollbar styles */}
            <div
              className={cn(
                "max-h-[420px] overflow-y-auto pr-1",
                "[scrollbar-width:thin] [scrollbar-color:rgba(15,23,42,0.25)_transparent]",
                "[&::-webkit-scrollbar]:w-1.5",
                "[&::-webkit-scrollbar-track]:bg-transparent",
                "[&::-webkit-scrollbar-thumb]:rounded-full",
                "[&::-webkit-scrollbar-thumb]:bg-slate-300/70",
                "dark:[scrollbar-color:rgba(148,163,184,0.35)_transparent]",
                "dark:[&::-webkit-scrollbar-thumb]:bg-slate-600/50"
              )}
            >
              <div className="flex flex-col gap-2">
                {rest.map((u, idx) => {
                  const rank = idx + 4;
                  const isMe = u.id === meId;

                  return (
                    <div
                      key={u.id}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-3 py-3",
                        "bg-slate-50/60 hover:bg-slate-50 transition-colors",
                        isMe &&
                          "bg-primary/5 ring-1 ring-primary/20"
                      )}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="w-8 text-sm font-extrabold text-slate-500">
                          #{rank}
                        </div>

                        <div className="min-w-0">
                          <div className="truncate text-sm font-extrabold text-slate-900">
                            {u.name}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-extrabold text-slate-900">
                          {format(u.learned)}
                        </div>
                        <div className="text-xs font-semibold text-slate-400">
                          Kelime
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
