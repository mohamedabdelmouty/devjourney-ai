"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { BarChart3, Clock, TrendingUp, Calendar, Zap } from "lucide-react";
import { useGame } from "@/components/providers/GameContext";

export default function StatisticsPage() {
  const { xp, completedDays } = useGame();
  const completedCount = Object.keys(completedDays).length;
  
  // Calculate completed days per month
  const getCompletedCountForMonth = (m: number) => {
    return Array.from({ length: 30 }).filter((_, i) => completedDays[`${m}-${i + 1}`]).length;
  };

  const monthCompletionData = [
    { name: "Month 1", completed: getCompletedCountForMonth(1), total: 30 },
    { name: "Month 2", completed: getCompletedCountForMonth(2), total: 30 },
    { name: "Month 3", completed: getCompletedCountForMonth(3), total: 30 },
    { name: "Month 4", completed: getCompletedCountForMonth(4), total: 30 },
    { name: "Month 5", completed: getCompletedCountForMonth(5), total: 30 },
    { name: "Month 6", completed: getCompletedCountForMonth(6), total: 30 },
  ];

  const completionRate = ((completedCount / 180) * 100).toFixed(1);

  // Generate dynamic XP history data
  const xpHistoryData = [
    { day: "Start", xp: 0 },
    { day: "Current", xp: xp },
  ];

  const stats = [
    { label: "Total Active Time", val: `${(completedCount * 3.5).toFixed(1)} Hours`, desc: "Based on 3.5 hrs estimated per day", icon: Clock },
    { label: "XP Points Earned", val: xp.toLocaleString(), desc: "Accrued in browser database", icon: TrendingUp },
    { label: "Completion Rate", val: `${completionRate}%`, desc: `${completedCount} of 180 total days completed`, icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Analytics & Stats</h2>
        <p className="text-muted-foreground text-sm">
          Deep analytics on study time, XP progression, and curriculum completion ratios.
        </p>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((item, idx) => (
          <Card key={idx} className="border border-border/40">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase">{item.label}</p>
                <p className="text-2xl font-bold">{item.val}</p>
                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              </div>
              <div className="p-3 bg-secondary rounded-xl text-primary border">
                <item.icon className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* XP Progression Line Chart */}
        <Card className="border border-border/40">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-purple-400" /> XP Growth History
            </CardTitle>
            <CardDescription>Visual tracker of cumulative XP points</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={xpHistoryData}>
                <defs>
                  <linearGradient id="xpColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#0a0a0c", borderColor: "#27272a", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="xp" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#xpColor)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Completion Bar Chart */}
        <Card className="border border-border/40">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-400" /> Curriculum Completion Ratios
            </CardTitle>
            <CardDescription>Comparing completed days to total monthly days</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthCompletionData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#0a0a0c", borderColor: "#27272a", borderRadius: "8px" }} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="completed" name="Completed Days" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" name="Total Days Required" fill="#27272a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
