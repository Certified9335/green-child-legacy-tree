
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, Users, TreePine, MessageSquare, 
  HeartHandshake, LineChart, UserCog
} from "lucide-react";

interface AdminTabsProps {
  activeTab: string;
}

const AdminTabs: React.FC<AdminTabsProps> = ({ activeTab }) => {
  return (
    <TabsList className="grid grid-cols-7 mb-8">
      <TabsTrigger value="overview" className="flex items-center gap-2">
        <LineChart className="h-4 w-4" />
        <span>Overview</span>
      </TabsTrigger>
      <TabsTrigger value="projects" className="flex items-center gap-2">
        <TreePine className="h-4 w-4" />
        <span>Projects</span>
      </TabsTrigger>
      <TabsTrigger value="users" className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        <span>Users</span>
      </TabsTrigger>
      <TabsTrigger value="roles" className="flex items-center gap-2">
        <UserCog className="h-4 w-4" />
        <span>Roles</span>
      </TabsTrigger>
      <TabsTrigger value="contacts" className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4" />
        <span>Contacts</span>
      </TabsTrigger>
      <TabsTrigger value="donations" className="flex items-center gap-2">
        <HeartHandshake className="h-4 w-4" />
        <span>Donations</span>
      </TabsTrigger>
      <TabsTrigger value="activity" className="flex items-center gap-2">
        <LineChart className="h-4 w-4" />
        <span>Activity</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default AdminTabs;
