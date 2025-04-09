
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Tree {
  id?: string;
  name: string;
  species: string;
  location: string;
  planting_date: string;
  description?: string;
  image_url?: string;
  height_cm?: number;
  latitude?: number;
  longitude?: number;
  user_id?: string;
}

export interface TreeWithOwner extends Tree {
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

/**
 * Fetch trees for the current user
 */
export async function fetchUserTrees() {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('trees')
      .select('*')
      .eq('user_id', session.session.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching trees:', error);
    toast.error('Failed to load your trees');
    return [];
  }
}

/**
 * Fetch a single tree by ID
 */
export async function fetchTreeById(id: string) {
  try {
    const { data, error } = await supabase
      .from('trees')
      .select(`
        *,
        profiles (
          full_name,
          avatar_url
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as TreeWithOwner;
  } catch (error) {
    console.error('Error fetching tree details:', error);
    toast.error('Failed to load tree details');
    return null;
  }
}

/**
 * Add a new tree
 */
export async function addTree(tree: Tree) {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('trees')
      .insert([
        { 
          ...tree, 
          user_id: session.session.user.id,
          planting_date: new Date(tree.planting_date).toISOString()
        }
      ])
      .select();

    if (error) throw error;
    toast.success('Tree planted successfully!');
    return data[0];
  } catch (error) {
    console.error('Error adding tree:', error);
    toast.error('Failed to plant tree');
    return null;
  }
}

/**
 * Update an existing tree
 */
export async function updateTree(id: string, tree: Partial<Tree>) {
  try {
    const { data, error } = await supabase
      .from('trees')
      .update(tree)
      .eq('id', id)
      .select();

    if (error) throw error;
    toast.success('Tree updated successfully!');
    return data[0];
  } catch (error) {
    console.error('Error updating tree:', error);
    toast.error('Failed to update tree');
    return null;
  }
}

/**
 * Delete a tree
 */
export async function deleteTree(id: string) {
  try {
    const { error } = await supabase
      .from('trees')
      .delete()
      .eq('id', id);

    if (error) throw error;
    toast.success('Tree removed successfully');
    return true;
  } catch (error) {
    console.error('Error deleting tree:', error);
    toast.error('Failed to remove tree');
    return false;
  }
}

/**
 * Like a tree
 */
export async function likeTree(treeId: string) {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('tree_likes')
      .insert([
        { 
          tree_id: treeId, 
          user_id: session.session.user.id
        }
      ]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error liking tree:', error);
    return false;
  }
}

/**
 * Unlike a tree
 */
export async function unlikeTree(treeId: string) {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('tree_likes')
      .delete()
      .match({ 
        tree_id: treeId, 
        user_id: session.session.user.id
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error unliking tree:', error);
    return false;
  }
}

/**
 * Check if user has liked a tree
 */
export async function hasLikedTree(treeId: string) {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      return false;
    }

    const { data, error } = await supabase
      .from('tree_likes')
      .select('*')
      .match({ 
        tree_id: treeId, 
        user_id: session.session.user.id
      });

    if (error) throw error;
    return data && data.length > 0;
  } catch (error) {
    console.error('Error checking if tree is liked:', error);
    return false;
  }
}
