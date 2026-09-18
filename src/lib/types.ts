export type Choice = { id: string; text: string };

type ProblemBase = {
  id: string;
  prompt: string;
  /** Key of an SVG illustration rendered above the prompt. */
  visual?: string;
  hint?: string;
  explanation: string;
};

export type McqProblem = ProblemBase & {
  type: "mcq";
  choices: Choice[];
  answer: string;
};

export type MultiProblem = ProblemBase & {
  type: "multi";
  choices: Choice[];
  answer: string[];
};

export type NumericProblem = ProblemBase & {
  type: "numeric";
  answer: number;
  tolerance?: number;
  unit?: string;
};

export type SliderProblem = ProblemBase & {
  type: "slider";
  min: number;
  max: number;
  step: number;
  answer: number;
  tolerance?: number;
  unit?: string;
};

export type Problem = McqProblem | MultiProblem | NumericProblem | SliderProblem;

export type Lesson = {
  id: string;
  title: string;
  blurb: string;
  /** Short teaching paragraphs shown before the first problem. */
  concept: string[];
  problems: Problem[];
};

export type Course = {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  accent: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  lessons: Lesson[];
};
