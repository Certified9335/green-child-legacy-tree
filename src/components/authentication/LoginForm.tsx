
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNotifications } from '@/contexts/NotificationContext';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Get name from email for demo purposes
    const name = email.split('@')[0] || 'User';
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    
    // This would be replaced with actual API call in the real implementation
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success toast
      toast.success('Successfully logged in!', {
        description: `Welcome back, ${capitalizedName}!`,
      });
      
      // Add notification for the login event
      addNotification({
        type: 'login',
        message: `${capitalizedName} has just logged in`,
        user: { name: capitalizedName }
      });
      
      setIsLoading(false);
      
      // Redirect to dashboard
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-display text-eco-green-dark mb-2">
          Welcome back
        </h2>
        <p className="text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-sm text-eco-green hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input 
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            className="bg-eco-green hover:bg-eco-green-dark text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Signing in...
              </span>
            ) : "Sign In"}
          </Button>
          
          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-eco-green hover:underline font-medium">
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
