import React from "react";
import { Link } from "wouter";
import { Match } from "../types/match";
import { formatMatchDate, isMatchLive } from "../utils/dateUtils";
import { Button } from "./ui/button";
import { Play, Clock, Calendar, MapPin } from "lucide-react";
interface FeaturedMatchProps {
  match: Match;
}
const FeaturedMatch: React.FC<FeaturedMatchProps> = ({
  match
}) => {
  const isLive = isMatchLive(match.kickoff.date, match.kickoff.time, match.score.status);
  return <div className="relative w-full overflow-hidden rounded-xl shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-t from-sport-dark via-sport-dark/70 to-transparent z-10 bg-slate-950"></div>
      
      <div className="relative bg-sport-card rounded-xl p-4 md:p-6 z-20 border border-sport-muted/30 my-[10px]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Link to="/competitions" className="text-xs md:text-sm bg-sport-accent/20 text-sport-accent px-2 py-0.5 rounded-full font-thin hover:bg-sport-accent/30 transition-colors">
                {match.competition.name}
              </Link>
              {isLive && <div className="live-indicator">
                  <span className="live-dot"></span> LIVE NOW
                </div>}
            </div>
            
          </div>
          <div className="text-sm text-gray-300 mt-2 md:mt-0 flex items-center">
            <Calendar className="h-4 w-4 mr-1.5 text-sport-primary" />
            {formatMatchDate(match.kickoff.date, match.kickoff.time)}
          </div>
        </div>
        
        <div className="flex flex-col mt-6 md:mt-8 p-4 backdrop-blur-sm px-[19px] my-[22px] py-[10px] rounded-2xl bg-[#192334]">
          {/* Teams section - Horizontal on mobile */}
          <div className="flex justify-between items-center gap-4 mb-4">
            {/* Home Team - Horizontally aligned on mobile */}
            <div className="flex flex-col items-center">
              <img src={match.clubs.home.logo} alt={`${match.clubs.home.name} logo`} className="w-16 h-16 md:w-20 md:h-20 object-contain mb-2" />
              <div className="text-center">
                <span className="text-base md:text-2xl font-bold text-white truncate max-w-28">{match.clubs.home.name}</span>
              </div>
            </div>
            
            {/* VS / Score - Center */}
            <div className="flex flex-col items-center mx-4">
              {isLive ? <>
                  <div className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
                    <span>{match.score.home}</span>
                    <span className="text-sport-primary">-</span>
                    <span>{match.score.away}</span>
                  </div>
                  <div className="text-sm text-sport-primary font-semibold mt-1">LIVE</div>
                </> : <>
                  <div className="text-2xl md:text-3xl font-bold text-white">VS</div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-300">
                    <Clock className="h-3 w-3 text-sport-primary" />
                    <span>{match.kickoff.time}</span>
                  </div>
                </>}
            </div>
            
            {/* Away Team - Horizontally aligned on mobile */}
            <div className="flex flex-col items-center">
              <img src={match.clubs.away.logo} alt={`${match.clubs.away.name} logo`} className="w-16 h-16 md:w-20 md:h-20 object-contain mb-2" />
              <div className="text-center">
                <span className="text-base md:text-2xl font-bold text-white truncate max-w-28">{match.clubs.away.name}</span>
              </div>
            </div>
          </div>
          
          {/* Additional match info - Below teams on all screen sizes */}
          <div className="mt-4 md:mt-6">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <MapPin className="h-4 w-4 text-sport-primary" />
              <span>{match.venue.name}, {match.venue.city}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-6">
          <div className="flex items-center text-sm text-gray-400 gap-4">
            
            
          </div>
          
          <Button asChild className="w-full sm:w-auto bg-sport-primary hover:bg-sport-secondary text-white font-semibold px-6 py-5 rounded-md">
            <Link to={`/watch/${match.id}`} className="my-[4px] py-0 mx-0 px-[42px]">
              <Play className="h-5 w-5 mr-2" />
              {isLive ? "Watch Live Stream" : "Match Details"}
            </Link>
          </Button>
        </div>
      </div>
    </div>;
};
export default FeaturedMatch;