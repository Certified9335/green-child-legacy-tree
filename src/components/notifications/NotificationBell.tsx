
import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useNotifications } from '@/contexts/NotificationContext';
import NotificationItem from './NotificationItem';
import { Link } from 'react-router-dom';

const NotificationBell = () => {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const [isNewNotification, setIsNewNotification] = useState(false);

  // Add animation when new notifications arrive
  useEffect(() => {
    if (unreadCount > 0) {
      setIsNewNotification(true);
      const timer = setTimeout(() => setIsNewNotification(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [unreadCount]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && unreadCount > 0) {
      // Mark all as read when opening the dropdown
      setTimeout(() => markAllAsRead(), 2000);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={`relative p-2 ${isNewNotification ? 'animate-pulse' : ''}`} 
          aria-label="Notifications"
        >
          <Bell className={`h-5 w-5 ${isNewNotification ? 'text-eco-green' : ''}`} />
          {unreadCount > 0 && (
            <Badge 
              className={`absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] min-h-[1.25rem] flex items-center justify-center bg-eco-green text-white ${isNewNotification ? 'animate-bounce' : ''}`}
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {notifications.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto text-xs py-1 hover:bg-transparent hover:text-eco-green"
              onClick={() => markAllAsRead()}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {notifications.length > 0 ? (
          notifications.slice(0, 5).map(notification => (
            <DropdownMenuItem key={notification.id} className="p-0 focus:bg-transparent">
              <NotificationItem notification={notification} />
            </DropdownMenuItem>
          ))
        ) : (
          <div className="py-4 text-center text-sm text-muted-foreground">
            No new notifications
          </div>
        )}
        
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <Link to="/notifications" className="block">
              <DropdownMenuItem className="text-center text-sm text-eco-green hover:text-eco-green-dark cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
