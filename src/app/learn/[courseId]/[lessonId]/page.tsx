import { notFound } from "next/navigation";
import { courses, getCourse, getLesson } from "@/lib/courses";
import { LessonPlayer } from "@/components/LessonPlayer";

export function generateStaticParams() {
  return courses.flatMap((c) => c.lessons.map((l) => ({ courseId: c.id, lessonId: l.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;
  const lesson = getLesson(courseId, lessonId);
  return lesson
    ? { title: `${lesson.title} — Mindspark`, description: lesson.blurb }
    : { title: "Lesson not found — Mindspark" };
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;
  const course = getCourse(courseId);
  const lesson = getLesson(courseId, lessonId);
  if (!course || !lesson) notFound();

  return <LessonPlayer course={course} lesson={lesson} />;
}
