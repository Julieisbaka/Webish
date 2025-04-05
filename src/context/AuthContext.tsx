import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  user: any;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=repo,user`;
  };

  const logout = () => {
    localStorage.removeItem('github_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('github_token');
    if (token) {
      setIsAuthenticated(true);
      // Fetch user data from GitHub API
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
