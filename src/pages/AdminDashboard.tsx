
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from '@/components/layout/AppLayout';
import { 
  Shield, Users, TreePine, MessageSquare, 
  HeartHandshake, LineChart, LogOut
} from "lucide-react";
import ProjectManagement from '@/components/admin/ProjectManagement';
import UserManagement from '@/components/admin/UserManagement';
import ContactManagement from '@/components/admin/ContactManagement';
import DonationManagement from '@/components/admin/DonationManagement';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ActivityLog from '@/components/admin/ActivityLog';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleAction = (action: string, item: string) => {
    toast({
      title: `${action} successful`,
      description: `You have ${action.toLowerCase()} ${item} successfully.`,
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin dashboard.",
    });
    navigate('/');
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Shield className="mr-2 h-6 w-6 text-eco-green" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <TreePine className="h-4 w-4" />
              <span>Projects</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Contacts</span>
            </TabsTrigger>
            <TabsTrigger value="donations" className="flex items-center gap-2">
              <HeartHandshake className="h-4 w-4" />
              <span>Donations</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span>Activity</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">Total Projects</h3>
                <div className="text-3xl font-bold">24</div>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">Total Users</h3>
                <div className="text-3xl font-bold">152</div>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">Total Donations</h3>
                <div className="text-3xl font-bold">$12,450</div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <div className="bg-white p-4 rounded-lg shadow">
                <ActivityLog limit={5} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectManagement onAction={handleAction} />
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement onAction={handleAction} />
          </TabsContent>
          
          <TabsContent value="contacts">
            <ContactManagement onAction={handleAction} />
          </TabsContent>
          
          <TabsContent value="donations">
            <DonationManagement onAction={handleAction} />
          </TabsContent>
          
          <TabsContent value="activity">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">System Activity Log</h2>
              <ActivityLog />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
