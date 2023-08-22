"use client";

import useSWR, { Fetcher } from "swr";

import { type Link } from "@/schema/links";
import { redirect } from "next/navigation";

const fetcher: Fetcher<Link[], string> = async (...args) => {
  const res = await fetch(...args);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.cause = await res.json();
    throw error;
  }

  return res.json();
};

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
    redirect("login");
  }

  return (
    <div className="relative overflow-x-auto">
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

export default LinksTable;
