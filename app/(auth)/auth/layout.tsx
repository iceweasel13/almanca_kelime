// app/(auth)/layout.tsx
import type { ReactNode } from "react";

export default function AuthGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-background text-foreground antialiased">
      {/* soft background effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[50%] rounded-full bg-primary/10 blur-[100px] opacity-70" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[60%] rounded-full bg-primary/10 blur-[100px] opacity-70" />
        <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-primary/5 to-transparent" />
      </div>

      {/* mobile shell */}
      <div className="relative z-10 mx-auto w-full sm:my-6 sm:max-w-[420px]">
        <div className="min-h-dvh overflow-hidden bg-background sm:min-h-[800px] sm:rounded-[32px] sm:border sm:border-border sm:shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}
