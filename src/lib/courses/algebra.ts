import type { Course } from "@/lib/types";

export const algebra: Course = {
  id: "algebra",
  title: "Everyday Algebra",
  tagline: "The quiet arithmetic behind discounts, rates, and growth.",
  icon: "📈",
  accent: "from-amber-500 to-orange-500",
  level: "Beginner",
  lessons: [
    {
      id: "percentages",
      title: "Percentages That Trick People",
      blurb: "Percent changes do not add, and the base keeps moving.",
      concept: [
        "A percentage is always a percentage *of* something. Change the base and the same number means something else.",
        "A 20% rise followed by a 20% fall does not return you to the start: 1.2 × 0.8 = 0.96.",
        "Multipliers compose cleanly, so convert every change into one and multiply instead of adding percentages.",
      ],
      problems: [
        {
          id: "alg-p-1",
          type: "numeric",
          prompt:
            "A ₹2,000 jacket is discounted 25%, then another 20% off the reduced price at checkout. What do you pay, in rupees?",
          answer: 1200,
          tolerance: 0.5,
          unit: "₹",
          hint: "0.75 × 0.80 — not a 45% discount.",
          explanation:
            "2000 × 0.75 = 1500, then 1500 × 0.80 = ₹1200. That is a 40% total discount, not 45% — stacked discounts always compound downward.",
        },
        {
          id: "alg-p-2",
          type: "mcq",
          prompt: "A stock falls 50%. What percentage gain does it need to get back to its original price?",
          visual: "percent-bar",
          choices: [
            { id: "a", text: "50%" },
            { id: "b", text: "75%" },
            { id: "c", text: "100%" },
            { id: "d", text: "150%" },
          ],
          answer: "c",
          explanation:
            "Halving to 50 means doubling from 50 — a 100% gain. Losses and the gains that undo them are never symmetric, because the base shrank.",
        },
        {
          id: "alg-p-3",
          type: "numeric",
          prompt:
            "A price after an 18% GST is ₹1,180. What was the pre-tax price, in rupees?",
          answer: 1000,
          tolerance: 0.5,
          unit: "₹",
          hint: "Divide, do not subtract 18%.",
          explanation:
            "1180 / 1.18 = ₹1000. Subtracting 18% from 1180 gives 967.60, which is wrong — the tax was a percentage of the smaller base.",
        },
        {
          id: "alg-p-4",
          type: "slider",
          prompt:
            "Your salary rises 10% one year and 10% the next. What is the total percentage increase?",
          min: 0,
          max: 40,
          step: 1,
          answer: 21,
          tolerance: 0.5,
          unit: "%",
          explanation: "1.1 × 1.1 = 1.21, so 21% — the extra 1% is growth on the first year's growth.",
        },
      ],
    },
    {
      id: "rates",
      title: "Rates, Work & Mixing",
      blurb: "Add rates, not times. This single habit solves most word problems.",
      concept: [
        "Rate = amount ÷ time. When two agents work together, their rates add — their times do not.",
        "If A finishes in 4 hours and B in 6, together they do 1/4 + 1/6 = 5/12 of the job per hour.",
        "For average speed over equal distances, use the harmonic mean, not the arithmetic one.",
      ],
      problems: [
        {
          id: "alg-r-1",
          type: "numeric",
          prompt:
            "Pipe A fills a tank in 4 hours, pipe B in 6 hours. Running together, how many hours do they need? (Round to two decimals.)",
          answer: 2.4,
          tolerance: 0.02,
          unit: "h",
          hint: "Add the rates, then invert.",
          explanation: "1/4 + 1/6 = 5/12 of the tank per hour, so the time is 12/5 = 2.4 hours.",
        },
        {
          id: "alg-r-2",
          type: "numeric",
          prompt:
            "You drive to a town at 60 km/h and return along the same road at 40 km/h. What is your average speed for the round trip, in km/h?",
          answer: 48,
          tolerance: 0.5,
          unit: "km/h",
          hint: "Not 50 — you spend more time at the slower speed.",
          explanation:
            "Harmonic mean: 2 × 60 × 40 / (60 + 40) = 4800/100 = 48 km/h. The slow leg takes longer, so it pulls the average down.",
        },
        {
          id: "alg-r-3",
          type: "numeric",
          prompt:
            "How many litres of pure water must you add to 10 litres of a 40% acid solution to dilute it to 25% acid?",
          answer: 6,
          tolerance: 0.1,
          unit: "L",
          hint: "The amount of acid never changes.",
          explanation:
            "Acid stays at 4 L. We need 4 / (10 + x) = 0.25, so 10 + x = 16 and x = 6 litres.",
        },
        {
          id: "alg-r-4",
          type: "mcq",
          prompt:
            "A team of 3 people builds a wall in 12 days. Assuming identical, independent workers, how long would 4 people take?",
          choices: [
            { id: "a", text: "9 days" },
            { id: "b", text: "10 days" },
            { id: "c", text: "12 days" },
            { id: "d", text: "16 days" },
          ],
          answer: "a",
          explanation:
            "The job is 36 person-days. Split across 4 workers, that is 9 days. (In real teams this breaks down fast — coordination is not free.)",
        },
      ],
    },
    {
      id: "growth",
      title: "Exponential Growth",
      blurb: "Repeated multiplication outruns intuition, every single time.",
      concept: [
        "Linear growth adds a fixed amount per step; exponential growth multiplies by a fixed factor.",
        "The rule of 70: at r% growth per period, a quantity doubles in roughly 70/r periods.",
        "Compounding is the same maths whether it is interest, users, or an infection — only the sign of the consequence differs.",
      ],
      problems: [
        {
          id: "alg-g-1",
          type: "numeric",
          prompt:
            "A colony of bacteria doubles every hour and starts with 100 cells. How many cells are there after 6 hours?",
          answer: 6400,
          hint: "100 × 2⁶",
          explanation: "100 × 64 = 6,400. Six doublings is a 64× multiplier, not a 12× one.",
        },
        {
          id: "alg-g-2",
          type: "numeric",
          prompt:
            "At 7% annual growth, roughly how many years does an investment take to double? (Use the rule of 70.)",
          answer: 10,
          tolerance: 0.6,
          unit: "yr",
          explanation: "70 / 7 = 10 years. The exact answer is 10.24 years, so the rule of thumb is close enough for mental maths.",
        },
        {
          id: "alg-g-3",
          type: "mcq",
          prompt:
            "A lily pad doubles its coverage daily and covers the whole pond on day 30. On which day was the pond half covered?",
          visual: "growth-curve",
          choices: [
            { id: "a", text: "Day 15" },
            { id: "b", text: "Day 25" },
            { id: "c", text: "Day 29" },
            { id: "d", text: "Day 28" },
          ],
          answer: "c",
          explanation:
            "One doubling before full is half, so day 29. Exponential problems look harmless until the very last step — which is precisely the danger.",
        },
      ],
    },
  ],
};
