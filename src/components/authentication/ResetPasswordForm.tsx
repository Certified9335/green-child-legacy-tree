
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';
import { CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if we have an access token in the URL (needed for password reset)
  useEffect(() => {
    // The auth hash is automatically handled by Supabase client
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        toast({
          variant: "destructive",
          title: "Invalid or expired link",
          description: "Please request a new password reset link",
        });
        // Redirect after a short delay
        setTimeout(() => navigate('/forgot-password'), 2000);
      }
    };
    
    checkSession();
  }, [navigate, toast]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    // Password validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setError(error.message);
        toast({
          variant: "destructive",
          title: "Password update failed",
          description: error.message,
        });
      } else {
        setIsSuccess(true);
        toast({
          title: "Password updated",
          description: "Your password has been successfully updated",
        });
        
        // Redirect after showing success message
        setTimeout(() => navigate('/login'), 2500);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      toast({
        variant: "destructive",
        title: "Password update failed",
        description: err.message || 'An unexpected error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-display text-eco-green-dark mb-2">
          Reset your password
        </h2>
        <p className="text-muted-foreground">
          Enter your new password below
        </p>
      </div>

      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2" />
          <h3 className="text-lg font-medium text-green-800 mb-1">
            Password updated successfully
          </h3>
          <p className="text-green-700">
            You will be redirected to the login page shortly
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            {error && (
              <div className="flex gap-2 items-center bg-red-50 text-red-700 p-3 rounded-md">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  required
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Password must be at least 8 characters
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input 
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  required
                  disabled={isLoading}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="bg-eco-green hover:bg-eco-green-dark text-white w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" />
                  Updating password...
                </span>
              ) : "Reset Password"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordForm;
