
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminAuthContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

// In a real application, these would be stored in a database
const ADMIN_CREDENTIALS = {
  admin: 'admin123',
  superuser: 'super123'
};

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  // Check if admin was previously logged in
  const [isAdmin, setIsAdmin] = useState(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    return savedAuth === 'true';
  });

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if credentials match
    if (ADMIN_CREDENTIALS[username as keyof typeof ADMIN_CREDENTIALS] === password) {
      setIsAdmin(true);
      localStorage.setItem('adminAuth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('adminAuth');
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
