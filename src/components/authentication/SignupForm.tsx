
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useNotifications } from '@/contexts/NotificationContext';

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Get user input for notification
    const name = fullName || 'New user';
    
    // This would be replaced with actual API call in the real implementation
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success toast
      toast.success('Account created successfully!', {
        description: 'Please check your email for verification.',
      });
      
      // Add notification for the signup event
      addNotification({
        type: 'signup',
        message: `${name} just joined the community!`,
        user: { name }
      });
      
      setIsLoading(false);
      
      // Redirect to login page
      setTimeout(() => navigate('/login'), 1000);
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error('Failed to create account. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-display text-eco-green-dark mb-2">
          Create your account
        </h2>
        <p className="text-muted-foreground">
          Join our community and start planting trees today
        </p>
      </div>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input 
              id="full-name"
              placeholder="Enter your full name"
              required
              disabled={isLoading}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              type="password"
              placeholder="Create a password"
              required
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">
              Must be at least 8 characters
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required disabled={isLoading} />
            <Label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree to the{" "}
              <Link to="/terms" className="text-eco-green hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-eco-green hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
          
          <Button 
            type="submit" 
            className="bg-eco-green hover:bg-eco-green-dark text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating Account...
              </span>
            ) : "Create Account"}
          </Button>
          
          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-eco-green hover:underline font-medium">
                Sign in
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
