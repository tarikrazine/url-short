import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const data = [{ id: 1, item: "Four" }];

  return NextResponse.json(data, { status: 200 });
}
