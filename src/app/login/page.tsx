import { RedirectType } from "next/dist/client/components/redirect";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { z } from "zod";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";

import Button from "@/components/Button";

import { comparePassword, hashPassword } from "@/lib/hashPassword";

import { newUser, usersTable } from "@/schema/users";
import { decodeUserSession, encodeUserSession } from "@/lib/session";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export default async function LoginPage() {
  const getSession = cookies().get("session_id")?.value;

  if (getSession) {
    const verifyJwt = await decodeUserSession(getSession);

    if (verifyJwt) {
      const [getUser] = await db
        .select({ id: usersTable.id, email: usersTable.email })
        .from(usersTable)
        .where(eq(usersTable.id, Number(verifyJwt?.user)));

      if (getUser) {
        redirect("/links", RedirectType.push);
      }
    }
  }

  async function loginUser(formData: FormData) {
    "use server";

    const data = Object.fromEntries(formData);

    const validateForm = loginSchema.safeParse(data);

    if (!validateForm.success) {
      const errors = validateForm.error.format();
      console.log(errors);
      return;
    }

    const [userExists] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, validateForm.data.email));

    if (!userExists) {
      console.log("User not exist");
      return;
    }

    const comparedPassword = await comparePassword(
      validateForm.data.password,
      userExists.password
    );

    if (!comparedPassword) {
      console.log("Password not valid");
      return;
    }

    const jwt = await encodeUserSession(userExists.id);

    cookies().set({
      name: "session_id",
      value: jwt,
      httpOnly: true,
      secure: true,
    });

    redirect("/links", RedirectType.push);
  }

  return (
    <section className="flex-1 flex justify-center items-center">
      <form
        action={loginUser}
        className="flex-1 block p-6 bg-white max-w-md border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
            placeholder="password"
            required
          />
        </div>
        <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Login
        </Button>
      </form>
    </section>
  );
}
