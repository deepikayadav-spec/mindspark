"use client";

import Link from "next/link";
import type { Course } from "@/lib/types";
import { lessonKey } from "@/lib/courses";
import { useProgress } from "@/lib/progress";

export function LessonList({ course }: { course: Course }) {
  const { progress, loaded } = useProgress();

  return (
    <ol className="space-y-3">
      {course.lessons.map((lesson, i) => {
        const result = loaded ? progress.lessons[lessonKey(course.id, lesson.id)] : undefined;
        const perfect = result && result.score === result.total;

        return (
          <li key={lesson.id}>
            <Link
              href={`/learn/${course.id}/${lesson.id}`}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-indigo-500"
            >
              <span
                className={[
                  "grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-semibold",
                  result
                    ? perfect
                      ? "bg-emerald-500 text-white"
                      : "bg-indigo-500 text-white"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
                ].join(" ")}
              >
                {result ? (perfect ? "★" : "✓") : i + 1}
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{lesson.title}</h3>
                <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">{lesson.blurb}</p>
              </div>

              <span className="shrink-0 text-xs tabular-nums text-slate-500 dark:text-slate-400">
                {result ? `${result.score}/${result.total}` : `${lesson.problems.length} problems`}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
