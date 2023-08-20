import { cookies } from "next/headers";

import { db } from "@/lib/db";
import { linksTable, type Link } from "@/schema/links";
import { AddLink } from "@/components/AddLink";
import LinksTable from "@/components/LinksTable";

// async function getLinks() {
//   const limit = 10;
//   const offset = 0;

//   const data = (await db.select().from(linksTable).limit(limit).offset(offset));

//   return data;
// }

export default async function LinksPage() {
  //   const data = await getLinks();

  return (
    <>
      <AddLink />
      <LinksTable />
    </>
  );
}
