import { useRoute } from 'wouter';
import { AdminSidebar } from '@/components/Admin/AdminSidebar';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { MatchForm } from '@/components/Admin/MatchForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMatch, useUpdateMatch } from '@/hooks/useMatches';
import { CreateMatchData, UpdateMatchData } from '@/types/match';
import { useLocation } from 'wouter';

export default function EditMatch() {
  const [, params] = useRoute('/admin/edit-match/:id');
  const [, setLocation] = useLocation();
  const matchId = params?.id;

  const { data: match, isLoading: matchLoading } = useMatch(matchId || '');
  const updateMatch = useUpdateMatch();

  const handleSubmit = (data: CreateMatchData) => {
    if (!matchId) return;
    
    const updateData: UpdateMatchData = {
      id: matchId,
      ...data,
    };
    
    updateMatch.mutate(updateData, {
      onSuccess: () => {
        setLocation('/admin/dashboard');
      },
    });
  };

  const handleCancel = () => {
    setLocation('/admin/dashboard');
  };

  if (matchLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading match details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">Match not found</p>
            <button
              onClick={handleCancel}
              className="text-secondary hover:underline"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Edit Match" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>
                Edit Match: {match.clubs.home.name} vs {match.clubs.away.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MatchForm
                match={match}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLoading={updateMatch.isPending}
              />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
