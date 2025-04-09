
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { addTree } from '@/services/treeService';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';

const AddTree = () => {
  const { isLoading } = useAuth();
  const navigate = useNavigate();

  const handleAddTree = async (formData: FormData) => {
    try {
      const name = formData.get('name') as string;
      const species = formData.get('species') as string;
      const location = formData.get('location') as string;
      const plantingDate = formData.get('planting_date') as string;
      const childName = formData.get('child_name') as string;
      const description = formData.get('description') as string;
      
      if (!name || !species || !location || !plantingDate) {
        toast.error('Please fill in all required fields');
        return;
      }

      const result = await addTree({
        name: childName || name, // Use child's name if provided
        species,
        location,
        planting_date: plantingDate,
        description,
      });

      if (result) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error adding tree:', error);
      toast.error('Failed to add tree');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold font-display text-eco-green-dark mb-2">Plant a New Tree</h1>
          <p className="text-muted-foreground mb-6">
            Record a new tree you've planted and connect it with a child's future.
          </p>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border">
            <form 
              action={handleAddTree}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="species" className="block font-medium">
                    Tree Species <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="species"
                    name="species"
                    className="w-full p-2 border rounded"
                    placeholder="e.g., Oak, Pine, Maple"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="location" className="block font-medium">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="location"
                    name="location"
                    className="w-full p-2 border rounded"
                    placeholder="e.g., Backyard, Community Garden"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="planting_date" className="block font-medium">
                    Planting Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="planting_date"
                    name="planting_date"
                    type="date"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="child_name" className="block font-medium">
                    Child's Name
                  </label>
                  <input
                    id="child_name"
                    name="child_name"
                    className="w-full p-2 border rounded"
                    placeholder="Name of the child this tree represents"
                  />
                  <p className="text-sm text-muted-foreground">
                    Leave blank if not dedicated to a specific child
                  </p>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="description" className="block font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="w-full p-2 border rounded"
                    placeholder="Add details about this tree, its significance, or special care instructions..."
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-eco-green hover:bg-eco-green-dark text-white"
                >
                  Plant Tree
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AddTree;
