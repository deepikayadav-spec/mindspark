import Link from "next/link";
import { CourseGrid } from "@/components/CourseGrid";
import { allProblems, courses } from "@/lib/courses";

export default function Home() {
  const lessonCount = courses.reduce((n, c) => n + c.lessons.length, 0);

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <section className="mb-12">
        <h1 className="max-w-2xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl dark:text-white">
          Learn by solving,
          <span className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
            {" "}
            not by watching.
          </span>
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-slate-600 dark:text-slate-400">
          Short interactive lessons in logic, probability, computer science, algebra and neural
          networks. Every idea arrives as a problem you have to reason through — with a hint when you
          are stuck and an explanation when you are done.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/courses/logic"
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500"
          >
            Start with Logic
          </Link>
          <Link
            href="/daily"
            className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:border-slate-400 dark:border-slate-700 dark:text-slate-200"
          >
            Today&apos;s challenge
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500 dark:text-slate-400">
          <span>
            <strong className="text-slate-900 dark:text-white">{courses.length}</strong> courses
          </span>
          <span>
            <strong className="text-slate-900 dark:text-white">{lessonCount}</strong> lessons
          </span>
          <span>
            <strong className="text-slate-900 dark:text-white">{allProblems.length}</strong>{" "}
            interactive problems
          </span>
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-xl font-semibold text-slate-900 dark:text-white">Courses</h2>
        <CourseGrid />
      </section>
    </div>
  );
}
