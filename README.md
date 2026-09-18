# Mindspark

An interactive learning app in the spirit of problem-first STEM platforms: you learn by solving,
not by watching. Short lessons introduce one idea, then hand you a sequence of interactive problems
with hints, instant feedback and a written explanation for every answer.

## What's inside

**5 courses · 14 lessons · 50+ interactive problems**

| Course | Focus |
| --- | --- |
| Logic & Deduction | knights and knaves, contrapositives, the pigeonhole principle |
| Probability & Chance | counting outcomes, conditional probability, expected value |
| Computer Science Foundations | binary search, Big-O, graphs and traversal |
| Everyday Algebra | percentages, rates and work, exponential growth |
| How Neural Networks Learn | the artificial neuron, gradient descent |

### Features

- **Four problem types** — single choice, select-all, numeric entry and a draggable slider.
- **Two-attempt flow** — a wrong answer surfaces the hint and lets you retry; the second attempt
  reveals the full explanation.
- **Hand-drawn SVG illustrations** for probability trees, graphs, loss curves, neurons and more.
- **Daily challenge** — three problems drawn deterministically from the date, so everyone gets the
  same set on the same day.
- **Progress, XP and day streaks**, persisted in `localStorage`. No account, no backend, nothing
  leaves the browser.
- Dark mode, responsive layout, reduced-motion support.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4. Every page is statically
prerendered; all interactivity is client-side.

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Project layout

```
src/
  app/
    page.tsx                          course catalogue
    courses/[courseId]/page.tsx       lesson list for a course
    learn/[courseId]/[lessonId]/      the lesson player
    daily/                            daily challenge
    progress/                         stats and streaks
  components/
    LessonPlayer.tsx                  concept → problems → summary
    ProblemView.tsx                   answer input, checking, feedback
    Visual.tsx                        inline SVG illustrations
  lib/
    courses/                          all course content (one file per course)
    progress.ts                       localStorage store via useSyncExternalStore
    types.ts
```

### Adding a course

Create a file in `src/lib/courses/`, export a `Course`, and register it in
`src/lib/courses/index.ts`. Routes, static params, progress tracking and the daily-challenge pool
all pick it up automatically.

## Note

This is an independent educational demo, not affiliated with or endorsed by any existing learning
platform. All problems and explanations are original.
