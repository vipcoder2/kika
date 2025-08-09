import { Link } from 'wouter';
import { Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Match } from '@/types/match';
import { cn } from '@/lib/utils';

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const isLive = match.score.status === 'LIVE';
  const isUpcoming = match.score.status === 'Upcoming';
  const isFinished = match.score.status === 'FT';

  const getStatusColor = () => {
    switch (match.score.status) {
      case 'LIVE':
        return 'bg-red-500 text-white';
      case 'FT':
        return 'bg-gray-100 text-gray-800';
      case 'Upcoming':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border hover:shadow-sm transition-all duration-200 py-4 px-4 relative">
      <div className="flex items-center justify-between gap-6">
        {/* Left: Date and Competition */}
        <div className="text-xs text-gray-600 min-w-[90px] flex-shrink-0">
          <div className="font-medium">{match.kickoff.date}</div>
          <div className="text-gray-500 mt-0.5">{match.competition.name}</div>
        </div>

        {/* Center: Teams */}
        <div className="flex items-center justify-center gap-4 flex-1 min-w-0">
          {/* Home Team */}
          <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
            <span className="font-medium text-gray-900 text-sm truncate text-right hidden sm:block">
              {match.clubs.home.name}
            </span>
            <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
              {match.clubs.home.logo ? (
                <img
                  src={match.clubs.home.logo}
                  alt={match.clubs.home.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-5 h-5 bg-red-500 rounded-full" />
              )}
            </div>
          </div>

          {/* VS */}
          <div className="flex items-center justify-center min-w-[60px] text-center">
            <div className="text-gray-500 font-medium text-sm">vs</div>
          </div>

          {/* Away Team */}
          <div className="flex items-center gap-2 flex-1 justify-start min-w-0">
            <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
              {match.clubs.away.logo ? (
                <img
                  src={match.clubs.away.logo}
                  alt={match.clubs.away.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-5 h-5 bg-blue-500 rounded-full" />
              )}
            </div>
            <span className="font-medium text-gray-900 text-sm truncate text-left hidden sm:block">
              {match.clubs.away.name}
            </span>
          </div>
        </div>

        {/* Right: Status and Watch Button */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Status Badge - Show for live and upcoming matches */}
          {isLive && (
            <Badge className={cn('text-xs font-medium flex items-center gap-1', getStatusColor(), 'animate-pulse')}>
              <div className="w-2 h-2 bg-white rounded-full" />
              LIVE
            </Badge>
          )}
          {isUpcoming && (
            <Badge className={cn('text-xs font-medium flex items-center gap-1', getStatusColor())}>
              <Clock className="w-3 h-3" />
              {match.kickoff.time}
            </Badge>
          )}

          {/* Watch Button - Hidden on Mobile */}
          <div className="hidden md:block">
            <Link href={`/match/${match.id}`}>
              <Button 
                size="sm"
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-1.5 text-sm"
                variant="outline"
              >
                Watch
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile - Make entire card clickable */}
      <Link href={`/match/${match.id}`} className="md:hidden absolute inset-0 z-10">
        <span className="sr-only">View match details</span>
      </Link>
    </div>
  );
}