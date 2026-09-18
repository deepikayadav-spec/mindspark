import type { Course, Lesson, Problem } from "@/lib/types";
import { logic } from "./logic";
import { probability } from "./probability";
import { cs } from "./cs";
import { algebra } from "./algebra";
import { neural } from "./neural";

export const courses: Course[] = [logic, probability, cs, algebra, neural];

export function getCourse(courseId: string): Course | undefined {
  return courses.find((c) => c.id === courseId);
}

export function getLesson(courseId: string, lessonId: string): Lesson | undefined {
  return getCourse(courseId)?.lessons.find((l) => l.id === lessonId);
}

export function lessonKey(courseId: string, lessonId: string) {
  return `${courseId}/${lessonId}`;
}

export function courseProblemCount(course: Course) {
  return course.lessons.reduce((n, l) => n + l.problems.length, 0);
}

export const allProblems: { problem: Problem; courseId: string; lessonId: string }[] =
  courses.flatMap((c) =>
    c.lessons.flatMap((l) => l.problems.map((p) => ({ problem: p, courseId: c.id, lessonId: l.id })))
  );

/**
 * Deterministic daily pick: the same date yields the same problems for everyone,
 * so a streak means the same thing from one day to the next.
 */
export function dailyProblems(dateKey: string, count = 3) {
  let seed = 0;
  for (let i = 0; i < dateKey.length; i++) seed = (seed * 31 + dateKey.charCodeAt(i)) >>> 0;

  const pool = [...allProblems];
  const picked: typeof allProblems = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    picked.push(pool.splice(seed % pool.length, 1)[0]);
  }
  return picked;
}
