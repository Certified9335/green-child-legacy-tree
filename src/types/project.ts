
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
}
