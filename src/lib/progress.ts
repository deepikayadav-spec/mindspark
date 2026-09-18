"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "mindspark.progress.v1";
const EVENT = "mindspark:progress";

export type LessonResult = {
  score: number;
  total: number;
  completedAt: string;
};

export type Progress = {
  xp: number;
  solved: Record<string, true>;
  lessons: Record<string, LessonResult>;
  dailyDone: Record<string, true>;
  streak: { current: number; longest: number; lastActive: string | null };
};

export const emptyProgress: Progress = {
  xp: 0,
  solved: {},
  lessons: {},
  dailyDone: {},
  streak: { current: 0, longest: 0, lastActive: null },
};

export function todayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function daysBetween(a: string, b: string) {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86_400_000);
}

export function read(): Progress {
  if (typeof window === "undefined") return emptyProgress;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress;
    return { ...emptyProgress, ...(JSON.parse(raw) as Partial<Progress>) };
  } catch {
    return emptyProgress;
  }
}

function write(p: Progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // Storage can be unavailable (private mode, blocked site data). Progress is
    // a convenience, so failing to persist must never break a lesson.
  }
  window.dispatchEvent(new Event(EVENT));
}

function touchStreak(p: Progress): Progress {
  const today = todayKey();
  const last = p.streak.lastActive;
  if (last === today) return p;

  const current = last && daysBetween(last, today) === 1 ? p.streak.current + 1 : 1;
  return {
    ...p,
    streak: { current, longest: Math.max(current, p.streak.longest), lastActive: today },
  };
}

// useSyncExternalStore demands a stable snapshot, so the parsed object is cached
// and only rebuilt when the underlying raw string actually changes.
let cachedRaw: string | null = null;
let cachedValue: Progress = emptyProgress;

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Progress {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = read();
  }
  return cachedValue;
}

function getServerSnapshot(): Progress {
  return emptyProgress;
}

const noopSubscribe = () => () => {};

/** False during SSR and the first client render, so hydration never mismatches. */
export function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const loaded = useIsClient();

  const update = useCallback((fn: (p: Progress) => Progress) => write(fn(read())), []);

  const recordSolved = useCallback(
    (problemId: string, xp = 10) =>
      update((p) =>
        p.solved[problemId]
          ? touchStreak(p)
          : touchStreak({ ...p, xp: p.xp + xp, solved: { ...p.solved, [problemId]: true } })
      ),
    [update]
  );

  const recordLesson = useCallback(
    (key: string, score: number, total: number) =>
      update((p) => {
        const previous = p.lessons[key];
        const best = previous && previous.score > score ? previous.score : score;
        return touchStreak({
          ...p,
          lessons: {
            ...p.lessons,
            [key]: { score: best, total, completedAt: new Date().toISOString() },
          },
        });
      }),
    [update]
  );

  const recordDaily = useCallback(
    (dateKey: string) =>
      update((p) => touchStreak({ ...p, dailyDone: { ...p.dailyDone, [dateKey]: true } })),
    [update]
  );

  const reset = useCallback(() => update(() => emptyProgress), [update]);

  return { progress, loaded, recordSolved, recordLesson, recordDaily, reset };
}
