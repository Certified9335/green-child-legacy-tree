
import { Project } from '@/types/project';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Urban Forest Initiative',
    description: 'A community project to increase urban tree coverage in downtown areas, focusing on native species that provide shade and habitat for local wildlife.',
    status: 'ongoing',
    location: 'Downtown Metro Area',
    startDate: new Date('2023-03-15'),
    treesPlanted: 350,
    treesGoal: 1000,
    coordinator: 'Emma Johnson',
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=500'
  },
  {
    id: '2',
    title: 'School Yard Transformation',
    description: 'Converting barren school yards into green spaces with tree canopies to provide shade and educational opportunities for students.',
    status: 'upcoming',
    location: 'Various School Districts',
    startDate: new Date('2024-06-01'),
    treesGoal: 500,
    coordinator: 'Michael Chen',
    coverImage: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=500'
  },
  {
    id: '3',
    title: 'Coastal Mangrove Restoration',
    description: 'Restoring mangrove forests along coastal areas to protect shorelines, filter water, and provide critical habitat for marine life.',
    status: 'requested',
    location: 'Coastal Wetlands',
    coordinator: 'Dr. Sophie Martinez',
    coverImage: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=500'
  },
  {
    id: '4',
    title: 'Highway Corridor Greening',
    description: 'Planting trees along highway corridors to reduce noise pollution, improve air quality, and enhance the visual environment for travelers.',
    status: 'onhand',
    location: 'Interstate Highway System',
    startDate: new Date('2024-04-10'),
    treesGoal: 2000,
    coordinator: 'James Wilson',
    coverImage: 'https://images.unsplash.com/photo-1486912500284-6f2462ba07ea?auto=format&fit=crop&w=500'
  },
  {
    id: '5',
    title: 'Historic Park Revitalization',
    description: 'Replacing aged and diseased trees in historic parks while preserving the original landscape design and introducing resilient species.',
    status: 'completed',
    location: 'Heritage Park',
    startDate: new Date('2023-01-10'),
    endDate: new Date('2023-09-15'),
    treesPlanted: 120,
    treesGoal: 120,
    coordinator: 'Lisa Anderson',
    coverImage: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=500'
  },
  {
    id: '6',
    title: 'Community Fruit Tree Initiative',
    description: 'Establishing community orchards in urban neighborhoods to provide free access to fresh fruit and educational opportunities about food systems.',
    status: 'ongoing',
    location: 'Multiple Urban Neighborhoods',
    startDate: new Date('2023-10-01'),
    treesPlanted: 75,
    treesGoal: 300,
    coordinator: 'Carlos Rodriguez',
    coverImage: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=500'
  },
  {
    id: '7',
    title: 'Reforestation After Wildfires',
    description: 'Replanting native tree species in areas devastated by wildfires to speed up forest recovery and prevent soil erosion.',
    status: 'requested',
    location: 'Northern Forest Region',
    treesGoal: 5000,
    coordinator: 'Sarah Thompson',
    coverImage: 'https://images.unsplash.com/photo-1593005510329-8a4035a7238f?auto=format&fit=crop&w=500'
  },
  {
    id: '8',
    title: 'Corporate Campus Greening',
    description: 'Partnering with local corporations to enhance their campuses with native trees, creating better working environments and ecological benefits.',
    status: 'completed',
    location: 'Technology Park',
    startDate: new Date('2022-04-22'),
    endDate: new Date('2022-11-15'),
    treesPlanted: 230,
    treesGoal: 200,
    coordinator: 'Robert Kim',
    coverImage: 'https://images.unsplash.com/photo-1520262454473-a1a82276a574?auto=format&fit=crop&w=500'
  },
  {
    id: '9',
    title: 'Watershed Protection Planting',
    description: 'Strategic tree planting in watershed areas to improve water quality, reduce runoff, and enhance habitat connectivity.',
    status: 'upcoming',
    location: 'River Basin Area',
    startDate: new Date('2024-09-01'),
    treesGoal: 3000,
    coordinator: 'Dr. Alan Murray',
    coverImage: 'https://images.unsplash.com/photo-1563952093-2f96cafc4739?auto=format&fit=crop&w=500'
  }
];
