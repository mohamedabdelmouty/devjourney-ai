"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Download, ShieldCheck, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CertificateItem {
  id: number;
  month: number;
  title: string;
  unlocked: boolean;
  code: string;
  date: string;
}

const mockCertificates: CertificateItem[] = [
  { id: 1, month: 1, title: "Fullstack Foundations Certificate", unlocked: true, code: "DJ-2026-M1-4921", date: "July 1, 2026" },
  { id: 2, month: 2, title: "Frontend Mastery Certificate", unlocked: false, code: "DJ-2026-M2-0000", date: "Pending" },
  { id: 3, month: 3, title: "Backend Engineering Certificate", unlocked: false, code: "DJ-2026-M3-0000", date: "Pending" },
];

export default function CertificatesPage() {
  const { toast } = useToast();
  const [certs, setCerts] = useState<CertificateItem[]>(mockCertificates);

  const handleDownload = (title: string) => {
    toast({
      variant: "success",
      title: "Downloading...",
      description: `Saving ${title} as PDF to your local downloads directory.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Your Certifications</h2>
        <p className="text-muted-foreground text-sm">
          Collect verified certifications as you finalize each 30-day curriculum module.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certs.map((cert) => (
          <Card
            key={cert.id}
            className={`border transition-all flex flex-col justify-between overflow-hidden relative ${
              cert.unlocked ? "border-primary/20 bg-card" : "border-border/10 bg-card/40 opacity-70"
            }`}
          >
            {cert.unlocked && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full flex items-center justify-center pointer-events-none">
                <Award className="w-8 h-8 text-primary opacity-20 transform rotate-12" />
              </div>
            )}

            <CardHeader className="p-6">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <Badge variant={cert.unlocked ? "success" : "secondary"}>
                    {cert.unlocked ? "Issued" : "Locked"}
                  </Badge>
                  <CardTitle className="text-lg font-bold mt-2">{cert.title}</CardTitle>
                  <CardDescription className="text-xs">
                    Curriculum Month {cert.month} completion validation code.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-6 py-4 bg-secondary/20 border-t border-b border-border/10 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verification Code:</span>
                <span className="font-mono text-foreground font-semibold">{cert.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Issued Date:</span>
                <span className="text-foreground font-semibold">{cert.date}</span>
              </div>
            </CardContent>

            <CardFooter className="p-6 flex gap-2">
              {cert.unlocked ? (
                <Button onClick={() => handleDownload(cert.title)} variant="gradient" className="w-full flex justify-center items-center gap-1.5">
                  <Download className="w-4 h-4" /> Download Certificate (PDF)
                </Button>
              ) : (
                <Button disabled variant="outline" className="w-full">
                  Month incomplete
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
