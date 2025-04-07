
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TreeDeciduous, Book, Video, FileText } from 'lucide-react';

// Sample resource data for demo purposes
const mockResources = {
  articles: [
    {
      id: 1,
      title: "The Importance of Trees in Urban Areas",
      description: "Learn about the environmental impact of planting trees in cities and urban spaces.",
      type: "article",
      readTime: "5 min read",
      category: "Environment",
      thumbnail: "https://images.unsplash.com/photo-1597673030062-0a0f1a801a31"
    },
    {
      id: 2,
      title: "Best Tree Species for Carbon Capture",
      description: "Discover which tree species are most effective for carbon sequestration.",
      type: "article",
      readTime: "8 min read",
      category: "Science",
      thumbnail: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86"
    },
    {
      id: 3,
      title: "How to Involve Children in Tree Planting",
      description: "Tips and activities for engaging children in environmental conservation through tree planting.",
      type: "article",
      readTime: "6 min read",
      category: "Education",
      thumbnail: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9"
    }
  ],
  videos: [
    {
      id: 4,
      title: "Tree Planting 101: A Beginner's Guide",
      description: "Step-by-step tutorial on how to plant and care for young trees.",
      type: "video",
      duration: "12:45",
      category: "Tutorial",
      thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
    },
    {
      id: 5,
      title: "The Amazing Science Behind Tree Growth",
      description: "Explore the fascinating biological processes that allow trees to grow and thrive.",
      type: "video",
      duration: "18:20",
      category: "Science",
      thumbnail: "https://images.unsplash.com/photo-1501261379837-c3b516327829"
    }
  ],
  guides: [
    {
      id: 6,
      title: "Complete Guide to Tree Identification",
      description: "Learn to identify common tree species by their leaves, bark, and other characteristics.",
      type: "guide",
      pages: 24,
      category: "Field Guide",
      thumbnail: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc"
    },
    {
      id: 7,
      title: "Tree Care Through the Seasons",
      description: "Seasonal maintenance tips to keep your trees healthy all year round.",
      type: "guide",
      pages: 18,
      category: "Maintenance",
      thumbnail: "https://images.unsplash.com/photo-1524146128017-b9dd0bfd2778"
    }
  ]
};

const Resources = () => {
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
                  {mockResources.articles.map(resource => (
                    <Card key={resource.id}>
                      <div 
                        className="h-40 w-full bg-cover bg-center rounded-t-lg"
                        style={{ 
                          backgroundImage: `url(${resource.thumbnail}?auto=format&fit=crop&w=500&h=300)`
                        }}
                      />
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{resource.category}</Badge>
                          <span className="text-xs text-muted-foreground">{resource.readTime}</span>
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
                  {mockResources.videos.map(resource => (
                    <Card key={resource.id}>
                      <div 
                        className="h-48 w-full bg-cover bg-center rounded-t-lg relative"
                        style={{ 
                          backgroundImage: `url(${resource.thumbnail}?auto=format&fit=crop&w=600&h=400)`
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
                          <span className="text-xs text-muted-foreground">{resource.duration}</span>
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
                  {mockResources.guides.map(resource => (
                    <Card key={resource.id}>
                      <div 
                        className="h-48 w-full bg-cover bg-center rounded-t-lg"
                        style={{ 
                          backgroundImage: `url(${resource.thumbnail}?auto=format&fit=crop&w=600&h=400)`
                        }}
                      />
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{resource.category}</Badge>
                          <span className="text-xs text-muted-foreground">{resource.pages} pages</span>
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
      
      <Footer />
    </div>
  );
};

export default Resources;
