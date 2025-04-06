
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AddTreeForm from '@/components/trees/AddTreeForm';
import { Card, CardContent } from '@/components/ui/card';

const AddTree = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-muted/30 py-10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold font-display text-eco-green-dark mb-6 text-center">
              Plant a New Tree
            </h1>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border mb-8">
              <AddTreeForm />
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Tips for Tree Planting</h2>
                <ul className="space-y-2 leaf-bullet">
                  <li>Choose a tree species that is well-suited to your local climate and soil conditions.</li>
                  <li>Dig a hole that is twice as wide as the root ball but only as deep as the root ball.</li>
                  <li>Gently place the tree in the hole, making sure it's straight.</li>
                  <li>Backfill with soil, tamping gently to eliminate air pockets.</li>
                  <li>Water thoroughly after planting and apply a layer of mulch around the base.</li>
                  <li>Keep the tree well-watered during its first growing season.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddTree;
