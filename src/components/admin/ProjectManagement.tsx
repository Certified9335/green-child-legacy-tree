
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, PenLine, Plus } from "lucide-react";
import { Project, ProjectStatus } from '@/types/project';
import { mockProjects } from '@/data/mockProjects';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ProjectManagementProps {
  onAction: (action: string, item: string) => void;
}

const ProjectManagement: React.FC<ProjectManagementProps> = ({ onAction }) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [filter, setFilter] = useState<ProjectStatus>('all');
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    location: '',
    status: 'upcoming' as Exclude<ProjectStatus, 'all'>,
    treesPlanted: 0,
    treesGoal: 100
  });
  
  const { toast } = useToast();

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter);

  const handleApprove = (id: string) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, approved: true } : project
    ));
    onAction('Approved', 'project');
    
    toast({
      title: "Project approved",
      description: "Project has been approved successfully",
    });
  };

  const handleReject = (id: string) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, approved: false } : project
    ));
    onAction('Rejected', 'project');
    
    toast({
      title: "Project rejected",
      description: "Project has been rejected",
    });
  };

  const handleAddProject = () => {
    if (!newProject.title || !newProject.location) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields",
      });
      return;
    }

    const newId = Date.now().toString();
    const projectToAdd: Project = {
      id: newId,
      title: newProject.title,
      location: newProject.location,
      status: newProject.status,
      treesPlanted: newProject.treesPlanted,
      treesGoal: newProject.treesGoal,
      approved: false,
      description: `New project in ${newProject.location}`,
    };

    const updatedProjects = [projectToAdd, ...projects];
    setProjects(updatedProjects);
    
    localStorage.setItem('admin_projects', JSON.stringify(updatedProjects));
    
    setNewProject({
      title: '',
      location: '',
      status: 'upcoming' as Exclude<ProjectStatus, 'all'>,
      treesPlanted: 0,
      treesGoal: 100
    });
    setIsAddProjectDialogOpen(false);
    onAction('Added new', 'project');

    toast({
      title: "Project added",
      description: "New project has been added successfully",
    });
  };
  
  React.useEffect(() => {
    const savedProjects = localStorage.getItem('admin_projects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (error) {
        console.error('Error loading projects from localStorage:', error);
      }
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Project Management</h2>
        <Button 
          className="bg-eco-green hover:bg-eco-green-dark"
          onClick={() => setIsAddProjectDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Project
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

      <Dialog open={isAddProjectDialogOpen} onOpenChange={setIsAddProjectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Add a new tree planting project to the system.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input 
                id="title" 
                value={newProject.title} 
                onChange={e => setNewProject({...newProject, title: e.target.value})}
                placeholder="Enter project title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                value={newProject.location} 
                onChange={e => setNewProject({...newProject, location: e.target.value})}
                placeholder="Enter project location"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select 
                id="status"
                className="w-full p-2 border rounded"
                value={newProject.status}
                onChange={e => setNewProject({...newProject, status: e.target.value as Exclude<ProjectStatus, 'all'>})}
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="requested">Requested</option>
                <option value="onhand">On Hand</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="treesPlanted">Trees Planted</Label>
                <Input 
                  id="treesPlanted" 
                  type="number"
                  value={newProject.treesPlanted} 
                  onChange={e => setNewProject({...newProject, treesPlanted: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="treesGoal">Trees Goal</Label>
                <Input 
                  id="treesGoal" 
                  type="number"
                  value={newProject.treesGoal} 
                  onChange={e => setNewProject({...newProject, treesGoal: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProjectDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProject} className="bg-eco-green hover:bg-eco-green-dark">Add Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManagement;
