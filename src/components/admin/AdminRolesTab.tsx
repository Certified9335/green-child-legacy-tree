
import React from 'react';
import { Card } from "@/components/ui/card";
import RoleManagement from './RoleManagement';
import { Shield, UserCog, LockKeyhole } from 'lucide-react';

interface AdminRolesTabProps {
  onAction: (action: string, item: string) => void;
}

const AdminRolesTab: React.FC<AdminRolesTabProps> = ({ onAction }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Admins</h3>
            <Shield className="text-blue-500 h-5 w-5" />
          </div>
          <div className="text-3xl font-bold">2</div>
          <p className="text-sm text-muted-foreground mt-2">Users with admin privileges</p>
        </Card>
        
        <Card className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Moderators</h3>
            <UserCog className="text-green-500 h-5 w-5" />
          </div>
          <div className="text-3xl font-bold">1</div>
          <p className="text-sm text-muted-foreground mt-2">Users with moderation capabilities</p>
        </Card>
        
        <Card className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Permission Sets</h3>
            <LockKeyhole className="text-amber-500 h-5 w-5" />
          </div>
          <div className="text-3xl font-bold">4</div>
          <p className="text-sm text-muted-foreground mt-2">Defined access control levels</p>
        </Card>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <RoleManagement onAction={onAction} />
      </div>
    </div>
  );
};

export default AdminRolesTab;
