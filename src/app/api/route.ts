import { type NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { linksTable } from "@/schema/links";
import { desc } from "drizzle-orm";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const limit = 100;
  const offset = 0;

  const data = await db.query.linksTable.findMany({
    limit,
    offset,
    orderBy: [desc(linksTable.createdAt)],
    with: {
      visits: true,
    },
  });

  return NextResponse.json(data, { status: 200 });
}
