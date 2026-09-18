import type { Course } from "@/lib/types";

export const probability: Course = {
  id: "probability",
  title: "Probability & Chance",
  tagline: "Train the intuition that gambling houses quietly rely on you lacking.",
  icon: "🎲",
  accent: "from-emerald-500 to-teal-500",
  level: "Beginner",
  lessons: [
    {
      id: "counting-outcomes",
      title: "Counting Outcomes",
      blurb: "Probability is arithmetic on a well-drawn list of possibilities.",
      concept: [
        "When every outcome is equally likely, probability is just (favourable outcomes) ÷ (total outcomes). Everything else is bookkeeping.",
        "Independent stages multiply: two coins give 2 × 2 = 4 equally likely sequences, not 3 outcomes.",
        "The classic error is collapsing distinguishable outcomes. HT and TH are two different sequences even though both are “one head”.",
      ],
      problems: [
        {
          id: "prob-co-1",
          type: "mcq",
          prompt: "Flip a fair coin twice. What is the probability of getting exactly one head?",
          visual: "coin-tree",
          choices: [
            { id: "a", text: "1/4" },
            { id: "b", text: "1/3" },
            { id: "c", text: "1/2" },
            { id: "d", text: "3/4" },
          ],
          answer: "c",
          hint: "Write out all four sequences.",
          explanation:
            "The four equally likely sequences are HH, HT, TH, TT. Two of them have exactly one head, so 2/4 = 1/2. Treating “one head” as a single outcome is what gives the wrong answer of 1/3.",
        },
        {
          id: "prob-co-2",
          type: "numeric",
          prompt:
            "Roll two fair six-sided dice. How many of the 36 ordered outcomes sum to 7?",
          answer: 6,
          hint: "For each value on the first die, exactly one value on the second works.",
          explanation:
            "(1,6), (2,5), (3,4), (4,3), (5,2), (6,1) — six outcomes, so P(sum 7) = 6/36 = 1/6. It is the most likely sum, which is why 7 anchors so many dice games.",
        },
        {
          id: "prob-co-3",
          type: "slider",
          prompt:
            "A bag holds 3 red and 5 blue marbles. You draw one at random. What is the percentage chance it is red?",
          min: 0,
          max: 100,
          step: 1,
          answer: 37.5,
          tolerance: 1.5,
          unit: "%",
          hint: "3 out of 8.",
          explanation: "3/8 = 0.375, so 37.5%. Drag-and-check builds the habit of estimating before computing.",
        },
        {
          id: "prob-co-4",
          type: "mcq",
          prompt:
            "Three fair coins are flipped. What is the probability that all three match?",
          choices: [
            { id: "a", text: "1/8" },
            { id: "b", text: "1/4" },
            { id: "c", text: "1/3" },
            { id: "d", text: "1/2" },
          ],
          answer: "b",
          explanation:
            "Eight sequences in total; HHH and TTT both match, so 2/8 = 1/4. Equivalently: the first coin can be anything, and the other two must copy it — 1/2 × 1/2.",
        },
      ],
    },
    {
      id: "conditional",
      title: "Conditional Probability",
      blurb: "New information does not change the world — it shrinks the sample space.",
      concept: [
        "P(A | B) means: restrict attention to the cases where B happened, then ask how often A also happened.",
        "Formally P(A | B) = P(A and B) / P(B). Most puzzles are solved by drawing the restricted space honestly.",
        "The dangerous habit is conditioning on the wrong thing — on “a child is a boy” rather than “the older child is a boy”. They give different answers.",
      ],
      problems: [
        {
          id: "prob-cond-1",
          type: "mcq",
          prompt:
            "A family has two children. You learn at least one is a girl. What is the probability both are girls?",
          choices: [
            { id: "a", text: "1/4" },
            { id: "b", text: "1/3" },
            { id: "c", text: "1/2" },
            { id: "d", text: "2/3" },
          ],
          answer: "b",
          hint: "List BB, BG, GB, GG and cross out what the information rules out.",
          explanation:
            "The four equally likely families are BB, BG, GB, GG. “At least one girl” removes BB, leaving three, of which one is GG — so 1/3.",
        },
        {
          id: "prob-cond-2",
          type: "mcq",
          prompt:
            "Same family, but now you learn the *older* child is a girl. What is the probability both are girls?",
          choices: [
            { id: "a", text: "1/4" },
            { id: "b", text: "1/3" },
            { id: "c", text: "1/2" },
            { id: "d", text: "2/3" },
          ],
          answer: "c",
          explanation:
            "Fixing the older child leaves only GB and GG, so the answer is 1/2. Same-sounding information, different sample space — this is the whole lesson.",
        },
        {
          id: "prob-cond-3",
          type: "mcq",
          prompt:
            "A disease affects 1 in 1000 people. A test catches every true case but has a 5% false-positive rate. You test positive. Roughly how likely is it that you have the disease?",
          visual: "base-rate",
          choices: [
            { id: "a", text: "About 95%" },
            { id: "b", text: "About 50%" },
            { id: "c", text: "About 2%" },
            { id: "d", text: "About 0.1%" },
          ],
          answer: "c",
          hint: "Imagine 100,000 people and count actual positives.",
          explanation:
            "Of 100,000 people: 100 are sick and all test positive; 99,900 are healthy and about 4,995 test positive anyway. So 100 / 5,095 ≈ 2%. Rare conditions drown in false positives — the base rate dominates.",
        },
        {
          id: "prob-cond-4",
          type: "mcq",
          prompt:
            "Monty Hall: three doors, one car. You pick door 1. The host, who knows where the car is, opens door 3 to show a goat and offers a switch. Should you switch?",
          visual: "monty",
          choices: [
            { id: "a", text: "Switch — it wins 2/3 of the time" },
            { id: "b", text: "Stay — it wins 2/3 of the time" },
            { id: "c", text: "It makes no difference, 1/2 either way" },
            { id: "d", text: "Only switch if the host looked nervous" },
          ],
          answer: "a",
          hint: "Your first pick was right 1/3 of the time, and that number never changes.",
          explanation:
            "Your original door had a 1/3 chance and the host's knowledgeable reveal cannot change it. The remaining 2/3 collapses onto the one unopened door, so switching wins twice as often.",
        },
      ],
    },
    {
      id: "expected-value",
      title: "Expected Value",
      blurb: "The long-run average — and why it is not the same as what will happen.",
      concept: [
        "Expected value is each outcome weighted by its probability: E = Σ p(x) · x.",
        "It is an average over many repeats, not a prediction of any single trial. A lottery with E = −₹40 never actually costs you ₹40.",
        "Expected value is linear: E[A + B] = E[A] + E[B] even when A and B are dependent. That shortcut solves a lot of otherwise brutal problems.",
      ],
      problems: [
        {
          id: "prob-ev-1",
          type: "numeric",
          prompt:
            "A game pays you the number rolled on a fair six-sided die, in rupees. What is the expected payout, in rupees?",
          answer: 3.5,
          tolerance: 0.01,
          unit: "₹",
          explanation:
            "(1+2+3+4+5+6)/6 = 3.5. Note that 3.5 is never an actual payout — the expected value need not be a possible outcome.",
        },
        {
          id: "prob-ev-2",
          type: "numeric",
          prompt:
            "A ticket costs ₹10. It pays ₹100 with probability 0.05 and nothing otherwise. What is your expected profit per ticket, in rupees? (Use a minus sign if it is a loss.)",
          answer: -5,
          tolerance: 0.01,
          unit: "₹",
          hint: "Expected payout minus cost.",
          explanation: "Expected payout = 0.05 × 100 = ₹5. Subtract the ₹10 cost: −₹5 per ticket.",
        },
        {
          id: "prob-ev-3",
          type: "numeric",
          prompt:
            "You flip a fair coin until it lands heads. On average, how many flips does that take?",
          answer: 2,
          hint: "E = 1 + (1/2)E — solve for E.",
          explanation:
            "Every flip either ends it (probability 1/2) or resets the identical problem. E = 1 + ½E gives E = 2. In general, a probability-p event takes 1/p tries on average.",
        },
        {
          id: "prob-ev-4",
          type: "mcq",
          prompt:
            "A casino game has an expected value of −₹2 per play. You play it 10,000 times. What is most likely?",
          choices: [
            { id: "a", text: "You end up close to ₹20,000 down" },
            { id: "b", text: "You break even — variance cancels out" },
            { id: "c", text: "You end up ahead if you stop at the right moment" },
            { id: "d", text: "Expected value says nothing about long runs" },
          ],
          answer: "a",
          explanation:
            "The law of large numbers pulls the average outcome toward the expected value as trials pile up. Stopping rules cannot beat a negative expectation — that is exactly what the house sells.",
        },
      ],
    },
  ],
};
