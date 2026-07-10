import { NextResponse } from "next/server";
import { loadAllRoadmapMonths, loadResources } from "@/lib/roadmap-loader";

export async function GET() {
  try {
    const months = await loadAllRoadmapMonths();
    const resources = await loadResources();
    return NextResponse.json({ months, resources });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to load roadmap data: " + error.message },
      { status: 500 }
    );
  }
}
