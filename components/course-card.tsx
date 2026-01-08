import Link from "next/link";
import { cn } from "@/lib/utils";

type CourseCardProps = {
  code: string;
  title: string;
  unitsCount: number;
  subtitle?: string;
  progressPct: number;
  href: string;
  tone?: "blue" | "purple" | "mint";
};

const toneChip = {
  blue: "bg-blue-50 text-blue-600",
  purple: "bg-purple-50 text-purple-600",
  mint: "bg-emerald-50 text-emerald-600",
} as const;

const toneRing = {
  blue: "text-blue-600",
  purple: "text-purple-600",
  mint: "text-emerald-600",
} as const;

export function CourseCard({
  code,
  title,
  unitsCount,
  subtitle,
  progressPct,
  href,
  tone = "blue",
}: CourseCardProps) {
  const pct = Math.max(
    0,
    Math.min(100, Math.round(progressPct))
  );

  return (
    <Link
      href={href}
      className="block rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition hover:shadow-md active:scale-[0.99] dark:bg-slate-900 dark:ring-white/10"
    >
      <div className="flex items-center justify-between gap-4">
        {/* left */}
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-extrabold",
              toneChip[tone]
            )}
          >
            {code}
          </div>

          <div className="min-w-0">
            <div className="truncate text-base font-extrabold text-slate-900 dark:text-white">
              {title}
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
              </svg>
              <span>{unitsCount} Ünite</span>
            </div>

            {subtitle ? (
              <div
                className={cn(
                  "mt-1 text-xs font-bold",
                  toneRing[tone]
                )}
              >
                {subtitle}
              </div>
            ) : null}
          </div>
        </div>

        {/* right progress ring */}
        <ProgressRing
          value={pct}
          toneClass={toneRing[tone]}
        />
      </div>
    </Link>
  );
}

function ProgressRing({
  value,
  toneClass,
}: {
  value: number;
  toneClass: string;
}) {
  const r = 16;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div
      className={cn(
        "relative flex h-12 w-12 items-center justify-center",
        toneClass
      )}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        className="-rotate-90"
      >
        <circle
          cx="24"
          cy="24"
          r={r}
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          r={r}
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>

      <div className="absolute text-[9px] font-extrabold text-slate-700 dark:text-slate-200">
        %{value}
      </div>
    </div>
  );
}
