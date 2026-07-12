"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FolderKanban, Clock, Link, CheckSquare, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GitHubIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

import { useGame, ProjectItem } from "@/components/providers/GameContext";

export default function ProjectsPage() {
  const { toast } = useToast();
  const { projects, updateProjectStatus, updateProjectGithub } = useGame();

  const handleUpdateStatus = (id: number, nextStatus: ProjectItem["status"]) => {
    updateProjectStatus(id, nextStatus);
    toast({
      variant: "success",
      title: "Project Updated",
      description: "Status changed successfully.",
    });
  };

  const handleSaveGithub = (id: number, url: string) => {
    updateProjectGithub(id, url);
    toast({
      variant: "success",
      title: "Github Link Saved",
      description: "Code repository successfully attached to project.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Project Gallery</h2>
        <p className="text-muted-foreground text-sm">
          Hands-on developer challenges to validate your curricular learning path.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="border-border/40 hover:border-primary/20 transition-all flex flex-col justify-between">
            <CardHeader className="space-y-2">
              <div className="flex justify-between items-center">
                <Badge
                  variant={
                    project.difficulty === "beginner"
                      ? "success"
                      : project.difficulty === "intermediate"
                      ? "warning"
                      : "destructive"
                  }
                  className="capitalize text-[10px]"
                >
                  {project.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" /> {project.time}
                </div>
              </div>
              <CardTitle className="text-lg font-bold">{project.title}</CardTitle>
              <CardDescription className="text-xs leading-relaxed">{project.desc}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-bold flex items-center gap-1"><CheckSquare className="w-3.5 h-3.5 text-primary" /> Checklist</p>
                <div className="space-y-2">
                  {project.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Checkbox id={`check-${project.id}-${idx}`} checked={project.status === "done"} />
                      <label htmlFor={`check-${project.id}-${idx}`} className="text-xs text-muted-foreground cursor-pointer">
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-bold flex items-center gap-1"><GitHubIcon /> Repository Link</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://github.com/..."
                    defaultValue={project.github}
                    onBlur={(e) => handleSaveGithub(project.id, e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t border-border/20 pt-4 flex gap-2 justify-between">
              <Badge variant={project.status === "done" ? "success" : project.status === "in_progress" ? "warning" : "secondary"}>
                {project.status.replace("_", " ")}
              </Badge>
              <div className="flex gap-1.5">
                {project.status !== "done" && (
                  <Button size="sm" onClick={() => handleUpdateStatus(project.id, "done")}>
                    Mark Done
                  </Button>
                )}
                {project.status === "not_started" && (
                  <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(project.id, "in_progress")}>
                    Start
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
