import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Book, Video, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import ResourceViewer from '@/components/resources/ResourceViewer';
import { useToast } from '@/components/ui/use-toast';
import { mockResources } from '@/data/mockResources';

const Resources = () => {
  const [resources, setResources] = useState<Tables<'educational_resources'>[]>([]);
  const [selectedResource, setSelectedResource] = useState<Tables<'educational_resources'> | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Use mock data instead of fetching from the database
    setResources(mockResources);
  }, []);

  const handleResourceClick = (resource: Tables<'educational_resources'>) => {
    setSelectedResource(resource);
    setIsViewerOpen(true);
  };

  const filteredResources = {
    articles: resources.filter(r => r.type === 'article'),
    videos: resources.filter(r => r.type === 'video'),
    guides: resources.filter(r => r.type === 'guide'),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold font-display text-eco-green-dark mb-4">
                Educational Resources
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our collection of articles, videos, and guides to learn more about trees, 
                environmental conservation, and how you can make a difference.
              </p>
            </div>
            
            <Tabs defaultValue="articles" className="w-full">
              <TabsList className="flex w-full max-w-md mx-auto mb-8">
                <TabsTrigger value="articles" className="flex-1">
                  <Book className="w-4 h-4 mr-2" />
                  Articles
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex-1">
                  <Video className="w-4 h-4 mr-2" />
                  Videos
                </TabsTrigger>
                <TabsTrigger value="guides" className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Guides
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="articles" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.articles.map(resource => (
                    <Card key={resource.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleResourceClick(resource)}>
                      <div 
                        className="h-40 w-full bg-cover bg-center rounded-t-lg"
                        style={{ 
                          backgroundImage: `url(${resource.image_url}?auto=format&fit=crop&w=500&h=300)`
                        }}
                      />
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{resource.category}</Badge>
                          <span className="text-xs text-muted-foreground">{resource.metadata?.readTime}</span>
                        </div>
                        <CardTitle className="text-lg mt-2">{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{resource.description}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">Read Article</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="videos" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResources.videos.map(resource => (
                    <Card key={resource.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleResourceClick(resource)}>
                      <div 
                        className="h-48 w-full bg-cover bg-center rounded-t-lg relative"
                        style={{ 
                          backgroundImage: `url(${resource.image_url}?auto=format&fit=crop&w=600&h=400)`
                        }}
                      >
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-eco-green text-white flex items-center justify-center">
                            <Video className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{resource.category}</Badge>
                          <span className="text-xs text-muted-foreground">{resource.metadata?.duration}</span>
                        </div>
                        <CardTitle className="text-lg mt-2">{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{resource.description}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">Watch Video</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="guides" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResources.guides.map(resource => (
                    <Card key={resource.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleResourceClick(resource)}>
                      <div 
                        className="h-48 w-full bg-cover bg-center rounded-t-lg"
                        style={{ 
                          backgroundImage: `url(${resource.image_url}?auto=format&fit=crop&w=600&h=400)`
                        }}
                      />
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{resource.category}</Badge>
                          <span className="text-xs text-muted-foreground">{resource.metadata?.pages} pages</span>
                        </div>
                        <CardTitle className="text-lg mt-2">{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{resource.description}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">Download Guide</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      {selectedResource && (
        <ResourceViewer
          resource={selectedResource}
          isOpen={isViewerOpen}
          onClose={() => {
            setIsViewerOpen(false);
            setSelectedResource(null);
          }}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Resources;
