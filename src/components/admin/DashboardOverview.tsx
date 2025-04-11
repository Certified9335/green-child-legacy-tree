
import React from 'react';
import { Card } from "@/components/ui/card";
import { LineChart } from "lucide-react";
import ActivityLog from '@/components/admin/ActivityLog';

interface DashboardOverviewProps {
  todayActivities: number;
  activityByType: Record<string, number>;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  todayActivities,
  activityByType
}) => {
  return (
    <>
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
    </>
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

export default DashboardOverview;
