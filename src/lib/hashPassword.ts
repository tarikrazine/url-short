//import { pbkdf2Sync } from "node:crypto";
import pbkdf2 from "./pbkdf2";

const salt = process.env.SALT_KEY || "salt";
const hashIterations = 10000;

export async function hashPassword(password: string) {
  return pbkdf2(password, salt, hashIterations, 64);
}

export async function comparePassword(password: string, hashPassword: string) {
  const hash = await pbkdf2(password, salt, hashIterations, 64);
  return hash === hashPassword;
}
