"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Sparkles, FolderCode, Heart, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GitHubIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function PortfolioPage() {
  const { toast } = useToast();

  const handleShare = () => {
    navigator.clipboard.writeText("https://devjourney.ai/portfolio/alexdev");
    toast({
      variant: "success",
      title: "Link Copied!",
      description: "Your public developer portfolio link is copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Public Portfolio Builder</h2>
          <p className="text-muted-foreground text-sm">
            Showcase completed certificates, gallery projects, and stats automatically.
          </p>
        </div>
        <Button onClick={handleShare} variant="gradient" className="shrink-0">
          Share Portfolio Link <Globe className="w-4 h-4 ml-1.5" />
        </Button>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 py-4">
        {/* Live Preview Container */}
        <Card className="border border-primary/20 bg-card/60 backdrop-blur-md overflow-hidden relative">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500" />
          <CardHeader className="text-center pt-10">
            <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-xl border-4 border-background">
              AD
            </div>
            <CardTitle className="text-2xl font-bold">Alex Dev</CardTitle>
            <CardDescription className="text-sm">Fullstack Engineer Intern</CardDescription>
            <div className="flex gap-2 justify-center mt-3 flex-wrap">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Node.js</Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 max-w-2xl mx-auto text-center px-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              &quot;Passionate fullstack engineer exploring React ecosystems and AI agents. Learning structured coding curriculum via DevJourney AI.&quot;
            </p>

            <div className="border-t border-border/40 my-6" />

            {/* Certifications Showcase */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold flex items-center gap-1.5 justify-center">
                <Award className="w-4 h-4 text-yellow-500" /> Verified Achievements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div className="p-3 rounded-lg bg-secondary/40 border border-border/20 flex items-center gap-2.5">
                  <span className="text-2xl">🌐</span>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold">Web Foundations</p>
                    <p className="text-[10px] text-muted-foreground">Issued July 2026</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/40 border border-border/20 flex items-center gap-2.5 opacity-60">
                  <span className="text-2xl">⚛️</span>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold">Frontend Mastery</p>
                    <p className="text-[10px] text-muted-foreground">In progress</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-secondary/10 py-4 flex gap-4 justify-center border-t border-border/10 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><GitHubIcon /> github.com/alexdev</span>
            <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> alexdev.me</span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
