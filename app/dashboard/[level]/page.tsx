import { LevelHeader } from "@/components/level-header";
import { UnitCard } from "@/components/unit-card";

export default function LevelDetailPage() {
  return (
    <div className="">
      <LevelHeader
        code="A1.1"
        title="Beginner"
        unitCount={4}
        learned={15}
        total={45}
      />

      <div className="flex flex-col gap-4 p-4 bg-slate-50">
        <UnitCard
          unitNo={1}
          deTitle="Begrüßung"
          enTitle="Greetings"
          learned={20}
          total={20}
          status="completed"
          href="/dashboard/a1-1/1"
        />
        <UnitCard
          unitNo={2}
          deTitle="Zahlen"
          enTitle="Numbers"
          learned={15}
          total={45}
          status="in_progress"
          href="/dashboard/a1-1/2"
        />
        <UnitCard
          unitNo={3}
          deTitle="Familie"
          enTitle="Family Members"
          learned={0}
          total={35}
          status="not_started"
          href="/dashboard/a1-1/3"
        />
      </div>
    </div>
  );
}
