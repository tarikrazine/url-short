import { getDomain } from "@/lib/getDomain"

async function getData() {
  const response = await fetch(`${getDomain()}/api`)

  if (!response.ok) {
    throw new Error('Failed to get data!')
  }

  const data = response.json()

  return []
}

export default async function Home() {

  const response = await fetch(`${getDomain()}/api`)

  if (!response.ok) {
    throw new Error('Failed to get data!')
  }

  const data = await response.json()

  console.log(data)

  return (
    <main className="p-24">
      { data && JSON.stringify(data, null, 2)}
    </main>
  )
}
