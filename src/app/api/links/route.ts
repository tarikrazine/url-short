import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { linksTable } from "@/schema/links";
import { desc } from "drizzle-orm";

export const runtime = "edge";

export async function GET() {
  const limit = 100;
  const offset = 0;

  const data = await db.select().from(linksTable).limit(limit).offset(offset)
    .orderBy(desc(linksTable.createdAt));

  return NextResponse.json(data, { status: 200 });
}
