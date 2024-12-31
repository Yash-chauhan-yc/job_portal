// /app/api/locations/route.ts (Next.js API route in App Router)

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const distinctLocations = await prisma.job.findMany({
      where: {
        approved: true,
      },
      select: { location: true },
      distinct: ["location"],
    });

    const locations = distinctLocations.map(({ location }) => location).filter(Boolean);

    return NextResponse.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json({ error: "Unable to fetch locations" }, { status: 500 });
  }
}
