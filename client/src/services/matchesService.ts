
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off, push, set, get } from "firebase/database";
import { Match } from "../types/match";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCNvJQcIOzQiTG_HmLi4_Nw_yOJRWckIaU",
  authDomain: "kikasports-d5fc2.firebaseapp.com",
  databaseURL: "https://kikasports-d5fc2-default-rtdb.firebaseio.com",
  projectId: "kikasports-d5fc2",
  storageBucket: "kikasports-d5fc2.firebasestorage.app",
  messagingSenderId: "458738625598",
  appId: "1:458738625598:web:e4ee7c33dd1e628b41b56f"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Test Firebase connection
console.log("Firebase initialized:", !!app);
console.log("Database instance:", !!db);

// Cache for matches data
let cachedMatches: Match[] = [];
let listeners: ((matches: Match[]) => void)[] = [];

// Set up real-time listener
const matchRef = ref(db, "competitions");
onValue(matchRef, (snapshot) => {
  const data = snapshot.val();
  
  let matches: Match[] = [];
  
  if (Array.isArray(data)) {
    // Firebase returned an array directly
    matches = data.filter(match => match !== null && match !== undefined);
  } else if (data && typeof data === 'object') {
    // Firebase returned an object, convert to array
    matches = Object.values(data).filter(match => match !== null && match !== undefined) as Match[];
  }
  
  cachedMatches = matches;
  
  // Notify all listeners
  listeners.forEach(callback => callback(matches));
});

export const fetchMatches = async (): Promise<Match[]> => {
  // Return cached data immediately if available
  if (cachedMatches.length > 0) {
    return Promise.resolve(cachedMatches);
  }

  // If no cached data, wait for initial load
  return new Promise((resolve) => {
    const listener = (matches: Match[]) => {
      resolve(matches);
      // Remove this one-time listener
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
    listeners.push(listener);
  });
};

// Subscribe to real-time updates
export const subscribeToMatches = (callback: (matches: Match[]) => void): (() => void) => {
  // Add callback to listeners
  listeners.push(callback);
  
  // Call immediately with cached data if available
  if (cachedMatches.length > 0) {
    callback(cachedMatches);
  }

  // Return unsubscribe function
  return () => {
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

// Poll vote functions
export const submitPollVote = async (matchId: string, teamChoice: 'home' | 'away' | 'draw', ipAddress: string, userAgent: string) => {
  try {
    console.log("submitPollVote called with:", { matchId, teamChoice, ipAddress });
    
    // First check if user already voted
    const voteRef = ref(db, `polls/${matchId}/votes`);
    console.log("Getting existing votes from Firebase...");
    
    const snapshot = await get(voteRef);
    const votes = snapshot.val() || {};
    console.log("Existing votes:", Object.keys(votes).length);
    
    // Check for existing vote from same IP
    const existingVote = Object.values(votes).find((vote: any) => vote.ipAddress === ipAddress);
    if (existingVote) {
      console.log("Found existing vote for IP:", ipAddress);
      throw new Error("You have already voted for this match");
    }
    
    // Submit the vote
    console.log("Submitting new vote to Firebase...");
    const newVoteRef = push(voteRef);
    
    const voteData = {
      teamChoice,
      ipAddress,
      userAgent,
      createdAt: new Date().toISOString()
    };
    
    console.log("Vote data:", voteData);
    await set(newVoteRef, voteData);
    
    console.log("Vote submitted successfully to Firebase with ref:", newVoteRef.key);
    return true;
  } catch (error: any) {
    console.error("Error submitting vote to Firebase:", error);
    console.error("Error type:", typeof error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    throw error;
  }
};

export const getPollResults = async (matchId: string) => {
  try {
    const voteRef = ref(db, `polls/${matchId}/votes`);
    const snapshot = await get(voteRef);
    const votes = snapshot.val() || {};
    
    const voteArray = Object.values(votes) as any[];
    const homeVotes = voteArray.filter(vote => vote.teamChoice === 'home').length;
    const awayVotes = voteArray.filter(vote => vote.teamChoice === 'away').length;
    const drawVotes = voteArray.filter(vote => vote.teamChoice === 'draw').length;
    
    return {
      home: homeVotes,
      away: awayVotes,
      draw: drawVotes,
      total: homeVotes + awayVotes + drawVotes
    };
  } catch (error) {
    console.error("Error getting poll results from Firebase:", error);
    return { home: 0, away: 0, draw: 0, total: 0 };
  }
};

export const checkUserVote = async (matchId: string, ipAddress: string) => {
  try {
    const voteRef = ref(db, `polls/${matchId}/votes`);
    const snapshot = await get(voteRef);
    const votes = snapshot.val() || {};
    
    const voteEntries = Object.values(votes);
    const userVote = voteEntries.find((vote: any) => vote.ipAddress === ipAddress);
    
    if (userVote) {
      console.log("Found existing vote for IP:", ipAddress, "Choice:", (userVote as any).teamChoice);
      return { hasVoted: true, teamChoice: (userVote as any).teamChoice };
    }
    
    console.log("No existing vote found for IP:", ipAddress);
    return { hasVoted: false, teamChoice: null };
  } catch (error) {
    console.error("Error checking user vote in Firebase:", error);
    return { hasVoted: false, teamChoice: null };
  }
};

// Clean up function
export const cleanup = () => {
  off(matchRef);
  listeners = [];
  cachedMatches = [];
};
