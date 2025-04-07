
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/components/layout/AppLayout';
import { HeartHandshake, CreditCard, Landmark, Globe, Phone, CircleDollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockProjects } from '@/data/mockProjects';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const DonationAmounts = [
  { value: '10', label: '$10' },
  { value: '25', label: '$25' },
  { value: '50', label: '$50' },
  { value: '100', label: '$100' },
  { value: 'custom', label: 'Custom Amount' }
];

const PaymentMethods = [
  { id: 'creditCard', name: 'Credit Card', icon: <CreditCard className="h-5 w-5" /> },
  { id: 'bankTransfer', name: 'Bank Transfer', icon: <Landmark className="h-5 w-5" /> },
  { id: 'mpesa', name: 'M-Pesa', icon: <Phone className="h-5 w-5" /> },
  { id: 'paypal', name: 'PayPal', icon: <Globe className="h-5 w-5" /> }
];

const AfricanPaymentMethods = [
  { id: 'mpesa', name: 'M-Pesa (Kenya)' },
  { id: 'mtn', name: 'MTN Mobile Money (Ghana, Uganda, Nigeria)' },
  { id: 'airtel', name: 'Airtel Money (Tanzania, Uganda)' },
  { id: 'orange', name: 'Orange Money (West Africa)' },
  { id: 'flutterwave', name: 'Flutterwave (Pan-African)' }
];

const GlobalPaymentMethods = [
  { id: 'creditCard', name: 'Credit/Debit Card' },
  { id: 'paypal', name: 'PayPal' },
  { id: 'bankTransfer', name: 'Bank Transfer' },
  { id: 'crypto', name: 'Cryptocurrency' },
  { id: 'applepay', name: 'Apple Pay' },
  { id: 'googlepay', name: 'Google Pay' }
];

