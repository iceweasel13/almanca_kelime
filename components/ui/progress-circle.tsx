import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

type ProgressCircleProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> & {
  value: number;
  size?: number;
  stroke?: number;
};

export function ProgressCircle({
  value,
  size = 44,
  stroke = 4,
  className,
  ...props
}: ProgressCircleProps) {
  const v = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <ProgressPrimitive.Root
      value={v}
      className={cn(
        "relative grid place-items-center",
        className
      )}
      style={{ width: size, height: size }}
      {...props}
    >
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(hsl(var(--primary)) ${v}%, rgba(148,163,184,.35) 0)`,
        }}
      />
      <div
        className="absolute rounded-full bg-background"
        style={{
          width: size - stroke * 2,
          height: size - stroke * 2,
        }}
      />
      <div className="absolute text-xs font-extrabold text-slate-700 dark:text-slate-200">
        %{v}
      </div>
    </ProgressPrimitive.Root>
  );
}
