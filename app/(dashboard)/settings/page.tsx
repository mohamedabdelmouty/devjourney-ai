"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { Settings, ShieldAlert, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [dailyGoal, setDailyGoal] = useState("3");
  const [emailNotif, setEmailNotif] = useState("enabled");

  const handleSave = () => {
    toast({
      variant: "success",
      title: "Settings Saved",
      description: "Application configurations updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">App Settings</h2>
        <p className="text-muted-foreground text-sm">
          Configure notifications, study goals, themes, and accounts.
        </p>
      </div>

      <div className="max-w-2xl">
        <Card className="border border-border/40">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-1.5">
              <Settings className="w-5 h-5 text-primary" /> Application Settings
            </CardTitle>
            <CardDescription>Customize default study environment parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theme Select */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Theme Appearance</label>
              <Select defaultValue={theme} onValueChange={(val) => setTheme(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select appearance theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark Theme (Curated Sleek Mode)</SelectItem>
                  <SelectItem value="light">Light Theme (Minimalist clean)</SelectItem>
                  <SelectItem value="system">Follow System Default</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Study hours target */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Daily Study Goal (Hours)</label>
              <Input
                type="number"
                min="1"
                max="24"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(e.target.value)}
              />
            </div>

            {/* Email reports */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Email Performance Reports</label>
              <Select defaultValue={emailNotif} onValueChange={(val) => setEmailNotif(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Weekly updates settings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enabled">Send Weekly Progress Summaries</SelectItem>
                  <SelectItem value="disabled">Disable all marketing & reports</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="border-t border-border/20 pt-4 mt-2">
            <Button onClick={handleSave} variant="gradient" className="w-full">
              Update Custom Settings
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
