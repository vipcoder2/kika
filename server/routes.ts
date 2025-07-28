import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Polling endpoints
  app.post("/api/polls/:matchId/vote", async (req, res) => {
    try {
      const { matchId } = req.params;
      const { teamChoice } = req.body;
      const ipAddress = req.ip || req.connection.remoteAddress || "unknown";
      const userAgent = req.get("User-Agent") || "";

      // Check if user already voted for this match
      const existingVote = await storage.getVoteByMatchAndIP(matchId, ipAddress);
      if (existingVote) {
        return res.status(400).json({ error: "You have already voted for this match" });
      }

      if (!["home", "away", "draw"].includes(teamChoice)) {
        return res.status(400).json({ error: "Invalid team choice" });
      }

      await storage.insertPollVote({
        matchId,
        teamChoice,
        ipAddress,
        userAgent,
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Error submitting vote:", error);
      res.status(500).json({ error: "Failed to submit vote" });
    }
  });

  app.get("/api/polls/:matchId/results", async (req, res) => {
    try {
      const { matchId } = req.params;
      const results = await storage.getPollResults(matchId);
      res.json(results);
    } catch (error) {
      console.error("Error fetching poll results:", error);
      res.status(500).json({ error: "Failed to fetch poll results" });
    }
  });

  app.get("/api/polls/:matchId/user-vote", async (req, res) => {
    try {
      const { matchId } = req.params;
      const ipAddress = req.ip || req.connection.remoteAddress || "unknown";
      const vote = await storage.getVoteByMatchAndIP(matchId, ipAddress);
      res.json({ hasVoted: !!vote, teamChoice: vote?.teamChoice || null });
    } catch (error) {
      console.error("Error checking user vote:", error);
      res.status(500).json({ error: "Failed to check user vote" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
