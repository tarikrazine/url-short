"use server";

import { cookies } from "next/headers";

import { getDomain } from "@/lib/getDomain";

export async function addLink(
  formData: FormData,
): Promise<string | void | Object> {
  const jwt = cookies().get("session_id")?.value;

  if (jwt) {
    formData.append("jwt", jwt as string);
  }

  const response = await fetch(`${getDomain()}/api/links/add`, {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: { "content-type": "application/json" },
  });

  return await response.json();
}
