
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'superuser' | 'moderator';
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAdmin, currentAdmin } = useAdminAuth();
  const { toast } = useToast();

  // Basic admin check
  if (!isAdmin) {
    toast({
      variant: "destructive",
      title: "Access denied",
      description: "You need to be authenticated as an admin to access this page.",
    });
    
    return <Navigate to="/admin-login" replace />;
  }

  // Additional role check if requiredRole is specified
  if (requiredRole && currentAdmin?.role !== requiredRole) {
    if (
      // Allow superusers to access admin and moderator pages
      !(currentAdmin?.role === 'superuser' && 
        (requiredRole === 'admin' || requiredRole === 'moderator'))
    ) {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: `You need ${requiredRole} privileges to access this page.`,
      });
      
      return <Navigate to="/admin" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