const Donate = () => {
  const { toast } = useToast();
  const [donationAmount, setDonationAmount] = useState('25');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedTab, setSelectedTab] = useState('general');
  const [selectedProject, setSelectedProject] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [showMobilePaymentForm, setShowMobilePaymentForm] = useState(false);

  const handleDonationAmountChange = (value: string) => {
    setDonationAmount(value);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
  };

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    setShowMobilePaymentForm(method === 'mpesa' || method === 'mtn' || method === 'airtel' || method === 'orange');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalAmount = donationAmount === 'custom' ? customAmount : donationAmount;
    
    toast({
      title: "Thank you for your donation!",
      description: `Your donation of $${finalAmount} is being processed.`,
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-10">
        <div className="text-center mb-12">
          <HeartHandshake className="w-16 h-16 text-eco-green mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Support Our Mission</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Your donation will help us plant more trees, support local communities, 
            and create a greener future for all. Every dollar makes a difference.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-2 border-eco-green/20 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CircleDollarSign className="h-5 w-5 text-eco-green" />
                  Make a Donation
                </CardTitle>
                <CardDescription>
                  Choose your donation amount and payment method below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="general" onValueChange={setSelectedTab}>
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="general">General Donation</TabsTrigger>
                    <TabsTrigger value="project">Donate to a Project</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="general">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">Select Amount</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                          {DonationAmounts.map(({ value, label }) => (
                            <Button
                              key={value}
                              variant={donationAmount === value ? "default" : "outline"}
                              className={
                                donationAmount === value 
                                  ? "bg-eco-green hover:bg-eco-green-dark" 
                                  : "border-eco-green/30 text-eco-green-dark hover:bg-eco-green/10"
                              }
                              onClick={() => handleDonationAmountChange(value)}
                            >
                              {label}
                            </Button>
                          ))}
                        </div>
                        
                        {donationAmount === 'custom' && (
                          <div className="mt-4">
                            <Input
                              type="number"
                              placeholder="Enter amount"
                              value={customAmount}
                              onChange={handleCustomAmountChange}
                              className="max-w-xs"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="project">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">Select Project</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {mockProjects.slice(0, 3).map((project) => (
                            <div
                              key={project.id}
                              className={`border rounded-lg p-4 cursor-pointer ${
                                selectedProject === project.id 
                                  ? 'border-eco-green bg-eco-green/5' 
                                  : 'border-gray-200 hover:border-eco-green/40'
                              }`}
                              onClick={() => handleProjectSelect(project.id)}
                            >
                              <div className="flex flex-col md:flex-row gap-4">
                                {project.coverImage && (
                                  <div className="w-full md:w-1/4">
                                    <img 
                                      src={project.coverImage} 
                                      alt={project.title} 
                                      className="w-full h-24 object-cover rounded-md"
                                    />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <h4 className="font-semibold">{project.title}</h4>
                                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                    {project.description}
                                  </p>
                                  {project.treesPlanted !== undefined && project.treesGoal !== undefined && (
                                    <div className="space-y-1">
                                      <div className="flex justify-between text-xs">
                                        <span>{project.treesPlanted} trees planted</span>
                                        <span>{project.treesGoal} goal</span>
                                      </div>
                                      <Progress 
                                        value={(project.treesPlanted / project.treesGoal) * 100} 
                                        className="h-2"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="font-semibold mb-3">Select Amount</h3>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {DonationAmounts.map(({ value, label }) => (
                              <Button
                                key={value}
                                variant={donationAmount === value ? "default" : "outline"}
                                className={
                                  donationAmount === value 
                                    ? "bg-eco-green hover:bg-eco-green-dark" 
                                    : "border-eco-green/30 text-eco-green-dark hover:bg-eco-green/10"
                                }
                                onClick={() => handleDonationAmountChange(value)}
                                disabled={!selectedProject}
                              >
                                {label}
                              </Button>
                            ))}
                          </div>
                          
                          {donationAmount === 'custom' && (
                            <div className="mt-4">
                              <Input
                                type="number"
                                placeholder="Enter amount"
                                value={customAmount}
                                onChange={handleCustomAmountChange}
                                className="max-w-xs"
                                disabled={!selectedProject}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-8">
                  <h3 className="font-semibold mb-3">Payment Region</h3>
                  <Tabs defaultValue="global">
                    <TabsList className="grid grid-cols-2 w-[400px] mb-6">
                      <TabsTrigger value="africa">African Payment Methods</TabsTrigger>
                      <TabsTrigger value="global">Global Payment Methods</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="africa">
                      <div className="space-y-4">
                        <RadioGroup defaultValue="mpesa" onValueChange={handlePaymentMethodChange}>
                          {AfricanPaymentMethods.map((method) => (
                            <div className="flex items-center space-x-2" key={method.id}>
                              <RadioGroupItem value={method.id} id={`african-${method.id}`} />
                              <Label htmlFor={`african-${method.id}`}>{method.name}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="global">
                      <div className="space-y-4">
                        <RadioGroup defaultValue="creditCard" onValueChange={handlePaymentMethodChange}>
                          {GlobalPaymentMethods.map((method) => (
                            <div className="flex items-center space-x-2" key={method.id}>
                              <RadioGroupItem value={method.id} id={`global-${method.id}`} />
                              <Label htmlFor={`global-${method.id}`}>{method.name}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                {showMobilePaymentForm && (
                  <div className="mt-6 border-t pt-4">
                    <h3 className="font-semibold mb-3">Mobile Payment Details</h3>
                    <div className="space-y-4 max-w-md">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="phone">Mobile Number</Label>
                          <Input 
                            id="phone" 
                            type="tel" 
                            placeholder="Enter your mobile number" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {(paymentMethod === 'creditCard' || paymentMethod === 'applepay' || paymentMethod === 'googlepay') && (
                  <div className="mt-6 border-t pt-4">
                    <h3 className="font-semibold mb-3">Card Details</h3>
                    <div className="space-y-4 max-w-md">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input 
                            id="cardName" 
                            placeholder="Enter name as it appears on card" 
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input 
                            id="cardNumber" 
                            placeholder="xxxx xxxx xxxx xxxx" 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiration Date</Label>
                            <Input 
                              id="expiry" 
                              placeholder="MM/YY" 
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input 
                              id="cvc" 
                              placeholder="xxx" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  className="bg-eco-green hover:bg-eco-green-dark w-full md:w-auto"
                  onClick={handleSubmit}
                  disabled={
                    (donationAmount === 'custom' && (!customAmount || parseFloat(customAmount) <= 0)) ||
                    (selectedTab === 'project' && !selectedProject)
                  }
                >
                  Complete Donation
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Why Donate?</CardTitle>
                <CardDescription>
                  Your contribution makes a real difference
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">Plant More Trees</h4>
                  <p className="text-sm text-muted-foreground">
                    Each dollar helps us plant and nurture more trees across Africa.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1">Support Local Communities</h4>
                  <p className="text-sm text-muted-foreground">
                    We work with local communities to ensure sustainable development.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1">Environmental Education</h4>
                  <p className="text-sm text-muted-foreground">
                    Your donation supports educational programs for children.
                  </p>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-1">Our Commitment</h4>
                  <p className="text-sm text-muted-foreground">
                    We ensure that 85% of every donation goes directly to planting trees and
                    supporting communities. The remaining 15% covers administrative costs.
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex-col items-start">
                <p className="text-sm text-muted-foreground mb-4">
                  OneTreeOneChild is a registered 501(c)(3) nonprofit organization.
                  All donations are tax-deductible.
                </p>
                <div className="flex gap-2 mt-2">
                  <img src="https://placehold.co/40x25" alt="Visa" className="h-6" />
                  <img src="https://placehold.co/40x25" alt="Mastercard" className="h-6" />
                  <img src="https://placehold.co/40x25" alt="PayPal" className="h-6" />
                  <img src="https://placehold.co/40x25" alt="M-Pesa" className="h-6" />
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Donate;
