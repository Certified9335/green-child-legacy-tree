
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { Spinner } from '@/components/ui/spinner';

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      const { error } = await signUp(email, password, fullName);
      
      if (!error) {
        // Add notification for the signup event
        addNotification({
          type: 'signup',
          message: `${fullName || 'New user'} just joined the community!`,
          user: { name: fullName || 'New user' }
        });
      }
    } catch (error) {
      console.error('Error during signup:', error);
    } finally {
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
            />
            <p className="text-sm text-muted-foreground">
              Must be at least 6 characters
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
                <Spinner size="sm" />
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
