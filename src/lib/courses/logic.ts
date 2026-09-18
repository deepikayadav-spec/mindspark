import type { Course } from "@/lib/types";

export const logic: Course = {
  id: "logic",
  title: "Logic & Deduction",
  tagline: "Corner the truth with nothing but careful reasoning.",
  icon: "🧩",
  accent: "from-violet-500 to-fuchsia-500",
  level: "Beginner",
  lessons: [
    {
      id: "truth-tellers",
      title: "Truth-Tellers & Liars",
      blurb: "Every statement is either always true or always false. Use that.",
      concept: [
        "On Knight Island, knights always tell the truth and knaves always lie. Nobody is ever half-honest.",
        "The trick is never to ask “is this person nice?” — ask “could this sentence come out of a truth-teller's mouth?” If a sentence is impossible for a knight to say, the speaker is a knave.",
        "A statement that would be false if the speaker were a knight is your fastest lever: assume, contradict, discard.",
      ],
      problems: [
        {
          id: "logic-tt-1",
          type: "mcq",
          prompt:
            "An islander says: “I am a knave.” Knights always tell the truth, knaves always lie. What must be true?",
          choices: [
            { id: "a", text: "The speaker is a knight" },
            { id: "b", text: "The speaker is a knave" },
            { id: "c", text: "No islander could say this" },
            { id: "d", text: "There is not enough information" },
          ],
          answer: "c",
          hint: "Test both cases and see whether either survives.",
          explanation:
            "If the speaker were a knight, the sentence would be true — so they would be a knave. Contradiction. If the speaker were a knave, the sentence would be true — but knaves never say true things. Contradiction again. No islander can utter it.",
        },
        {
          id: "logic-tt-2",
          type: "mcq",
          prompt:
            "Two islanders, P and Q. P says: “At least one of us is a knave.” What are they?",
          choices: [
            { id: "a", text: "P knight, Q knave" },
            { id: "b", text: "P knave, Q knight" },
            { id: "c", text: "Both knaves" },
            { id: "d", text: "Both knights" },
          ],
          answer: "a",
          hint: "Start by assuming P is a knave and see what breaks.",
          explanation:
            "If P were a knave, the sentence would be true (P is a knave) — impossible for a liar. So P is a knight, the sentence is true, and the knave in the pair must be Q.",
        },
        {
          id: "logic-tt-3",
          type: "mcq",
          prompt:
            "You reach a fork: one road leads to the city, one to the swamp. A single islander stands there, and you do not know their type. You get one yes/no question. Which one works?",
          visual: "fork",
          choices: [
            { id: "a", text: "“Does the left road lead to the city?”" },
            { id: "b", text: "“Are you a knight?”" },
            {
              id: "c",
              text: "“If I asked you whether the left road leads to the city, would you say yes?”",
            },
            { id: "d", text: "“Is the swamp on the right?”" },
          ],
          answer: "c",
          hint: "You need a question a liar is forced to lie about twice.",
          explanation:
            "The nested question makes a knave lie twice, and two lies cancel. Both types give the same — truthful — answer about the left road.",
        },
        {
          id: "logic-tt-4",
          type: "numeric",
          prompt:
            "Five islanders stand in a line. Each one says: “Exactly two of us are knights.” How many knights are in the line?",
          answer: 0,
          hint: "If any one of them is a knight, the sentence is true for all five.",
          explanation:
            "All five make the same claim, so either all are telling the truth or all are lying. If they were truthful, all five would be knights — but then there would be five knights, not two. So all five lie: 0 knights.",
        },
      ],
    },
    {
      id: "contrapositive",
      title: "Turning Statements Inside Out",
      blurb: "The contrapositive is free information. Most people throw it away.",
      concept: [
        "“If P then Q” says nothing about what happens when P is false. It forbids exactly one combination: P true with Q false.",
        "Its contrapositive — “if not Q then not P” — is always exactly as true as the original. Its converse — “if Q then P” — is a different claim entirely.",
        "Most reasoning mistakes in the wild are converse errors: hearing “rain means wet streets” and concluding wet streets mean rain.",
      ],
      problems: [
        {
          id: "logic-cp-1",
          type: "mcq",
          prompt:
            "“If a number is divisible by 6, it is divisible by 3.” Which statement is guaranteed to be true?",
          choices: [
            { id: "a", text: "If a number is divisible by 3, it is divisible by 6" },
            { id: "b", text: "If a number is not divisible by 3, it is not divisible by 6" },
            { id: "c", text: "If a number is not divisible by 6, it is not divisible by 3" },
            { id: "d", text: "A number divisible by 3 is never divisible by 6" },
          ],
          answer: "b",
          explanation:
            "Only the contrapositive is logically equivalent: not-Q implies not-P. Option (a) is the converse (9 breaks it) and (c) is the inverse (3 breaks it).",
        },
        {
          id: "logic-cp-2",
          type: "multi",
          prompt:
            "Rule on the table: “Every card with a vowel on one side has an even number on the other.” Four cards show A, K, 4, 7. Which cards must you turn over to test the rule?",
          visual: "cards",
          choices: [
            { id: "a", text: "A" },
            { id: "k", text: "K" },
            { id: "4", text: "4" },
            { id: "7", text: "7" },
          ],
          answer: ["a", "7"],
          hint: "Look for the cards that could expose a vowel paired with an odd number.",
          explanation:
            "Turn A (a vowel must hide an even number) and 7 (an odd number must not hide a vowel — the contrapositive). The 4 tells you nothing: the rule never says even numbers need vowels.",
        },
        {
          id: "logic-cp-3",
          type: "mcq",
          prompt:
            "A shop sign reads: “No entry without shoes.” A person is inside. What can you conclude?",
          choices: [
            { id: "a", text: "They are wearing shoes" },
            { id: "b", text: "They own shoes" },
            { id: "c", text: "Everyone wearing shoes is inside" },
            { id: "d", text: "Nothing at all" },
          ],
          answer: "a",
          explanation:
            "“Inside implies shoes” is the rule, and observing “inside” fires it directly. It says nothing about shoe-wearers who stayed outside.",
        },
        {
          id: "logic-cp-4",
          type: "mcq",
          prompt:
            "“All tested batches passed.” The lab later admits no batch was ever tested. Is the statement false?",
          choices: [
            { id: "a", text: "Yes — with no tests it cannot be true" },
            { id: "b", text: "No — it is vacuously true" },
            { id: "c", text: "It is neither true nor false" },
            { id: "d", text: "It depends on the batch size" },
          ],
          answer: "b",
          explanation:
            "A universal claim over an empty set has no counterexample, so it is vacuously true — and completely uninformative. Worth remembering the next time a metric reads 100%.",
        },
      ],
    },
    {
      id: "pigeonhole",
      title: "The Pigeonhole Principle",
      blurb: "Count the holes, count the pigeons, and conclusions fall out for free.",
      concept: [
        "If n items go into m containers and n > m, some container holds at least two items. That is the whole principle.",
        "The generalised form: with n items in m containers, some container holds at least ⌈n/m⌉ items.",
        "The hard part is never the principle — it is choosing what the pigeons and the holes are.",
      ],
      problems: [
        {
          id: "logic-ph-1",
          type: "numeric",
          prompt:
            "A drawer holds 10 black socks and 10 white socks, unsorted, in the dark. How many socks must you pull to guarantee a matching pair?",
          answer: 3,
          hint: "Colours are the holes.",
          explanation:
            "Two colours = two holes, three socks = three pigeons, so two socks must share a colour. With only two pulls you can still end up with one of each.",
        },
        {
          id: "logic-ph-2",
          type: "numeric",
          prompt:
            "In a city of 1,000,000 people, nobody has more than 200,000 hairs on their head. At minimum, how many people are guaranteed to share an exact hair count?",
          answer: 5,
          hint: "Hair counts run from 0, so count the holes generously.",
          explanation:
            "Counts run 0 to 200,000 — that is 200,001 holes. ⌈1000000 / 200001⌉ = 5, so some hair count is shared by at least 5 people.",
        },
        {
          id: "logic-ph-3",
          type: "mcq",
          prompt: "Pick any 5 points inside a 2×2 square. What is guaranteed about some pair of them?",
          visual: "square-quadrants",
          choices: [
            { id: "a", text: "Two points are within √2 of each other" },
            { id: "b", text: "Two points are exactly 1 apart" },
            { id: "c", text: "All points lie on a line" },
            { id: "d", text: "Nothing is guaranteed" },
          ],
          answer: "a",
          hint: "Cut the square into four 1×1 cells.",
          explanation:
            "Four unit cells, five points: two points share a cell. The farthest apart two points in a 1×1 cell can be is its diagonal, √2.",
        },
      ],
    },
  ],
};
