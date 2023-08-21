import { RedirectType } from "next/dist/client/components/redirect";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import Button from "@/components/Button";

export default async function LoginPage() {

  async function logout() {
    "use server";

    cookies().delete({
      name: "session_id",
      value: "",
      httpOnly: true,
      secure: true
    });

    redirect('/', RedirectType.push)
  }

  return (
    <form action={logout}>
      <Button>Logout</Button>
    </form>
  );
}
