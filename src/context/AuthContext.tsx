import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'student' | 'admin';

interface User {
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticating: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('campus_flow_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user', e);
        localStorage.removeItem('campus_flow_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    setIsAuthenticating(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      const trimmedEmail = email.trim();
      let role: UserRole | null = null;
      let name = '';

      if (trimmedEmail.endsWith('@vitstudent.ac.in')) {
        role = 'student';
        name = trimmedEmail.split('@')[0].charAt(0).toUpperCase() + trimmedEmail.split('@')[0].slice(1);
      } else if (trimmedEmail.endsWith('@vit.ac.in')) {
        role = 'admin';
        name = trimmedEmail.split('@')[0].charAt(0).toUpperCase() + trimmedEmail.split('@')[0].slice(1);
      }

      if (role) {
        const newUser = { email: trimmedEmail, role, name };
        setUser(newUser);
        localStorage.setItem('campus_flow_user', JSON.stringify(newUser));
        return true;
      }

      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campus_flow_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, isAuthenticating }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
