import { Achievement } from "@/types";

// XP values
export const XP_VALUES = {
  DAY_COMPLETE: 100,
  THEORY_SECTION: 25,
  PRACTICE_SECTION: 25,
  ENGLISH_SECTION: 25,
  QUIZ_COMPLETE: 50,
  QUIZ_PERFECT: 25, // bonus for 100%
  DAILY_STREAK_BONUS: 10, // per streak day
  WEEKLY_STREAK_BONUS: 100,
  MONTHLY_COMPLETE: 500,
} as const;

// Achievements definition
export const ACHIEVEMENTS: Achievement[] = [
  // Streak achievements
  {
    id: "first-day",
    slug: "first-day",
    name: "First Step",
    description: "Complete your first study day",
    icon: "🎯",
    rarity: "common",
    xpReward: 50,
    category: "completion",
  },
  {
    id: "streak-3",
    slug: "streak-3",
    name: "Hat Trick",
    description: "Maintain a 3-day study streak",
    icon: "🔥",
    rarity: "common",
    xpReward: 100,
    category: "streak",
  },
  {
    id: "streak-7",
    slug: "streak-7",
    name: "Week Warrior",
    description: "Maintain a 7-day study streak",
    icon: "⚡",
    rarity: "rare",
    xpReward: 250,
    category: "streak",
  },
  {
    id: "streak-30",
    slug: "streak-30",
    name: "Iron Will",
    description: "Maintain a 30-day study streak",
    icon: "💎",
    rarity: "epic",
    xpReward: 1000,
    category: "streak",
  },
  {
    id: "streak-90",
    slug: "streak-90",
    name: "Unstoppable",
    description: "Maintain a 90-day study streak",
    icon: "👑",
    rarity: "legendary",
    xpReward: 5000,
    category: "streak",
  },
  // Completion achievements
  {
    id: "month-1-complete",
    slug: "month-1-complete",
    name: "Web Foundation",
    description: "Complete Month 1: Fullstack Foundations",
    icon: "🌐",
    rarity: "rare",
    xpReward: 500,
    category: "completion",
  },
  {
    id: "month-2-complete",
    slug: "month-2-complete",
    name: "Frontend Master",
    description: "Complete Month 2: Frontend Mastery",
    icon: "⚛️",
    rarity: "rare",
    xpReward: 500,
    category: "completion",
  },
  {
    id: "month-3-complete",
    slug: "month-3-complete",
    name: "Backend Beast",
    description: "Complete Month 3: Backend Engineering",
    icon: "⚙️",
    rarity: "epic",
    xpReward: 750,
    category: "completion",
  },
  {
    id: "month-4-complete",
    slug: "month-4-complete",
    name: "AI Architect",
    description: "Complete Month 4: AI & ML Engineering",
    icon: "🤖",
    rarity: "epic",
    xpReward: 750,
    category: "completion",
  },
  {
    id: "month-5-complete",
    slug: "month-5-complete",
    name: "Security Sentinel",
    description: "Complete Month 5: Application Security",
    icon: "🔐",
    rarity: "epic",
    xpReward: 750,
    category: "completion",
  },
  {
    id: "month-6-complete",
    slug: "month-6-complete",
    name: "Cloud Commander",
    description: "Complete Month 6: Cloud & DevSecOps",
    icon: "☁️",
    rarity: "legendary",
    xpReward: 2000,
    category: "completion",
  },
  {
    id: "all-months-complete",
    slug: "all-months-complete",
    name: "The Graduate",
    description: "Complete all 6 months of the curriculum",
    icon: "🎓",
    rarity: "legendary",
    xpReward: 10000,
    category: "completion",
  },
  // Speed achievements
  {
    id: "speed-demon",
    slug: "speed-demon",
    name: "Speed Demon",
    description: "Complete a day in under 3 hours",
    icon: "💨",
    rarity: "rare",
    xpReward: 200,
    category: "speed",
  },
  // English achievements
  {
    id: "english-starter",
    slug: "english-starter",
    name: "Wordsmith",
    description: "Complete 10 English sessions",
    icon: "📖",
    rarity: "common",
    xpReward: 100,
    category: "english",
  },
  {
    id: "english-master",
    slug: "english-master",
    name: "English Master",
    description: "Reach 90% score in all English categories",
    icon: "🗣️",
    rarity: "epic",
    xpReward: 1000,
    category: "english",
  },
  // Projects
  {
    id: "first-project",
    slug: "first-project",
    name: "Builder",
    description: "Complete your first project",
    icon: "🔨",
    rarity: "common",
    xpReward: 150,
    category: "projects",
  },
  {
    id: "project-5",
    slug: "project-5",
    name: "Architect",
    description: "Complete 5 projects",
    icon: "🏗️",
    rarity: "rare",
    xpReward: 500,
    category: "projects",
  },
  // Level achievements
  {
    id: "level-10",
    slug: "level-10",
    name: "Rising Star",
    description: "Reach Level 10",
    icon: "⭐",
    rarity: "rare",
    xpReward: 300,
    category: "general",
  },
  {
    id: "level-25",
    slug: "level-25",
    name: "Expert",
    description: "Reach Level 25",
    icon: "🌟",
    rarity: "epic",
    xpReward: 1000,
    category: "general",
  },
  {
    id: "level-50",
    slug: "level-50",
    name: "Legend",
    description: "Reach Level 50",
    icon: "💫",
    rarity: "legendary",
    xpReward: 5000,
    category: "general",
  },
];

