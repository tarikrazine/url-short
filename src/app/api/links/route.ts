import { NextResponse } from "next/server";

import { desc, eq, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { linksTable } from "@/schema/links";
import { visitsTable } from "@/schema/visits";

export const runtime = "edge";

export async function GET() {
  const limit = 100;
  const offset = 0;

  // const data = await db.select().from(linksTable).limit(limit).offset(offset)
  //   .orderBy(desc(linksTable.createdAt));

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
