
import { useState, useEffect } from 'react';
import { Match } from '../types/match';
import { fetchMatches, subscribeToMatches } from '../services/matchesService';

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const initializeMatches = async () => {
      try {
        // Get initial data
        const initialMatches = await fetchMatches();
        setMatches(initialMatches);
        setLoading(false);

        // Subscribe to real-time updates
        unsubscribe = subscribeToMatches((updatedMatches) => {
          console.log("useMatches received updated matches:", updatedMatches);
          console.log("useMatches - setting matches, count:", updatedMatches.length);
          setMatches(updatedMatches);
          setLoading(false);
        });
      } catch (err) {
        console.error("Error loading matches:", err);
        setError("Failed to load matches");
        setLoading(false);
      }
    };

    initializeMatches();

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return { matches, loading, error };
};
