"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Briefcase, ArrowRight, Plus, MapPin, DollarSign, Calendar, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobItem {
  id: number;
  company: string;
  role: string;
  location: string;
  salary: string;
  status: "applied" | "interviewing" | "offer" | "rejected";
}

const initialJobs: JobItem[] = [
  { id: 1, company: "Google", role: "Junior Frontend Engineer", location: "Mountain View, CA (Hybrid)", salary: "$120,000/yr", status: "applied" },
  { id: 2, company: "Stripe", role: "Fullstack Engineer", location: "San Francisco, CA (Remote)", salary: "$140,000/yr", status: "interviewing" },
  { id: 3, company: "Vercel", role: "Next.js Core Intern", location: "Remote", salary: "$90,000/yr", status: "offer" },
];

export default function JobTrackerPage() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<JobItem[]>(initialJobs);

  // New job form state
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !role) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Company name and Role are required fields.",
      });
      return;
    }

    const newJob: JobItem = {
      id: Date.now(),
      company,
      role,
      location: location || "Remote",
      salary: salary || "TBD",
      status: "applied",
    };

    setJobs((prev) => [...prev, newJob]);
    setCompany("");
    setRole("");
    setLocation("");
    setSalary("");

    toast({
      variant: "success",
      title: "Application Tracked",
      description: "Successfully added new role to Kanban board.",
    });
  };

  const handleMoveStatus = (id: number, nextStatus: JobItem["status"]) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: nextStatus } : j))
    );
    toast({
      variant: "success",
      title: "Status Promoted",
      description: `Job shifted to ${nextStatus}.`,
    });
  };

  const handleDelete = (id: number) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    toast({
      title: "Application Deleted",
      description: "Removed from job tracking system.",
    });
  };

  const getJobsByStatus = (status: JobItem["status"]) => {
    return jobs.filter((j) => j.status === status);
  };

  const columns: Array<{ title: string; key: JobItem["status"]; color: string }> = [
    { title: "Applied", key: "applied", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { title: "Interviewing", key: "interviewing", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    { title: "Offers", key: "offer", color: "bg-green-500/10 text-green-400 border-green-500/20" },
    { title: "Rejected", key: "rejected", color: "bg-red-500/10 text-red-400 border-red-500/20" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Job Applications Tracker</h2>
          <p className="text-muted-foreground text-sm">
            Organize interviews, salaries, and application pipeline details.
          </p>
        </div>
      </div>

      {/* Add Job Form Widget */}
      <Card className="border border-border/40">
        <CardHeader className="p-4 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-primary" /> Track New Role
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <form onSubmit={handleAddJob} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase">Company</label>
              <Input placeholder="Vercel" value={company} onChange={(e) => setCompany(e.target.value)} className="h-9 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase">Role</label>
              <Input placeholder="Frontend Engineer" value={role} onChange={(e) => setRole(e.target.value)} className="h-9 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase">Location</label>
              <Input placeholder="Remote" value={location} onChange={(e) => setLocation(e.target.value)} className="h-9 text-xs" />
            </div>
            <Button type="submit" variant="gradient" className="h-9 text-xs">
              Add Application <Plus className="w-4 h-4 ml-1" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Kanban Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((col) => {
          const colJobs = getJobsByStatus(col.key);
          return (
            <div key={col.key} className="space-y-4">
              <div className={`p-2.5 rounded-lg border flex justify-between items-center ${col.color}`}>
                <span className="text-xs font-bold uppercase tracking-wider">{col.title}</span>
                <Badge variant="secondary" className="text-[10px]">{colJobs.length}</Badge>
              </div>

              <div className="space-y-3 min-h-[300px] rounded-xl bg-secondary/10 p-2 border border-dashed border-border/20">
                {colJobs.map((job) => (
                  <Card key={job.id} className="border-border/40 hover:border-primary/20 hover:scale-[1.01] transition-all p-4 space-y-3 relative group">
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="absolute top-2 right-2 text-muted-foreground hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <p className="font-bold text-sm leading-snug">{job.role}</p>
                      <p className="text-xs text-muted-foreground">{job.company}</p>
                    </div>

                    <div className="space-y-1 text-[10px] text-muted-foreground">
                      <p className="flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" /> {job.location}</p>
                      <p className="flex items-center gap-1"><DollarSign className="w-3 h-3 text-primary" /> {job.salary}</p>
                    </div>

                    <div className="flex gap-1.5 justify-end">
                      {col.key === "applied" && (
                        <Button size="sm" onClick={() => handleMoveStatus(job.id, "interviewing")} className="text-[9px] py-1 h-6">
                          Interview <ArrowRight className="w-3 h-3 ml-0.5" />
                        </Button>
                      )}
                      {col.key === "interviewing" && (
                        <Button size="sm" onClick={() => handleMoveStatus(job.id, "offer")} className="text-[9px] py-1 h-6">
                          Offer <ArrowRight className="w-3 h-3 ml-0.5" />
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
