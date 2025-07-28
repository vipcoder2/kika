
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MatchCard from "./MatchCard";
import { fetchMatches } from "../services/matchesService";
import { Match } from "../types/match";
import { isMatchLive } from "../utils/dateUtils";

interface StreamingPageProps {
  title: string;
  description: string;
  content: string[];
}

const StreamingPage: React.FC<StreamingPageProps> = ({ title, description, content }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const matchesData = await fetchMatches();
        setMatches(matchesData);
        
        const live = matchesData.filter(match => 
          match.score.status === "LIVE" || isMatchLive(match.kickoff.date, match.kickoff.time, match.score.status)
        );
        setLiveMatches(live);
        
        const upcoming = matchesData
          .filter(match => match.score.status === "")
          .slice(0, 6);
        setUpcomingMatches(upcoming);
      } catch (error) {
        console.error("Error loading matches:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, []);

  return (
    <div className="min-h-screen bg-sport-dark text-white">
      <Navbar />
      
      <main className="page-container">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-gray-300 mb-6">{description}</p>
          
          <div className="space-y-4">
            {content.map((paragraph, index) => (
              <p key={index} className="text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sport-primary"></div>
          </div>
        ) : (
          <>
            {/* Live Matches */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 border-b border-sport-primary/20 pb-2">
                Live Matches
              </h2>
              
              {liveMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {liveMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              ) : (
                <div className="bg-sport-card rounded-lg p-6 text-center">
                  <p className="text-gray-300">No live matches at the moment.</p>
                </div>
              )}
            </section>

            {/* Upcoming Matches */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 border-b border-sport-primary/20 pb-2">
                Scheduled Matches
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default StreamingPage;
