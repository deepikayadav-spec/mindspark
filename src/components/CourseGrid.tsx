"use client";

import Link from "next/link";
import { courses, courseProblemCount, lessonKey } from "@/lib/courses";
import { useProgress } from "@/lib/progress";

export function CourseGrid() {
  const { progress, loaded } = useProgress();

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {courses.map((course) => {
        const completed = course.lessons.filter(
          (l) => progress.lessons[lessonKey(course.id, l.id)]
        ).length;
        const pct = loaded ? Math.round((completed / course.lessons.length) * 100) : 0;

        return (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-indigo-500"
          >
            <div className="flex items-start gap-4">
              <div
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${course.accent} text-2xl`}
              >
                {course.icon}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-900 dark:text-white">{course.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {course.tagline}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
                {course.level}
              </span>
              <span>{course.lessons.length} lessons</span>
              <span>{courseProblemCount(course)} problems</span>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs tabular-nums text-slate-500 dark:text-slate-400">{pct}%</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
