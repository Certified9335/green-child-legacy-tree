
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from '@/components/layout/AppLayout';
import { 
  Shield, Users, TreePine, MessageSquare, 
  HeartHandshake, LineChart 
} from "lucide-react";
import ProjectManagement from '@/components/admin/ProjectManagement';
import UserManagement from '@/components/admin/UserManagement';
import ContactManagement from '@/components/admin/ContactManagement';
import DonationManagement from '@/components/admin/DonationManagement';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  // This would typically be checked against an authenticated user's role
  const isAuthorized = true; // Replace with actual auth check

  if (!isAuthorized) {
    return (
      <AppLayout>
        <div className="container mx-auto py-10 text-center">
          <Shield className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>You do not have permission to view this page. Please contact an administrator.</p>
        </div>
      </AppLayout>
    );
  }

  const handleAction = (action: string, item: string) => {
    toast({
      title: `${action} successful`,
      description: `You have ${action.toLowerCase()} ${item} successfully.`,
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Shield className="mr-2 h-6 w-6 text-eco-green" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
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
                <ul className="divide-y">
                  <li className="py-3">New project request: "Urban Greening Initiative" - 2 hours ago</li>
                  <li className="py-3">New donation: $250 by John Doe - 5 hours ago</li>
                  <li className="py-3">New user registration: sarah@example.com - 1 day ago</li>
                </ul>
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
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
