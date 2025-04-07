
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, MessageSquare } from "lucide-react";
import { Contact } from '@/types/project';

interface ContactManagementProps {
  onAction: (action: string, item: string) => void;
}

const ContactManagement: React.FC<ContactManagementProps> = ({ onAction }) => {
  // Mock contacts data - would be fetched from API in a real app
  const [contacts, setContacts] = useState<Contact[]>([
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'john@example.com', 
      phone: '+1234567890',
      message: 'I would like to sponsor a tree planting event in my city.',
      type: 'sponsor',
      status: 'pending',
      createdAt: new Date(2023, 3, 15)
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      email: 'jane@example.com',
      phone: '+0987654321', 
      message: 'I want to volunteer for the upcoming reforestation project.',
      type: 'volunteer',
      status: 'approved',
      createdAt: new Date(2023, 3, 18)
    },
    { 
      id: '3', 
      name: 'Michael Johnson', 
      email: 'michael@example.com',
      message: 'I would like to make a donation to support your cause.',
      type: 'donor',
      status: 'pending',
      createdAt: new Date(2023, 3, 20)
    }
  ]);
  
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredContacts = filter === 'all' 
    ? contacts 
    : contacts.filter(contact => contact.status === filter);

  const handleApprove = (id: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status: 'approved' } : contact
    ));
    onAction('Approved', 'contact');
  };

  const handleReject = (id: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status: 'rejected' } : contact
    ));
    onAction('Rejected', 'contact');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Contact Management</h2>
      </div>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
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
          <TableCaption>List of all contacts</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>
                  <Badge className={`
                    ${contact.type === 'sponsor' ? 'bg-purple-100 text-purple-800' : ''}
                    ${contact.type === 'donor' ? 'bg-green-100 text-green-800' : ''}
                    ${contact.type === 'volunteer' ? 'bg-blue-100 text-blue-800' : ''}
                    ${contact.type === 'individual' ? 'bg-gray-100 text-gray-800' : ''}
                  `}>
                    {contact.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={`
                    ${contact.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                    ${contact.status === 'pending' ? 'bg-amber-100 text-amber-800' : ''}
                    ${contact.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {contact.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {contact.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => onAction('View', 'message from ' + contact.name)}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>View</span>
                    </Button>
                    
                    {contact.status === 'pending' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200 flex items-center gap-1"
                          onClick={() => handleApprove(contact.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Approve</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 flex items-center gap-1"
                          onClick={() => handleReject(contact.id)}
                        >
                          <XCircle className="h-4 w-4" />
                          <span>Reject</span>
                        </Button>
                      </>
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

export default ContactManagement;
