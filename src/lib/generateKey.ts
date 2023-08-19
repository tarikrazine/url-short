import crypto from "node:crypto";

export function generateKey() {
  return crypto.randomBytes(16).toString("hex");
}
