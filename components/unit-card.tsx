import Link from "next/link";
import { cn } from "@/lib/utils";

type UnitStatus =
  | "completed"
  | "in_progress"
  | "not_started";

type UnitCardProps = {
  unitNo: number; // 1,2,3...
  deTitle: string; // Begrüßung
  enTitle: string; // Greetings
  learned: number; // 20
  total: number; // 20
  status: UnitStatus;
  href: string;
};

export function UnitCard({
  unitNo,
  deTitle,
  enTitle,
  learned,
  total,
  status,
  href,
}: UnitCardProps) {
  const pct =
    total <= 0
      ? 0
      : Math.min(100, Math.round((learned / total) * 100));

  const isCompleted = status === "completed";
  const isProgress = status === "in_progress";

  const accentText = isCompleted
    ? "text-green-600"
    : isProgress
    ? "text-blue-600"
    : "text-slate-400";
  const barColor = isCompleted
    ? "bg-green-500"
    : isProgress
    ? "bg-blue-600"
    : "bg-slate-200 dark:bg-slate-800";

  return (
    <Link
      href={href}
      className={cn(
        "block rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition active:scale-[0.99] dark:bg-slate-900 dark:ring-white/10",
        isProgress && "ring-2 ring-blue-600/25"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {/* left badge */}
        <div
          className={cn(
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold",
            isProgress
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
          )}
        >
          {String(unitNo).padStart(2, "0")}
        </div>

        {/* titles */}
        <div className="min-w-0 flex-1">
          <div className="truncate text-base font-extrabold text-slate-900 dark:text-white">
            {deTitle}
          </div>
          <div className="truncate text-sm font-semibold text-slate-500 dark:text-slate-400">
            {enTitle}
          </div>

          {/* status line */}
          <div className="mt-3 flex items-center justify-between gap-3">
            <div
              className={cn(
                "text-sm font-bold",
                accentText
              )}
            >
              {isCompleted ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 14-4-4 1.41-1.41L11 12.17l4.59-4.58L17 9z" />
                  </svg>
                  Completed
                </span>
              ) : isProgress ? (
                "In progress"
              ) : (
                "Not started"
              )}
            </div>

            <div className="text-sm font-bold text-slate-500 dark:text-slate-400">
              {learned}/{total}
            </div>
          </div>

          {/* progress bar */}
          <div className="mt-2 h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className={cn(
                "h-2.5 rounded-full transition-all",
                isCompleted
                  ? "bg-green-500"
                  : isProgress
                  ? "bg-blue-600"
                  : "bg-transparent"
              )}
              style={{
                width: `${
                  status === "not_started" ? 0 : pct
                }%`,
              }}
            />
          </div>
        </div>

        {/* kebab (3 dots) icon */}
        <div className="mt-1 text-slate-400">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 7a2 2 0 1 0-2-2 2 2 0 0 0 2 2zm0 2a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm0 8a2 2 0 1 0 2 2 2 2 0 0 0-2-2z" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
