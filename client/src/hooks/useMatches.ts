import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { matchService } from '@/services/matchService';
import { Match, CreateMatchData, UpdateMatchData } from '@/types/match';
import { useToast } from '@/hooks/use-toast';

export function useMatches() {
  return useQuery({
    queryKey: ['matches'],
    queryFn: matchService.getAllMatches,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useMatch(id: string) {
  return useQuery({
    queryKey: ['matches', id],
    queryFn: () => matchService.getMatchById(id),
    enabled: !!id,
  });
}

export function useHotMatches() {
  return useQuery({
    queryKey: ['matches', 'hot'],
    queryFn: matchService.getHotMatches,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useLiveMatches() {
  return useQuery({
    queryKey: ['matches', 'live'],
    queryFn: matchService.getLiveMatches,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useUpcomingMatches() {
  return useQuery({
    queryKey: ['matches', 'upcoming'],
    queryFn: matchService.getUpcomingMatches,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useFinishedMatches() {
  return useQuery({
    queryKey: ['matches', 'finished'],
    queryFn: matchService.getFinishedMatches,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useCreateMatch() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (matchData: CreateMatchData) => matchService.createMatch(matchData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      toast({
        title: 'Success',
        description: 'Match created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateMatch() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (matchData: UpdateMatchData) => matchService.updateMatch(matchData),
    onSuccess: (updatedMatch) => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      queryClient.setQueryData(['matches', updatedMatch.id], updatedMatch);
      toast({
        title: 'Success',
        description: 'Match updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteMatch() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => matchService.deleteMatch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      toast({
        title: 'Success',
        description: 'Match deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
