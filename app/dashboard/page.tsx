// app/(app)/dashboard/page.tsx

import { DailyGoalCard } from "@/components/daily-goal-card";
import { CourseCard } from "@/components/course-card";

export default function DashboardPage() {
  const learnedToday = 15;
  const dailyGoal = 30;

  const courses = [
    {
      code: "A1.1",
      title: "Başlangıç",
      unitsCount: 12,
      subtitle: "Bugün: 15 kelime",
      progressPct: 85,
      href: "/dashboard/a1-1",
      tone: "blue" as const,
    },
    {
      code: "A1.2",
      title: "Başlangıç 2",
      unitsCount: 10,
      subtitle: "Henüz çalışılmadı",
      progressPct: 40,
      href: "/dashboard/a1-2",
      tone: "purple" as const,
    },
    {
      code: "A2.1",
      title: "Temel",
      unitsCount: 14,
      subtitle: "Henüz çalışılmadı",
      progressPct: 10,
      href: "/dashboard/a2-1",
      tone: "mint" as const,
    },
    {
      code: "A2.2",
      title: "Temel 2",
      unitsCount: 11,
      subtitle: "Bugün: 4 kelime",
      progressPct: 22,
      href: "/dashboard/a2-2",
      tone: "blue" as const,
    },
    {
      code: "B1.1",
      title: "Orta Seviye",
      unitsCount: 16,
      subtitle: "Bugün: 0 kelime",
      progressPct: 55,
      href: "/dashboard/b1-1",
      tone: "purple" as const,
    },
    {
      code: "B1.2",
      title: "Orta Seviye 2",
      unitsCount: 15,
      subtitle: "Henüz çalışılmadı",
      progressPct: 5,
      href: "/dashboard/b1-2",
      tone: "mint" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 bg-slate-50 min-h-dvh">
      {/* Title */}
      <header className="pt-2">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Ana Sayfa
        </h1>
      </header>

      {/* Daily goal */}
      <DailyGoalCard
        learnedToday={learnedToday}
        dailyGoal={dailyGoal}
      />

      {/* Courses */}
      <section className="space-y-3">
        <h2 className="text-lg font-extrabold">Kurslar</h2>

        <div className="space-y-3">
          {courses.map((c) => (
            <CourseCard
              key={c.code}
              code={c.code}
              title={c.title}
              unitsCount={c.unitsCount}
              subtitle={c.subtitle}
              progressPct={c.progressPct}
              href={c.href}
              tone={c.tone}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
