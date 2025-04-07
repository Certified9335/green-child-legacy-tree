
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";
import { Donation } from '@/types/project';

interface DonationManagementProps {
  onAction: (action: string, item: string) => void;
}

const DonationManagement: React.FC<DonationManagementProps> = ({ onAction }) => {
  // Mock donations data - would be fetched from API in a real app
  const [donations, setDonations] = useState<Donation[]>([
    { 
      id: '1', 
      amount: 100,
      currency: 'USD',
      donorName: 'John Doe', 
      donorEmail: 'john@example.com',
      projectId: '12345',
      status: 'completed',
      paymentMethod: 'credit_card',
      createdAt: new Date(2023, 3, 15)
    },
    { 
      id: '2', 
      amount: 50,
      currency: 'EUR',
      donorName: 'Jane Smith', 
      donorEmail: 'jane@example.com',
      projectId: '12345',
      status: 'completed',
      paymentMethod: 'paypal',
      createdAt: new Date(2023, 3, 18)
    },
    { 
      id: '3', 
      amount: 75,
      currency: 'GBP',
      donorName: 'Michael Johnson', 
      donorEmail: 'michael@example.com',
      status: 'pending',
      paymentMethod: 'mpesa',
      createdAt: new Date(2023, 3, 20)
    },
    { 
      id: '4', 
      amount: 200,
      currency: 'USD',
      donorName: 'Sarah Williams', 
      donorEmail: 'sarah@example.com',
      projectId: '67890',
      status: 'failed',
      paymentMethod: 'bank_transfer',
      createdAt: new Date(2023, 3, 22)
    }
  ]);
  
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');

  const filteredDonations = filter === 'all' 
    ? donations 
    : donations.filter(donation => donation.status === filter);

  const totalAmount = filteredDonations.reduce((sum, donation) => {
    // Only count completed donations
    if (donation.status === 'completed') {
      // Simple conversion to USD for display purposes
      let usdAmount = donation.amount;
      if (donation.currency === 'EUR') usdAmount *= 1.1;
      if (donation.currency === 'GBP') usdAmount *= 1.25;
      
      return sum + usdAmount;
    }
    return sum;
  }, 0);

  const handleExportData = () => {
    onAction('Exported', 'donation data');
  };

  const handleViewDetails = (id: string) => {
    onAction('Viewed', `donation details for ID ${id}`);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Donation Management</h2>
        <Button 
          className="bg-eco-green hover:bg-eco-green-dark flex items-center gap-2"
          onClick={handleExportData}
        >
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-sm text-gray-500 mb-2">TOTAL DONATIONS</h3>
          <div className="text-3xl font-bold">{formatCurrency(totalAmount, 'USD')}</div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-sm text-gray-500 mb-2">DONORS</h3>
          <div className="text-3xl font-bold">{new Set(donations.map(d => d.donorEmail)).size}</div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold text-sm text-gray-500 mb-2">SUCCESSFUL TRANSACTIONS</h3>
          <div className="text-3xl font-bold">
            {donations.filter(d => d.status === 'completed').length}
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {(['all', 'completed', 'pending', 'failed'] as const).map((status) => (
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
          <TableCaption>List of all donations</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Donor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell className="font-medium">
                  <div>
                    <div>{donation.donorName}</div>
                    <div className="text-sm text-muted-foreground">{donation.donorEmail}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {formatCurrency(donation.amount, donation.currency)}
                </TableCell>
                <TableCell>
                  <Badge className="capitalize">
                    {donation.paymentMethod.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={`
                    ${donation.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                    ${donation.status === 'pending' ? 'bg-amber-100 text-amber-800' : ''}
                    ${donation.status === 'failed' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {donation.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {donation.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => handleViewDetails(donation.id)}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Details</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DonationManagement;
