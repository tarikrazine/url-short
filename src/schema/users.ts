import { InferModel, relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { linksTable } from "./links";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  username: varchar("username", { length: 50 }).notNull(),
  email: text("email").notNull(),
  password: varchar("password", { length: 75 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (users) => {
  return {
    usernameIndex: uniqueIndex("username_idx").on(users.username),
    emailIndex: uniqueIndex("email_idx").on(users.email),
  };
});

export const usersTableRelations = relations(usersTable, ({ many }) => ({
  links: many(linksTable),
}));

export type User = InferModel<typeof usersTable, "select">;
export type newUser = InferModel<typeof usersTable, "insert">;
