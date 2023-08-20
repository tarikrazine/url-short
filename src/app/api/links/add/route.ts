import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { DrizzleError, eq } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import isValidURL from "@/lib/isValidURL";
import { linksTable, type NewLink } from "@/schema/links";
import { db } from "@/lib/db";
import { randomShortString } from "@/lib/randomShortString";
import { decodeUserSession } from "@/lib/session";
import { User, usersTable } from "@/schema/users";

//export const runtime = "edge";

export async function POST(request: NextRequest) {
  const body = await request.json() as { url: string; jwt?: string };

  let user: Pick<User, "id" | "email">;

  if (body.jwt) {
    const verifyJwt = await decodeUserSession(body.jwt);

    const [getUser] = await db.select({
      id: usersTable.id,
      email: usersTable.email,
    }).from(usersTable).where(eq(usersTable.id, Number(verifyJwt?.user)));

    if (!getUser) {
      return NextResponse.json("User doesn't exist", { status: 400 });
    }
    user = getUser;
  }

  const url = await isValidURL(body.url, [
    "example.com",
    process.env.NEXT_PUBLIC_VERCEL_URL!,
  ]);

  if (!url) {
    return NextResponse.json("Url is not valid", { status: 400 });
  }

  try {
    const insertLinkSchema = createInsertSchema(linksTable, {
      // Example validating url using zod
      //url: (schema) => schema.url.url({ message: "not valid url" }),
    });

    let link: NewLink = {
      url: body.url.toLowerCase(),
      short: randomShortString(),
    };

    if (user!) {
      console.log("cd", user!);
      link["authorId"] = user.id;
    }

    insertLinkSchema.parse(link);

    try {
      const newLink = await db.insert(linksTable).values(link).returning();
      return NextResponse.json(newLink, { status: 200 });
    } catch (error) {
      if (error instanceof DrizzleError) {
        console.log(error);
        return NextResponse.json("Not valid please try again.", {
          status: 400,
        });
      }

      console.log(error);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return NextResponse.json("Error validating schema", { status: 400 });
    }
  }
}
