import { notFound, redirect } from "next/navigation";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { linksTable } from "@/schema/links";
import { visitsTable } from "@/schema/visits";

async function getShortLinkRecord(short: string) {
  const link = await db
    .select({
      id: linksTable.id,
      url: linksTable.url
    })
    .from(linksTable)
    .where(eq(linksTable.short, short));

  return link;
}

async function saveLinkVisit(linkId: number) {
  await db.insert(visitsTable).values({linkId: linkId})
}

export default async function ShortPage(props: { params: { short: string } }) {
  const [record] = await getShortLinkRecord(props.params.short);

  if (!record) {
    notFound();
  }

  const { url, id } = record;

  if (!url) {
    notFound();
  }

  if (id) {
    await saveLinkVisit(id)
  }
  
  //redirect(url, RedirectType.push);
  return <h1>{url}</h1>
}
