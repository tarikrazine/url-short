import crypto from "crypto";

// export const runtime = "node"

export function generateKey() {
  return crypto.randomBytes(16).toString("hex");
}
