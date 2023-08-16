import { InferModel, relations } from "drizzle-orm";
import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";

import { linksTable } from "./links";

export const visitsTable = pgTable("visits", {
  id: serial("id").primaryKey().notNull(),
  linkId: integer("link_id").notNull().references(() => linksTable.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const visitsTableRelations = relations(visitsTable, ({ many, one }) => ({
  link: one(linksTable, {
    fields: [visitsTable.linkId],
    references: [linksTable.id],
  }),
}));

export type Visits = InferModel<typeof visitsTable, "select">;
export type NewVisits = InferModel<typeof visitsTable, "insert">;
