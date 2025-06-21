import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<User>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user data', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    // Replace this with your actual authentication logic
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = {
            email,
            name: email.split('@')[0] // Use the part before @ as the name
          };
          
          // Use sessionStorage for non-persistent sessions, localStorage for persistent ones
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem('authToken', 'dummy-token');
          storage.setItem('user', JSON.stringify(userData));
          
          // Clear the other storage
          if (rememberMe) {
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('user');
          } else {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
          }
          
          setUser(userData);
          setIsAuthenticated(true);
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    // Clear all auth data from both storage types
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
