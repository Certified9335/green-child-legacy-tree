
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectStatus } from '@/types/project';
import { Clock, Activity, InboxIcon, Package, CheckCircle } from 'lucide-react';

interface ProjectStatusTabsProps {
  activeStatus: ProjectStatus;
  onStatusChange: (status: ProjectStatus) => void;
}

const ProjectStatusTabs: React.FC<ProjectStatusTabsProps> = ({ activeStatus, onStatusChange }) => {
  return (
    <Tabs value={activeStatus} onValueChange={(value) => onStatusChange(value as ProjectStatus)} className="mb-8">
      <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-3 md:grid-cols-6 h-auto gap-2">
        <TabsTrigger value="all" className="data-[state=active]:bg-muted">
          All Projects
        </TabsTrigger>
        <TabsTrigger value="upcoming" className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
          <Clock size={16} />
          <span className="hidden sm:inline">Upcoming</span>
        </TabsTrigger>
        <TabsTrigger value="ongoing" className="flex items-center gap-2 data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
          <Activity size={16} />
          <span className="hidden sm:inline">Ongoing</span>
        </TabsTrigger>
        <TabsTrigger value="requested" className="flex items-center gap-2 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700">
          <InboxIcon size={16} />
          <span className="hidden sm:inline">Requested</span>
        </TabsTrigger>
        <TabsTrigger value="onhand" className="flex items-center gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
          <Package size={16} />
          <span className="hidden sm:inline">On Hand</span>
        </TabsTrigger>
        <TabsTrigger value="completed" className="flex items-center gap-2 data-[state=active]:bg-eco-green-light/20 data-[state=active]:text-eco-green-dark">
          <CheckCircle size={16} />
          <span className="hidden sm:inline">Completed</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ProjectStatusTabs;
