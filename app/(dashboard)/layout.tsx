"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState(2);
  const [streak, setStreak] = useState(5);

  // In a real app, we would fetch this from Supabase/Prisma on mount or pass as props.
  useEffect(() => {
    // Mock user statistics fetching
    setXp(1850);
    setLevel(2);
    setStreak(7);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar userXP={xp} userLevel={level} streak={streak} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-7xl w-full h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
