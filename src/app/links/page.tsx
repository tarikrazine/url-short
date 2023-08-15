import { db } from "@/lib/db";
import { linksTable, type Link } from "@/schema/links";
import { AddLink } from "@/components/AddLink";
import { getDomain } from "@/lib/getDomain";

export async function getLinks() {
  const response = await fetch(`${getDomain()}/api/links`, {
    next: { revalidate: 10 },
  });

  if (!response.ok) {
    throw new Error("Failed to get data!");
  }

  if (response.headers.get("content-type") !== "application/json") {
    return [];
  }

  const data = response.json();

  return data;
}

export default async function LinksPage() {
  const data = await getLinks();

  return (
    <>
      <AddLink />
      <section>
        {data && data.map((link: Link) => {
          return <h2 key={link.id}>{link.url}</h2>;
        })}
      </section>
    </>
  );
}
