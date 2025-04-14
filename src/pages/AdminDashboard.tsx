
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import AppLayout from '@/components/layout/AppLayout';
import ProjectManagement from '@/components/admin/ProjectManagement';
import UserManagement from '@/components/admin/UserManagement';
import ContactManagement from '@/components/admin/ContactManagement';
import DonationManagement from '@/components/admin/DonationManagement';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useActivityLog } from '@/contexts/ActivityLogContext';
import ActivityLog from '@/components/admin/ActivityLog';
import AdminRolesTab from '@/components/admin/AdminRolesTab';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';
import DashboardOverview from '@/components/admin/DashboardOverview';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  const { logout, currentAdmin } = useAdminAuth();
  const { activities, addActivity } = useActivityLog();

  // Calculate metrics for the dashboard
  const todayActivities = activities.filter(
    a => a.timestamp.toDateString() === new Date().toDateString()
  ).length;
  
  const activityByType = activities.reduce((acc, activity) => {
    acc[activity.type] = (acc[activity.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleAction = (action: string, item: string) => {
    // Log admin action
    addActivity({
      action: action,
      user: currentAdmin?.username || 'Admin',
      details: `Admin ${action.toLowerCase()} ${item}`,
      type: 'admin'
    });
    
    toast({
      title: `${action} successful`,
      description: `You have ${action.toLowerCase()} ${item} successfully.`,
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // For demo purposes, simulate some random activity
  useEffect(() => {
    const activities = [
      { action: "Tree Planted", user: "New Member", details: "Planted a Pine tree", type: "tree" },
      { action: "Donation Received", user: "Eco Supporter", details: "Donated $50", type: "donation" },
      { action: "New Sign Up", user: "Environmental Enthusiast", details: "Created a new account", type: "user" }
    ];
    
    // Add random activity every 45-90 seconds
    const intervalId = setInterval(() => {
      if (Math.random() > 0.6) { // 40% chance
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        addActivity(randomActivity);
        
        // Show toast for new activity
        toast({
          title: "New Activity",
          description: `${randomActivity.action} by ${randomActivity.user}`,
        });
      }
    }, Math.random() * 45000 + 45000);
    
    return () => clearInterval(intervalId);
  }, [addActivity, toast]);

  return (
    <AppLayout>
      <div className="container mx-auto py-6">
        <AdminHeader currentAdmin={currentAdmin} logout={logout} />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <AdminTabs activeTab={activeTab} onChange={handleTabChange} />

          <TabsContent value="overview">
            <DashboardOverview 
              todayActivities={todayActivities} 
              activityByType={activityByType} 
            />
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectManagement onAction={handleAction} />
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement onAction={handleAction} />
          </TabsContent>
          
          <TabsContent value="roles">
            <AdminRolesTab onAction={handleAction} />
          </TabsContent>
          
          <TabsContent value="contacts">
            <ContactManagement onAction={handleAction} />
          </TabsContent>
          
          <TabsContent value="donations">
            <DonationManagement onAction={handleAction} />
          </TabsContent>
          
          <TabsContent value="activity">
            <div className="bg-white p-6 rounded-lg shadow">
              <ActivityLog />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
