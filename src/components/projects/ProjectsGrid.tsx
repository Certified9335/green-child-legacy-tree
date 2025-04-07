
import React from 'react';
import { Project, ProjectStatus } from '@/types/project';
import ProjectCard from '@/components/projects/ProjectCard';
import { mockProjects } from '@/data/mockProjects';

interface ProjectsGridProps {
  status: ProjectStatus;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ status }) => {
  // Filter projects based on status
  const filteredProjects = status === 'all' 
    ? mockProjects 
    : mockProjects.filter(project => project.status === status);

  if (filteredProjects.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">No projects found</h3>
        <p>There are currently no projects with the "{status}" status.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsGrid;
