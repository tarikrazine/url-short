"use client";
import { useState, useTransition } from "react";

import { useRouter } from "next/navigation"

import { addLink } from "@/mutations/addLink";
import { NewLink } from "@/schema/links";
import { type KeyedMutator } from "swr";

interface AddLinkProps {}

export const AddLink = (props: AddLinkProps) => {

  const [isPending, startTransition] = useTransition()

  const [error, setError] = useState<string | null>()

  const router = useRouter()

  return (
    <section>
      <form
        action={async (formData) => {

          startTransition(async () => {
            const response = await addLink(formData)

            if (typeof response === "string") {
              setError(response)
            } else {
              setError(null)
              router.refresh()
            }
          })

        }}
      >
        <input type="text" name="link" placeholder="Add your link here" />

        <button disabled={isPending} type="submit">
          {isPending ? "Sending..." : "Add link"}
        </button>
      </form>
      {
        error && (<p>{error}</p>)
      }
    </section>
  );
};
