import { type NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { linksTable } from "@/schema/links";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const limit = 100;
  const offset = 0;

  const data = await db.select().from(linksTable).limit(limit).offset(offset);

  return NextResponse.json(data, { status: 200 });
}
