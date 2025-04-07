
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { User, TreeDeciduous, UserCheck, Bell } from 'lucide-react';
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
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getBgColorByStatus = (read: boolean) => {
    return read ? 'bg-white' : 'bg-eco-green-light/10';
  };

  return (
    <div className={`w-full p-3 ${getBgColorByStatus(notification.read)}`}>
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
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
            <p className="text-sm font-medium leading-none">
              {notification.message}
            </p>
            <span className="ml-2 flex-shrink-0">
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