export function calculateXPForDay(
  sections: { theory: boolean; practice: boolean; english: boolean; quiz: boolean },
  streak: number,
  quizScore?: number
): number {
  let xp = 0;
  if (sections.theory) xp += XP_VALUES.THEORY_SECTION;
  if (sections.practice) xp += XP_VALUES.PRACTICE_SECTION;
  if (sections.english) xp += XP_VALUES.ENGLISH_SECTION;
  if (sections.quiz) {
    xp += XP_VALUES.QUIZ_COMPLETE;
    if (quizScore === 100) xp += XP_VALUES.QUIZ_PERFECT;
  }
  // All sections done = day complete bonus
  if (sections.theory && sections.practice && sections.english) {
    xp += XP_VALUES.DAY_COMPLETE;
  }
  // Streak bonus
  if (streak >= 7) xp += XP_VALUES.DAILY_STREAK_BONUS * Math.min(streak, 30);

  return xp;
}

export function checkAchievements(params: {
  totalDays: number;
  streak: number;
  level: number;
  projectsCompleted: number;
  monthsCompleted: number[];
  englishScores: number[];
  existingAchievements: string[];
}): Achievement[] {
  const newAchievements: Achievement[] = [];
  const existing = new Set(params.existingAchievements);

  const check = (slug: string) => !existing.has(slug);

  // First day
  if (params.totalDays >= 1 && check("first-day")) {
    newAchievements.push(ACHIEVEMENTS.find((a) => a.slug === "first-day")!);
  }
  // Streaks
  if (params.streak >= 3 && check("streak-3")) {
    newAchievements.push(ACHIEVEMENTS.find((a) => a.slug === "streak-3")!);
  }
  if (params.streak >= 7 && check("streak-7")) {
    newAchievements.push(ACHIEVEMENTS.find((a) => a.slug === "streak-7")!);
  }
  if (params.streak >= 30 && check("streak-30")) {
    newAchievements.push(ACHIEVEMENTS.find((a) => a.slug === "streak-30")!);
  }
  if (params.streak >= 90 && check("streak-90")) {
    newAchievements.push(ACHIEVEMENTS.find((a) => a.slug === "streak-90")!);
  }
  // Month completions
  for (let m = 1; m <= 6; m++) {
    if (params.monthsCompleted.includes(m) && check(`month-${m}-complete`)) {
      newAchievements.push(ACHIEVEMENTS.find((a) => a.slug === `month-${m}-complete`)!);
    }
  }
  if (params.monthsCompleted.length === 6 && check("all-months-complete")) {
    newAchievements.push(ACHIEVEMENTS.find((a) => a.slug === "all-months-complete")!);
  }
  // Projects
  if (params.projectsCompleted >= 1 && check("first-project")) {
    newAchievements.push(ACHIEVEMENTS.find((a) => a.slug === "first-project")!);
  }
  if (params.projectsCompleted >= 5 && check("project-5")) {
    newAchievements.push(ACHIEVEMENTS.find((a) => a.slug === "project-5")!);
  }
  // Levels
  if (params.level >= 10 && check("level-10")) {
    newAchievements.push(ACHIEVEMENTS.find((a) => a.slug === "level-10")!);
  }
  if (params.level >= 25 && check("level-25")) {
    newAchievements.push(ACHIEVEMENTS.find((a) => a.slug === "level-25")!);
  }
  if (params.level >= 50 && check("level-50")) {
    newAchievements.push(ACHIEVEMENTS.find((a) => a.slug === "level-50")!);
  }
  // English
  if (
    params.englishScores.length > 0 &&
    params.englishScores.every((s) => s >= 90) &&
    check("english-master")
  ) {
    newAchievements.push(ACHIEVEMENTS.find((a) => a.slug === "english-master")!);
  }

  return newAchievements.filter(Boolean);
}
