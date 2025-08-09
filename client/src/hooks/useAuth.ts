import { useAuthContext } from '@/contexts/AuthContext';

export function useAuth() {
  const { currentUser, login, logout, loading } = useAuthContext();

  return {
    user: currentUser,
    currentUser,
    login,
    logout,
    loading,
    isAuthenticated: !!currentUser,
  };
}