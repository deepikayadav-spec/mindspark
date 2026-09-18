"use client";

import Link from "next/link";
import { allProblems, courses, lessonKey } from "@/lib/courses";
import { useProgress } from "@/lib/progress";

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="text-3xl font-bold tabular-nums text-slate-900 dark:text-white">{value}</div>
      <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

export default function ProgressPage() {
  const { progress, loaded, reset } = useProgress();
  const solvedCount = Object.keys(progress.solved).length;

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Your progress</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Stored locally in this browser — nothing is sent anywhere.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="XP earned" value={loaded ? progress.xp : 0} />
        <Stat label="Day streak" value={loaded ? progress.streak.current : 0} />
        <Stat label="Longest streak" value={loaded ? progress.streak.longest : 0} />
        <Stat
          label={`Problems solved (of ${allProblems.length})`}
          value={loaded ? solvedCount : 0}
        />
      </div>

      <h2 className="mt-12 mb-4 text-xl font-semibold text-slate-900 dark:text-white">By course</h2>
      <div className="space-y-3">
        {courses.map((course) => {
          const done = course.lessons.filter(
            (l) => loaded && progress.lessons[lessonKey(course.id, l.id)]
          ).length;
          const pct = Math.round((done / course.lessons.length) * 100);

          return (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900/50"
            >
              <span className="text-2xl">{course.icon}</span>
              <span className="w-44 shrink-0 font-medium text-slate-900 dark:text-white">
                {course.title}
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <span
                  className="block h-full rounded-full bg-indigo-500 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </span>
              <span className="w-16 shrink-0 text-right text-sm tabular-nums text-slate-500 dark:text-slate-400">
                {done}/{course.lessons.length}
              </span>
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => {
          if (window.confirm("Reset all progress on this device?")) reset();
        }}
        className="mt-10 rounded-xl border border-rose-300 px-4 py-2 text-sm text-rose-600 transition hover:bg-rose-50 dark:border-rose-500/40 dark:text-rose-400 dark:hover:bg-rose-500/10"
      >
        Reset progress
      </button>
    </div>
  );
}
