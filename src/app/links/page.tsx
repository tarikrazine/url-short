import { db } from "@/lib/db"
import { linksTable } from "@/schema/links"
import { AddLink } from "@/components/AddLink"

export const revalidate = 10

export async function getLinks(limit = 10, offset = 0) {
    const data = await db.select().from(linksTable).limit(limit).offset(offset)

    if (!data) {
        return []
    }

    return data
}

export default async function LinksPage() {

    const data = await getLinks()

    return (
        <>
            <AddLink />
            <section>
                {JSON.stringify(data, null, 2)}
            </section>
        </>
    )
}