import { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

export default {
  schema: "./src/schema/*",
  out: "./src/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
