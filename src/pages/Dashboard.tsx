
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TreeStats from '@/components/trees/TreeStats';
import MapPreview from '@/components/dashboard/MapPreview';
import TreeCard from '@/components/trees/TreeCard';

// Sample data for demo purposes
const mockTrees = [
  {
    id: '1',
    species: 'Oak',
    location: 'Backyard',
    plantedDate: '2023-04-12',
    childName: 'Emma',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    status: 'healthy' as const,
  },
  {
    id: '2',
    species: 'Pine',
    location: 'Community Garden',
    plantedDate: '2023-05-20',
    childName: 'Noah',
    imageUrl: 'https://images.unsplash.com/photo-1501261379837-c3b516c6365a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80',
    status: 'needs-attention' as const,
  },
  {
    id: '3',
    species: 'Maple',
    location: 'Front Yard',
    plantedDate: '2023-03-15',
    childName: 'Olivia',
    imageUrl: 'https://images.unsplash.com/photo-1618142990632-1afb1bd67e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    status: 'healthy' as const,
  },
];

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-muted/30 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold font-display text-eco-green-dark">Dashboard</h1>
              <p className="text-muted-foreground">Track your trees and environmental impact</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/trees/add">
                <Button className="bg-eco-green hover:bg-eco-green-dark text-white">
                  Plant a New Tree
                </Button>
              </Link>
            </div>
          </div>
          
          <TreeStats 
            totalTrees={12}
            co2Absorbed={532}
            childrenConnected={8}
            treesAddedThisMonth={3}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="my-trees">
                <TabsList className="mb-6">
                  <TabsTrigger value="my-trees">My Trees</TabsTrigger>
                  <TabsTrigger value="needs-attention">Needs Attention</TabsTrigger>
                  <TabsTrigger value="recent-updates">Recent Updates</TabsTrigger>
                </TabsList>
                <TabsContent value="my-trees">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {mockTrees.map((tree) => (
                      <TreeCard key={tree.id} {...tree} />
                    ))}
                  </div>
                  
                  {mockTrees.length > 0 && (
                    <div className="mt-6 text-center">
                      <Link to="/trees">
                        <Button variant="outline" className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white">
                          View All Trees
                        </Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="needs-attention">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {mockTrees.filter(tree => tree.status === 'needs-attention').map((tree) => (
                      <TreeCard key={tree.id} {...tree} />
                    ))}
                  </div>
                  
                  {mockTrees.filter(tree => tree.status === 'needs-attention').length === 0 && (
                    <div className="text-center p-8">
                      <span className="text-3xl mb-4 inline-block">🌿</span>
                      <h3 className="text-xl font-medium mb-2">All trees are healthy!</h3>
                      <p className="text-muted-foreground">
                        None of your trees currently need attention.
                      </p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="recent-updates">
                  <div className="text-center p-8">
                    <span className="text-3xl mb-4 inline-block">📝</span>
                    <h3 className="text-xl font-medium mb-2">No recent updates</h3>
                    <p className="text-muted-foreground mb-4">
                      Add an update to one of your trees to track its growth.
                    </p>
                    <Link to="/trees">
                      <Button variant="outline" className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white">
                        Go to My Trees
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <MapPreview />
              
              <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold font-display text-eco-green-dark mb-4">
                  Upcoming Reminders
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-eco-green-light/30 rounded-full p-2 mr-3">
                      <span className="text-lg">🌱</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Update Oak Tree</h3>
                      <p className="text-sm text-muted-foreground">Due in 3 days</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-eco-green-light/30 rounded-full p-2 mr-3">
                      <span className="text-lg">🌿</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Water Maple Tree</h3>
                      <p className="text-sm text-muted-foreground">Due tomorrow</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
