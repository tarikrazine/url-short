import { db } from "@/lib/db";
import { linksTable, type Link } from "@/schema/links";
import { AddLink } from "@/components/AddLink";
import { getDomain } from "@/lib/getDomain";

async function getLinks() {
  const limit = 10;
  const offset = 0;

  const data = await db.select().from(linksTable).limit(limit).offset(offset);

  return data;
}

export default async function LinksPage() {
  const data = await getLinks();

  return (
    <>
      <AddLink />
      <section>
        {data &&
          data.map((link) => {
            return <h2 key={link.id}>{link.url}</h2>;
          })}
      </section>
    </>
  );
}
