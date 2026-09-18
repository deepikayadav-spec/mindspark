import type { Course } from "@/lib/types";

export const cs: Course = {
  id: "cs",
  title: "Computer Science Foundations",
  tagline: "Algorithms, complexity, and the cost of a careless loop.",
  icon: "💻",
  accent: "from-sky-500 to-indigo-500",
  level: "Intermediate",
  lessons: [
    {
      id: "binary-search",
      title: "Search & Halving",
      blurb: "Throwing away half the possibilities on every step is absurdly powerful.",
      concept: [
        "Binary search needs sorted data. Each comparison eliminates half the remaining range, so n items take about log₂(n) steps.",
        "A million items is 20 steps. A billion is 30. Doubling the data adds one step, not double the work.",
        "The same halving idea drives merge sort, balanced trees, and every “guess the number” strategy worth using.",
      ],
      problems: [
        {
          id: "cs-bs-1",
          type: "numeric",
          prompt:
            "Binary search over a sorted list of 1,024 items. How many comparisons does the worst case need?",
          answer: 10,
          hint: "How many times can you halve 1024 before reaching 1?",
          explanation: "log₂(1024) = 10. Each comparison halves the range: 1024 → 512 → … → 1.",
        },
        {
          id: "cs-bs-2",
          type: "mcq",
          prompt:
            "A team doubles its dataset from 1 million to 2 million rows. Binary search lookups will now take:",
          visual: "halving",
          choices: [
            { id: "a", text: "Twice as long" },
            { id: "b", text: "About one extra comparison" },
            { id: "c", text: "Four times as long" },
            { id: "d", text: "The same time exactly" },
          ],
          answer: "b",
          explanation:
            "Doubling n adds exactly one to log₂(n). That flat scaling is why sorted indexes hold up as data grows.",
        },
        {
          id: "cs-bs-3",
          type: "numeric",
          prompt:
            "You think of a number between 1 and 100. Playing optimally, how many yes/no guesses does an opponent need in the worst case?",
          answer: 7,
          hint: "Find the smallest k with 2^k ≥ 100.",
          explanation: "2⁶ = 64 < 100 ≤ 128 = 2⁷, so seven guesses always suffice and six sometimes do not.",
        },
        {
          id: "cs-bs-4",
          type: "mcq",
          prompt: "Which precondition does binary search actually require?",
          choices: [
            { id: "a", text: "The data must be in an array, not a list" },
            { id: "b", text: "The data must be sorted by the key you search on" },
            { id: "c", text: "The data must have unique values" },
            { id: "d", text: "The data must fit in memory" },
          ],
          answer: "b",
          explanation:
            "Sortedness by the search key is the only hard requirement — it is what makes “discard the other half” valid. Duplicates are fine; random access is a performance concern, not a correctness one.",
        },
      ],
    },
    {
      id: "big-o",
      title: "Reading Complexity",
      blurb: "Big-O describes growth, not speed. Mixing those up costs real money.",
      concept: [
        "Big-O captures how work scales with input size, dropping constants and lower-order terms. O(2n + 7) is just O(n).",
        "A nested loop over the same collection is O(n²): 1,000 items become a million operations.",
        "An O(n²) algorithm can beat an O(n log n) one on small inputs. Big-O only tells you who wins eventually.",
      ],
      problems: [
        {
          id: "cs-bo-1",
          type: "mcq",
          prompt:
            "A function loops over a list of n items and, for each one, loops over the whole list again. Its time complexity is:",
          visual: "nested-loop",
          choices: [
            { id: "a", text: "O(n)" },
            { id: "b", text: "O(n log n)" },
            { id: "c", text: "O(n²)" },
            { id: "d", text: "O(2ⁿ)" },
          ],
          answer: "c",
          explanation: "n outer iterations × n inner iterations = n² operations.",
        },
        {
          id: "cs-bo-2",
          type: "numeric",
          prompt:
            "An O(n²) routine takes 1 second on 1,000 records. Roughly how many seconds will it take on 10,000 records?",
          answer: 100,
          tolerance: 1,
          unit: "s",
          hint: "10× the input on a squared curve.",
          explanation:
            "Input grew 10×, and squared growth means 10² = 100× the work — about 100 seconds. This is the classic “it was fine in staging” failure.",
        },
        {
          id: "cs-bo-3",
          type: "multi",
          prompt: "Which of these operations are O(1) on a typical hash map?",
          choices: [
            { id: "a", text: "Look up a value by key (average case)" },
            { id: "b", text: "Insert a key/value pair (average case)" },
            { id: "c", text: "Find the smallest key" },
            { id: "d", text: "Iterate over every entry" },
          ],
          answer: ["a", "b"],
          explanation:
            "Hashing gives average-case constant lookup and insert. Finding a minimum needs a full scan, O(n), and so does iterating — a hash map keeps no order.",
        },
        {
          id: "cs-bo-4",
          type: "mcq",
          prompt:
            "Algorithm A is O(n log n), algorithm B is O(n²). For n = 10 with a large constant factor on A, which is likely faster?",
          choices: [
            { id: "a", text: "A, always — better complexity wins" },
            { id: "b", text: "B, plausibly — constants dominate at small n" },
            { id: "c", text: "They must be identical" },
            { id: "d", text: "Impossible to reason about at all" },
          ],
          answer: "b",
          explanation:
            "Big-O is asymptotic. At n = 10 the constants swamp the growth term, which is exactly why real sort implementations fall back to insertion sort on small subarrays.",
        },
      ],
    },
    {
      id: "graphs",
      title: "Graphs & Traversal",
      blurb: "Nodes and edges describe maps, networks, dependencies — and most interview questions.",
      concept: [
        "A graph is a set of nodes plus edges between them. Directed or not, weighted or not, that is the whole model.",
        "Breadth-first search explores in rings and finds the fewest-edge path. Depth-first search plunges down one branch and backtracks.",
        "On unweighted graphs BFS gives shortest paths for free. Add weights and you need Dijkstra instead.",
      ],
      problems: [
        {
          id: "cs-g-1",
          type: "mcq",
          prompt:
            "You need the shortest route between two stations on an unweighted network map. Which traversal gives it directly?",
          visual: "graph",
          choices: [
            { id: "a", text: "Depth-first search" },
            { id: "b", text: "Breadth-first search" },
            { id: "c", text: "Either one, they are equivalent" },
            { id: "d", text: "Neither — you need a sorting step first" },
          ],
          answer: "b",
          explanation:
            "BFS visits nodes in order of distance from the start, so the first time it reaches the target it has used the fewest possible edges. DFS can reach it by a long detour.",
        },
        {
          id: "cs-g-2",
          type: "numeric",
          prompt:
            "A complete graph has an edge between every pair of its 6 nodes. How many edges does it have?",
          answer: 15,
          hint: "Every pair, counted once: n(n−1)/2.",
          explanation: "6 × 5 / 2 = 15. Dividing by two avoids counting each edge from both ends.",
        },
        {
          id: "cs-g-3",
          type: "mcq",
          prompt:
            "A build system detects that task A depends on B, B on C, and C on A. What has it found?",
          choices: [
            { id: "a", text: "A cycle — no valid build order exists" },
            { id: "b", text: "A tree" },
            { id: "c", text: "A shortest path" },
            { id: "d", text: "A disconnected graph" },
          ],
          answer: "a",
          explanation:
            "Topological sorting only works on a directed acyclic graph. A cycle means no task can go first, which is why build tools report it as an error rather than picking an order.",
        },
      ],
    },
  ],
};
