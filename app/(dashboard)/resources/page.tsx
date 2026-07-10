"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, Globe } from "lucide-react";

export default function ResourcesPage() {
  const [courses, setCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/roadmap");
        const json = await res.json();
        if (json.resources?.courses) {
          setCourses(json.resources.courses);
        }
      } catch (err) {
        console.error("Failed to load resource list", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">External Resources</h2>
        <p className="text-muted-foreground text-sm">
          Dynamic course platforms list loaded from <code>resources.json</code> structure.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-32 bg-secondary animate-pulse rounded-xl" />
          ))
        ) : courses.length > 0 ? (
          courses.map((course, idx) => (
            <Card key={idx} className="border-border/40 hover:border-primary/20 hover:scale-[1.02] transition-all cursor-pointer">
              <CardHeader className="p-5 flex flex-col justify-between h-full space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm font-bold">{course}</CardTitle>
                  <CardDescription className="text-[11px] mt-1">Visit official learning guides & certificates.</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground text-sm">
            No resources currently registered inside configuration folder.
          </div>
        )}
      </div>
    </div>
  );
}
