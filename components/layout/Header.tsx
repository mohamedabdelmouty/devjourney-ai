"use client";

import { usePathname } from "next/navigation";
import { Bell, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/daily": "Daily Study",
  "/roadmap": "Roadmap",
  "/projects": "Projects",
  "/resources": "Resources",
  "/english": "English",
  "/interview": "Interview Prep",
  "/statistics": "Statistics",
  "/achievements": "Achievements",
  "/certificates": "Certificates",
  "/profile": "Profile",
  "/settings": "Settings",
  "/portfolio": "Portfolio",
  "/job-tracker": "Job Tracker",
  "/ai-mentor": "AI Mentor",
};

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const title = pageTitles[pathname] || "DevJourney AI";

  return (
    <header className="h-14 border-b border-border bg-background/80 backdrop-blur-md flex items-center px-4 gap-4 sticky top-0 z-10">
      <motion.h1
        key={pathname}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-semibold text-sm text-foreground"
      >
        {title}
      </motion.h1>

      <div className="flex-1 max-w-sm hidden md:block">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search roadmap, topics..."
            className="pl-8 h-8 text-xs bg-muted border-0 focus-visible:ring-1"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
        </Button>
        <Link href="/profile">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:scale-110 transition-transform">
            DJ
          </div>
        </Link>
      </div>
    </header>
  );
}
