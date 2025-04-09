
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useActivityLog } from './ActivityLogContext';

interface AdminUser {
  username: string;
  role: 'admin' | 'superuser';
  lastLogin: Date;
}

interface AdminAuthContextType {
  isAdmin: boolean;
  currentAdmin: AdminUser | null;
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
  admin: { password: 'admin123', role: 'admin' as const },
  superuser: { password: 'super123', role: 'superuser' as const }
};

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  // Check if admin was previously logged in
  const [isAdmin, setIsAdmin] = useState(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    return savedAuth === 'true';
  });

  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => {
    const savedAdminData = localStorage.getItem('adminData');
    return savedAdminData ? JSON.parse(savedAdminData) : null;
  });
  
  const { addActivity } = useActivityLog();

  useEffect(() => {
    // Log activity when admin logs in (on initial load if they were already logged in)
    if (isAdmin && currentAdmin && !localStorage.getItem('adminLoginLogged')) {
      addActivity({
        action: 'Admin Login',
        user: currentAdmin.username,
        details: `${currentAdmin.username} (${currentAdmin.role}) logged into admin dashboard`,
        type: 'admin'
      });
      localStorage.setItem('adminLoginLogged', 'true');
    }
  }, [isAdmin, currentAdmin, addActivity]);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if credentials match
    const adminInfo = ADMIN_CREDENTIALS[username as keyof typeof ADMIN_CREDENTIALS];
    
    if (adminInfo && adminInfo.password === password) {
      const adminUser: AdminUser = {
        username,
        role: adminInfo.role,
        lastLogin: new Date()
      };
      
      setIsAdmin(true);
      setCurrentAdmin(adminUser);
      
      // Save to localStorage
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminData', JSON.stringify(adminUser));
      
      // Log activity
      addActivity({
        action: 'Admin Login',
        user: username,
        details: `${username} (${adminInfo.role}) logged into admin dashboard`,
        type: 'admin'
      });
      localStorage.setItem('adminLoginLogged', 'true');
      
      return true;
    }
    return false;
  };

  const logout = () => {
    // Log activity before clearing admin data
    if (currentAdmin) {
      addActivity({
        action: 'Admin Logout',
        user: currentAdmin.username,
        details: `${currentAdmin.username} logged out from admin dashboard`,
        type: 'admin'
      });
    }
    
    setIsAdmin(false);
    setCurrentAdmin(null);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminData');
    localStorage.removeItem('adminLoginLogged');
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, currentAdmin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
