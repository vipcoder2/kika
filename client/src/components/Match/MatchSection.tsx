import { Match } from '@/types/match';
import { MatchCard } from './MatchCard';
import { Skeleton } from '@/components/ui/skeleton';

interface MatchSectionProps {
  title: string;
  matches: Match[] | undefined;
  icon: React.ReactNode;
  isLoading?: boolean;
  error?: Error | null;
}

export function MatchSection({ title, matches, icon, isLoading, error }: MatchSectionProps) {
  if (error) {
    return (
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary flex items-center">
            {icon}
            {title}
          </h2>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Failed to load matches: {error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary flex items-center">
          {icon}
          {title}
        </h2>
      </div>
      
      <div className="space-y-3">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="flex items-center space-x-2 flex-1">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-4 w-8" />
                    <div className="flex items-center space-x-2 flex-1 justify-end">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="w-8 h-8 rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 ml-4">
                  <div className="text-center">
                    <Skeleton className="h-6 w-12 mb-2" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </div>
          ))
        ) : matches && matches.length > 0 ? (
          matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <div className="text-gray-400 text-4xl mb-4">{icon}</div>
              <p className="text-gray-600 text-lg font-medium">No matches available</p>
              <p className="text-gray-500 text-sm mt-1">Check back later for updates</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
