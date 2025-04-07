
import React from 'react';
import { Project } from '@/types/project';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, TreeDeciduous } from 'lucide-react';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'ongoing': return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'requested': return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      case 'onhand': return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      case 'completed': return 'bg-eco-green-light/20 text-eco-green-dark hover:bg-eco-green-light/20';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const progress = project.treesPlanted && project.treesGoal 
    ? Math.round((project.treesPlanted / project.treesGoal) * 100) 
    : 0;

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      {project.coverImage && (
        <div 
          className="h-40 w-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${project.coverImage})`
          }}
        />
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <Badge className={getStatusColor(project.status)} variant="secondary">
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2">{project.title}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
          <MapPin size={14} className="text-muted-foreground" />
          {project.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
        
        {project.startDate && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Calendar size={14} />
            <span>
              Started: {format(project.startDate, 'MMM d, yyyy')}
              {project.endDate && ` - ${format(project.endDate, 'MMM d, yyyy')}`}
            </span>
          </div>
        )}
        
        {(project.treesPlanted !== undefined && project.treesGoal !== undefined) && (
          <div className="mt-3">
            <div className="flex justify-between items-center mb-2 text-sm">
              <div className="flex items-center gap-1">
                <TreeDeciduous size={16} className="text-eco-green" />
                <span>{project.treesPlanted} of {project.treesGoal} trees planted</span>
              </div>
              <span className="text-eco-green font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-muted" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
