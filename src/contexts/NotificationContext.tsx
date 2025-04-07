
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { toast } from 'sonner';

export type NotificationType = 'signup' | 'login' | 'tree' | 'profile' | 'comment';

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
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
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
  }
];

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
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
    const intervalId = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to receive a notification
        const randomEvent = mockRealtimeEvents[Math.floor(Math.random() * mockRealtimeEvents.length)];
        addNotification(randomEvent);
      }
    }, 45000); // Check every 45 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAllAsRead,
        markAsRead,
        clearNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
