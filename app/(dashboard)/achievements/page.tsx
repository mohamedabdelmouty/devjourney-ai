"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, ShieldAlert, Award, Star, Flame, Sparkles } from "lucide-react";

interface AchievementItem {
  id: number;
  title: string;
  desc: string;
  xpReward: number;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlocked: boolean;
}

const mockAchievements: AchievementItem[] = [
  { id: 1, title: "First Step", desc: "Complete your first study day curriculum.", xpReward: 50, icon: "🎯", rarity: "common", unlocked: true },
  { id: 2, title: "Hat Trick", desc: "Maintain a 3-day study streak.", xpReward: 100, icon: "🔥", rarity: "common", unlocked: true },
  { id: 3, title: "Week Warrior", desc: "Maintain a 7-day study streak.", xpReward: 250, icon: "⚡", rarity: "rare", unlocked: true },
  { id: 4, title: "Iron Will", desc: "Maintain a 30-day study streak.", xpReward: 1000, icon: "💎", rarity: "epic", unlocked: false },
  { id: 5, title: "Web Foundation", desc: "Complete Month 1: Fullstack Foundations.", xpReward: 500, icon: "🌐", rarity: "epic", unlocked: false },
  { id: 6, title: "The Graduate", desc: "Complete all 6 months of the curriculum.", xpReward: 10000, icon: "🎓", rarity: "legendary", unlocked: false },
];

export default function AchievementsPage() {
  const totalXP = mockAchievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + a.xpReward, 0);

  const unlockedCount = mockAchievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Achievements & Badges</h2>
          <p className="text-muted-foreground text-sm">
            Earn bonus XP and unlock badges by staying consistent.
          </p>
        </div>
        <Card className="border border-border/40 p-4 shrink-0 flex items-center gap-3">
          <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase">Unlocked Badges</p>
            <p className="text-sm font-bold">{unlockedCount} / {mockAchievements.length}</p>
          </div>
        </Card>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAchievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`border transition-all flex flex-col justify-between ${
              achievement.unlocked
                ? "border-primary/20 bg-card hover:border-primary/40 hover:scale-[1.01]"
                : "border-border/20 bg-card/40 opacity-70"
            }`}
          >
            <CardHeader className="flex flex-row items-start gap-4 p-5">
              <div className="text-4xl p-2 rounded-xl bg-secondary/50 border shrink-0">
                {achievement.icon}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-bold text-sm leading-none">{achievement.title}</h3>
                  <Badge
                    variant={
                      achievement.rarity === "common"
                        ? "secondary"
                        : achievement.rarity === "rare"
                        ? "info"
                        : achievement.rarity === "epic"
                        ? "purple"
                        : "warning"
                    }
                    className="text-[9px] uppercase px-1 py-0"
                  >
                    {achievement.rarity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{achievement.desc}</p>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-0">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Reward Points</span>
                <span className="font-bold text-primary">+{achievement.xpReward} XP</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
