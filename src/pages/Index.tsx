
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-pattern py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-eco-green-dark mb-6">
                Plant a Tree, <br />
                Nurture a <span className="highlight-text">Legacy</span>
              </h1>
              <p className="text-xl mb-8 text-foreground max-w-lg">
                Connect every child with a growing tree, creating a lifelong bond with nature
                while helping to combat climate change, one tree at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button className="bg-eco-green hover:bg-eco-green-dark text-white px-8 py-6 text-lg">
                    Join the Movement
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white px-8 py-6 text-lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 animate-float">
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                alt="Child planting a tree"
                className="rounded-3xl tree-border shadow-xl max-h-96 w-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display text-eco-green-dark mb-2">
              Our Collective Impact
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Together we're making a difference for our planet's future
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center py-8 border-eco-green/20">
              <CardContent>
                <div className="text-5xl font-bold text-eco-green mb-2">1,234</div>
                <div className="text-lg font-medium text-foreground">Trees Planted</div>
              </CardContent>
            </Card>
            
            <Card className="text-center py-8 border-eco-green/20">
              <CardContent>
                <div className="text-5xl font-bold text-eco-green mb-2">856</div>
                <div className="text-lg font-medium text-foreground">Children Connected</div>
              </CardContent>
            </Card>
            
            <Card className="text-center py-8 border-eco-green/20">
              <CardContent>
                <div className="text-5xl font-bold text-eco-green mb-2">24,680</div>
                <div className="text-lg font-medium text-foreground">kg CO₂ Absorbed</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display text-eco-green-dark mb-2">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to create a lasting impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-eco-green-dark">Plant a Tree</h3>
              <p className="text-muted-foreground">
                Choose a location, plant your tree, and register it in our system with details and photos.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-3xl">👦</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-eco-green-dark">Connect a Child</h3>
              <p className="text-muted-foreground">
                Associate your tree with a child, creating a special bond between them and nature.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-eco-green-dark">Watch Both Grow</h3>
              <p className="text-muted-foreground">
                Update your tree's progress regularly and see its environmental impact increase over time.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/signup">
              <Button className="bg-eco-green hover:bg-eco-green-dark text-white">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonial */}
      <section className="bg-eco-green-dark text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-5xl mb-6 inline-block">🌳</span>
            <blockquote className="text-2xl md:text-3xl font-light italic mb-6">
              "Watching our tree grow alongside my daughter has been an incredible experience. 
              She's learning about responsibility, nature, and the importance of caring for our planet."
            </blockquote>
            <div className="flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Sarah Johnson"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div className="text-left">
                <div className="font-medium">Sarah Johnson</div>
                <div className="text-white/70 text-sm">Parent & Tree Planter</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="bg-eco-green/10 rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl md:text-3xl font-bold font-display text-eco-green-dark mb-2">
                  Ready to make a difference?
                </h2>
                <p className="text-muted-foreground max-w-lg">
                  Join thousands of families connecting children with trees and 
                  creating a greener future for generations to come.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button className="bg-eco-green hover:bg-eco-green-dark text-white px-6">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/resources">
                  <Button variant="outline" className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white px-6">
                    Explore Resources
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
