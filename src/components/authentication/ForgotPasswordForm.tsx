
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
        toast({
          variant: "destructive",
          title: "Password reset failed",
          description: error.message,
        });
      } else {
        setIsSuccess(true);
        toast({
          title: "Reset link sent",
          description: "Check your email for the password reset link",
        });
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      toast({
        variant: "destructive",
        title: "Password reset failed",
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
          Forgot your password?
        </h2>
        <p className="text-muted-foreground">
          Enter your email and we'll send you a reset link
        </p>
      </div>

      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2" />
          <h3 className="text-lg font-medium text-green-800 mb-1">
            Check your email
          </h3>
          <p className="text-green-700 mb-4">
            We've sent a password reset link to {email}
          </p>
          <p className="text-sm text-green-600 mb-2">
            Don't see the email? Check your spam folder.
          </p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => setIsSuccess(false)}
          >
            Try another email
          </Button>
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

            <Button 
              type="submit" 
              className="bg-eco-green hover:bg-eco-green-dark text-white w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" />
                  Sending reset link...
                </span>
              ) : "Send Reset Link"}
            </Button>

            <div className="text-center">
              <Link to="/login" className="text-eco-green hover:underline font-medium">
                Back to login
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
