
import React, { useMemo } from 'react';
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
import { Button } from "@/components/ui/button";
import { Trash2, Download } from "lucide-react";
import { useActivityLog } from '@/contexts/ActivityLogContext';
import { useToast } from '@/hooks/use-toast';

interface ActivityLogProps {
  limit?: number;
}

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
  const { activities, clearActivities } = useActivityLog();
  const { toast } = useToast();
  
  // Filter activities based on limit if provided
  const displayActivities = useMemo(() => {
    return limit ? activities.slice(0, limit) : activities;
  }, [activities, limit]);
  
  const handleClearLog = () => {
    if (confirm("Are you sure you want to clear the activity log?")) {
      clearActivities();
      toast({
        title: "Activity log cleared",
        description: "All activity records have been removed."
      });
    }
  };

  const handleExportLog = () => {
    // Create CSV content
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Activity,User,Details,Date & Time,Type\n"
      + activities.map(a => {
          return `"${a.action}","${a.user}","${a.details}","${a.timestamp.toLocaleString()}","${a.type}"`;
        }).join("\n");
    
    // Create download link and trigger click
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `activity-log-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Log exported",
      description: "Activity log has been exported as CSV."
    });
  };
  
  return (
    <div>
      {!limit && (
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">System Activity Log</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleExportLog}
            >
              <Download className="h-4 w-4" />
              Export Log
            </Button>
            <Button 
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-2"
              onClick={handleClearLog}
            >
              <Trash2 className="h-4 w-4" />
              Clear Log
            </Button>
          </div>
        </div>
      )}
      
      {displayActivities.length > 0 ? (
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
      ) : (
        <div className="py-8 text-center bg-muted rounded-md">
          <p className="text-muted-foreground">No activity records found</p>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
