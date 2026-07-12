"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Map, Search, Filter, BookOpen, Calendar, Circle, CheckCircle2, ChevronRight } from "lucide-react";
import { RoadmapMonth, DayEntry } from "@/types";
import { getMonthColor, getMonthTitle } from "@/lib/utils";
import Link from "next/link";
import { useGame } from "@/components/providers/GameContext";

export default function RoadmapPage() {
  const { completedDays } = useGame();
  const [months, setMonths] = useState<RoadmapMonth[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [filterTopic, setFilterTopic] = useState("All");
  const [loading, setLoading] = useState(true);

  const monthSlugs = [
    { month: 1, file: "month1_fullstack", title: "Fullstack Foundations" },
    { month: 2, file: "month2_frontend", title: "Advanced Frontend" },
    { month: 3, file: "month3_backend", title: "Backend Architecture" },
    { month: 4, file: "month4_ai", title: "AI Engineering" },
    { month: 5, file: "month5_appsec", title: "Application Security" },
    { month: 6, file: "month6_cloud_devsecops", title: "Cloud & DevSecOps" },
  ];

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedMonths = await Promise.all(
          monthSlugs.map(async (m) => {
            const res = await fetch(`/content/${m.file}.json`);
            const days = await res.json();
            return {
              month: m.month,
              slug: m.file,
              title: m.title,
              color: m.month === 1 ? "purple" : m.month === 2 ? "cyan" : m.month === 3 ? "emerald" : m.month === 4 ? "blue" : m.month === 5 ? "red" : "amber",
              icon: "Map",
              days: days,
            };
          })
        );
        setMonths(fetchedMonths);
      } catch (err) {
        console.error("Failed to load roadmap data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const currentMonthData = months.find((m) => m.month === selectedMonth);

  // Topics extraction from current month
  const topicsList = ["All"];
  currentMonthData?.days.forEach((day) => {
    day.topics.split(",").forEach((topic) => {
      const clean = topic.trim();
      if (clean && !topicsList.includes(clean)) {
        topicsList.push(clean);
      }
    });
  });

  const filteredDays = currentMonthData?.days.filter((day) => {
    const matchesSearch = day.topics.toLowerCase().includes(search.toLowerCase());
    const matchesTopic = filterTopic === "All" || day.topics.includes(filterTopic);
    return matchesSearch && matchesTopic;
  }) || [];

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Structured Roadmap</h2>
          <p className="text-muted-foreground text-sm">
            Curriculum dynamically generated from JSON configuration files.
          </p>
        </div>
      </div>

      {/* Month Selection Buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 w-24 bg-secondary animate-pulse rounded-lg shrink-0" />
          ))
        ) : (
          months.map((m) => {
            const isActive = m.month === selectedMonth;
            return (
              <Button
                key={m.month}
                onClick={() => {
                  setSelectedMonth(m.month);
                  setFilterTopic("All");
                }}
                variant={isActive ? "default" : "outline"}
                className="shrink-0"
              >
                Month {m.month}
              </Button>
            );
          })
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search topics (e.g. HTML, React)..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
          {topicsList.map((topic) => (
            <Button
              key={topic}
              size="sm"
              variant={filterTopic === topic ? "secondary" : "ghost"}
              className="shrink-0 text-xs"
              onClick={() => setFilterTopic(topic)}
            >
              {topic}
            </Button>
          ))}
        </div>
      </div>

      {/* Days Timeline View */}
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 w-full bg-secondary/50 animate-pulse rounded-xl" />
          ))
        ) : filteredDays.length > 0 ? (
          filteredDays.map((day) => (
            <Card key={day.day} className="border-border/40 hover:border-primary/20 transition-all">
              <CardContent className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center font-bold text-primary shrink-0">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">Day</span>
                    <span className="text-sm mt-[-4px]">{day.day}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {day.topics.split(",").map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-[10px]">
                          {topic.trim()}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Fullstack: <span className="text-foreground font-medium">{day.fullStack}</span> | English:{" "}
                      <span className="text-foreground font-medium">{day.english}</span> | Practice:{" "}
                      <span className="text-foreground font-medium">{day.practice}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  <Badge variant={completedDays[`${selectedMonth}-${day.day}`] ? "success" : "warning"} className="text-xs">
                    {completedDays[`${selectedMonth}-${day.day}`] ? "Done" : "Pending"}
                  </Badge>
                  <Link href={`/daily?month=${selectedMonth}&day=${day.day}`} className="w-full sm:w-auto">
                    <Button size="sm" variant="outline" className="w-full">
                      Start Study <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No matching days found. Try resetting filters.
          </div>
        )}
      </div>
    </div>
  );
}
