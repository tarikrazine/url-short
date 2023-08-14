"use client";

import { useState } from "react";

import { addLink } from "@/mutations/addLink";

interface AddLinkProps {}

export const AddLink = (props: AddLinkProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);

  console.log(isPending)

  return (
    <section>
      <form
        action={async (formData) => {
          setIsPending(true)

          const sendData = await addLink(formData)

          setIsPending(false)

          console.log(sendData)
        }}
      >
        <input type="text" name="link" placeholder="Add your link here" />

        <button disabled={isPending} type="submit">
          {isPending ? "Sending..." : "Add link"}
        </button>
      </form>
    </section>
  );
};
