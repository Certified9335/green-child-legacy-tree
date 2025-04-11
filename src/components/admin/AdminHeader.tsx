
import React from 'react';
import { Shield, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AdminUser {
  username: string;
  role: string;
}

interface AdminHeaderProps {
  currentAdmin: AdminUser | null;
  logout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ currentAdmin, logout }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin dashboard.",
    });
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <Shield className="mr-2 h-6 w-6 text-amber-500" />
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      
      {currentAdmin && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-3 py-1 rounded-full">
            <User className="h-4 w-4" />
            <span className="font-medium">{currentAdmin.username}</span>
            <span className="text-xs bg-amber-200 px-2 py-0.5 rounded-full">{currentAdmin.role}</span>
          </div>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminHeader;
