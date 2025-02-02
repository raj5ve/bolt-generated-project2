import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../store/useAuthStore';
import { getCurrentUser } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { setUser, logout } = useAuthStore();

  const { data: user, isLoading } = useQuery(['currentUser'], getCurrentUser, {
    onError: () => {
      logout();
      navigate('/login');
    },
    onSuccess: (data) => {
      setUser(data);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
