import { getDomain } from "@/lib/getDomain"

async function getData() {
  const response = await fetch(`${getDomain()}/api`)

  if (!response.ok) {
    throw new Error('Failed to get data!')
  }

  const data = response.json()

  return data
}

export default async function Home() {

  const data = getDomain()

  console.log(data)

  return (
    <main className="p-24">
      {/* { data && JSON.stringify(data, null, 2)} */} {data}
    </main>
  )
}
