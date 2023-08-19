import { pbkdf2Sync } from "node:crypto";

const salt = process.env.SALT_KEY || "salt";
const hashIterations = 10000;

export function hashPassword(password: string) {
  return pbkdf2Sync(password, salt, hashIterations, 64, "sha512").toString(
    "hex",
  );
}

export function comparePassword(password: string, hashPassword: string) {
  const hash = pbkdf2Sync(password, salt, hashIterations, 64, "sha512")
    .toString("hex");
  return hash === hashPassword;
}
