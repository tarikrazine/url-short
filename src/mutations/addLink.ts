"use server";

export async function addLink(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = Object.fromEntries(formData);

  return data;
}
