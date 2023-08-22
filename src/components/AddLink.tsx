"use client";
import { useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { addLink } from "@/mutations/addLink";
import Button from "./Button";

interface AddLinkProps {}

export const AddLink = (props: AddLinkProps) => {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | null>();

  const router = useRouter();

  return (
    <section className="p-6">
      <form
        action={async (formData) => {
          startTransition(async () => {
            const response = await addLink(formData);

            if (typeof response === "string") {
              setError(response);
            } else {
              setError(null);
              router.refresh();
            }
          });
        }}
        className="grid grid-cols-2 gap-x-6 p-6"
      >
        <div className="">
          <input
            type="text"
            name="url"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full max-w-xl"
            placeholder="Add your link here"
            required
          />
        </div>

        <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm max-w-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add Link
        </Button>
      </form>
      {error && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 mr-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}
    </section>
  );
};
