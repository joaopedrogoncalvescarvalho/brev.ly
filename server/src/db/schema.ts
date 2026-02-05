import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const links = pgTable("links", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  originalUrl: text("original_url").notNull(),
  shortUrl: text("short_url").notNull().unique(),
  accessCount: integer("access_count").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
