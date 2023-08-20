import { NextResponse } from "next/server";

import { desc, eq, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { linksTable } from "@/schema/links";
import { usersTable } from "@/schema/users";
import { cookies } from "next/headers";
import { decodeUserSession } from "@/lib/session";

//export const runtime = "edge";

export async function GET() {
  const limit = 100;
  const offset = 0;

  const cookie = cookies().get("session_id")?.value;

  if (!cookie) {
    return NextResponse.json({ message: "Not authorized" }, { status: 404 });
  }

  const jwt = await decodeUserSession(cookie!);

  const data = await db.query.linksTable.findMany({
    limit,
    offset,
    orderBy: [desc(linksTable.createdAt)],
    with: {
      visits: true,
    },
    where: eq(linksTable.authorId, jwt?.user as number),
  });

  return NextResponse.json(data, { status: 200 });
}
