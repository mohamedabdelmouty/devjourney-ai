import fs from "fs";
import path from "path";
import { RoadmapMonth, DayEntry, ResourcesData } from "@/types";
import {
  getMonthTitle,
  getMonthColor,
  getMonthIcon,
  getMonthFromSlug,
} from "@/lib/utils";

// Path to the content directory (in public/content at runtime, or project root for local dev)
function getContentDir(): string {
  // In production (Vercel), public/content is accessible
  // In dev, we read from the project root /content or public/content
  const publicContent = path.join(process.cwd(), "public", "content");
  const rootContent = path.join(process.cwd(), "content");

  if (fs.existsSync(publicContent)) return publicContent;
  if (fs.existsSync(rootContent)) return rootContent;

  // Fallback to public
  return publicContent;
}

/**
 * Dynamically reads ALL month JSON files from the content directory.
 * Adding a new monthN_xxx.json automatically includes it — no code changes needed.
 */
export async function loadAllRoadmapMonths(): Promise<RoadmapMonth[]> {
  const contentDir = getContentDir();

  if (!fs.existsSync(contentDir)) {
    console.warn(`Content directory not found: ${contentDir}`);
    return [];
  }

  const files = fs.readdirSync(contentDir).filter(
    (f) => f.match(/^month\d+.*\.json$/) && !f.includes("resources")
  );

  // Sort by month number
  files.sort((a, b) => {
    const ma = parseInt(a.match(/\d+/)?.[0] || "0");
    const mb = parseInt(b.match(/\d+/)?.[0] || "0");
    return ma - mb;
  });

  const months: RoadmapMonth[] = [];

  for (const file of files) {
    try {
      const filePath = path.join(contentDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const days: DayEntry[] = JSON.parse(raw);
      const slug = file.replace(".json", "");
      const month = getMonthFromSlug(slug);

      months.push({
        month,
        slug,
        title: getMonthTitle(month),
        color: getMonthColor(month),
        icon: getMonthIcon(month),
        days,
      });
    } catch (err) {
      console.error(`Failed to load ${file}:`, err);
    }
  }

  return months;
}

/**
 * Load a single month by number
 */
export async function loadRoadmapMonth(monthNumber: number): Promise<RoadmapMonth | null> {
  const months = await loadAllRoadmapMonths();
  return months.find((m) => m.month === monthNumber) || null;
}

/**
 * Load resources.json
 */
export async function loadResources(): Promise<ResourcesData> {
  const contentDir = getContentDir();
  const filePath = path.join(contentDir, "resources.json");

  if (!fs.existsSync(filePath)) {
    return { courses: [] };
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

/**
 * Get total number of days across all months
 */
export async function getTotalDays(): Promise<number> {
  const months = await loadAllRoadmapMonths();
  return months.reduce((sum, m) => sum + m.days.length, 0);
}

/**
 * Find a specific day entry
 */
export async function getDayEntry(
  month: number,
  day: number
): Promise<DayEntry | null> {
  const roadmapMonth = await loadRoadmapMonth(month);
  if (!roadmapMonth) return null;
  return roadmapMonth.days.find((d) => d.day === day) || null;
}

/**
 * Get all unique topics across all months
 */
export async function getAllTopics(): Promise<string[]> {
  const months = await loadAllRoadmapMonths();
  const topicsSet = new Set<string>();

  months.forEach((m) => {
    m.days.forEach((d) => {
      d.topics.split(",").forEach((t) => topicsSet.add(t.trim()));
    });
  });

  return Array.from(topicsSet);
}
