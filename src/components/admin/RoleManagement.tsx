
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle2, XCircle, UserCog, UserPlus } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
}

interface RoleManagementProps {
  onAction: (action: string, item: string) => void;
}

const RoleManagement: React.FC<RoleManagementProps> = ({ onAction }) => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', verified: true },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin', verified: true },
    { id: '3', name: 'Michael Johnson', email: 'michael@example.com', role: 'user', verified: false },
    { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'moderator', verified: true },
    { id: '5', name: 'David Brown', email: 'david@example.com', role: 'superuser', verified: true }
  ]);

  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
  const { toast } = useToast();
  const { currentAdmin } = useAdminAuth();

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    onAction('Updated role for', 'user');
    
    toast({
      title: "Role updated",
      description: `User role has been updated to ${newRole}`,
    });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields",
      });
      return;
    }

    const newId = (users.length + 1).toString();
    setUsers([...users, {
      id: newId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      verified: false
    }]);

    setNewUser({ name: '', email: '', role: 'user' });
    setIsAddUserDialogOpen(false);
    onAction('Added new', 'user');

    toast({
      title: "User added",
      description: "New user has been added successfully",
    });
  };

  const handleRemoveUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    onAction('Removed', 'user');
    
    toast({
      title: "User removed",
      description: "User has been removed successfully",
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-blue-100 text-blue-800';
      case 'moderator': return 'bg-green-100 text-green-800';
      case 'superuser': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Role Management</h2>
        <Button 
          onClick={() => setIsAddUserDialogOpen(true)}
          className="flex items-center gap-2 bg-eco-green hover:bg-eco-green-dark"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add New User</span>
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableCaption>All users and their roles in the system</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge className={getRoleColor(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.verified ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle2 className="h-4 w-4 mr-1" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center text-amber-600">
                      <XCircle className="h-4 w-4 mr-1" /> Pending
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="text-xs border rounded p-1"
                      disabled={currentAdmin?.role !== 'superuser' && user.role === 'superuser'}
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                      <option value="superuser">Superuser</option>
                    </select>
                    
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleRemoveUser(user.id)}
                      disabled={currentAdmin?.role !== 'superuser' && user.role === 'superuser'}
                    >
                      Remove
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Add a new user to the system and assign their role.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={newUser.name} 
                onChange={e => setNewUser({...newUser, name: e.target.value})}
                placeholder="Enter user's full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={newUser.email} 
                onChange={e => setNewUser({...newUser, email: e.target.value})}
                placeholder="Enter user's email address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select 
                id="role"
                className="w-full p-2 border rounded"
                value={newUser.role}
                onChange={e => setNewUser({...newUser, role: e.target.value})}
              >
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
                {currentAdmin?.role === 'superuser' && (
                  <option value="superuser">Superuser</option>
                )}
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
