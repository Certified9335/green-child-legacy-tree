
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, PenLine } from "lucide-react";
import { Project, ProjectStatus } from '@/types/project';
import { mockProjects } from '@/data/mockProjects';

interface ProjectManagementProps {
  onAction: (action: string, item: string) => void;
}

const ProjectManagement: React.FC<ProjectManagementProps> = ({ onAction }) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [filter, setFilter] = useState<ProjectStatus | 'all'>('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter);

  const handleApprove = (id: string) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, approved: true } : project
    ));
    onAction('Approved', 'project');
  };

  const handleReject = (id: string) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, approved: false } : project
    ));
    onAction('Rejected', 'project');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Project Management</h2>
        <Button className="bg-eco-green hover:bg-eco-green-dark">
          Add New Project
        </Button>
      </div>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {(['all', 'upcoming', 'ongoing', 'requested', 'onhand', 'completed'] as const).map((status) => (
            <Button 
              key={status}
              variant={filter === status ? "default" : "outline"}
              onClick={() => setFilter(status)}
              className={filter === status ? "bg-eco-green hover:bg-eco-green-dark" : ""}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableCaption>List of all projects</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>{project.location}</TableCell>
                <TableCell>
                  <Badge className={`
                    ${project.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                    ${project.status === 'ongoing' ? 'bg-blue-100 text-blue-800' : ''}
                    ${project.status === 'upcoming' ? 'bg-purple-100 text-purple-800' : ''}
                    ${project.status === 'requested' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${project.status === 'onhand' ? 'bg-orange-100 text-orange-800' : ''}
                  `}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {project.treesPlanted !== undefined && project.treesGoal !== undefined ? (
                    `${project.treesPlanted}/${project.treesGoal} trees`
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => onAction('Edit', project.title)}
                    >
                      <PenLine className="h-4 w-4" />
                      <span>Edit</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200 flex items-center gap-1"
                      onClick={() => handleApprove(project.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Approve</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 flex items-center gap-1"
                      onClick={() => handleReject(project.id)}
                    >
                      <XCircle className="h-4 w-4" />
                      <span>Reject</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProjectManagement;
