"use client";

import Link from "next/link";
import { useState } from "react";
import type { Course, Lesson } from "@/lib/types";
import { lessonKey } from "@/lib/courses";
import { useProgress } from "@/lib/progress";
import { ProblemView } from "@/components/ProblemView";

type Stage = { kind: "concept" } | { kind: "problem"; index: number } | { kind: "summary" };

export function LessonPlayer({ course, lesson }: { course: Course; lesson: Lesson }) {
  const { recordSolved, recordLesson } = useProgress();
  const [stage, setStage] = useState<Stage>({ kind: "concept" });
  const [score, setScore] = useState(0);

  const total = lesson.problems.length;
  const done = stage.kind === "summary" ? total : stage.kind === "problem" ? stage.index : 0;
  const pct = Math.round((done / total) * 100);

  function handleDone(problemIndex: number, firstTryCorrect: boolean) {
    const nextScore = firstTryCorrect ? score + 1 : score;
    if (firstTryCorrect) {
      setScore(nextScore);
      recordSolved(lesson.problems[problemIndex].id);
    }

    if (problemIndex + 1 < total) {
      setStage({ kind: "problem", index: problemIndex + 1 });
    } else {
      recordLesson(lessonKey(course.id, lesson.id), nextScore, total);
      setStage({ kind: "summary" });
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-8">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm">
          <Link
            href={`/courses/${course.id}`}
            className="text-slate-500 transition hover:text-indigo-500 dark:text-slate-400"
          >
            ← {course.title}
          </Link>
          <span className="tabular-nums text-slate-500 dark:text-slate-400">
            {done} / {total}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {stage.kind === "concept" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{lesson.title}</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">{lesson.blurb}</p>
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/50">
            {lesson.concept.map((para) => (
              <p key={para} className="leading-relaxed text-slate-700 dark:text-slate-300">
                {para}
              </p>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStage({ kind: "problem", index: 0 })}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500"
          >
            Start solving
          </button>
        </div>
      )}

      {stage.kind === "problem" && (
        <ProblemView
          key={lesson.problems[stage.index].id}
          problem={lesson.problems[stage.index]}
          isLast={stage.index === total - 1}
          onDone={(firstTryCorrect) => handleDone(stage.index, firstTryCorrect)}
        />
      )}

      {stage.kind === "summary" && (
        <div className="space-y-6 text-center">
          <div className="text-6xl">{score === total ? "🏆" : score > total / 2 ? "✨" : "📘"}</div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Lesson complete</h2>
          <p className="text-slate-600 dark:text-slate-400">
            You solved <span className="font-semibold text-indigo-500">{score}</span> of {total} on the
            first try{score === total ? " — a clean sweep." : ". The ones you missed are worth a second pass."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setScore(0);
                setStage({ kind: "concept" });
              }}
              className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:border-slate-400 dark:border-slate-700 dark:text-slate-200"
            >
              Retry lesson
            </button>
            <Link
              href={`/courses/${course.id}`}
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500"
            >
              Back to course
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
