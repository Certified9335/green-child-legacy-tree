
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/components/layout/AppLayout';
import TreeStats from '@/components/trees/TreeStats';
import TreeCard from '@/components/trees/TreeCard';
import { useNotifications } from '@/contexts/NotificationContext';
import { fetchUserTrees } from '@/services/treeService';
import { Spinner } from '@/components/ui/spinner';
import { Tree } from '@/services/treeService';

const Dashboard = () => {
  const { logActivity } = useNotifications();
  const [trees, setTrees] = useState<Tree[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadTrees = async () => {
      setLoading(true);
      const userTrees = await fetchUserTrees();
      setTrees(userTrees);
      setLoading(false);
    };
    
    loadTrees();
  }, []);
  
  const handlePlantTreeClick = () => {
    // Log the activity when user clicks to plant a new tree
    logActivity({
      action: 'Tree Planting Initiated',
      user: 'Current User',
      details: 'Started the process of planting a new tree',
      type: 'tree'
    });
  };

  const handleTreeCardClick = (tree: Tree) => {
    // Log the activity when user views a tree
    logActivity({
      action: 'Tree Details Viewed',
      user: 'Current User',
      details: `Viewed details of ${tree.species} tree named ${tree.name}`,
      type: 'tree'
    });
  };
  
  // Calculate stats
  const stats = {
    totalTrees: trees.length,
    co2Absorbed: trees.length * 21, // Simple estimation
    childrenConnected: new Set(trees.map(tree => tree.name)).size,
    treesAddedThisMonth: trees.filter(tree => {
      const plantedDate = new Date(tree.planting_date);
      const now = new Date();
      return plantedDate.getMonth() === now.getMonth() && 
             plantedDate.getFullYear() === now.getFullYear();
    }).length
  };
  
  return (
    <AppLayout>
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display text-eco-green-dark">Dashboard</h1>
            <p className="text-muted-foreground">Track your trees and environmental impact</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/trees/add">
              <Button 
                className="bg-eco-green hover:bg-eco-green-dark text-white"
                onClick={handlePlantTreeClick}
              >
                Plant a New Tree
              </Button>
            </Link>
          </div>
        </div>
        
        <TreeStats 
          totalTrees={stats.totalTrees}
          co2Absorbed={stats.co2Absorbed}
          childrenConnected={stats.childrenConnected}
          treesAddedThisMonth={stats.treesAddedThisMonth}
        />
        
        <div className="mt-8">
          <Tabs defaultValue="my-trees">
            <TabsList className="mb-6">
              <TabsTrigger value="my-trees">My Trees</TabsTrigger>
              <TabsTrigger value="needs-attention">Needs Attention</TabsTrigger>
              <TabsTrigger value="recent-updates">Recent Updates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-trees">
              {loading ? (
                <div className="flex justify-center py-12">
                  <Spinner size="lg" />
                </div>
              ) : trees.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trees.map((tree) => (
                    <Link 
                      to={`/trees/${tree.id}`} 
                      key={tree.id}
                      onClick={() => handleTreeCardClick(tree)}
                    >
                      <TreeCard
                        id={tree.id || ''}
                        species={tree.species}
                        location={tree.location}
                        plantedDate={tree.planting_date}
                        childName={tree.name}
                        imageUrl={tree.image_url}
                        status="healthy"
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center p-12 bg-slate-50 rounded-lg">
                  <span className="text-5xl mb-4 inline-block">🌱</span>
                  <h3 className="text-xl font-medium mb-2">No trees planted yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start your journey by planting your first tree
                  </p>
                  <Link to="/trees/add">
                    <Button
                      className="bg-eco-green hover:bg-eco-green-dark text-white"
                    >
                      Plant Your First Tree
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="needs-attention">
              <div className="text-center p-8">
                <span className="text-3xl mb-4 inline-block">🌿</span>
                <h3 className="text-xl font-medium mb-2">All trees are healthy!</h3>
                <p className="text-muted-foreground">
                  None of your trees currently need attention.
                </p>
              </div>
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
      </div>
    </AppLayout>
  );
};

export default Dashboard;
