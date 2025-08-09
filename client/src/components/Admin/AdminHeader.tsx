import { LogOut, Menu, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'wouter';

interface AdminHeaderProps {
  title: string;
  onMenuToggle?: () => void;
}

export function AdminHeader({ title, onMenuToggle }: AdminHeaderProps) {
  const { currentUser, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      setLocation('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleViewWebsite = () => {
    window.open('/', '_blank');
  };

  return (
    <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center space-x-4">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        <h1 className="text-lg lg:text-xl font-semibold text-primary">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-2 lg:space-x-4">
        <span className="hidden sm:block text-sm lg:text-base text-gray-600">
          Welcome, {currentUser?.email?.split('@')[0] || 'Admin'}
        </span>
        <Button
          onClick={handleViewWebsite}
          variant="outline"
          size="sm"
        >
          <Eye className="w-4 h-4 mr-0 lg:mr-2" />
          <span className="hidden lg:inline">View Site</span>
        </Button>
        <Button
          onClick={handleLogout}
          variant="destructive"
          size="sm"
        >
          <LogOut className="w-4 h-4 mr-0 lg:mr-2" />
          <span className="hidden lg:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
