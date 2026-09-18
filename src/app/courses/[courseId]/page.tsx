import { notFound } from "next/navigation";
import { courses, getCourse } from "@/lib/courses";
import { LessonList } from "@/components/LessonList";

export function generateStaticParams() {
  return courses.map((c) => ({ courseId: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }) {
  const course = getCourse((await params).courseId);
  return course
    ? { title: `${course.title} — Mindspark`, description: course.tagline }
    : { title: "Course not found — Mindspark" };
}

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const course = getCourse((await params).courseId);
  if (!course) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div className="flex items-start gap-4">
        <div
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${course.accent} text-3xl`}
        >
          {course.icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{course.title}</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">{course.tagline}</p>
        </div>
      </div>

      <div className="mt-10">
        <LessonList course={course} />
      </div>
    </div>
  );
}
