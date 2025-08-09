import { useState } from 'react';
import { AdminSidebar } from '@/components/Admin/AdminSidebar';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { MatchForm } from '@/components/Admin/MatchForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateMatch } from '@/hooks/useMatches';
import { CreateMatchData } from '@/types/match';
import { useLocation } from 'wouter';

export default function AddMatch() {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const createMatch = useCreateMatch();

  const handleSubmit = (data: CreateMatchData) => {
    createMatch.mutate(data, {
      onSuccess: () => {
        setLocation('/admin/dashboard');
      },
    });
  };

  const handleCancel = () => {
    setLocation('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-gray-100 flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          title="Add New Match" 
          onMenuToggle={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Card className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">Create New Match</CardTitle>
            </CardHeader>
            <CardContent>
              <MatchForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLoading={createMatch.isPending}
              />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
