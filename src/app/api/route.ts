import { getDomain } from "@/lib/getDomain";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const data = [{ id: 1, item: "Four" }];

  console.log("route", getDomain());

  return NextResponse.json(data, { status: 200 });
}
