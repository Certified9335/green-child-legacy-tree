
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { User, TreeDeciduous, UserCheck, Bell, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Notification, NotificationType } from '@/contexts/NotificationContext';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const getIconByType = (type: NotificationType) => {
    switch (type) {
      case 'signup':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'login':
        return <UserCheck className="h-4 w-4 text-green-500" />;
      case 'tree':
        return <TreeDeciduous className="h-4 w-4 text-eco-green" />;
      case 'profile':
        return <User className="h-4 w-4 text-purple-500" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-amber-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getIconBgByType = (type: NotificationType) => {
    switch (type) {
      case 'signup':
        return 'bg-blue-50';
      case 'login':
        return 'bg-green-50';
      case 'tree':
        return 'bg-eco-green-light/20';
      case 'profile':
        return 'bg-purple-50';
      case 'comment':
        return 'bg-amber-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getBgColorByStatus = (read: boolean) => {
    return read ? 'bg-white' : 'bg-eco-green-light/10';
  };

  return (
    <div className={`w-full p-4 ${getBgColorByStatus(notification.read)} hover:bg-muted/20 transition-colors`}>
      <div className="flex items-start gap-3">
        <Avatar className="h-9 w-9 border">
          {notification.user?.avatar ? (
            <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
          ) : (
            <AvatarFallback className="bg-eco-green-light/20 text-eco-green-dark">
              {notification.user?.name.charAt(0).toUpperCase() || '?'}
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className="flex-1 space-y-1">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium leading-tight">
              {notification.message}
            </p>
            <span className={`ml-2 flex-shrink-0 p-1 rounded-full ${getIconBgByType(notification.type)}`}>
              {getIconByType(notification.type)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
