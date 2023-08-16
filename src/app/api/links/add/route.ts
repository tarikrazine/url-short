import { NextResponse } from "next/server";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import isValidURL from "@/lib/isValidURL";
import { linksTable, type NewLink } from "@/schema/links";
import { db } from "@/lib/db";
import { randomShortString } from "@/lib/randomShortString";
import { DrizzleError } from "drizzle-orm";

export async function POST(request: Request) {
  const body = await request.json() as { link: string };

  const url = await isValidURL(body.link, [
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

    const link: NewLink = {
      url: body.link.toLowerCase(),
      short: randomShortString(),
    };

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
