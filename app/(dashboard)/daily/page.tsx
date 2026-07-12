"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Clock, BookOpen, FileCode, CheckCircle2, AlertCircle, HelpCircle, Award, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Confetti from "react-confetti";
import { useGame } from "@/components/providers/GameContext";
import { DayEntry } from "@/types";

interface Question {
  q: string;
  opts: string[];
  correct: number;
}

const quizQuestions: Question[] = [
  {
    q: "Which HTML5 semantic element represents content that is tangentially related to the content around it?",
    opts: ["<aside>", "<section>", "<article>", "<main>"],
    correct: 0,
  },
  {
    q: "What is the primary benefit of using semantic HTML elements?",
    opts: [
      "Faster rendering by the browser",
      "Better accessibility and SEO indexing",
      "Automatic CSS styling templates",
      "Enhanced security features",
    ],
    correct: 1,
  },
];

function DailyStudyContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const { completedDays, notes, completeDay, uncompleteDay, saveNote } = useGame();

  const monthParam = searchParams.get("month");
  const dayParam = searchParams.get("day");

  const month = monthParam ? parseInt(monthParam, 10) : 1;
  const day = dayParam ? parseInt(dayParam, 10) : 1;
  const key = `${month}-${day}`;

  const isCompleted = !!completedDays[key];
  const storedNote = notes[key] || "";

  const [dayData, setDayData] = useState<DayEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [localNotes, setLocalNotes] = useState(storedNote);

  // Section checklist states
  const [theoryDone, setTheoryDone] = useState(false);
  const [practiceDone, setPracticeDone] = useState(false);
  const [englishDone, setEnglishDone] = useState(false);

  // Sync checklist when completed changes
  useEffect(() => {
    if (isCompleted) {
      setTheoryDone(true);
      setPracticeDone(true);
      setEnglishDone(true);
    } else {
      setTheoryDone(false);
      setPracticeDone(false);
      setEnglishDone(false);
    }
  }, [isCompleted]);

  // Sync note state when month/day changes
  useEffect(() => {
    setLocalNotes(storedNote);
  }, [key, storedNote]);

  const monthSlugs = [
    { month: 1, file: "month1_fullstack" },
    { month: 2, file: "month2_frontend" },
    { month: 3, file: "month3_backend" },
    { month: 4, file: "month4_ai" },
    { month: 5, file: "month5_appsec" },
    { month: 6, file: "month6_cloud_devsecops" },
  ];

  useEffect(() => {
    async function fetchDayData() {
      setLoading(true);
      try {
        const activeMonth = monthSlugs.find((m) => m.month === month);
        if (!activeMonth) {
          throw new Error("Invalid month parameter");
        }
        const res = await fetch(`/content/${activeMonth.file}.json`);
        if (!res.ok) {
          throw new Error("Failed to load curriculum month file");
        }
        const days: DayEntry[] = await res.json();
        const activeDay = days.find((d) => d.day === day);
        if (activeDay) {
          setDayData(activeDay);
        } else {
          setDayData(null);
        }
      } catch (err) {
        console.error("Error loading day content", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDayData();
  }, [month, day]);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizChecked, setQuizChecked] = useState(false);

  const handleQuizAnswer = (qIndex: number, optIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleMarkComplete = () => {
    if (!theoryDone || !practiceDone || !englishDone) {
      toast({
        variant: "destructive",
        title: "Incomplete Tasks",
        description: "Please check all required checklist items before finalizing today's study.",
      });
      return;
    }

    completeDay(month, day);
    setShowConfetti(true);
    toast({
      variant: "success",
      title: "Day Completed! 🎉",
      description: "You earned +150 XP and kept your streak alive!",
    });
    setTimeout(() => {
      setShowConfetti(false);
    }, 4500);
  };

  const handleToggleUncomplete = () => {
    uncompleteDay(month, day);
    toast({
      title: "Progress Reset",
      description: "Day marked as incomplete. XP has been adjusted.",
    });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setLocalNotes(val);
    saveNote(month, day, val);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <RefreshCw className="w-8 h-8 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground">Loading day curriculum details...</p>
      </div>
    );
  }

  if (!dayData) {
    return (
      <div className="text-center py-12 space-y-3">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
        <h3 className="text-lg font-bold">Curriculum Day Not Found</h3>
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t find Day {day} of Month {month} in the curriculum files.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {showConfetti && <Confetti width={1200} height={800} />}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Badge variant="purple" className="mb-2">Month {month} / Day {day}</Badge>
          <h2 className="text-3xl font-extrabold tracking-tight capitalize">
            {dayData.topics.split(",").join(" & ")}
          </h2>
          <p className="text-muted-foreground text-sm">
            Focus topics: {dayData.topics}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-muted-foreground">Est. Time: {dayData.fullStack}</span>
          </div>
          {isCompleted && (
            <Button variant="outline" size="sm" onClick={handleToggleUncomplete} className="text-xs text-destructive hover:bg-destructive/10">
              Reset Progress
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Tabs */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="theory" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="theory">Theory Study</TabsTrigger>
              <TabsTrigger value="practice">Hands-on Practice</TabsTrigger>
              <TabsTrigger value="english">Technical English</TabsTrigger>
            </TabsList>

            <TabsContent value="theory">
              <Card className="border-border/40 mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Theoretical Framework</CardTitle>
                  <CardDescription>Deep dive into {dayData.topics}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-relaxed">
                  <p>
                    Today we are studying <strong>{dayData.topics}</strong>. Developing a solid mental model of these concepts is essential to implementing high-quality code.
                  </p>
                  <p>
                    In this session, you should focus on the following guidelines:
                  </p>
                  <ul className="list-disc list-inside pl-4 space-y-2 text-muted-foreground">
                    <li>Analyze syntax structure and core building blocks.</li>
                    <li>Understand standard API behaviors, parameters, and return types.</li>
                    <li>Evaluate best practices regarding efficiency, responsiveness, and performance.</li>
                    <li>Research documentation and read related reference materials.</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practice">
              <Card className="border-border/40 mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Coding Challenge</CardTitle>
                  <CardDescription>Apply your knowledge with concrete practice</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs text-purple-300 space-y-2">
                    <p className="text-zinc-500">// Practice Objective: {dayData.practice}</p>
                    <p>1. Open your code editor and create a new scratch branch.</p>
                    <p>2. Implement a mini-application or service utilizing today&apos;s topics.</p>
                    <p>3. Test edge cases and verify responsiveness.</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Estimated practice duration: {dayData.practice || "45 minutes"}. Don&apos;t skip compiling and running!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="english">
              <Card className="border-border/40 mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Developer English & Jargon</CardTitle>
                  <CardDescription>Master communication for global tech teams</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-relaxed">
                  <p>
                    Review vocabulary and phrasing related to <strong>{dayData.english}</strong>. 
                  </p>
                  <p className="text-muted-foreground font-medium">
                    Key concepts to define in English:
                  </p>
                  <ul className="list-disc list-inside pl-4 space-y-1 text-muted-foreground text-xs">
                    <li>Technical explanations of the today&apos;s structures.</li>
                    <li>Discussing bottlenecks and solutions with peer engineers.</li>
                    <li>Writing clear code comments and documentation.</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Interactive Quiz */}
          <Card className="border-border/40">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Retention Review Quiz</CardTitle>
              </div>
              <CardDescription>Validate what you just studied</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {quizQuestions.map((qObj, qIndex) => (
                <div key={qIndex} className="space-y-2">
                  <p className="text-sm font-semibold">{qIndex + 1}. {qObj.q}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {qObj.opts.map((opt, optIndex) => {
                      const selected = selectedAnswers[qIndex] === optIndex;
                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleQuizAnswer(qIndex, optIndex)}
                          className={`p-3 text-left text-xs rounded-xl border transition-all ${
                            selected
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border/40 hover:bg-secondary/40 text-muted-foreground"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button onClick={() => setQuizChecked(true)} variant="outline" className="w-full">
                Verify Answers
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle className="text-base font-bold">Progress Checklist</CardTitle>
              <CardDescription>Complete all tasks to unlock XP</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox id="theory" checked={theoryDone} onCheckedChange={(v) => !isCompleted && setTheoryDone(!!v)} disabled={isCompleted} />
                <label htmlFor="theory" className="text-xs font-medium cursor-pointer">Theory Lesson ({dayData.fullStack})</label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="practice" checked={practiceDone} onCheckedChange={(v) => !isCompleted && setPracticeDone(!!v)} disabled={isCompleted} />
                <label htmlFor="practice" className="text-xs font-medium cursor-pointer">Hands-on Practice ({dayData.practice})</label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="english" checked={englishDone} onCheckedChange={(v) => !isCompleted && setEnglishDone(!!v)} disabled={isCompleted} />
                <label htmlFor="english" className="text-xs font-medium cursor-pointer">Technical English vocabulary ({dayData.english})</label>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleMarkComplete}
                variant={isCompleted ? "secondary" : "gradient"}
                className="w-full"
                disabled={isCompleted}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-1 text-green-400" /> Completed Day!
                  </>
                ) : (
                  "Mark Today Complete (+150 XP)"
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Resources */}
          <Card className="border-border/40">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <CardTitle className="text-sm font-bold">Lesson Resources</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "MDN Web Documentation", url: "https://developer.mozilla.org" },
                { title: "freeCodeCamp Curriculum", url: "https://freecodecamp.org" },
              ].map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex justify-between items-center p-2 rounded-lg bg-secondary/30 hover:bg-secondary/60 text-xs text-muted-foreground border border-border/20 transition-all"
                >
                  <span>{res.title}</span>
                  <BookOpen className="w-3.5 h-3.5 text-primary" />
                </a>
              ))}
            </CardContent>
          </Card>

          {/* Save Personal Notes */}
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle className="text-sm font-bold">Personal Notebook</CardTitle>
              <CardDescription>Autosaved to browser storage</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write code snippets or key notes from today's lesson here..."
                rows={5}
                value={localNotes}
                onChange={handleNotesChange}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function DailyStudyPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <RefreshCw className="w-8 h-8 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground">Initializing daily study page...</p>
      </div>
    }>
      <DailyStudyContent />
    </Suspense>
  );
}
