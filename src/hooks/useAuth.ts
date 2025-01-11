import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    token: null
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    setState({
      isAuthenticated: !!token,
      isLoading: false,
      token
    });
  }, []);

  const login = (password: string) => {
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      const token = 'your-jwt-token'; // In a real app, this would be a JWT from your server
      localStorage.setItem('token', token);
      setState({
        isAuthenticated: true,
        isLoading: false,
        token
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setState({
      isAuthenticated: false,
      isLoading: false,
      token: null
    });
  };

  return {
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    token: state.token,
    login,
    logout
  };
} 