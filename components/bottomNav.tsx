"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Gamepad2, Trophy, User } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Ana Sayfa", icon: Home },
  { href: "/games", label: "Oyunlar", icon: Gamepad2 },
  { href: "/rank", label: "Sıralama", icon: Trophy },
  { href: "/profile", label: "Profil", icon: User },
];

function isActivePath(pathname: string, href: string) {
  return (
    pathname === href || pathname.startsWith(href + "/")
  );
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 bg-slate-50">
      <div className="mx-auto w-full max-w-[420px]  ">
        <div className=" border bg-white/95 shadow-lg backdrop-blur ">
          <div className="grid grid-cols-4 px-2 py-2">
            {items.map((item) => {
              const active = isActivePath(
                pathname,
                item.href
              );
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-1 transition-colors",
                    active
                      ? "text-blue-600"
                      : "text-slate-400"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <div
                    className={cn(
                      "flex h-6 w-9 items-center justify-center rounded-xl transition-colors"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <span
                    className={cn(
                      "text-[11px] leading-none",
                      active ? "font-bold" : "font-medium"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
