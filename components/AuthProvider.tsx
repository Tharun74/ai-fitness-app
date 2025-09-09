import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRef } from 'react';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    checkAuthState();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const checkAuthState = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      const userData = await SecureStore.getItemAsync('userData');
      
      if (token && userData) {
        if (isMounted.current) {
          setUser(JSON.parse(userData));
        }
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (isMounted.current) {
        setIsLoading(true);
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
      };
      
      const mockToken = 'mock_jwt_token';
      
      await SecureStore.setItemAsync('authToken', mockToken);
      await SecureStore.setItemAsync('userData', JSON.stringify(mockUser));
      
      if (isMounted.current) {
        setUser(mockUser);
      }
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      if (isMounted.current) {
        setIsLoading(true);
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const mockUser: User = {
        id: '1',
        email,
        name,
      };
      
      const mockToken = 'mock_jwt_token';
      
      await SecureStore.setItemAsync('authToken', mockToken);
      await SecureStore.setItemAsync('userData', JSON.stringify(mockUser));
      
      if (isMounted.current) {
        setUser(mockUser);
      }
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('userData');
      if (isMounted.current) {
        setUser(null);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};