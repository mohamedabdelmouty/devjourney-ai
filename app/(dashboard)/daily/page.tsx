"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Clock, BookOpen, FileCode, CheckCircle2, AlertCircle, HelpCircle, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Confetti from "react-confetti";

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

export default function DailyStudyPage() {
  const { toast } = useToast();
  const [completed, setCompleted] = useState(false);
  const [notes, setNotes] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizChecked, setQuizChecked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Section status state
  const [theoryDone, setTheoryDone] = useState(false);
  const [practiceDone, setPracticeDone] = useState(false);
  const [englishDone, setEnglishDone] = useState(false);

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

    setCompleted(true);
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

  return (
    <div className="space-y-6 relative">
      {showConfetti && <Confetti width={1200} height={800} />}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Badge variant="purple" className="mb-2">Month 1 / Day 12</Badge>
          <h2 className="text-3xl font-extrabold tracking-tight">HTML Semantic Elements</h2>
          <p className="text-muted-foreground text-sm">Improve SEO, accessibility, and clean document outlines.</p>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-muted-foreground">Est. Time: 3.5 hrs</span>
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
                  <CardTitle className="text-lg">HTML5 Document Structures</CardTitle>
                  <CardDescription>Understanding standard blocks vs layouts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-relaxed">
                  <p>
                    Semantic HTML refers to tags that introduce meaning to the web page rather than just presentation. For example, a <code>&lt;header&gt;</code> element conveys that the enclosed text acts as heading metadata or navigation links.
                  </p>
                  <p>
                    Key tags to master today include:
                  </p>
                  <ul className="list-disc list-inside pl-4 space-y-2 text-muted-foreground">
                    <li><code>&lt;main&gt;</code> — Unique central document contents</li>
                    <li><code>&lt;section&gt;</code> — Semantic section grouping</li>
                    <li><code>&lt;article&gt;</code> — Self-contained modular content syndication</li>
                    <li><code>&lt;aside&gt;</code> — Context-relative complementary side-bars</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practice">
              <Card className="border-border/40 mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Daily Coding Challenge</CardTitle>
                  <CardDescription>Transform legacy divs to semantic outline</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs text-purple-300">
                    {`<!-- Transform this to Semantic tags -->
<div class="header">Navbar</div>
<div class="main-body">
  <div class="sidebar">Filters</div>
  <div class="content">Primary Article</div>
</div>`}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tip: Use VS Code or your browser dev-tools to inspect element hierarchies.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="english">
              <Card className="border-border/40 mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Developer Vocabulary</CardTitle>
                  <CardDescription>Words of the Day: Semantic & Accessibility</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-relaxed">
                  <p>
                    <strong>Semantic (/sɪˈmæn.tɪk/):</strong> Relating to meaning in language or logic. In coding, using tags that describe their purpose clearly to humans and machinery.
                  </p>
                  <p>
                    <strong>Accessibility (a11y):</strong> Designing digital platforms so people of all visual, auditory, and physical capabilities can navigate them seamlessly.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Interactive Quiz */}
          <Card className="border-border/40">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Daily Quiz Review</CardTitle>
              </div>
              <CardDescription>Test your retention of today&apos;s learning</CardDescription>
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
              <CardDescription>Track today&apos;s active study targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox id="theory" checked={theoryDone} onCheckedChange={(v) => setTheoryDone(!!v)} />
                <label htmlFor="theory" className="text-xs font-medium cursor-pointer">Theory Lesson (HTML5 tags)</label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="practice" checked={practiceDone} onCheckedChange={(v) => setPracticeDone(!!v)} />
                <label htmlFor="practice" className="text-xs font-medium cursor-pointer">Practice coding conversion</label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="english" checked={englishDone} onCheckedChange={(v) => setEnglishDone(!!v)} />
                <label htmlFor="english" className="text-xs font-medium cursor-pointer">Review Technical English words</label>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleMarkComplete}
                variant={completed ? "secondary" : "gradient"}
                className="w-full"
                disabled={completed}
              >
                {completed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-1 text-green-400" /> Completed Today!
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
                { title: "MDN Guide to Semantics", url: "https://developer.mozilla.org" },
                { title: "freeCodeCamp HTML Module", url: "https://freecodecamp.org" },
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
              <CardDescription>Autosaved to profile</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write code snippets or key notes from today's lesson here..."
                rows={5}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
