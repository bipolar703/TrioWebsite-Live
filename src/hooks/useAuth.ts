import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CORRECT_PASSWORD = 'trioEnergy2025+123';
const AUTH_KEY = 'trio_energy_auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check auth status on mount and when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem(AUTH_KEY);
      setIsAuthenticated(authStatus === 'true');
      setIsLoading(false);
    };
    
    checkAuth();

    // Listen for storage changes (for multi-tab support)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const login = (password: string): boolean => {
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      
      // Get the redirect path from location state or default to /enjaz
      const from = location.state?.from?.pathname || '/enjaz';
      navigate(from, { replace: true });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return { isAuthenticated, isLoading, login, logout };
} 