import { RedirectType } from "next/dist/client/components/redirect";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { eq } from "drizzle-orm";
import { z } from "zod";

import Button from "@/components/Button";

import { db } from "@/lib/db";
import { newUser, usersTable } from "@/schema/users";

import { hashPassword } from "@/lib/hashPassword";
import { decodeUserSession } from "@/lib/session";

const registerSchema = z
  .object({
    username: z.string({ required_error: "Username is Required"}).min(3),
    email: z.string().email(),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
  })
  .refine((inputs) => inputs.password === inputs.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default async function RegisterPage() {

  const getSession = cookies().get('session_id')?.value

  if (getSession) {

    const verifyJwt = await decodeUserSession(getSession!)
  
    const [ getUser ] = await db.select({ id: usersTable.id, email: usersTable.email }).from(usersTable).where(eq(usersTable.id, Number(verifyJwt?.user)))
  
    if (getUser) {
      redirect('/links', RedirectType.push)
    }
    
  }


  async function registerUser(formData: FormData) {
    "use server";

    const data = Object.fromEntries(formData);

    const validateForm = registerSchema.safeParse(data);

    if (!validateForm.success) {
      const errors = validateForm.error.format()
      console.log(errors)
      return
    }

    const [ userExists ] = await db.select({ id: usersTable.id, email: usersTable.email, username: usersTable.username }).from(usersTable).where(eq(usersTable.email, validateForm.data.email))

    if (userExists) {
      console.log('User already register')
      return
    }

    const hashedPassword = await hashPassword(validateForm.data.password)

    const user: newUser = {
        username: validateForm.data.username,
        email: validateForm.data.email,
        password: hashedPassword
    }

    const newUser = await db.insert(usersTable).values(user).returning({ id: usersTable.id, email: usersTable.email, username: usersTable.username })

    console.log("New User", newUser)
  }
  
  return (
    <form action={registerUser}>
      <input type="text" name="username" placeholder="Username" />
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="password" />
      <input
        type="password"
        name="confirmPassword"
        placeholder="confirm your password"
      />
      <Button>Register</Button>
    </form>
  );
}
