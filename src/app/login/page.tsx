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

  const getSession = cookies().get('session_id')?.value

  
  if (getSession) {
    
    const verifyJwt = await decodeUserSession(getSession)

    if (verifyJwt) {

      const [ getUser ] = await db.select({ id: usersTable.id, email: usersTable.email }).from(usersTable).where(eq(usersTable.id, Number(verifyJwt?.user)))
    
      if (getUser) {
        redirect('/links', RedirectType.push)
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
      return
    }

    const comparedPassword = await comparePassword(
      validateForm.data.password,
      userExists.password
    );

    if (!comparedPassword) {
      console.log("Password not valid");
      return
    }

    const jwt = await encodeUserSession(userExists.id);

    cookies().set({
      name: "session_id",
      value: jwt,
      httpOnly: true,
      secure: true
    });

    redirect('/links', RedirectType.push)
  }

  return (
    <form action={loginUser}>
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="password" />
      <Button>Register</Button>
    </form>
  );
}
