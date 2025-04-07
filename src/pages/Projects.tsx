
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import ProjectStatusTabs from '@/components/projects/ProjectStatusTabs';
import { ProjectStatus } from '@/types/project';

const Projects = () => {
  const [activeStatus, setActiveStatus] = useState<ProjectStatus>('all');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold font-display text-eco-green-dark mb-4">
                Tree Planting Projects
              </h1>
              <p className="text-lg text-muted-foreground">
                Browse our tree planting initiatives categorized by their current status.
              </p>
            </div>
            
            <ProjectStatusTabs activeStatus={activeStatus} onStatusChange={setActiveStatus} />
            <ProjectsGrid status={activeStatus} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
