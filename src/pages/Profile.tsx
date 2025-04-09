
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { useNotifications } from '@/contexts/NotificationContext';

const Profile = () => {
  const { user, profile, isLoading, updateProfile, signOut } = useAuth();
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const { logActivity } = useNotifications();

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      
      const { error } = await updateProfile({
        full_name: fullName,
        avatar_url: avatarUrl
      });
      
      if (!error) {
        toast.success("Profile updated successfully");
        
        // Log the activity
        logActivity({
          action: 'Profile',
          user: fullName || (user?.email || 'User'),
          details: `${fullName || 'User'} updated their profile information.`,
          type: 'profile'
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold font-display text-eco-green-dark mb-2">My Profile</h1>
          <p className="text-muted-foreground mb-6">Manage your account and preferences</p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <form onSubmit={handleUpdateProfile}>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details here. Your name will be visible to others.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullname">Full Name</Label>
                      <Input
                        id="fullname"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        value={user?.email || ''}
                        disabled
                        className="bg-slate-50"
                      />
                      <p className="text-sm text-muted-foreground">
                        Email cannot be changed
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="avatar">Profile Picture URL</Label>
                      <Input
                        id="avatar"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="Enter URL to your profile picture"
                      />
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-eco-green hover:bg-eco-green-dark"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <Spinner size="sm" />
                          Saving...
                        </span>
                      ) : "Save Changes"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Account Created</h3>
                    <p className="text-muted-foreground">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Change Password</h3>
                    <p className="text-muted-foreground mb-2">
                      You can request a password reset email to change your password.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={async () => {
                        try {
                          const { error } = await supabase.auth.resetPasswordForEmail(
                            user?.email || '',
                            { redirectTo: `${window.location.origin}/profile` }
                          );
                          
                          if (error) throw error;
                          
                          toast.success("Password reset email sent. Please check your inbox.");
                        } catch (error) {
                          console.error("Error sending reset email:", error);
                          toast.error("Failed to send password reset email");
                        }
                      }}
                    >
                      Send Reset Email
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium text-red-500 mb-2">Danger Zone</h3>
                    <p className="text-muted-foreground mb-4">
                      Actions here can't be undone. Please proceed with caution.
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        variant="outline"
                        className="text-red-500 border-red-200 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        Sign Out
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="text-red-500 border-red-200 hover:bg-red-50"
                        onClick={() => {
                          toast.error("Account deletion is not available in this demo");
                        }}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Control how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Notification preferences will be available in a future update.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
