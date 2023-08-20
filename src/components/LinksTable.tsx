"use client";

import useSWR, { Fetcher } from "swr";

import { type Link } from "@/schema/links";

const fetcher: Fetcher<Link[], string> = async (...args) => {

  const res = await fetch(...args)

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.cause = await res.json()
    throw error
  }
 
  return res.json()
}

interface LinksTableProps {}

function LinksTable(props: LinksTableProps) {
  const endpoint = "/api/links";

  const { data, isLoading, error } = useSWR(endpoint, fetcher, {
    refreshInterval: 1000,
  });

  
  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  if (!data) {
    return <p>{error.cause.message}</p>
  }

  return (data && 
    data.map((link: any) => (
      <div key={link.id} className="flex gap-2">
        <h2>{link.url}</h2> <p>{link.short}</p> <p>{link.visits.length}</p>
      </div>
    ))
  )
}

export default LinksTable;
