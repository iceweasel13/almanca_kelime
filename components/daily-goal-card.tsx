import { cn } from "@/lib/utils";

type DailyGoalCardProps = {
  learnedToday: number;
  dailyGoal: number;
};

export function DailyGoalCard({
  learnedToday,
  dailyGoal,
}: DailyGoalCardProps) {
  const pct =
    dailyGoal <= 0
      ? 0
      : Math.min(
          100,
          Math.round((learnedToday / dailyGoal) * 100)
        );

  return (
    <section className="rounded-3xl bg-linear-to-br from-blue-600 to-indigo-600 p-5 text-white shadow-xl shadow-blue-600/20">
      <p className="text-xs font-bold tracking-widest text-white/85">
        GÜNLÜK HEDEF
      </p>

      <div className="mt-2 flex items-end gap-2">
        <span className="text-4xl font-extrabold leading-none">
          {learnedToday}
        </span>
        <span className="pb-1 text-base font-semibold text-white/85">
          / {dailyGoal} Kelime
        </span>
      </div>

      <div className="mt-4 h-2.5 w-full rounded-full bg-white/25">
        <div
          className={cn(
            "h-2.5 rounded-full bg-white transition-all"
          )}
          style={{ width: `${pct}%` }}
          aria-label="Günlük hedef ilerleme"
        />
      </div>
    </section>
  );
}
