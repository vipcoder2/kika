import { users, type User, type InsertUser, type InsertPollVote, type PollVote } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  insertPollVote(vote: InsertPollVote): Promise<PollVote>;
  getPollResults(matchId: string): Promise<{ home: number; away: number; draw: number; total: number }>;
  getVoteByMatchAndIP(matchId: string, ipAddress: string): Promise<PollVote | null>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private votes: PollVote[] = [];
  currentId: number;
  private lastVoteId = 0;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async insertPollVote(vote: InsertPollVote): Promise<PollVote> {
    const newVote: PollVote = {
      id: ++this.lastVoteId,
      createdAt: new Date().toISOString(),
      ...vote,
    };
    this.votes.push(newVote);
    return newVote;
  }

  async getPollResults(matchId: string): Promise<{ home: number; away: number; draw: number; total: number }> {
    const matchVotes = this.votes.filter(vote => vote.matchId === matchId);
    const homeVotes = matchVotes.filter(vote => vote.teamChoice === 'home').length;
    const awayVotes = matchVotes.filter(vote => vote.teamChoice === 'away').length;
    const drawVotes = matchVotes.filter(vote => vote.teamChoice === 'draw').length;
    return {
      home: homeVotes,
      away: awayVotes,
      draw: drawVotes,
      total: homeVotes + awayVotes + drawVotes
    };
  }

  async getVoteByMatchAndIP(matchId: string, ipAddress: string): Promise<PollVote | null> {
    return this.votes.find(vote => vote.matchId === matchId && vote.ipAddress === ipAddress) || null;
  }
}

export const storage = new MemStorage();