import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DevJourney AI — Your AI-Powered Developer Roadmap",
    template: "%s | DevJourney AI",
  },
  description:
    "Master fullstack development, AI engineering, and cloud architecture with a personalized AI mentor, gamified progress tracking, and a 6-month structured curriculum.",
  keywords: [
    "developer roadmap",
    "fullstack learning",
    "AI mentor",
    "coding bootcamp",
    "web development",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "DevJourney AI" }],
  creator: "DevJourney AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "DevJourney AI",
    description: "Your AI-Powered Developer Roadmap — Master Fullstack in 6 Months",
    siteName: "DevJourney AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevJourney AI",
    description: "Your AI-Powered Developer Roadmap — Master Fullstack in 6 Months",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
