import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Match, CreateMatchData, UpdateMatchData } from '@/types/match';

const COLLECTION_NAME = 'matches';

const getAllMatches = async (): Promise<Match[]> => {
  try {
    console.log('Fetching matches from Firestore...');
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    console.log('Firestore response:', querySnapshot.docs.length, 'documents found');

    const matches = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Match data:', { id: doc.id, ...data });
      return {
        id: doc.id,
        ...data
      };
    }) as Match[];

    console.log('Processed matches:', matches);
    return matches;
  } catch (error) {
    console.error('Error fetching matches:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    throw new Error(`Failed to fetch matches: ${error.message}`);
  }
};

export const matchService = {
  getAllMatches,

  getMatches: async (): Promise<Match[]> => {
    return getAllMatches();
  },

  getMatchById: async (id: string): Promise<Match | null> => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      const match = querySnapshot.docs.find(doc => doc.id === id);
      return match ? { id: match.id, ...match.data() } as Match : null;
    } catch (error) {
      console.error('Error fetching match:', error);
      throw new Error('Failed to fetch match');
    }
  },

  getHotMatches: async (): Promise<Match[]> => {
    try {
      const matches = await getAllMatches();
      return matches.filter(match => match.score.type === 'HOT');
    } catch (error) {
      console.error('Error fetching hot matches:', error);
      throw new Error('Failed to fetch hot matches');
    }
  },

  getLiveMatches: async (): Promise<Match[]> => {
    try {
      const matches = await getAllMatches();
      return matches.filter(match => match.score.status === 'LIVE');
    } catch (error) {
      console.error('Error fetching live matches:', error);
      throw new Error('Failed to fetch live matches');
    }
  },

  getUpcomingMatches: async (): Promise<Match[]> => {
    try {
      const matches = await getAllMatches();
      return matches.filter(match => match.score.status === 'Upcoming');
    } catch (error) {
      console.error('Error fetching upcoming matches:', error);
      throw new Error('Failed to fetch upcoming matches');
    }
  },

  getFinishedMatches: async (): Promise<Match[]> => {
    try {
      const matches = await getAllMatches();
      return matches.filter(match => match.score.status === 'FT');
    } catch (error) {
      console.error('Error fetching finished matches:', error);
      throw new Error('Failed to fetch finished matches');
    }
  },

  createMatch: async (matchData: CreateMatchData): Promise<string> => {
    try {
      // Generate a custom ID for the match
      const matchId = `match${Date.now()}`;

      // Clean the data to remove undefined values
      const cleanMatchData = JSON.parse(JSON.stringify({
        id: matchId,
        ...matchData,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await setDoc(doc(db, COLLECTION_NAME, matchId), cleanMatchData);
      return matchId;
    } catch (error) {
      console.error('Error creating match:', error);
      throw new Error('Failed to create match');
    }
  },

  updateMatch: async (matchData: UpdateMatchData): Promise<Match> => {
    try {
      const { id, ...updateData } = matchData;
      const cleanUpdateData = JSON.parse(JSON.stringify({
        ...updateData,
        updatedAt: new Date()
      }));

      await updateDoc(doc(db, COLLECTION_NAME, id), cleanUpdateData);

      // Return the updated match
      const updatedMatch = await matchService.getMatchById(id);
      if (!updatedMatch) {
        throw new Error('Match not found after update');
      }
      return updatedMatch;
    } catch (error) {
      console.error('Error updating match:', error);
      throw new Error('Failed to update match');
    }
  },

  deleteMatch: async (id: string): Promise<void> => {
    try {
      // Delete the match
      await deleteDoc(doc(db, COLLECTION_NAME, id));

      // Delete associated poll if it exists
      try {
        await deleteDoc(doc(db, 'polls', id));
      } catch (pollError) {
        // Poll might not exist, which is fine
        console.log('No poll found for match:', id);
      }
    } catch (error) {
      console.error('Error deleting match:', error);
      throw new Error('Failed to delete match');
    }
  },
};