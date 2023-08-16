"use client";

import useSWR, { Fetcher } from "swr";

import { type Link } from "@/schema/links";

const fetcher: Fetcher<Link[], string> = (...args) =>
  fetch(...args).then((res) => res.json());

interface LinksTableProps {}

function LinksTable(props: LinksTableProps) {
  const endpoint = "/api/links";

  const { data, error, isLoading } = useSWR(endpoint, fetcher, {
    refreshInterval: 1000,
  });

  if (error) return <p>An error happened</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {data &&
        data.map((link) => (
          <div key={link.id} className="flex gap-2">
            <h2>{link.url}</h2> <p>{link.short}</p>
          </div>
        ))}
    </>
  );
}

export default LinksTable;
