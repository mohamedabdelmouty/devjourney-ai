"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";
import { Flame, Trophy, Clock, Star, BookOpen, Calendar, ArrowRight, Zap, Target } from "lucide-react";
import Link from "next/link";
import { formatMinutes } from "@/lib/utils";

// Mock data
const mockWeeklyData = [
  { day: "Mon", hours: 2.5, xp: 250 },
  { day: "Tue", hours: 3.1, xp: 310 },
  { day: "Wed", hours: 1.8, xp: 180 },
  { day: "Thu", hours: 4.0, xp: 400 },
  { day: "Fri", hours: 2.2, xp: 220 },
  { day: "Sat", hours: 3.5, xp: 350 },
  { day: "Sun", hours: 1.2, xp: 120 },
];

const mockTopicData = [
  { name: "Fullstack", value: 45, color: "#a855f7" },
  { name: "Frontend", value: 30, color: "#06b6d4" },
  { name: "Practice", value: 15, color: "#10b981" },
  { name: "English", value: 10, color: "#f59e0b" },
];

import { useGame } from "@/components/providers/GameContext";

export default function DashboardPage() {
  const { xp, level, streak, completedDays } = useGame();
  
  const completedCount = Object.keys(completedDays).length;
  const totalDays = 180;
  const completionPercentage = Math.min(100, Math.round((completedCount / totalDays) * 100));

  // Check if today is completed (e.g. Month 1 / Day 12 or if any day is completed)
  // For the sake of mock dashboard we can see if the last day completed was today or simply count total done
  const todayCompleted = completedCount > 0;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-indigo-500/5 border border-primary/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, Developer! 👋</h2>
          <p className="text-sm text-muted-foreground">
            You are currently on <span className="text-primary font-semibold">Month 1: Fullstack Foundations</span>. Keep the flame alive!
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/daily">
            <Button variant="gradient">
              Resume Today&apos;s Study <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Daily Streak", value: `${streak} Days`, icon: Flame, color: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
          { title: "Total XP Points", value: xp.toLocaleString(), icon: Star, color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
          { title: "Study Hours This Week", value: "18.3 hrs", icon: Clock, color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20" },
          { title: "Current Phase", value: "Month 1 / Day 12", icon: Target, color: "text-green-400 bg-green-400/10 border-green-400/20" },
        ].map((stat, i) => (
          <Card key={i} className="border border-border/40 hover:scale-[1.02] transition-all">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl border ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Goal rings & charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly & Monthly Goals Card */}
        <Card className="lg:col-span-1 border border-border/40 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-base font-bold">Goals & Achievements</CardTitle>
            <CardDescription>Track your active milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span>Weekly Study Goal (15h)</span>
                <span>85% completed</span>
              </div>
              <Progress value={85} indicatorClassName="bg-cyan-500" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span>Total Curriculum Progress (180 days)</span>
                <span>{completionPercentage}% completed</span>
              </div>
              <Progress value={completionPercentage} indicatorClassName="bg-purple-500" />
            </div>

            <div className="p-4 rounded-xl bg-secondary/40 border flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500 shrink-0" />
              <div className="space-y-0.5">
                <p className="text-xs font-bold">Next Unlocked Reward</p>
                <p className="text-[11px] text-muted-foreground">Complete 14 days to earn the &quot;Hat Trick&quot; Badge</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Activity Chart */}
        <Card className="lg:col-span-1 border border-border/40">
          <CardHeader>
            <CardTitle className="text-base font-bold">Weekly Performance</CardTitle>
            <CardDescription>Daily study time distribution</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockWeeklyData}>
                <XAxis dataKey="day" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} contentStyle={{ background: "#0a0a0c", borderColor: "#27272a", borderRadius: "8px" }} />
                <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Topic Breakdown Pie Chart */}
        <Card className="lg:col-span-1 border border-border/40">
          <CardHeader>
            <CardTitle className="text-base font-bold">Topic Breakdown</CardTitle>
            <CardDescription>Visual distribution of studies</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex flex-col justify-between">
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={mockTopicData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="value">
                    {mockTopicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#0a0a0c", borderColor: "#27272a", borderRadius: "8px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {mockTopicData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5 justify-center">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-muted-foreground">{entry.name} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
