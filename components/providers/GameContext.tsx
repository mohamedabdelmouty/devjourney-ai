"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ProjectItem {
  id: number;
  title: string;
  desc: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  time: string;
  status: "not_started" | "in_progress" | "done";
  github: string;
  checklist: string[];
}

export interface JobItem {
  id: number;
  company: string;
  role: string;
  location: string;
  salary: string;
  status: "applied" | "interviewing" | "offer" | "rejected";
}

interface GameContextType {
  xp: number;
  level: number;
  streak: number;
  completedDays: Record<string, boolean>;
  notes: Record<string, string>;
  projects: ProjectItem[];
  jobs: JobItem[];
  completeDay: (month: number, day: number) => void;
  uncompleteDay: (month: number, day: number) => void;
  saveNote: (month: number, day: number, noteText: string) => void;
  updateProjectStatus: (id: number, nextStatus: ProjectItem["status"]) => void;
  updateProjectGithub: (id: number, url: string) => void;
  addJob: (company: string, role: string, location: string, salary: string) => void;
  updateJobStatus: (id: number, nextStatus: JobItem["status"]) => void;
  deleteJob: (id: number) => void;
  resetAll: () => void;
}

const initialProjects: ProjectItem[] = [
  {
    id: 1,
    title: "Personal Portfolio Site",
    desc: "Create a modern responsive portfolio page using semantic HTML5 tags and CSS Flexbox/Grid systems.",
    difficulty: "beginner",
    time: "6 hrs",
    status: "done",
    github: "https://github.com/example/portfolio",
    checklist: ["Outline basic HTML sections", "Apply CSS styling grids", "Make site mobile responsive", "Deploy to Vercel/GitHub Pages"],
  },
  {
    id: 2,
    title: "Interactive Weather App",
    desc: "Build a Javascript application that fetches real-time meteorological weather data using public REST APIs.",
    difficulty: "intermediate",
    time: "12 hrs",
    status: "in_progress",
    github: "",
    checklist: ["Create API Developer accounts", "Build dashboard layout", "Implement fetch & error handling", "Add search autocomplete"],
  },
  {
    id: 3,
    title: "E-Commerce Microservice API",
    desc: "Design a high-performance shopping cart backend api with JWT session authentication and database schemas.",
    difficulty: "advanced",
    time: "24 hrs",
    status: "not_started",
    github: "",
    checklist: ["Design Postgres DB models", "Implement token auth middleware", "Build checkout routes", "Write unit test suite"],
  },
];

const initialJobs: JobItem[] = [
  { id: 1, company: "Google", role: "Junior Frontend Engineer", location: "Mountain View, CA (Hybrid)", salary: "$120,000/yr", status: "applied" },
  { id: 2, company: "Stripe", role: "Fullstack Engineer", location: "San Francisco, CA (Remote)", salary: "$140,000/yr", status: "interviewing" },
  { id: 3, company: "Vercel", role: "Next.js Core Intern", location: "Remote", salary: "$90,000/yr", status: "offer" },
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState(2);
  const [streak, setStreak] = useState(5);
  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [jobs, setJobs] = useState<JobItem[]>(initialJobs);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const storedXp = localStorage.getItem("dj_xp");
      const storedLevel = localStorage.getItem("dj_level");
      const storedStreak = localStorage.getItem("dj_streak");
      const storedCompleted = localStorage.getItem("dj_completed_days");
      const storedNotes = localStorage.getItem("dj_notes");
      const storedProjects = localStorage.getItem("dj_projects");
      const storedJobs = localStorage.getItem("dj_jobs");

      if (storedXp) setXp(Number(storedXp));
      if (storedLevel) setLevel(Number(storedLevel));
      if (storedStreak) setStreak(Number(storedStreak));
      if (storedCompleted) setCompletedDays(JSON.parse(storedCompleted));
      if (storedNotes) setNotes(JSON.parse(storedNotes));
      if (storedProjects) setProjects(JSON.parse(storedProjects));
      if (storedJobs) setJobs(JSON.parse(storedJobs));
    } catch (e) {
      console.error("Failed to load game state from localStorage", e);
    }
    setIsHydrated(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("dj_xp", String(xp));
    localStorage.setItem("dj_level", String(level));
    localStorage.setItem("dj_streak", String(streak));
    localStorage.setItem("dj_completed_days", JSON.stringify(completedDays));
    localStorage.setItem("dj_notes", JSON.stringify(notes));
    localStorage.setItem("dj_projects", JSON.stringify(projects));
    localStorage.setItem("dj_jobs", JSON.stringify(jobs));
  }, [xp, level, streak, completedDays, notes, projects, jobs, isHydrated]);

  const completeDay = (month: number, day: number) => {
    const key = `${month}-${day}`;
    if (completedDays[key]) return; // already completed

    setCompletedDays((prev) => ({ ...prev, [key]: true }));

    // Update XP and Level
    const newXp = xp + 150;
    setXp(newXp);
    // Level up calculation: e.g. 1000 XP per level
    const newLevel = Math.floor(newXp / 1000) + 1;
    setLevel(newLevel);

    // Update Streak
    setStreak((prev) => prev + 1);
  };

  const uncompleteDay = (month: number, day: number) => {
    const key = `${month}-${day}`;
    if (!completedDays[key]) return;

    setCompletedDays((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });

    const newXp = Math.max(0, xp - 150);
    setXp(newXp);
    const newLevel = Math.floor(newXp / 1000) + 1;
    setLevel(newLevel);
    setStreak((prev) => Math.max(0, prev - 1));
  };

  const saveNote = (month: number, day: number, noteText: string) => {
    const key = `${month}-${day}`;
    setNotes((prev) => ({ ...prev, [key]: noteText }));
  };

  const updateProjectStatus = (id: number, nextStatus: ProjectItem["status"]) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: nextStatus } : p))
    );
  };

  const updateProjectGithub = (id: number, url: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, github: url } : p))
    );
  };

  const addJob = (company: string, role: string, location: string, salary: string) => {
    const newJob: JobItem = {
      id: Date.now(),
      company,
      role,
      location: location || "Remote",
      salary: salary || "TBD",
      status: "applied",
    };
    setJobs((prev) => [...prev, newJob]);
  };

  const updateJobStatus = (id: number, nextStatus: JobItem["status"]) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: nextStatus } : j))
    );
  };

  const deleteJob = (id: number) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const resetAll = () => {
    setXp(0);
    setLevel(1);
    setStreak(0);
    setCompletedDays({});
    setNotes({});
    setProjects(initialProjects);
    setJobs(initialJobs);
    localStorage.clear();
  };

  return (
    <GameContext.Provider
      value={{
        xp,
        level,
        streak,
        completedDays,
        notes,
        projects,
        jobs,
        completeDay,
        uncompleteDay,
        saveNote,
        updateProjectStatus,
        updateProjectGithub,
        addJob,
        updateJobStatus,
        deleteJob,
        resetAll,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
