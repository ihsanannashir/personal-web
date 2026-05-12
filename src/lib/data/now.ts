import { NowData, NowTeaser } from "@/lib/types/item-data";

export const NOW_TEASERS: NowTeaser[] = [
  {
    emoji: "🔧",
    title: "Building",
    description: "AI knowledge management system at CIMB Niaga",
  },
  {
    emoji: "🏃",
    title: "Running",
    description: "Training for first half marathon, June 2026",
  },
  {
    emoji: "📖",
    title: "Reading",
    description: "Thinking, Fast and Slow — Daniel Kahneman",
  },
  {
    emoji: "🇩🇪",
    title: "Learning",
    description: "German, working toward B1",
  },
];

export const NOW_DATA: NowData = {
  lastUpdated: "May 2026",
  city: "Jakarta",
  focus: {
    company: "CIMB Niaga",
    role: "Software Engineer, AI Enablement & Automation",
    description:
      "Building intelligent systems at one of Indonesia's largest banks. Focused on RAG-based knowledge management and optimizing internal AI platforms.",
    highlights: [
      "Building a RAG-based knowledge management system with multi-role workflows",
      "Optimizing AI platform model usage with Gemini and Python",
      "Creating REST APIs across internal platforms",
    ],
  },
  running: {
    goal: "First half marathon — 21km",
    runsPerWeek: 3,
    longestRun: "10km",
    raceMonth: "June 2026",
    progress: 48,
  },
  reading: {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    note: "Exploring how cognitive biases shape our thinking and decision-making — relevant to building AI systems that augment human judgment.",
  },
  thinkingAbout: [
    "How do we build AI systems that are genuinely useful, not just impressive?",
    "What does it mean to be a polyglot in a world of machine translation?",
    "How do I balance depth vs. breadth in my engineering career?",
    "What makes a city livable, and where do I want to be in 5 years?",
  ],
};
