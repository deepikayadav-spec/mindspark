"use client";

import { useMemo, useState } from "react";
import type { Problem } from "@/lib/types";
import { Visual } from "@/components/Visual";

type Props = {
  problem: Problem;
  /** Fired once per problem, when the learner moves on. */
  onDone: (firstTryCorrect: boolean) => void;
  isLast?: boolean;
};

function isCorrect(problem: Problem, answer: unknown): boolean {
  switch (problem.type) {
    case "mcq":
      return answer === problem.answer;
    case "multi": {
      const picked = (answer as string[]) ?? [];
      return (
        picked.length === problem.answer.length &&
        problem.answer.every((id) => picked.includes(id))
      );
    }
    case "numeric":
    case "slider": {
      const n = typeof answer === "number" ? answer : Number.parseFloat(String(answer));
      if (!Number.isFinite(n)) return false;
      return Math.abs(n - problem.answer) <= (problem.tolerance ?? 0.001);
    }
  }
}

/**
 * Callers pass `key={problem.id}`, so a new problem remounts this component and
 * every piece of local state below starts fresh.
 */
export function ProblemView({ problem, onDone, isLast }: Props) {
  const [choice, setChoice] = useState<string | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [slider, setSlider] = useState<number | null>(() =>
    problem.type === "slider" ? Math.round((problem.min + problem.max) / 2) : null
  );
  const [attempts, setAttempts] = useState(0);
  const [verdict, setVerdict] = useState<"none" | "right" | "wrong">("none");
  const [revealed, setRevealed] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);

  const answer = useMemo(() => {
    switch (problem.type) {
      case "mcq":
        return choice;
      case "multi":
        return picked;
      case "numeric":
        return text;
      case "slider":
        return slider;
    }
  }, [problem.type, choice, picked, text, slider]);

  const canSubmit =
    problem.type === "multi"
      ? picked.length > 0
      : problem.type === "numeric"
        ? text.trim() !== ""
        : answer !== null;

  function check() {
    const right = isCorrect(problem, answer);
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setVerdict(right ? "right" : "wrong");
    if (right || nextAttempts >= 2) setRevealed(true);
    if (!right && nextAttempts === 1 && problem.hint) setHintOpen(true);
  }

  function toggle(id: string) {
    if (revealed) return;
    setVerdict("none");
    setPicked((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  const locked = revealed;

  return (
    <div className="space-y-6">
      {problem.visual && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
          <Visual name={problem.visual} />
        </div>
      )}

      <p className="text-lg leading-relaxed text-slate-800 dark:text-slate-100">{problem.prompt}</p>

      {problem.type === "mcq" && (
        <div className="grid gap-3">
          {problem.choices.map((c) => {
            const selected = choice === c.id;
            const showRight = revealed && c.id === problem.answer;
            const showWrong = revealed && selected && c.id !== problem.answer;
            return (
              <button
                key={c.id}
                type="button"
                disabled={locked}
                onClick={() => {
                  setChoice(c.id);
                  setVerdict("none");
                }}
                className={[
                  "rounded-xl border px-4 py-3 text-left transition",
                  showRight
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
                    : showWrong
                      ? "border-rose-500 bg-rose-50 dark:bg-rose-500/10"
                      : selected
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                        : "border-slate-200 hover:border-indigo-400 dark:border-slate-700 dark:hover:border-indigo-500",
                  locked ? "cursor-default" : "cursor-pointer",
                ].join(" ")}
              >
                <span className="text-slate-800 dark:text-slate-100">{c.text}</span>
              </button>
            );
          })}
        </div>
      )}

      {problem.type === "multi" && (
        <div className="grid gap-3">
          <p className="text-sm text-slate-500 dark:text-slate-400">Select all that apply.</p>
          {problem.choices.map((c) => {
            const selected = picked.includes(c.id);
            const inAnswer = problem.answer.includes(c.id);
            const showRight = revealed && inAnswer;
            const showWrong = revealed && selected && !inAnswer;
            return (
              <button
                key={c.id}
                type="button"
                disabled={locked}
                onClick={() => toggle(c.id)}
                className={[
                  "flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition",
                  showRight
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
                    : showWrong
                      ? "border-rose-500 bg-rose-50 dark:bg-rose-500/10"
                      : selected
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                        : "border-slate-200 hover:border-indigo-400 dark:border-slate-700 dark:hover:border-indigo-500",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs",
                    selected
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : "border-slate-300 dark:border-slate-600",
                  ].join(" ")}
                >
                  {selected ? "✓" : ""}
                </span>
                <span className="text-slate-800 dark:text-slate-100">{c.text}</span>
              </button>
            );
          })}
        </div>
      )}

      {problem.type === "numeric" && (
        <div className="flex items-center gap-3">
          <input
            inputMode="decimal"
            value={text}
            disabled={locked}
            onChange={(e) => {
              setText(e.target.value);
              setVerdict("none");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && canSubmit && !revealed) check();
            }}
            placeholder="Your answer"
            className="w-44 rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
          />
          {problem.unit && (
            <span className="text-slate-500 dark:text-slate-400">{problem.unit}</span>
          )}
        </div>
      )}

      {problem.type === "slider" && (
        <div className="space-y-3">
          <input
            type="range"
            min={problem.min}
            max={problem.max}
            step={problem.step}
            value={slider ?? problem.min}
            disabled={locked}
            onChange={(e) => {
              setSlider(Number(e.target.value));
              setVerdict("none");
            }}
            className="w-full accent-indigo-500"
          />
          <div className="text-center text-2xl font-semibold tabular-nums text-indigo-500">
            {slider ?? problem.min}
            {problem.unit ?? ""}
          </div>
        </div>
      )}

      {hintOpen && problem.hint && !revealed && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
          <span className="font-semibold">Hint: </span>
          {problem.hint}
        </div>
      )}

      {verdict !== "none" && (
        <div
          className={[
            "rounded-xl border px-4 py-4",
            verdict === "right"
              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
              : "border-rose-500 bg-rose-50 dark:bg-rose-500/10",
          ].join(" ")}
        >
          <p className="font-semibold text-slate-900 dark:text-white">
            {verdict === "right" ? "Correct" : revealed ? "Here is the reasoning" : "Not quite — try once more"}
          </p>
          {revealed && (
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {problem.explanation}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {!revealed ? (
          <>
            <button
              type="button"
              disabled={!canSubmit}
              onClick={check}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Check
            </button>
            {problem.hint && !hintOpen && (
              <button
                type="button"
                onClick={() => setHintOpen(true)}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-600 transition hover:border-slate-400 dark:border-slate-700 dark:text-slate-300"
              >
                Show hint
              </button>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={() => onDone(verdict === "right" && attempts === 1)}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500"
          >
            {isLast ? "Finish" : "Continue"}
          </button>
        )}
      </div>
    </div>
  );
}
