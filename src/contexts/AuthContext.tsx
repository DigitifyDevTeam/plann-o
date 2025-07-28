import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'client' | 'professional' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isVerified?: boolean;
  profileComplete?: boolean;
  subscriptionStatus?: 'free' | 'premium' | 'expired';
  subscriptionType?: 'monthly' | 'annual';
  subscriptionEnd?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulation de la vérification de l'auth au démarrage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulation d'une API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock users pour démonstration
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'client@planneo.fr',
        name: 'Marie Dupont',
        role: 'client'
      },
      {
        id: '2',
        email: 'pro@planneo.fr',
        name: 'Dr. Jean Martin',
        role: 'professional',
        isVerified: true,
        profileComplete: true,
        subscriptionStatus: 'premium',
        subscriptionType: 'monthly',
        subscriptionEnd: '2024-08-15',
        avatar: 'https://randomuser.me/api/portraits/men/44.jpg'
      },
      {
        id: '3',
        email: 'admin@planneo.fr',
        name: 'Admin Plannéo',
        role: 'admin'
      }
    ];

    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulation d'une API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      isVerified: role === 'client', // Les clients sont auto-vérifiés
      profileComplete: false,
      subscriptionStatus: role === 'professional' ? 'free' : undefined
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateUser,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};