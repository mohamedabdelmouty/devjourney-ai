"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Volume2, HelpCircle, Send, CheckCircle2, ChevronRight, MessageSquareCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuestionItem {
  id: number;
  question: string;
  category: "behavioral" | "technical" | "system-design";
}

const interviewQuestions: QuestionItem[] = [
  { id: 1, question: "Tell me about a challenging technical bug you resolved. What was your process?", category: "behavioral" },
  { id: 2, question: "How does prototype inheritance work in Javascript, and how is it different from classes?", category: "technical" },
  { id: 3, question: "How would you design a scalable notification microservice processing millions of requests?", category: "system-design" },
];

export default function InterviewPage() {
  const { toast } = useToast();
  const [activeIdx, setActiveIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState<Array<{ q: string; a: string; score: number }>>([]);
  const [submitting, setSubmitting] = useState(false);

  const activeQuestion = interviewQuestions[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % interviewQuestions.length);
    setAnswer("");
  };

  const handleSubmitAnswer = () => {
    if (!answer.trim()) {
      toast({
        variant: "destructive",
        title: "Empty Answer",
        description: "Please enter your response before submitting.",
      });
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setHistory((prev) => [
        ...prev,
        {
          q: activeQuestion.question,
          a: answer,
          score: Math.floor(Math.random() * 20) + 80, // simulated score
        },
      ]);
      setSubmitting(false);
      toast({
        variant: "success",
        title: "Answer Submitted",
        description: "Simulated peer score calculated and added to history.",
      });
      handleNext();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Interview Simulator</h2>
        <p className="text-muted-foreground text-sm">
          Prepare for frontend, backend, and system design interviews. Write or simulate answers to receive reviews.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Question Panel */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-border/40">
            <CardHeader className="space-y-2">
              <div className="flex justify-between items-center">
                <Badge className="capitalize text-[10px]" variant="purple">
                  {activeQuestion.category} Question
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Question {activeIdx + 1} of {interviewQuestions.length}
                </span>
              </div>
              <CardTitle className="text-lg leading-relaxed flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                {activeQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Type your structured answer here (STAR method recommended for behavioral questions)..."
                rows={8}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border/20 pt-4 mt-2">
              <Button variant="ghost" size="sm" onClick={handleNext}>
                Skip Question <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="sm" variant="gradient" onClick={handleSubmitAnswer} disabled={submitting}>
                {submitting ? "Analyzing..." : "Submit Answer"} <Send className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* History / Score Log */}
        <div className="space-y-4">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-1.5">
                <MessageSquareCode className="w-4 h-4 text-cyan-400" /> Evaluation Log
              </CardTitle>
              <CardDescription>Review scores on submitted responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {history.length > 0 ? (
                history.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-secondary/30 border border-border/20 space-y-1.5">
                    <p className="text-xs font-semibold line-clamp-1">{item.q}</p>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-muted-foreground">Score</span>
                      <Badge variant="success">{item.score}% Match</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-muted-foreground">
                  Your submitted question logs will appear here.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
