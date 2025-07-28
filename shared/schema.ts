import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const pollVotes = pgTable("poll_votes", {
  id: serial("id").primaryKey(),
  matchId: text("match_id").notNull(),
  teamChoice: text("team_choice").notNull(), // 'home', 'away', or 'draw'
  ipAddress: text("ip_address").notNull(),
  userAgent: text("user_agent"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const insertPollVoteSchema = createInsertSchema(pollVotes).pick({
  matchId: true,
  teamChoice: true,
  ipAddress: true,
  userAgent: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPollVote = z.infer<typeof insertPollVoteSchema>;
export type PollVote = typeof pollVotes.$inferSelect;
