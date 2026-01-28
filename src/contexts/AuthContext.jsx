import { createContext, useContext, useEffect, useState } from 'react';
import { get } from '../lib/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch and refresh user profile from API
  const refreshUser = async () => {
    // Check both state and localStorage for token
    const token = accessToken || localStorage.getItem('accessToken');

    if (!token) {
      return { success: false, error: 'No token available' };
    }

    // BACKDOOR ADMIN LOGIN - DEVELOPMENT ONLY
    // ⚠️ SECURITY WARNING: Remove this before production deployment
    if (token.startsWith('backdoor_admin_token_')) {
      const backdoorUserStr = localStorage.getItem('backdoorUser');
      if (backdoorUserStr) {
        try {
          const backdoorUser = JSON.parse(backdoorUserStr);
          setAccessToken(token);
          setUser(backdoorUser);
          return { success: true, user: backdoorUser };
        } catch (e) {
          console.error('Error parsing backdoor user:', e);
        }
      }
    }

    // Update accessToken state if it's not set
    if (!accessToken) {
      setAccessToken(token);
    }

    try {
      const response = await get('/profile/');
      if (response.status === 200) {
        setUser(response.data);
        return { success: true, user: response.data };
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (error) {
      // Only log error if it's not a 401 (unauthorized)
      if (error.response?.status !== 401) {
        console.error('Error fetching user profile:', error);
      }
      // If profile fetch fails, clear token and user
      if (error.response?.status === 401) {
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('backdoorUser');
      }
      return { success: false, error: error.message };
    }
  };

  // Check for existing authentication on mount and fetch fresh user data
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('accessToken');

      if (storedToken) {
        setAccessToken(storedToken);
        await refreshUser();
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('backdoorUser'); // Clear backdoor user data
    // Use window.location for navigation to avoid Router dependency issues
    window.location.href = '/signin';
  };

  // Computed value for authentication status
  const isAuthenticated = !!accessToken && !!user;

  const value = {
    user,
    accessToken,
    loading: isLoading,
    logout,
    isAuthenticated,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
