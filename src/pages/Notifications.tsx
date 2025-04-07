
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import NotificationItem from '@/components/notifications/NotificationItem';
import { useNotifications, NotificationType } from '@/contexts/NotificationContext';
import { motion } from 'framer-motion';

const Notifications = () => {
  const { notifications, clearNotifications, markAllAsRead } = useNotifications();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);
  
  // Update filtered notifications when the tab changes or notifications update
  useEffect(() => {
    setFilteredNotifications(
      activeTab === 'all' 
        ? notifications 
        : notifications.filter(notification => notification.type === activeTab)
    );
  }, [activeTab, notifications]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-muted/30 py-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold font-display text-eco-green-dark">
                Notifications
              </h1>
              
              <div className="flex items-center gap-3">
                {notifications.length > 0 && (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={markAllAsRead}
                      className="text-sm"
                    >
                      Mark All Read
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={clearNotifications}
                      className="text-sm"
                    >
                      Clear All
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <div className="px-4 pt-4 overflow-x-auto">
                  <TabsList className="w-full md:w-auto">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="signup">Sign Ups</TabsTrigger>
                    <TabsTrigger value="login">Logins</TabsTrigger>
                    <TabsTrigger value="tree">Trees</TabsTrigger>
                    <TabsTrigger value="profile">Profiles</TabsTrigger>
                    <TabsTrigger value="comment">Comments</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value={activeTab} className="mt-0">
                  <div className="divide-y">
                    {filteredNotifications.length > 0 ? (
                      filteredNotifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <NotificationItem 
                            notification={notification} 
                          />
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-muted-foreground">No notifications to display.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Notifications;
