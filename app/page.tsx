"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Bot, Target, Trophy, Flame, ChevronRight, CheckCircle2, Award } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-mesh-gradient text-foreground flex flex-col relative overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background/0 to-background/0 pointer-events-none" />

      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/30 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-sm gradient-text">DevJourney AI</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-sm">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button size="sm" variant="gradient">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl space-y-6"
        >
          <Badge variant="purple" className="px-4 py-1 text-xs tracking-wider uppercase font-semibold">
            🚀 Powered by Gemini & Supabase
          </Badge>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Accelerate Your Developer Journey with <span className="gradient-text">AI Mentorship</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Go from zero to production-ready developer in 6 months. Gamified roadmap, interactive quiz modules, structured English learning, and a smart AI tutor tailored just for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link href="/register">
              <Button size="xl" variant="gradient" className="w-full sm:w-auto">
                Start Your Journey Free <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="xl" variant="glass" className="w-full sm:w-auto">
                Explore Demo Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Feature Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mt-24">
          {[
            {
              icon: Bot,
              title: "AI Mentor Support",
              desc: "Realtime explanation, interactive quizzes, custom challenges, and professional code reviews.",
              color: "text-purple-400",
            },
            {
              icon: Target,
              title: "6-Month Structured Path",
              desc: "From HTML/CSS basics to advanced LLMs, Cloud Deployment, and App Security.",
              color: "text-cyan-400",
            },
            {
              icon: Trophy,
              title: "Gamified Streaks & Badges",
              desc: "Accumulate XP points, level up your profile, earn custom badges, and unlock certifications.",
              color: "text-amber-400",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border/40 hover:border-primary/30 transition-all flex flex-col items-center text-center space-y-4 hover:shadow-lg hover:shadow-primary/5 group"
            >
              <div className="p-3 bg-secondary rounded-xl group-hover:scale-110 transition-transform">
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-muted-foreground mt-auto">
        <p>© 2026 DevJourney AI. Built for the modern builder.</p>
      </footer>
    </div>
  );
}
