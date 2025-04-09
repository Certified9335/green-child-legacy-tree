
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ActivityLogProps {
  limit?: number;
}

// These would come from a real database in a production app
const activities = [
  { 
    id: '1', 
    action: 'Tree Planted', 
    user: 'Emma Johnson', 
    details: 'Planted an Oak tree', 
    timestamp: new Date(2025, 3, 8, 14, 32), 
    type: 'tree' 
  },
  { 
    id: '2', 
    action: 'Donation Received', 
    user: 'Michael Chen', 
    details: 'Donated $100', 
    timestamp: new Date(2025, 3, 8, 13, 15), 
    type: 'donation' 
  },
  { 
    id: '3', 
    action: 'New User', 
    user: 'Sarah Williams', 
    details: 'Created an account', 
    timestamp: new Date(2025, 3, 8, 10, 45), 
    type: 'user' 
  },
  { 
    id: '4', 
    action: 'Contact Message', 
    user: 'Robert Garcia', 
    details: 'Sent a sponsorship inquiry', 
    timestamp: new Date(2025, 3, 7, 16, 22), 
    type: 'contact' 
  },
  { 
    id: '5', 
    action: 'Tree Update', 
    user: 'Lisa Taylor', 
    details: 'Updated growth status of Pine tree', 
    timestamp: new Date(2025, 3, 7, 9, 10), 
    type: 'tree' 
  },
  { 
    id: '6', 
    action: 'Donation Received', 
    user: 'David Miller', 
    details: 'Donated $250', 
    timestamp: new Date(2025, 3, 6, 15, 30), 
    type: 'donation' 
  },
  { 
    id: '7', 
    action: 'Contact Validation', 
    user: 'Admin User', 
    details: 'Validated sponsor "EcoFriends Inc."', 
    timestamp: new Date(2025, 3, 6, 14, 15), 
    type: 'admin' 
  },
  { 
    id: '8', 
    action: 'New Project', 
    user: 'Admin User', 
    details: 'Created "Urban Forest Initiative"', 
    timestamp: new Date(2025, 3, 6, 11, 45), 
    type: 'admin' 
  },
  { 
    id: '9', 
    action: 'Login', 
    user: 'James Wilson', 
    details: 'User login', 
    timestamp: new Date(2025, 3, 5, 9, 30), 
    type: 'user' 
  },
  { 
    id: '10', 
    action: 'Tree Planted', 
    user: 'Olivia Brown', 
    details: 'Planted a Maple tree', 
    timestamp: new Date(2025, 3, 5, 8, 45), 
    type: 'tree' 
  },
];

const getActivityBadgeColor = (type: string) => {
  switch (type) {
    case 'tree':
      return 'bg-green-100 text-green-800';
    case 'donation':
      return 'bg-purple-100 text-purple-800';
    case 'user':
      return 'bg-blue-100 text-blue-800';
    case 'contact':
      return 'bg-amber-100 text-amber-800';
    case 'admin':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ActivityLog: React.FC<ActivityLogProps> = ({ limit }) => {
  const displayActivities = limit ? activities.slice(0, limit) : activities;
  
  return (
    <Table>
      <TableCaption>Activity log showing recent user interactions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Activity</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayActivities.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell className="font-medium">{activity.action}</TableCell>
            <TableCell>{activity.user}</TableCell>
            <TableCell>{activity.details}</TableCell>
            <TableCell>
              {activity.timestamp.toLocaleString('en-US', { 
                dateStyle: 'medium',
                timeStyle: 'short' 
              })}
            </TableCell>
            <TableCell>
              <Badge className={getActivityBadgeColor(activity.type)}>
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ActivityLog;
