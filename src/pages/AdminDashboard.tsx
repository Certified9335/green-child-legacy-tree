
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from '@/components/layout/AppLayout';
import { 
  Shield, Users, TreePine, MessageSquare, 
  HeartHandshake, LineChart, LogOut, User
} from "lucide-react";
import ProjectManagement from '@/components/admin/ProjectManagement';
import UserManagement from '@/components/admin/UserManagement';
import ContactManagement from '@/components/admin/ContactManagement';
import DonationManagement from '@/components/admin/DonationManagement';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useActivityLog } from '@/contexts/ActivityLogContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ActivityLog from '@/components/admin/ActivityLog';
import { Card } from '@/components/ui/card';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  const { logout, currentAdmin } = useAdminAuth();
  const { activities, addActivity } = useActivityLog();
  const navigate = useNavigate();

  // Calculate metrics for the dashboard
  const recentActivities = activities.slice(0, 30); // Last 30 activities
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

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin dashboard.",
    });
    navigate('/');
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">Total Projects</h3>
                <div className="text-3xl font-bold">24</div>
              </Card>
              <Card className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">Total Users</h3>
                <div className="text-3xl font-bold">152</div>
              </Card>
              <Card className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">Total Donations</h3>
                <div className="text-3xl font-bold">$12,450</div>
              </Card>
              <Card className="p-6 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">Today's Activity</h3>
                <div className="text-3xl font-bold">{todayActivities}</div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="col-span-1 lg:col-span-2">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <div className="bg-white p-4 rounded-lg shadow">
                  <ActivityLog limit={5} />
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Activity by Type</h2>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="space-y-4">
                    {Object.entries(activityByType).map(([type, count]) => (
                      <div key={type} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${getTypeColor(type)}`}></div>
                          <span className="capitalize">{type}</span>
                        </div>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                    
                    {Object.keys(activityByType).length === 0 && (
                      <p className="text-muted-foreground text-center py-4">No activity data</p>
                    )}
                  </div>
                </div>
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
              <ActivityLog />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

// Helper function to get color based on activity type
const getTypeColor = (type: string): string => {
  switch (type) {
    case 'tree': return 'bg-green-500';
    case 'donation': return 'bg-purple-500';
    case 'user': return 'bg-blue-500';
    case 'contact': return 'bg-amber-500';
    case 'admin': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export default AdminDashboard;
