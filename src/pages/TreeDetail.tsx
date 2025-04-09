
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTreeById, likeTree, unlikeTree, hasLikedTree, deleteTree } from '@/services/treeService';
import { TreeWithOwner } from '@/services/treeService';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { 
  CalendarIcon, 
  MapPinIcon, 
  LeafIcon, 
  HeartIcon, 
  ShareIcon,
  TrashIcon,
  Pencil
} from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

const TreeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [tree, setTree] = useState<TreeWithOwner | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadTree = async () => {
      if (!id) return;
      setLoading(true);
      const treeData = await fetchTreeById(id);
      
      if (treeData) {
        setTree(treeData);
        // Check if user has liked this tree
        const isLiked = await hasLikedTree(id);
        setLiked(isLiked);
      }
      setLoading(false);
    };
    
    loadTree();
  }, [id]);
  
  const handleLikeToggle = async () => {
    if (!tree || !id) return;
    
    try {
      if (liked) {
        await unlikeTree(id);
        setLiked(false);
      } else {
        await likeTree(id);
        setLiked(true);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  
  const handleShare = () => {
    // Simply copy the current URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast.success('Tree link copied to clipboard');
  };
  
  const handleDelete = async () => {
    if (!tree || !id) return;
    
    try {
      const success = await deleteTree(id);
      if (success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error deleting tree:', error);
    }
  };
  
  const isOwner = user && tree && user.id === tree.user_id;
  
  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }
  
  if (!tree) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-2">Tree not found</h2>
          <p className="text-muted-foreground mb-6">
            The tree you're looking for might have been removed or doesn't exist.
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  // Format planting date
  const plantingDate = tree.planting_date 
    ? format(new Date(tree.planting_date), 'MMM dd, yyyy')
    : 'Unknown date';
  
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="mb-6"
            >
              ← Back to Dashboard
            </Button>
          </div>
          
          {/* Tree details */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {/* Tree image or placeholder */}
            <div className="h-64 bg-muted-foreground/20 relative">
              {tree.image_url ? (
                <img 
                  src={tree.image_url} 
                  alt={tree.name || 'Tree'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <LeafIcon className="w-16 h-16 text-eco-green-dark/40" />
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex justify-between flex-wrap gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold font-display text-eco-green-dark mb-1">
                    {tree.name || 'Unnamed Tree'}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {tree.species}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    size="icon"
                    onClick={handleLikeToggle}
                    className={liked ? "bg-pink-50 text-pink-600 border-pink-200" : ""}
                  >
                    <HeartIcon className={`w-5 h-5 ${liked ? 'fill-pink-600 text-pink-600' : ''}`} />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="icon"
                    onClick={handleShare}
                  >
                    <ShareIcon className="w-5 h-5" />
                  </Button>
                  
                  {isOwner && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(`/trees/edit/${tree.id}`)}
                      >
                        <Pencil className="w-5 h-5" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                        onClick={() => setOpenDeleteDialog(true)}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-md">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-eco-green-dark" />
                    <span className="font-medium">Planted on</span>
                  </div>
                  <p className="mt-1">{plantingDate}</p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-md">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-eco-green-dark" />
                    <span className="font-medium">Location</span>
                  </div>
                  <p className="mt-1">{tree.location}</p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-md">
                  <div className="flex items-center gap-2">
                    <LeafIcon className="w-5 h-5 text-eco-green-dark" />
                    <span className="font-medium">Height</span>
                  </div>
                  <p className="mt-1">
                    {tree.height_cm ? `${tree.height_cm} cm` : 'Not recorded'}
                  </p>
                </div>
              </div>
              
              {tree.description && (
                <div className="mb-6">
                  <h2 className="font-medium text-lg mb-2">About this tree</h2>
                  <p className="text-muted-foreground">{tree.description}</p>
                </div>
              )}
              
              {/* Tree owner info */}
              <div className="border-t pt-4 mt-6">
                <h3 className="text-sm text-muted-foreground mb-2">Planted by</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-eco-green rounded-full flex items-center justify-center text-white">
                    {tree.profiles?.avatar_url ? (
                      <img 
                        src={tree.profiles.avatar_url} 
                        alt="" 
                        className="w-full h-full rounded-full object-cover" 
                      />
                    ) : (
                      <span className="font-medium">
                        {(tree.profiles?.full_name || 'User').charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{tree.profiles?.full_name || 'Anonymous User'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this tree?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The tree record will be permanently removed from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
};

export default TreeDetail;
