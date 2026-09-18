"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProgress } from "@/lib/progress";

const links = [
  { href: "/", label: "Courses" },
  { href: "/daily", label: "Daily" },
  { href: "/progress", label: "Progress" },
];

export function Nav() {
  const pathname = usePathname();
  const { progress, loaded } = useProgress();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-5xl items-center gap-6 px-5 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm text-white">
            ms
          </span>
          Mindspark
        </Link>

        <div className="flex items-center gap-1 text-sm">
          {links.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  "rounded-lg px-3 py-1.5 transition",
                  active
                    ? "bg-indigo-50 font-medium text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
                ].join(" ")}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-3 text-sm tabular-nums">
          <span
            className="rounded-lg bg-orange-50 px-2.5 py-1 font-medium text-orange-600 dark:bg-orange-500/15 dark:text-orange-300"
            title="Day streak"
          >
            🔥 {loaded ? progress.streak.current : 0}
          </span>
          <span
            className="rounded-lg bg-indigo-50 px-2.5 py-1 font-medium text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300"
            title="Experience points"
          >
            {loaded ? progress.xp : 0} XP
          </span>
        </div>
      </nav>
    </header>
  );
}
