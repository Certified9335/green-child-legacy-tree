
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Shield } from "lucide-react";
import { User } from '@/types/project';

interface UserManagementProps {
  onAction: (action: string, item: string) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ onAction }) => {
  // Mock user data - would be fetched from API in a real app
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', verified: true, joinedAt: new Date(2023, 1, 15) },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin', verified: true, joinedAt: new Date(2023, 2, 20) },
    { id: '3', name: 'Michael Johnson', email: 'michael@example.com', role: 'user', verified: false, joinedAt: new Date(2023, 3, 5) },
    { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'user', verified: true, joinedAt: new Date(2023, 4, 10) }
  ]);
  
  const [filter, setFilter] = useState<'all' | 'verified' | 'unverified'>('all');

  const filteredUsers = filter === 'all' 
    ? users 
    : filter === 'verified' 
      ? users.filter(user => user.verified) 
      : users.filter(user => !user.verified);

  const handleVerify = (id: string) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, verified: true } : user
    ));
    onAction('Verified', 'user');
  };

  const handleReject = (id: string) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, verified: false } : user
    ));
    onAction('Rejected', 'user verification');
  };

  const handleRoleChange = (id: string, newRole: 'user' | 'admin' | 'superuser') => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    ));
    onAction('Updated role for', 'user');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
      </div>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {(['all', 'verified', 'unverified'] as const).map((status) => (
            <Button 
              key={status}
              variant={filter === status ? "default" : "outline"}
              onClick={() => setFilter(status)}
              className={filter === status ? "bg-eco-green hover:bg-eco-green-dark" : ""}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableCaption>List of all users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge className={`
                      ${user.role === 'superuser' ? 'bg-purple-100 text-purple-800' : ''}
                      ${user.role === 'admin' ? 'bg-blue-100 text-blue-800' : ''}
                      ${user.role === 'user' ? 'bg-gray-100 text-gray-800' : ''}
                    `}>
                      {user.role}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        const newRole = user.role === 'user' ? 'admin' : 'user';
                        handleRoleChange(user.id, newRole);
                      }}
                    >
                      <Shield className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  {user.verified ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center text-amber-600">
                      <XCircle className="h-4 w-4 mr-1" /> Unverified
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {user.joinedAt.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {!user.verified ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200 flex items-center gap-1"
                        onClick={() => handleVerify(user.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Verify</span>
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 flex items-center gap-1"
                        onClick={() => handleReject(user.id)}
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Reject</span>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;
