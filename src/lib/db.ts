import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as linksSchema from "@/schema/links";
import * as visitsSchema from "@/schema/visits";
import * as usersTable from "@/schema/users";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, {
  schema: { ...usersTable, ...linksSchema, ...visitsSchema },
});
