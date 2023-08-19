import { InferModel, relations, sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { visitsTable } from "./visits";
import { usersTable } from "./users";

export const linksTable = pgTable("links", {
  id: serial("id").primaryKey().notNull(),
  url: text("url").notNull(),
  short: varchar("short", { length: 200 }),
  authorId: integer("author_id").references(() => usersTable.id),
  createdAt: timestamp("created_at").defaultNow(),
}, (links) => {
  return {
    urlIndex: uniqueIndex("url_idx").on(links.url),
  };
});

export const linksTableRelations = relations(linksTable, ({ many, one }) => ({
  user: one(usersTable, {
    fields: [linksTable.authorId],
    references: [usersTable.id],
  }),
  visits: many(visitsTable),
}));

export type Link = InferModel<
  typeof linksTable,
  "select"
>;
export type NewLink = InferModel<typeof linksTable, "insert">;
