import { useState } from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';
import { X, Trophy, Users, Circle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const leagues = [
  { id: 'epl', name: 'Premier League', active: true },
  { id: 'ucl', name: 'UEFA Champions League', active: false },
  { id: 'laliga', name: 'La Liga', active: false },
  { id: 'seriea', name: 'Serie A', active: false },
  { id: 'bundesliga', name: 'Bundesliga', active: false },
];

const teams = [
  { id: 'mancity', name: 'Manchester City', color: 'bg-blue-500' },
  { id: 'manunited', name: 'Manchester United', color: 'bg-red-500' },
  { id: 'chelsea', name: 'Chelsea', color: 'bg-blue-900' },
  { id: 'liverpool', name: 'Liverpool', color: 'bg-red-700' },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const isMobile = useIsMobile();

  // Hide sidebar on mobile by default
  if (isMobile && !isOpen) {
    return null;
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
          isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'lg:translate-x-0 lg:static lg:inset-0',
          !isMobile && 'hidden lg:block'
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.5 9.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-primary">KikaSports</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {/* Leagues Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center">
              <Trophy className="w-4 h-4 mr-2" />
              Leagues
            </h3>
            <ul className="space-y-2">
              {leagues.map((league) => (
                <li key={league.id}>
                  <Link
                    href={`/league/${league.id}`}
                    className="flex items-center space-x-3 text-gray-700 hover:text-secondary hover:bg-orange-50 rounded-lg px-3 py-2 transition-colors"
                  >
                    <Circle
                      className={cn(
                        'w-2 h-2',
                        league.active ? 'text-secondary' : 'text-gray-300'
                      )}
                      fill="currentColor"
                    />
                    <span>{league.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Teams Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Teams
            </h3>
            <ul className="space-y-2">
              {teams.map((team) => (
                <li key={team.id}>
                  <Link
                    href={`/team/${team.id}`}
                    className="flex items-center space-x-3 text-gray-700 hover:text-secondary hover:bg-orange-50 rounded-lg px-3 py-2 transition-colors"
                  >
                    <div className={cn('w-4 h-4 rounded-sm', team.color)} />
                    <span>{team.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
