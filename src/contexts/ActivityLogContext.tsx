
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Activity } from '@/types/activity';

interface ActivityLogContextType {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  clearActivities: () => void;
}

const ActivityLogContext = createContext<ActivityLogContextType | undefined>(undefined);

export const useActivityLog = () => {
  const context = useContext(ActivityLogContext);
  if (!context) {
    throw new Error('useActivityLog must be used within an ActivityLogProvider');
  }
  return context;
};

interface ActivityLogProviderProps {
  children: ReactNode;
}

// Initial demo data
const initialActivities: Activity[] = [
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
];

export const ActivityLogProvider: React.FC<ActivityLogProviderProps> = ({ children }) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const addActivity = (activity: Omit<Activity, 'id' | 'timestamp'>) => {
    const newActivity = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    setActivities(prev => [newActivity, ...prev]);
  };

  const clearActivities = () => {
    setActivities([]);
  };

  return (
    <ActivityLogContext.Provider
      value={{
        activities,
        addActivity,
        clearActivities
      }}
    >
      {children}
    </ActivityLogContext.Provider>
  );
};
