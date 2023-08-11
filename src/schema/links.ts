import { InferModel } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const linksTable = pgTable("links", {
  id: serial("id").primaryKey().notNull(),
  url: text("url").notNull(),
  short: varchar("short", { length: 200 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Link = InferModel<typeof linksTable, "select">;
export type NewLink = InferModel<typeof linksTable, "insert">;
