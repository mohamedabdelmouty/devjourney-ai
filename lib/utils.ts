import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function parseMinutes(str: string): number {
  // e.g. "120m" -> 120, "2h" -> 120, "1h 30m" -> 90
  const match = str.match(/(\d+)h\s*(?:(\d+)m)?|(\d+)m/);
  if (!match) return 0;
  if (match[3]) return parseInt(match[3]);
  const hours = parseInt(match[1] || "0");
  const mins = parseInt(match[2] || "0");
  return hours * 60 + mins;
}

export function getMonthTitle(month: number): string {
  const titles: Record<number, string> = {
    1: "Fullstack Foundations",
    2: "Frontend Mastery",
    3: "Backend Engineering",
    4: "AI & ML Engineering",
    5: "Application Security",
    6: "Cloud & DevSecOps",
  };
  return titles[month] || `Month ${month}`;
}

export function getMonthSlug(filename: string): string {
  // "month1_fullstack.json" -> "month1_fullstack"
  return filename.replace(".json", "");
}

export function getMonthFromSlug(slug: string): number {
  const match = slug.match(/month(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

export function getMonthColor(month: number): string {
  const colors: Record<number, string> = {
    1: "hsl(254, 75%, 65%)",
    2: "hsl(185, 100%, 55%)",
    3: "hsl(142, 76%, 50%)",
    4: "hsl(320, 80%, 60%)",
    5: "hsl(38, 95%, 55%)",
    6: "hsl(220, 80%, 60%)",
  };
  return colors[month] || "hsl(254, 75%, 65%)";
}

export function getMonthColorClass(month: number): string {
  const colors: Record<number, string> = {
    1: "from-purple-500 to-indigo-600",
    2: "from-cyan-400 to-blue-500",
    3: "from-green-400 to-emerald-600",
    4: "from-pink-500 to-rose-600",
    5: "from-amber-400 to-orange-500",
    6: "from-blue-400 to-violet-600",
  };
  return colors[month] || "from-purple-500 to-indigo-600";
}

export function getMonthIcon(month: number): string {
  const icons: Record<number, string> = {
    1: "🌐",
    2: "⚛️",
    3: "⚙️",
    4: "🤖",
    5: "🔐",
    6: "☁️",
  };
  return icons[month] || "📚";
}

export function calculateLevel(xp: number): { level: number; xpToNextLevel: number; progress: number } {
  // XP required for each level: level^2 * 100
  let level = 1;
  let totalRequired = 0;
  while (totalRequired + level * level * 100 <= xp) {
    totalRequired += level * level * 100;
    level++;
  }
  const currentLevelXP = level * level * 100;
  const xpInCurrentLevel = xp - totalRequired;
  return {
    level,
    xpToNextLevel: currentLevelXP - xpInCurrentLevel,
    progress: Math.floor((xpInCurrentLevel / currentLevelXP) * 100),
  };
}

export function getLevelTitle(level: number): string {
  if (level < 5) return "Novice";
  if (level < 10) return "Apprentice";
  if (level < 20) return "Developer";
  if (level < 35) return "Engineer";
  if (level < 50) return "Senior Engineer";
  if (level < 70) return "Staff Engineer";
  if (level < 90) return "Principal Engineer";
  return "Distinguished Engineer";
}

export function getRarityColor(rarity: string): string {
  const colors: Record<string, string> = {
    common: "text-gray-400 border-gray-400/30 bg-gray-400/10",
    rare: "text-blue-400 border-blue-400/30 bg-blue-400/10",
    epic: "text-purple-400 border-purple-400/30 bg-purple-400/10",
    legendary: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  };
  return colors[rarity] || colors.common;
}

export function getWeekNumber(date: Date): number {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.ceil(dayOfYear / 7);
}

export function getDayOfMonth(month: number, day: number, startDate?: Date): Date {
  const base = startDate || new Date();
  const result = new Date(base);
  result.setMonth(result.getMonth() + month - 1);
  result.setDate(day);
  return result;
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function getTopicsArray(topics: string): string[] {
  return topics.split(",").map((t) => t.trim()).filter(Boolean);
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + "..." : str;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    not_started: "text-gray-400 bg-gray-400/10",
    in_progress: "text-blue-400 bg-blue-400/10",
    done: "text-green-400 bg-green-400/10",
    applied: "text-blue-400 bg-blue-400/10",
    interviewing: "text-purple-400 bg-purple-400/10",
    offer: "text-green-400 bg-green-400/10",
    rejected: "text-red-400 bg-red-400/10",
    withdrawn: "text-gray-400 bg-gray-400/10",
  };
  return colors[status] || "text-gray-400 bg-gray-400/10";
}

export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    beginner: "text-green-400 bg-green-400/10 border-green-400/20",
    intermediate: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    advanced: "text-red-400 bg-red-400/10 border-red-400/20",
  };
  return colors[difficulty] || colors.beginner;
}
