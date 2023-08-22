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
    <div className="relative overflow-x-auto w-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Link
            </th>
            <th scope="col" className="px-6 py-3">
              Short
            </th>
            <th scope="col" className="px-6 py-3">
              Count
            </th>
          </tr>
        </thead>
        <tbody>
    
            {data.length > 0
              ? data.map((link: any) => (
                <tr key={link.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th 
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {link.url}
                    </th>
                    <td className="px-6 py-4">{link.short}</td>
                    <td className="px-6 py-4">{link.visits.length}</td>
                  </tr>
                ))
              : <><p>No links</p></>}
        </tbody>
      </table>
    </div>
  );
}
