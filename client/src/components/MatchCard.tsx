import React from "react";
import { Link } from "wouter";
import { Match } from "../types/match";
import { formatMatchDate, isMatchLive, isMatchFinished } from "../utils/dateUtils";
import { Trophy, MapPin, Clock, Play } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface MatchCardProps {
  match: Match;
  variant?: "default" | "thin";
}

const MatchCard: React.FC<MatchCardProps> = ({
  match,
  variant = "default"
}) => {
  const { t } = useLanguage();
  const isLive = isMatchLive(match.kickoff.date, match.kickoff.time, match.score.status);
  const isFinished = isMatchFinished(match.score.status);

  if (variant === "thin") {
    return (
      <Link to={`/watch/${match.id}`} className="block">
        <div className="bg-sport-card border border-sport-border rounded-xl p-3 hover:shadow-md transition-all duration-200 hover:border-gray-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-sport-text-light">
              <span>{formatMatchDate(match.kickoff.date, match.kickoff.time)}</span>
              <span className="text-sport-text">{match.competition.name}</span>
            </div>
            {isLive && <div className="live-indicator text-xs">
                <span className="live-dot w-1.5 h-1.5"></span> LIVE
              </div>}
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-2">
                <img src={match.clubs.home.logo} alt={match.clubs.home.name} className="w-7 h-7 object-contain flex-shrink-0" loading="lazy" />
                <span className="font-bold text-sm text-sport-text">{match.clubs.home.name}</span>
              </div>
            </div>
            
            <span className="text-sport-text-light text-lg font-bold mx-4">{t('vs')}</span>
            
            <div className="flex items-center gap-3 flex-1 justify-end">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-sport-text">{match.clubs.away.name}</span>
                <img src={match.clubs.away.logo} alt={match.clubs.away.name} className="w-7 h-7 object-contain flex-shrink-0" loading="lazy" />
              </div>
            </div>
            
            <button className="hidden md:block ml-4 px-4 py-1 bg-sport-card border border-sport-border rounded-lg text-sm font-medium text-sport-text hover:bg-sport-surface transition-colors">
              {isLive ? t('watch') : t('matchDetails')}
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/watch/${match.id}`} className="block group">
      <div className="hidden md:block bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all duration-200">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left side - Time and Competition */}
          <div className="flex flex-col w-44">
            <div className="text-sm font-medium text-gray-900 mb-1">
              {match.kickoff.time} - {formatMatchDate(match.kickoff.date, match.kickoff.time).split(',')[0]}
            </div>
            <div className="text-sm text-gray-600">
              {match.competition.name}
            </div>
          </div>
          
          {/* Center - Teams */}
          <div className="flex items-center justify-center flex-1 gap-6">
            {/* Home Team */}
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-900 text-right">{match.clubs.home.name}</span>
              <img src={match.clubs.home.logo} alt={match.clubs.home.name} className="w-7 h-7 object-contain flex-shrink-0" loading="lazy" />
            </div>
            
            {/* VS */}
            <span className="text-gray-500 font-medium text-base mx-2">{t('vs')}</span>
            
            {/* Away Team */}
            <div className="flex items-center gap-3">
              <img src={match.clubs.away.logo} alt={match.clubs.away.name} className="w-7 h-7 object-contain flex-shrink-0" loading="lazy" />
              <span className="font-medium text-gray-900">{match.clubs.away.name}</span>
            </div>
          </div>
          
          {/* Right side - Watch Button */}
          <div className="flex justify-end w-20">
            <button className="px-4 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              {t('watch')}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile version - keep existing design */}
      <div className="md:hidden bg-sport-card border border-sport-border rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-gray-300">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-sport-primary flex-shrink-0" />
            <span className="text-sm text-sport-text-light truncate font-medium">{match.competition.name}</span>
          </div>
          {isLive ? <div className="live-indicator">
              <span className="live-dot"></span> {t('live')}
            </div> : <div className="bg-sport-surface rounded-lg px-3 py-1">
              <span className="text-sport-text-light text-xs">
                {formatMatchDate(match.kickoff.date, match.kickoff.time)}
              </span>
            </div>}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img src={match.clubs.home.logo} alt={match.clubs.home.name} className="w-10 h-10 object-contain flex-shrink-0" loading="lazy" />
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-sport-text truncate block">{match.clubs.home.name}</span>
              {isLive || isFinished ? <span className="text-xs text-sport-text-light">{t('home')}</span> : null}
            </div>
          </div>
          
          <div className="mx-4 flex flex-col items-center">
            {isLive || isFinished ? <div className="text-lg font-bold text-sport-text-light">VS</div> : <>
                <div className="text-lg font-bold text-sport-text-light">VS</div>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-sport-primary" />
                  <span className="text-xs text-sport-text-light">{match.kickoff.time}</span>
                </div>
              </>}
          </div>
          
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-1 min-w-0 text-right">
              <span className="font-semibold text-sport-text truncate block">{match.clubs.away.name}</span>
              {isLive || isFinished ? <span className="text-xs text-sport-text-light">{t('away')}</span> : null}
            </div>
            <img src={match.clubs.away.logo} alt={match.clubs.away.name} className="w-10 h-10 object-contain flex-shrink-0" loading="lazy" />
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-sport-border">
          <div className="flex items-center gap-1 text-sport-text-light">
            <MapPin className="w-3 h-3" />
            <span className="text-xs truncate">{match.venue.name}, {match.venue.city}</span>
          </div>
          <button className="px-4 py-1 bg-sport-primary text-white rounded-lg text-sm font-medium hover:bg-sport-secondary transition-colors">
            {isLive ? t('watchLive') : t('matchDetails')}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;
