"use client";

import { useEffect, useRef, useState } from "react";

/* Three questions -> a Google Form. Fill nfbConfig in once:

     action  the Form's POST URL. Open the live form, copy the address-bar
             URL and swap the trailing "/viewform" for "/formResponse".
     rating / feedback / change
             the three field ids. On the live form use View Source and search
             for "entry." — each answer box carries an entry.NNNNNNNNN name,
             in the order the questions appear.

   Until it is filled in, answers are kept in this browser's localStorage
   (key "niat.feedback.mindspark") and posted on the next load once a form is
   configured, so nothing a student types is lost. The offline single-file
   build in index.html carries the same widget — keep the two in step. */
const nfbConfig = {
  game: "mindspark",
  action: "", // https://docs.google.com/forms/d/e/FORM_ID/formResponse
  rating: "", // entry.000000000  -> star rating
  feedback: "", // entry.000000000  -> additional feedback
  change: "", // entry.000000000  -> anything to add or change
};

const LABELS = ["", "Poor", "Fair", "Good", "Great", "Loved it"];
const LOG_KEY = `niat.feedback.${nfbConfig.game}`;
const QUEUE_KEY = `niat.feedback.queue.${nfbConfig.game}`;

type Entry = {
  game: string;
  rating: string;
  feedback: string;
  change: string;
  at: string;
};

const configured = () =>
  Boolean(nfbConfig.action && nfbConfig.rating && nfbConfig.feedback && nfbConfig.change);

/* Reads and writes both throw in private mode, so neither is trusted. */
function read(key: string): Entry[] {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}
function write(key: string, value: Entry[]) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* full or blocked */
  }
}

/* A cross-origin POST into a hidden iframe: no CORS to satisfy. */
function post(entry: Entry) {
  const f = document.createElement("form");
  f.method = "POST";
  f.action = nfbConfig.action;
  f.target = "nfb-sink";
  f.style.display = "none";
  (
    [
      [nfbConfig.rating, entry.rating],
      [nfbConfig.feedback, entry.feedback],
      [nfbConfig.change, entry.change],
    ] as const
  ).forEach(([name, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    f.appendChild(input);
  });
  document.body.appendChild(f);
  f.submit();
  setTimeout(() => f.remove(), 4000);
}

export function Feedback() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [change, setChange] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const firstStar = useRef<HTMLButtonElement>(null);

  /* Anything captured before the form was wired up goes out on the next load. */
  useEffect(() => {
    if (!configured()) return;
    const pending = read(QUEUE_KEY);
    if (!pending.length) return;
    write(QUEUE_KEY, []);
    pending.forEach((entry, i) => setTimeout(() => post(entry), i * 600));
  }, []);

  useEffect(() => {
    if (!open) return;
    firstStar.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) {
      setError("Pick a star rating first.");
      firstStar.current?.focus();
      return;
    }

    const entry: Entry = {
      game: nfbConfig.game,
      rating: String(rating),
      feedback: text.trim(),
      change: change.trim(),
      at: new Date().toISOString(),
    };

    write(LOG_KEY, [...read(LOG_KEY), entry]);

    if (configured()) {
      post(entry);
    } else {
      write(QUEUE_KEY, [...read(QUEUE_KEY), entry]);
      console.warn(
        `[feedback] No Google Form wired up yet — answer kept in localStorage under "${QUEUE_KEY}" and sent once nfbConfig is filled in.`,
      );
    }

    setSent(true);
    setRating(0);
    setText("");
    setChange("");
    setError("");
    setTimeout(() => {
      setOpen(false);
      setSent(false);
    }, 2600);
  }

  const field =
    "w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500";
  const label = "mb-1.5 block text-xs font-semibold text-slate-900 dark:text-slate-100";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        title="Share feedback"
        className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.3 9.3 0 0 1-3.3-.6L3 21l1.8-4.9A8.1 8.1 0 0 1 3.6 11.5 8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4Z" />
        </svg>
        <span className="hidden sm:inline">Feedback</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center overflow-auto bg-slate-950/65 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="nfb-title"
            className="relative max-h-[calc(100vh-2rem)] w-full max-w-[470px] overflow-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close feedback"
              className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 dark:border-slate-700 dark:hover:text-white"
            >
              ×
            </button>

            <h2
              id="nfb-title"
              className="text-lg font-bold text-slate-900 dark:text-white"
            >
              Share your feedback
            </h2>
            <p className="mt-1 mb-4 text-sm text-slate-500 dark:text-slate-400">
              Half a minute, three questions. It goes straight to the NIAT team.
            </p>

            {sent ? (
              <div className="py-4 text-center">
                <div className="text-4xl leading-none text-indigo-600 dark:text-indigo-400">✓</div>
                <h3 className="mt-2 font-semibold text-slate-900 dark:text-white">
                  Thanks — that helps.
                </h3>
                <p className="mt-1 mb-4 text-sm text-slate-500 dark:text-slate-400">
                  Your feedback reached the team.
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  Back to Mindspark
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <fieldset className="mb-4">
                  <legend className={label}>1. How would you rate Mindspark?</legend>
                  <div className="flex items-center gap-0.5" role="radiogroup" aria-label="Star rating">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <button
                        key={v}
                        ref={v === 1 ? firstStar : undefined}
                        type="button"
                        role="radio"
                        aria-checked={rating === v}
                        aria-label={`${v} ${v === 1 ? "star" : "stars"}`}
                        tabIndex={v === (rating || 1) ? 0 : -1}
                        onClick={() => {
                          setRating(v);
                          setError("");
                        }}
                        onKeyDown={(e) => {
                          const step =
                            e.key === "ArrowRight" || e.key === "ArrowUp"
                              ? 1
                              : e.key === "ArrowLeft" || e.key === "ArrowDown"
                                ? -1
                                : 0;
                          if (!step) return;
                          e.preventDefault();
                          setRating(Math.min(5, Math.max(1, (rating || 0) + step)));
                          setError("");
                        }}
                        className={`px-0.5 text-3xl leading-none transition ${
                          v <= rating
                            ? "text-amber-400"
                            : "text-slate-300 hover:scale-110 dark:text-slate-600"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                      {rating ? LABELS[rating] : "Pick a star"}
                    </span>
                  </div>
                </fieldset>

                <label className="mb-4 block">
                  <span className={label}>2. Additional feedback</span>
                  <textarea
                    rows={3}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What worked well, what got in your way…"
                    className={field}
                  />
                </label>

                <label className="mb-4 block">
                  <span className={label}>3. Anything you want to add or change?</span>
                  <textarea
                    rows={3}
                    value={change}
                    onChange={(e) => setChange(e.target.value)}
                    placeholder="A lesson, a feature, a fix you would like…"
                    className={field}
                  />
                </label>

                {error && (
                  <p className="mb-3 text-xs font-semibold text-rose-500">{error}</p>
                )}

                <div className="flex flex-wrap justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:border-slate-700 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                  >
                    Send feedback
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <iframe
        name="nfb-sink"
        title="feedback sink"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute -left-[9999px] h-0 w-0 border-0"
      />
    </>
  );
}
