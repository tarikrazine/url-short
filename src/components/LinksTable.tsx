"use client"

import useSWR, { Fetcher } from "swr";

import { type Link } from "@/schema/links";

const fetcher: Fetcher<Link[], string> = (...args) => fetch(...args).then((res) => res.json());

interface LinksTableProps {}

function LinksTable(props: LinksTableProps) {
  const endpoint = "/api/links";

  const { data, error, isLoading } = useSWR(endpoint, fetcher, {
    refreshInterval: 1000
  });

  if (error) return <p>An error happened</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {data && data.map((link) => (
        <h2 key={link.id}>{link.url}</h2>
      ))}
    </div>
  );
}

export default LinksTable;
