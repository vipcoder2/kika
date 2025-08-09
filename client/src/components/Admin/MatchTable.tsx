import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Match } from '@/types/match';
import { cn } from '@/lib/utils';

interface MatchTableProps {
  matches: Match[];
  onEdit: (match: Match) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export function MatchTable({ matches, onEdit, onDelete, isLoading }: MatchTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE':
        return 'bg-green-100 text-green-800';
      case 'FT':
        return 'bg-gray-100 text-gray-800';
      case 'Upcoming':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-4xl mb-4">📋</div>
        <p className="text-gray-600 text-lg font-medium">No matches found</p>
        <p className="text-gray-500 text-sm mt-1">Create your first match to get started</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile view */}
      <div className="lg:hidden space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="border rounded-lg p-4 bg-white">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium text-gray-900 text-sm mb-1">
                  {match.clubs.home.name} vs {match.clubs.away.name}
                </div>
                <div className="text-xs text-gray-500">{match.competition.name}</div>
              </div>
              <Badge className={cn('text-xs', getStatusColor(match.score.status))}>
                {match.score.status}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm">
                <div className="font-medium">
                  {match.score.home} - {match.score.away}
                </div>
                <div className="text-xs text-gray-500">
                  {match.kickoff.date} {match.kickoff.time}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={() => onEdit(match)}
                  size="sm"
                  variant="outline"
                  disabled={isLoading}
                >
                  <Pencil className="w-3 h-3" />
                </Button>
                <Button
                  onClick={() => onDelete(match.id)}
                  size="sm"
                  variant="destructive"
                  disabled={isLoading}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Match</TableHead>
              <TableHead>Competition</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((match) => (
              <TableRow key={match.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        {match.clubs.home.name}
                      </span>
                      <span className="text-gray-400">vs</span>
                      <span className="font-medium text-gray-900">
                        {match.clubs.away.name}
                      </span>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <span className="text-sm text-gray-900">
                    {match.competition.name}
                  </span>
                </TableCell>
                
                <TableCell>
                  <Badge
                    className={cn(
                      'text-xs font-medium',
                      getStatusColor(match.score.status)
                    )}
                  >
                    {match.score.status}
                  </Badge>
                  {match.score.type === 'HOT' && (
                    <Badge className="ml-2 bg-red-100 text-red-800 text-xs">
                      HOT
                    </Badge>
                  )}
                </TableCell>
                
                <TableCell>
                  {match.score.status === 'Upcoming' ? (
                    <span className="text-sm text-gray-500">-</span>
                  ) : (
                    <span className="text-sm text-gray-900 font-medium">
                      {match.score.home} - {match.score.away}
                    </span>
                  )}
                </TableCell>
                
                <TableCell>
                  <div className="text-sm">
                    <div className="text-gray-900">{match.kickoff.date}</div>
                    <div className="text-gray-500">{match.kickoff.time}</div>
                  </div>
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit(match)}
                      disabled={isLoading}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(match.id)}
                      disabled={isLoading}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
