"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CalendarDays,
  Map,
  FolderKanban,
  BookOpen,
  Languages,
  MessageSquare,
  BarChart3,
  Trophy,
  Award,
  User,
  Settings,
  Briefcase,
  Bot,
  Globe,
  Zap,
  ChevronLeft,
  ChevronRight,
  Flame,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, group: "main" },
  { href: "/daily", label: "Daily Study", icon: CalendarDays, group: "main", badge: "Today" },
  { href: "/roadmap", label: "Roadmap", icon: Map, group: "main" },
  { href: "/projects", label: "Projects", icon: FolderKanban, group: "learn" },
  { href: "/resources", label: "Resources", icon: BookOpen, group: "learn" },
  { href: "/english", label: "English", icon: Languages, group: "learn" },
  { href: "/interview", label: "Interview", icon: MessageSquare, group: "learn" },
  { href: "/ai-mentor", label: "AI Mentor", icon: Bot, group: "ai", badge: "AI" },
  { href: "/statistics", label: "Statistics", icon: BarChart3, group: "progress" },
  { href: "/achievements", label: "Achievements", icon: Trophy, group: "progress" },
  { href: "/certificates", label: "Certificates", icon: Award, group: "progress" },
  { href: "/job-tracker", label: "Job Tracker", icon: Briefcase, group: "career" },
  { href: "/portfolio", label: "Portfolio", icon: Globe, group: "career" },
  { href: "/profile", label: "Profile", icon: User, group: "account" },
  { href: "/settings", label: "Settings", icon: Settings, group: "account" },
];

const groups = [
  { key: "main", label: "Overview" },
  { key: "learn", label: "Learning" },
  { key: "ai", label: "AI Tools" },
  { key: "progress", label: "Progress" },
  { key: "career", label: "Career" },
  { key: "account", label: "Account" },
];

interface SidebarProps {
  userXP?: number;
  userLevel?: number;
  streak?: number;
}

export function Sidebar({ userXP = 0, userLevel = 1, streak = 0 }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative flex flex-col h-screen bg-sidebar border-r border-sidebar-border overflow-hidden z-20 shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <span className="font-bold text-sm gradient-text whitespace-nowrap">DevJourney AI</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* User stats pill */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-3 mt-3 p-3 rounded-lg bg-primary/10 border border-primary/20"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-primary">Level {userLevel}</span>
            </div>
            <div className="flex items-center gap-1 text-orange-400">
              <Flame className="w-3 h-3" />
              <span className="text-xs font-bold">{streak}</span>
            </div>
          </div>
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((userXP % 1000) / 10, 100)}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{userXP.toLocaleString()} XP</p>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {groups.map((group) => {
          const items = navItems.filter((n) => n.group === group.key);
          if (!items.length) return null;
          return (
            <div key={group.key} className="mb-2">
              {!collapsed && (
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">
                  {group.label}
                </p>
              )}
              {items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-all duration-150 relative group cursor-pointer",
                        active
                          ? "bg-primary/15 text-primary font-medium"
                          : "text-sidebar-foreground hover:bg-accent hover:text-accent-foreground",
                        collapsed && "justify-center"
                      )}
                    >
                      {active && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 rounded-lg bg-primary/10"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <item.icon
                        className={cn("w-4 h-4 shrink-0 z-10", active && "text-primary")}
                      />
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="z-10 flex-1 whitespace-nowrap"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {!collapsed && item.badge && (
                        <Badge
                          variant={item.badge === "AI" ? "purple" : "info"}
                          className="text-[10px] px-1.5 py-0 h-4 z-10"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {collapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 rounded-md bg-popover border text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                          {item.label}
                        </div>
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center p-4 border-t border-sidebar-border hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </motion.aside>
  );
}
