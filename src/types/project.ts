
export type ProjectStatus = 'all' | 'upcoming' | 'ongoing' | 'requested' | 'onhand' | 'completed';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: Exclude<ProjectStatus, 'all'>;
  location: string;
  startDate?: Date;
  endDate?: Date;
  treesPlanted?: number;
  treesGoal?: number;
  coordinator?: string;
  coverImage?: string;
  createdBy?: string;
  approved?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: 'individual' | 'sponsor' | 'donor' | 'volunteer';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface Donation {
  id: string;
  amount: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  projectId?: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'superuser';
  verified: boolean;
  joinedAt: Date;
}
