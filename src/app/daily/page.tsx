"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { dailyProblems, getCourse } from "@/lib/courses";
import { todayKey, useIsClient, useProgress } from "@/lib/progress";
import { ProblemView } from "@/components/ProblemView";

export default function DailyPage() {
  // The date comes from the viewer's clock, so it stays null until the client
  // has taken over and server and client markup can no longer disagree.
  const isClient = useIsClient();
  const dateKey = useMemo(() => (isClient ? todayKey() : null), [isClient]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const { progress, recordSolved, recordDaily } = useProgress();

  const picks = useMemo(() => (dateKey ? dailyProblems(dateKey, 3) : []), [dateKey]);

  if (!dateKey) {
    return <div className="mx-auto max-w-2xl px-5 py-16 text-slate-400">Loading today&apos;s set…</div>;
  }

  const alreadyDone = Boolean(progress.dailyDone[dateKey]);
  const finished = index >= picks.length;
  const current = picks[index];

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-indigo-500">Daily challenge</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{dateKey}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Three problems drawn from across the courses. Everyone gets the same set today.
        </p>
      </div>

      {!finished && current && (
        <>
          <div className="mb-6 flex items-center gap-3">
            {picks.map((_, i) => (
              <span
                key={i}
                className={[
                  "h-1.5 flex-1 rounded-full",
                  i < index ? "bg-indigo-500" : "bg-slate-200 dark:bg-slate-800",
                ].join(" ")}
              />
            ))}
          </div>
          <p className="mb-4 text-xs uppercase tracking-wide text-slate-400">
            from {getCourse(current.courseId)?.title}
          </p>
          <ProblemView
            key={current.problem.id}
            problem={current.problem}
            isLast={index === picks.length - 1}
            onDone={(firstTryCorrect) => {
              if (firstTryCorrect) {
                setScore((s) => s + 1);
                recordSolved(current.problem.id);
              }
              if (index + 1 >= picks.length) recordDaily(dateKey);
              setIndex((i) => i + 1);
            }}
          />
        </>
      )}

      {finished && (
        <div className="space-y-6 text-center">
          <div className="text-6xl">{score === picks.length ? "🔥" : "✅"}</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Daily challenge done</h2>
          <p className="text-slate-600 dark:text-slate-400">
            {score} of {picks.length} on the first try. Streak: {progress.streak.current} day
            {progress.streak.current === 1 ? "" : "s"}.
          </p>
          <Link
            href="/"
            className="inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500"
          >
            Back to courses
          </Link>
        </div>
      )}

      {alreadyDone && !finished && (
        <p className="mt-6 text-sm text-slate-400">
          You already finished today&apos;s set — replaying it will not change your streak.
        </p>
      )}
    </div>
  );
}
