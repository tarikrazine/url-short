"use server";

import { getDomain } from "@/lib/getDomain";

export async function addLink(
  formData: FormData,
): Promise<string | void | Object> {
  const response = await fetch(`${getDomain()}/api/links/add`, {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: { "content-type": "application/json" },
  });

  return await response.json();
}
