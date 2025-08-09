import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'wouter';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      console.log('No user found, redirecting to login');
      setLocation('/admin/login');
    }
  }, [user, loading, setLocation]);

  if (loading) {
    console.log('Authentication loading...');
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('No authenticated user, showing null');
    return null;
  }

  console.log('User authenticated, rendering protected content');
  return <>{children}</>;
}
