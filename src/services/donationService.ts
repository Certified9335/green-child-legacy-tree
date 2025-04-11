
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Donation {
  id?: string;
  amount: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  projectId?: string;
  status?: string;
  paymentMethod: string;
  createdAt?: string;
}

/**
 * Process a new donation
 */
export async function processDonation(donation: Omit<Donation, 'id' | 'status' | 'createdAt'>) {
  try {
    // Get current session
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;

    const { data, error } = await supabase
      .from('sponsorships')
      .insert([
        {
          amount: donation.amount,
          sponsor_name: donation.donorName,
          sponsor_email: donation.donorEmail,
          payment_method: donation.paymentMethod,
          payment_status: 'pending',
          sponsor_type: 'individual',
          user_id: userId,  // Optional - will be null for anonymous donations
          // Adding required fields based on schema
          tree_location: 'To be determined', // Default/placeholder value
          tree_species: 'To be determined'   // Default/placeholder value
        },
      ])
      .select();

    if (error) throw error;
    
    // In a real application, here you would:
    // 1. Integrate with a payment processor like Stripe
    // 2. Redirect to payment confirmation
    // 3. Handle webhooks for payment status updates
    
    toast.success('Donation received! Thank you for your contribution.');
    return data[0];
  } catch (error) {
    console.error('Error processing donation:', error);
    toast.error('Failed to process donation');
    return null;
  }
}

/**
 * Fetch user donations
 */
export async function fetchUserDonations() {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('sponsorships')
      .select('*')
      .eq('user_id', session.session.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching donations:', error);
    return [];
  }
}
