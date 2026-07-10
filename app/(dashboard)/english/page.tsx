"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Languages, Volume2, Mic, FileText, CheckCircle2, Award, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScoreSet {
  title: string;
  score: number;
}

export default function EnglishPage() {
  const { toast } = useToast();
  const [scores, setScores] = useState<Record<string, number>>({
    vocabulary: 80,
    grammar: 75,
    listening: 90,
    speaking: 70,
    writing: 85,
    technical: 95,
    interview: 60,
  });

  const handlePractice = (category: string) => {
    setScores((prev) => {
      const current = prev[category] || 0;
      const next = Math.min(current + 5, 100);
      return { ...prev, [category]: next };
    });
    toast({
      variant: "success",
      title: "Practice Completed!",
      description: `Your ${category} proficiency increased!`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Technical & Interview English</h2>
        <p className="text-muted-foreground text-sm">
          Master the language of global software development teams and technical interviews.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Proficiency Summary Sidebar */}
        <Card className="lg:col-span-1 border border-border/40 h-fit">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Languages className="w-5 h-5 text-primary" /> Proficiency Scores
            </CardTitle>
            <CardDescription>Target: 90%+ in all areas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(scores).map(([key, val]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-xs capitalize font-medium">
                  <span>{key} English</span>
                  <span>{val}%</span>
                </div>
                <Progress value={val} indicatorClassName={val >= 90 ? "bg-green-500" : "bg-primary"} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tab Modules */}
        <Card className="lg:col-span-3 border border-border/40">
          <CardContent className="p-6">
            <Tabs defaultValue="vocabulary" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 h-auto gap-1 bg-transparent p-0">
                {Object.keys(scores).map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="capitalize text-xs py-2 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border/20 rounded-lg"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.keys(scores).map((cat) => (
                <TabsContent key={cat} value={cat} className="space-y-6 mt-6">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold capitalize">{cat} English Module</h3>
                      <p className="text-muted-foreground text-xs">Improve command of terms, fluency, and response layouts.</p>
                    </div>
                    <Badge variant={scores[cat] >= 90 ? "success" : "purple"}>
                      {scores[cat] >= 90 ? "Expert" : "Intermediate"}
                    </Badge>
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/40 border space-y-3">
                    <p className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-primary" /> Recommended Session Action
                    </p>
                    <p className="text-sm leading-relaxed">
                      Practice daily software developer terminology flashcards. Learn semantic contexts of REST APIs, concurrency, or container orchestration.
                    </p>
                  </div>

                  <Button onClick={() => handlePractice(cat)} variant="gradient" className="w-full">
                    Start Session Practice (+25 XP)
                  </Button>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
