
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { processDonation } from '@/services/donationService';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';
import { useNotifications } from '@/contexts/NotificationContext';

const Donate = () => {
  const { user, profile } = useAuth();
  const [amount, setAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState(profile?.full_name || '');
  const [donorEmail, setDonorEmail] = useState(user?.email || '');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logActivity } = useNotifications();

  // Handle amount selection
  const handleAmountSelect = (value: string) => {
    if (value === 'custom') {
      setAmount(0);
    } else {
      setAmount(Number(value));
      setCustomAmount('');
    }
  };

  // Handle custom amount change
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setAmount(Number(value) || 0);
  };

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (amount <= 0) {
      toast.error('Please enter a valid donation amount');
      return;
    }
    
    if (!donorName || !donorEmail) {
      toast.error('Please provide your name and email');
      return;
    }
    
    try {
      setLoading(true);
      
      const result = await processDonation({
        amount,
        currency: 'USD',
        donorName,
        donorEmail,
        paymentMethod
      });
      
      if (result) {
        // Log the activity
        logActivity({
          action: 'Donation',
          user: donorName,
          details: `${donorName} donated $${amount} to the Urban Forest project.`,
          type: 'donation'
        });
        
        // In a real app, redirect to payment processor
        setTimeout(() => {
          navigate('/donation-thankyou');
        }, 1500);
      }
    } catch (error) {
      console.error('Error processing donation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-display text-eco-green-dark mb-4">
              Support Our Mission
            </h1>
            <p className="text-xl text-muted-foreground">
              Your donation helps us plant more trees and connect children to nature.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="bg-eco-green/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Your Impact</h2>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-md">
                    <div className="font-medium">$25</div>
                    <div className="text-sm text-muted-foreground">
                      Plants 5 trees and provides educational materials to a classroom
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-md">
                    <div className="font-medium">$50</div>
                    <div className="text-sm text-muted-foreground">
                      Plants 10 trees and sponsors a school tree-planting workshop
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-md">
                    <div className="font-medium">$100</div>
                    <div className="text-sm text-muted-foreground">
                      Plants 20 trees and sponsors a community garden project
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-md">
                    <div className="font-medium">$500</div>
                    <div className="text-sm text-muted-foreground">
                      Creates a fully supported school tree-planting program
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>
                    Your donation is tax-deductible. You will receive a receipt for your records.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-2xl font-bold mb-6">Make a Donation</h2>
                
                <form onSubmit={handleDonation} className="space-y-6">
                  {/* Amount selection */}
                  <div>
                    <Label className="mb-2 block">Donation Amount</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {[25, 50, 100, 500].map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant={amount === value ? "default" : "outline"}
                          className={amount === value ? "bg-eco-green hover:bg-eco-green-dark" : ""}
                          onClick={() => handleAmountSelect(value.toString())}
                        >
                          ${value}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <RadioGroup 
                        value={customAmount ? 'custom' : amount.toString()}
                        onValueChange={handleAmountSelect}
                        className="flex flex-wrap items-center gap-2"
                      >
                        <div className="flex items-center">
                          <RadioGroupItem value="custom" id="custom" />
                          <Label htmlFor="custom" className="ml-2">Custom Amount</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {(customAmount !== '' || amount === 0) && (
                      <div className="mb-4">
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            $
                          </div>
                          <Input
                            type="number"
                            min="1"
                            className="pl-7"
                            placeholder="Enter amount"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Donor information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Donor Information</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment method */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Method</h3>
                    
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={setPaymentMethod}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit_card" id="credit_card" />
                        <Label htmlFor="credit_card">Credit Card</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {/* Submit button */}
                  <div>
                    <Button 
                      type="submit" 
                      className="w-full bg-eco-green hover:bg-eco-green-dark text-white py-6 text-lg"
                      disabled={loading || amount <= 0}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <Spinner size="sm" />
                          Processing...
                        </span>
                      ) : (
                        `Donate $${amount}`
                      )}
                    </Button>
                    
                    <div className="mt-4 text-center text-sm text-muted-foreground">
                      Your donation is secure and encrypted.
                      <br />
                      All major credit cards accepted.
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Donate;
