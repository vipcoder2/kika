
import { useState, useEffect } from 'react';
import { collection, doc, setDoc, getDoc, onSnapshot, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface PollData {
  matchId: string;
  votes: {
    home: number;
    draw: number;
    away: number;
  };
  userVotes: { [userId: string]: 'home' | 'draw' | 'away' };
  createdAt: Date;
}

export function usePolls(matchId: string) {
  const [pollData, setPollData] = useState<PollData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userVote, setUserVote] = useState<'home' | 'draw' | 'away' | null>(null);

  // Generate a simple user ID (in production, use proper auth)
  const getUserId = () => {
    let userId = localStorage.getItem('anonymous_user_id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('anonymous_user_id', userId);
    }
    return userId;
  };

  useEffect(() => {
    if (!matchId) return;

    const pollRef = doc(db, 'polls', matchId);
    
    const unsubscribe = onSnapshot(pollRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as PollData;
        setPollData(data);
        
        // Check if current user has voted
        const userId = getUserId();
        setUserVote(data.userVotes?.[userId] || null);
      } else {
        // Create initial poll data if doesn't exist
        const initialData: PollData = {
          matchId,
          votes: { home: 0, draw: 0, away: 0 },
          userVotes: {},
          createdAt: new Date(),
        };
        setDoc(pollRef, initialData);
        setPollData(initialData);
        setUserVote(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [matchId]);

  const vote = async (choice: 'home' | 'draw' | 'away') => {
    if (!matchId || !pollData) return;

    const userId = getUserId();
    const pollRef = doc(db, 'polls', matchId);
    
    try {
      // If user has already voted, remove the previous vote
      if (userVote) {
        await updateDoc(pollRef, {
          [`votes.${userVote}`]: increment(-1),
          [`userVotes.${userId}`]: choice,
          [`votes.${choice}`]: increment(1),
        });
      } else {
        // First vote
        await updateDoc(pollRef, {
          [`votes.${choice}`]: increment(1),
          [`userVotes.${userId}`]: choice,
        });
      }
      
      setUserVote(choice);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const getTotalVotes = () => {
    if (!pollData) return 0;
    return pollData.votes.home + pollData.votes.draw + pollData.votes.away;
  };

  const getPercentage = (votes: number) => {
    const total = getTotalVotes();
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  return {
    pollData,
    userVote,
    loading,
    vote,
    getTotalVotes,
    getPercentage,
  };
}
