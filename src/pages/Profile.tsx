
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';

const Profile = () => {
  const { user, profile, updateProfile, isLoading, signOut } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Sample data for demo purposes
  const mockChildren = [
    { name: 'Emma', age: 8, associatedTrees: 2 },
    { name: 'Noah', age: 6, associatedTrees: 1 },
    { name: 'Olivia', age: 4, associatedTrees: 1 }
  ];

  const mockBadges = [
    { name: 'Tree Planter', description: 'Planted your first tree', icon: '🌱' },
    { name: 'Green Family', description: 'Connected all your children with trees', icon: '👨‍👩‍👧‍👦' },
    { name: 'Update Master', description: 'Made 5 tree updates', icon: '📝' }
  ];

  const mockStats = {
    treesPlanted: 12,
    co2Absorbed: 532,
    updates: 24
  };

  React.useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);

    await updateProfile({
      full_name: fullName,
      avatar_url: avatarUrl
    });

    setIsUpdating(false);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Spinner size="lg" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-muted/30 py-10">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border mb-8">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <Avatar className="w-24 h-24 mb-4 md:mb-0 md:mr-6">
                    {profile?.avatar_url ? (
                      <AvatarImage src={profile.avatar_url} alt={profile.full_name || user?.email || ''} />
                    ) : (
                      <AvatarFallback>{profile?.full_name?.[0] || user?.email?.[0] || 'U'}</AvatarFallback>
                    )}
                  </Avatar>
                  
                  <div className="text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-bold font-display text-eco-green-dark mb-1">
                      {profile?.full_name || user?.email?.split('@')[0] || 'User'}
                    </h1>
                    <p className="text-muted-foreground mb-3">
                      {user?.email}
                    </p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                      <Badge variant="outline" className="bg-eco-green-light/20 text-eco-green-dark">
                        {mockStats.treesPlanted} Trees Planted
                      </Badge>
                      <Badge variant="outline" className="bg-eco-green-light/20 text-eco-green-dark">
                        {mockChildren.length} Children Connected
                      </Badge>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Tabs defaultValue={isEditing ? "settings" : "children"}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="children">Children</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="children">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">My Children</h2>
                        <Button size="sm" className="bg-eco-green hover:bg-eco-green-dark text-white">
                          Add Child
                        </Button>
                      </div>
                      
                      <div className="divide-y">
                        {mockChildren.map((child, index) => (
                          <div key={index} className="py-4 first:pt-0 last:pb-0">
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-medium">{child.name}</h3>
                                <p className="text-sm text-muted-foreground">Age: {child.age}</p>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-medium text-eco-green">
                                  {child.associatedTrees} trees
                                </span>
                                <p className="text-xs text-muted-foreground">associated</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {mockChildren.length === 0 && (
                        <div className="text-center py-8">
                          <span className="text-3xl mb-4 inline-block">👶</span>
                          <h3 className="text-xl font-medium mb-2">No children added yet</h3>
                          <p className="text-muted-foreground mb-4">
                            Add your children to connect them with trees
                          </p>
                          <Button className="bg-eco-green hover:bg-eco-green-dark text-white">
                            Add Child
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="achievements">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                      <h2 className="text-xl font-semibold mb-6">My Achievements</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mockBadges.map((badge, index) => (
                          <Card key={index}>
                            <CardContent className="p-4 flex items-start">
                              <div className="bg-eco-green-light/20 rounded-full p-3 mr-4">
                                <span className="text-2xl">{badge.icon}</span>
                              </div>
                              <div>
                                <h3 className="font-medium">{badge.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {badge.description}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="settings">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                      
                      <div className="space-y-6">
                        {isEditing ? (
                          <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="full-name">Full Name</Label>
                              <Input 
                                id="full-name" 
                                value={fullName} 
                                onChange={(e) => setFullName(e.target.value)} 
                                disabled={isUpdating}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="avatar-url">Avatar URL</Label>
                              <Input 
                                id="avatar-url" 
                                value={avatarUrl} 
                                onChange={(e) => setAvatarUrl(e.target.value)} 
                                disabled={isUpdating}
                              />
                              <p className="text-xs text-muted-foreground">Enter a URL for your profile picture</p>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                type="submit" 
                                disabled={isUpdating}
                                className="bg-eco-green hover:bg-eco-green-dark text-white"
                              >
                                {isUpdating ? <><Spinner size="sm" /> Saving...</> : 'Save Changes'}
                              </Button>
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setIsEditing(false)}
                                disabled={isUpdating}
                              >
                                Cancel
                              </Button>
                            </div>
                          </form>
                        ) : (
                          <>
                            <div>
                              <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Update your personal details
                              </p>
                              <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                            </div>
                            
                            <div className="border-t pt-6">
                              <h3 className="text-lg font-medium mb-2">Email Preferences</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Manage your email notifications
                              </p>
                              <Button variant="outline">Update Preferences</Button>
                            </div>
                            
                            <div className="border-t pt-6">
                              <h3 className="text-lg font-medium mb-2">Change Password</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Update your password
                              </p>
                              <Button variant="outline">Change Password</Button>
                            </div>
                            
                            <div className="border-t pt-6">
                              <h3 className="text-lg font-medium mb-2">Sign Out</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Log out of your account
                              </p>
                              <Button variant="outline" onClick={signOut}>Sign Out</Button>
                            </div>
                            
                            <div className="border-t pt-6">
                              <h3 className="text-lg font-medium mb-2 text-destructive">Danger Zone</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Delete your account and all your data
                              </p>
                              <Button variant="destructive">Delete Account</Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Environmental Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-muted-foreground">Trees Planted</span>
                          <span className="text-sm font-medium">{mockStats.treesPlanted}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-eco-green" 
                            style={{ width: `${Math.min(mockStats.treesPlanted * 5, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-muted-foreground">CO₂ Absorbed</span>
                          <span className="text-sm font-medium">{mockStats.co2Absorbed} kg</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-eco-green" 
                            style={{ width: `${Math.min(mockStats.co2Absorbed / 10, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-muted-foreground">Updates Made</span>
                          <span className="text-sm font-medium">{mockStats.updates}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-eco-green" 
                            style={{ width: `${Math.min(mockStats.updates * 4, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Link to="/trees/add">
                      <Button className="w-full bg-eco-green hover:bg-eco-green-dark text-white justify-start">
                        <span className="mr-2">🌱</span>
                        Plant a New Tree
                      </Button>
                    </Link>
                    <Link to="/dashboard">
                      <Button variant="outline" className="w-full justify-start">
                        <span className="mr-2">📊</span>
                        View Dashboard
                      </Button>
                    </Link>
                    <Link to="/map">
                      <Button variant="outline" className="w-full justify-start">
                        <span className="mr-2">🗺️</span>
                        Explore Tree Map
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
