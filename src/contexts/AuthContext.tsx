import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, MOCK_USERS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (accessCode: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (accessCode: string): Promise<boolean> => {
    try {
      const foundUser = MOCK_USERS.find(
        u => u.access_code.toUpperCase() === accessCode.toUpperCase()
      );

      if (!foundUser) {
        return false;
      }

      const updatedUser = {
        ...foundUser,
        last_login: new Date().toISOString()
      };

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
