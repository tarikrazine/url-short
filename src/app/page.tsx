import { getDomain } from "@/lib/getDomain"

async function getData() {
  const response = await fetch(`${getDomain()}/api`, { next: { revalidate: 10 }})

  if (!response.ok) {
    throw new Error('Failed to get data!')
  }

  if (response.headers.get('content-type') !== 'application/json') {
    return []
  }

  const data = response.json()

  return data
}

export default async function Home() {

  const data = await getData()

  return (
    <main className="p-24">
      { data && JSON.stringify(data, null, 2)}
    </main>
  )
}
