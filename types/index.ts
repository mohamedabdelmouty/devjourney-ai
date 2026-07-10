// ============================================
// CORE TYPES for DevJourney AI
// ============================================

// --- Roadmap / JSON types ---
export interface DayEntry {
  day: number;
  topics: string;
  fullStack: string;
  english: string;
  practice: string;
  done: boolean;
}

export interface RoadmapMonth {
  month: number;
  slug: string;
  title: string;
  color: string;
  icon: string;
  days: DayEntry[];
}

export interface ResourcesData {
  courses: string[];
}

// --- User types ---
export interface User {
  id: string;
  email: string;
  name: string | null;
  username: string | null;
  bio: string | null;
  avatarUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  xp: number;
  level: number;
  totalDays: number;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// --- Progress types ---
export interface DayProgress {
  id: string;
  userId: string;
  month: number;
  day: number;
  done: boolean;
  theoryDone: boolean;
  practiceDone: boolean;
  englishDone: boolean;
  quizDone: boolean;
  timeSpent: number;
  xpEarned: number;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// --- Achievement types ---
export type AchievementRarity = "common" | "rare" | "epic" | "legendary";
export type AchievementCategory = "streak" | "completion" | "speed" | "english" | "projects" | "general";

export interface Achievement {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  rarity: AchievementRarity;
  xpReward: number;
  category: AchievementCategory;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: Date;
  achievement: Achievement;
}

// --- Project types ---
export type ProjectDifficulty = "beginner" | "intermediate" | "advanced";
export type ProjectStatus = "not_started" | "in_progress" | "done";

export interface ChecklistItem {
  id: string;
  item: string;
  done: boolean;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  difficulty: ProjectDifficulty;
  status: ProjectStatus;
  githubUrl: string | null;
  liveUrl: string | null;
  month: number | null;
  estimatedTime: number | null;
  topics: string[];
  checklist: ChecklistItem[] | null;
  createdAt: Date;
  updatedAt: Date;
}

// --- Job Application types ---
export type JobStatus = "applied" | "interviewing" | "offer" | "rejected" | "withdrawn";

export interface JobApplication {
  id: string;
  userId: string;
  company: string;
  role: string;
  location: string | null;
  url: string | null;
  status: JobStatus;
  appliedAt: Date;
  notes: string | null;
  salary: string | null;
  contactName: string | null;
  contactEmail: string | null;
  updatedAt: Date;
}

// --- English types ---
export type EnglishCategory = "vocabulary" | "grammar" | "listening" | "speaking" | "writing" | "technical" | "interview";

export interface EnglishProgress {
  id: string;
  userId: string;
  category: EnglishCategory;
  score: number;
  sessionsCompleted: number;
  lastPracticed: Date | null;
  updatedAt: Date;
}

// --- Note types ---
export interface Note {
  id: string;
  userId: string;
  month: number;
  day: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// --- Quiz types ---
export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizResult {
  id: string;
  userId: string;
  month: number;
  day: number;
  score: number;
  answers: QuizAnswer[];
  createdAt: Date;
}

export interface QuizAnswer {
  question: string;
  answer: string;
  correct: boolean;
}

// --- Certificate types ---
export interface Certificate {
  id: string;
  userId: string;
  month: number;
  title: string;
  description: string | null;
  issuedAt: Date;
}

// --- Dashboard stats ---
export interface DashboardStats {
  totalXP: number;
  level: number;
  xpToNextLevel: number;
  xpProgress: number;
  currentStreak: number;
  longestStreak: number;
  totalDaysCompleted: number;
  totalStudyHours: number;
  currentMonth: number;
  currentDay: number;
  weeklyProgress: WeeklyProgress[];
  monthlyProgress: MonthlyProgress[];
  topicDistribution: TopicDistribution[];
}

export interface WeeklyProgress {
  day: string;
  hours: number;
  xp: number;
}

export interface MonthlyProgress {
  month: string;
  completed: number;
  total: number;
}

export interface TopicDistribution {
  topic: string;
  hours: number;
  color: string;
}

// --- AI Mentor types ---
export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export type AIAction = "explain" | "quiz" | "review" | "challenge" | "interview";

// --- Theme types ---
export type Theme = "dark" | "light" | "system";

// --- Form types ---
export interface ProfileFormData {
  name: string;
  username: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
}

export interface SettingsFormData {
  theme: Theme;
  dailyGoalHours: number;
  weeklyGoalDays: number;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

// --- Utility types ---
export type SortOrder = "asc" | "desc";
export type FilterStatus = "all" | "done" | "pending";

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}
