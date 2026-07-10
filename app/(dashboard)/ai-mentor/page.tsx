"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Sparkles, BookOpen, Brain, Terminal, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
}

export default function AIMentorPage() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "bot", text: "Hello! I am your DevJourney AI mentor. I know your active curriculum: Month 1 Day 12. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Mock API response logic based on input content
    setTimeout(() => {
      let reply = "I've analyzed your request. Let's dig deeper into semantic HTML standards or target practice.";
      if (textToSend.toLowerCase().includes("lesson") || textToSend.toLowerCase().includes("explain")) {
        reply = "Today's lesson is on HTML Semantic Elements (Month 1 Day 12). Using <header>, <nav>, <main>, <article>, and <section> tags makes your markup readable to assistive devices, web crawlers, and future developers.";
      } else if (textToSend.toLowerCase().includes("quiz")) {
        reply = "Here's a quick challenge: Which HTML tag is used to mark independent self-contained news articles? Hint: It starts with 'art'.";
      } else if (textToSend.toLowerCase().includes("code") || textToSend.toLowerCase().includes("review")) {
        reply = "Reviewing code... Standard practice tip: Avoid deep-nesting <div> tags. Replace wrapper containers with <section> or <main> tags where structurally unique.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: reply,
        },
      ]);
      setLoading(false);
    }, 1200);
  };

  const quickActions = [
    { title: "Explain Today's Lesson", icon: BookOpen },
    { title: "Generate Quiz", icon: Brain },
    { title: "Review Code", icon: Terminal },
    { title: "Interview Questions", icon: Shield },
  ];

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-80px)]">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">AI Mentor</h2>
        <p className="text-muted-foreground text-sm">
          Get real-time feedback, mock interviews, and code reviews based on your current study day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 overflow-hidden">
        {/* Quick Actions Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border border-border/40">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" /> Mentor Prompts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-4 pt-0">
              {quickActions.map((action, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleSend(action.title)}
                  variant="outline"
                  className="w-full justify-start text-xs h-10 gap-2"
                >
                  <action.icon className="w-4 h-4 text-primary shrink-0" />
                  <span>{action.title}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface Container */}
        <Card className="lg:col-span-3 border border-border/40 flex flex-col justify-between h-full overflow-hidden">
          <CardHeader className="border-b border-border/20 p-4 shrink-0">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" /> Active AI Assistant
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 p-4 overflow-y-auto min-h-[250px]">
            <ScrollArea className="h-full space-y-4 pr-3">
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 max-w-[85%] mb-4 ${
                      isBot ? "mr-auto" : "ml-auto flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                        isBot
                          ? "bg-secondary text-foreground border border-border/20"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              {loading && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Bot className="w-4 h-4 text-primary animate-pulse" /> AI is thinking...
                </div>
              )}
            </ScrollArea>
          </CardContent>

          <CardFooter className="border-t border-border/20 p-4 shrink-0 flex gap-2">
            <Input
              placeholder="Ask anything about today's topic..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              className="text-xs"
            />
            <Button onClick={() => handleSend(input)} variant="gradient" className="shrink-0 h-10 w-10 p-0 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
