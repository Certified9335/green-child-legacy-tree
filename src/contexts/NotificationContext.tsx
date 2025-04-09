
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { toast } from 'sonner';

export type NotificationType = 'signup' | 'login' | 'tree' | 'profile' | 'comment' | 'donation' | 'contact';

export interface Activity {
  id: string;
  action: string;
  user: string;
  details: string;
  timestamp: Date;
  type: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: Date;
  read: boolean;
  user?: {
    name: string;
    avatar?: string;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  activities: Activity[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  logActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

// Mock data for demo purposes - in a real app, this would come from a backend
const mockRealtimeEvents = [
  {
    type: 'signup' as NotificationType,
    message: 'Michael Chen just joined the community!',
    user: { name: 'Michael Chen' }
  },
  {
    type: 'tree' as NotificationType,
    message: 'Emma Thompson planted a new tree in London!',
    user: { name: 'Emma Thompson' }
  },
  {
    type: 'profile' as NotificationType,
    message: 'Alex Rodriguez updated their profile information.',
    user: { name: 'Alex Rodriguez' }
  },
  {
    type: 'login' as NotificationType,
    message: 'Sophie Wilson just logged in.',
    user: { name: 'Sophie Wilson' }
  },
  {
    type: 'comment' as NotificationType,
    message: 'James Brown commented on your tree update.',
    user: { name: 'James Brown' }
  },
  {
    type: 'donation' as NotificationType,
    message: 'Maria Gonzalez donated $50 to the Urban Forest project.',
    user: { name: 'Maria Gonzalez' }
  },
  {
    type: 'contact' as NotificationType,
    message: 'EcoTech Company requested sponsorship information.',
    user: { name: 'EcoTech Representative' }
  }
];

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast notification
    toast(notification.message, {
      description: `${new Date().toLocaleTimeString()}`,
      position: 'top-right'
    });

    // Also log it as an activity
    logActivity({
      action: notification.type.charAt(0).toUpperCase() + notification.type.slice(1),
      user: notification.user?.name || 'Anonymous User',
      details: notification.message,
      type: notification.type
    });
  };

  const logActivity = (activity: Omit<Activity, 'id' | 'timestamp'>) => {
    const newActivity = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    setActivities(prev => [newActivity, ...prev]);
    
    // In a real app, this would be sent to a backend API
    console.log('Activity logged:', newActivity);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Simulate receiving real-time notifications (for demo purposes)
  useEffect(() => {
    // Initial notification to show the system is active
    setTimeout(() => {
      const welcomeEvent = {
        type: 'profile' as NotificationType,
        message: 'Welcome to One Tree One Child! Your real-time notifications are active.',
        user: { name: 'System' }
      };
      addNotification(welcomeEvent);
    }, 3000);
    
    const intervalId = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to receive a notification
        const randomEvent = mockRealtimeEvents[Math.floor(Math.random() * mockRealtimeEvents.length)];
        addNotification(randomEvent);
      }
    }, 30000); // Check every 30 seconds for more frequent updates

    return () => clearInterval(intervalId);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        activities,
        unreadCount,
        addNotification,
        logActivity,
        markAllAsRead,
        markAsRead,
        clearNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
