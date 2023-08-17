import { InferModel, relations, sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { visitsTable } from "./visits";

export const linksTable = pgTable("links", {
  id: serial("id").primaryKey().notNull(),
  url: text("url").notNull(),
  short: varchar("short", { length: 200 }),
  createdAt: timestamp("created_at").defaultNow(),
}, (links) => {
  return {
    urlIndex: uniqueIndex("url_idx").on(links.url),
  };
});

export const linksTableRelations = relations(linksTable, ({ many, one }) => ({
  visits: many(visitsTable),
}));

export type Link = InferModel<
  typeof linksTable,
  "select"
>;
export type NewLink = InferModel<typeof linksTable, "insert">;
