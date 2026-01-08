// app/dashboard/games/[gameId]/page.tsx
import { redirect } from "next/navigation";

export default function GamePage({
  params,
  searchParams,
}: {
  params: { gameId: string };
  searchParams: { level?: string; unit?: string };
}) {
  // setup’tan gelmediyse setup’a geri at
  if (!searchParams.level || !searchParams.unit) {
    redirect(`/dashboard/games/${params.gameId}/setup`);
  }

  return (
    <div className="min-h-dvh bg-slate-50">
      <div className="mx-auto flex min-h-dvh w-full max-w-[420px] flex-col px-6 pt-6">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Game: {params.gameId}
        </h1>
        <p className="mt-2 text-slate-600">
          level: <b>{searchParams.level}</b> • unit:{" "}
          <b>{searchParams.unit}</b>
        </p>
        <div className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-black/5">
          Oyun UI buraya gelecek.
        </div>
      </div>
    </div>
  );
}
