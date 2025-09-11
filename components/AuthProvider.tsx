import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRef } from 'react';
import { supabase, User } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted.current) {
        setSession(session);
        if (session?.user) {
          loadUserProfile(session.user.id);
        } else {
          setIsLoading(false);
        }
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted.current) return;
        
        setSession(session);
        
        if (session?.user) {
          await loadUserProfile(session.user.id);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    return () => {
      isMounted.current = false;
      subscription.unsubscribe();
    };
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (!error && profile && isMounted.current) {
        const userData: User = {
          id: userId,
          email: session?.user?.email || '',
          profile,
        };
        setUser(userData);
      } else if (isMounted.current) {
        // User exists but no profile (needs onboarding)
        const userData: User = {
          id: userId,
          email: session?.user?.email || '',
        };
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      if (isMounted.current) {
        setUser(null);
        setSession(null);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    signOut,
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