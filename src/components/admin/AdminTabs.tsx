
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, Users, TreePine, MessageSquare, 
  HeartHandshake, LineChart, UserCog
} from "lucide-react";

interface AdminTabsProps {
  activeTab: string;
  onChange: (value: string) => void;
}

const AdminTabs: React.FC<AdminTabsProps> = ({ activeTab, onChange }) => {
  return (
    <TabsList className="grid grid-cols-7 mb-8">
      <TabsTrigger 
        value="overview" 
        className="flex items-center gap-2"
        onClick={() => onChange("overview")} 
        data-state={activeTab === "overview" ? "active" : ""}
      >
        <LineChart className="h-4 w-4" />
        <span>Overview</span>
      </TabsTrigger>
      <TabsTrigger 
        value="projects" 
        className="flex items-center gap-2"
        onClick={() => onChange("projects")}
        data-state={activeTab === "projects" ? "active" : ""}
      >
        <TreePine className="h-4 w-4" />
        <span>Projects</span>
      </TabsTrigger>
      <TabsTrigger 
        value="users" 
        className="flex items-center gap-2"
        onClick={() => onChange("users")}
        data-state={activeTab === "users" ? "active" : ""}
      >
        <Users className="h-4 w-4" />
        <span>Users</span>
      </TabsTrigger>
      <TabsTrigger 
        value="roles" 
        className="flex items-center gap-2"
        onClick={() => onChange("roles")}
        data-state={activeTab === "roles" ? "active" : ""}
      >
        <UserCog className="h-4 w-4" />
        <span>Roles</span>
      </TabsTrigger>
      <TabsTrigger 
        value="contacts" 
        className="flex items-center gap-2"
        onClick={() => onChange("contacts")}
        data-state={activeTab === "contacts" ? "active" : ""}
      >
        <MessageSquare className="h-4 w-4" />
        <span>Contacts</span>
      </TabsTrigger>
      <TabsTrigger 
        value="donations" 
        className="flex items-center gap-2"
        onClick={() => onChange("donations")}
        data-state={activeTab === "donations" ? "active" : ""}
      >
        <HeartHandshake className="h-4 w-4" />
        <span>Donations</span>
      </TabsTrigger>
      <TabsTrigger 
        value="activity" 
        className="flex items-center gap-2"
        onClick={() => onChange("activity")}
        data-state={activeTab === "activity" ? "active" : ""}
      >
        <LineChart className="h-4 w-4" />
        <span>Activity</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default AdminTabs;
