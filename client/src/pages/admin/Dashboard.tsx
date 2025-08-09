import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminSidebar } from '@/components/Admin/AdminSidebar';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { StatsCards } from '@/components/Admin/StatsCards';
import { MatchTable } from '@/components/Admin/MatchTable';
import { MatchForm } from '@/components/Admin/MatchForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useMatches, useCreateMatch, useUpdateMatch, useDeleteMatch } from '@/hooks/useMatches';
import { Match, CreateMatchData, UpdateMatchData } from '@/types/match';

function Dashboard() {
  console.log('Dashboard component rendering...');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [deletingMatchId, setDeletingMatchId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: matches = [], isLoading: matchesLoading } = useMatches();
  const createMatch = useCreateMatch();
  const updateMatch = useUpdateMatch();
  const deleteMatch = useDeleteMatch();

  const handleCreateMatch = (data: CreateMatchData) => {
    createMatch.mutate(data, {
      onSuccess: () => {
        setIsAddModalOpen(false);
      },
    });
  };

  const handleUpdateMatch = (data: CreateMatchData) => {
    if (!editingMatch) return;
    
    const updateData: UpdateMatchData = {
      id: editingMatch.id,
      ...data,
    };
    
    updateMatch.mutate(updateData, {
      onSuccess: () => {
        setEditingMatch(null);
      },
    });
  };

  const handleDeleteMatch = () => {
    if (!deletingMatchId) return;
    
    deleteMatch.mutate(deletingMatchId, {
      onSuccess: () => {
        setDeletingMatchId(null);
      },
    });
  };

  const isLoading = matchesLoading || createMatch.isPending || updateMatch.isPending || deleteMatch.isPending;

  console.log('Dashboard render state:', { matches, matchesLoading, isLoading });

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-gray-100 flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          title="Match Management" 
          onMenuToggle={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          <StatsCards matches={matches} />
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-lg font-semibold text-primary mb-4 sm:mb-0">All Matches</h2>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-secondary hover:bg-orange-600 w-full sm:w-auto"
                disabled={isLoading}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Match
              </Button>
            </div>
            
            <MatchTable
              matches={matches}
              onEdit={setEditingMatch}
              onDelete={setDeletingMatchId}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>

      {/* Add Match Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Match</DialogTitle>
          </DialogHeader>
          <MatchForm
            onSubmit={handleCreateMatch}
            onCancel={() => setIsAddModalOpen(false)}
            isLoading={createMatch.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Match Modal */}
      <Dialog open={!!editingMatch} onOpenChange={() => setEditingMatch(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Match</DialogTitle>
          </DialogHeader>
          {editingMatch && (
            <MatchForm
              match={editingMatch}
              onSubmit={handleUpdateMatch}
              onCancel={() => setEditingMatch(null)}
              isLoading={updateMatch.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingMatchId} onOpenChange={() => setDeletingMatchId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the match and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMatch.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMatch}
              disabled={deleteMatch.isPending}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleteMatch.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Dashboard;
