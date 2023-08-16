import { db } from "@/lib/db";
import { linksTable } from "@/schema/links";
import { eq } from "drizzle-orm";
import { RedirectType } from "next/dist/client/components/redirect";
import { notFound, redirect } from "next/navigation";

async function getShortLinkRecord(short: string) {
  const link = await db
    .select({
      url: linksTable.url,
    })
    .from(linksTable)
    .where(eq(linksTable.short, short));

  return link;
}

export default async function ShortPage(props: { params: { short: string } }) {
  const [record] = await getShortLinkRecord(props.params.short);

  if (!record) {
    notFound();
  }

  const { url } = record;

  if (!url) {
    notFound();
  }

  redirect(url, RedirectType.push);
}
