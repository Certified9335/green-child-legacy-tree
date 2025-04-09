
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { 
  Leaf, 
  Users, 
  Heart, 
  School, 
  GraduationCap, 
  Globe
} from 'lucide-react';

const About = () => {
  return (
    <AppLayout>
      <div className="bg-eco-green/5 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold font-display text-eco-green-dark mb-4">
              About OneTreeOneChild
            </h1>
            <p className="text-lg text-muted-foreground">
              Connecting children with nature, one tree at a time
            </p>
          </div>
          
          <div className="grid gap-16">
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold font-display text-eco-green-dark mb-6">
                Our Mission
              </h2>
              <p className="mb-6 text-lg">
                OneTreeOneChild was founded with a simple yet powerful mission: to create a 
                sustainable future by connecting children with the natural world through the act 
                of planting and nurturing trees.
              </p>
              <p className="text-lg">
                We believe that when a child plants a tree, they develop a personal bond with 
                nature that lasts a lifetime. This connection fosters environmental stewardship, 
                promotes ecological awareness, and creates a generation of earth-conscious individuals.
              </p>
            </section>
            
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold font-display text-eco-green-dark mb-6">
                What We Do
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start">
                  <div className="bg-eco-green/10 p-3 rounded-full mr-4">
                    <Leaf className="h-6 w-6 text-eco-green" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Tree Planting Programs</h3>
                    <p>
                      We organize tree planting events in schools, communities, and public spaces, 
                      where children can plant their own trees and learn about their importance.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-eco-green/10 p-3 rounded-full mr-4">
                    <School className="h-6 w-6 text-eco-green" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Environmental Education</h3>
                    <p>
                      We develop educational programs that teach children about biodiversity, 
                      climate change, and sustainable practices through hands-on activities.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-eco-green/10 p-3 rounded-full mr-4">
                    <Users className="h-6 w-6 text-eco-green" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Community Building</h3>
                    <p>
                      We bring together families, schools, and local organizations to create 
                      green spaces that benefit entire communities for generations.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-eco-green/10 p-3 rounded-full mr-4">
                    <GraduationCap className="h-6 w-6 text-eco-green" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Research & Innovation</h3>
                    <p>
                      We support research on the best practices for tree planting and environmental 
                      education, continually improving our programs for maximum impact.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold font-display text-eco-green-dark mb-6">
                Our Impact
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="p-6 bg-eco-green/5 rounded-lg">
                  <p className="text-4xl font-bold text-eco-green-dark mb-2">10,000+</p>
                  <p className="text-sm text-muted-foreground">Trees Planted</p>
                </div>
                <div className="p-6 bg-eco-green/5 rounded-lg">
                  <p className="text-4xl font-bold text-eco-green-dark mb-2">5,000+</p>
                  <p className="text-sm text-muted-foreground">Children Engaged</p>
                </div>
                <div className="p-6 bg-eco-green/5 rounded-lg">
                  <p className="text-4xl font-bold text-eco-green-dark mb-2">50+</p>
                  <p className="text-sm text-muted-foreground">Schools Partnered</p>
                </div>
                <div className="p-6 bg-eco-green/5 rounded-lg">
                  <p className="text-4xl font-bold text-eco-green-dark mb-2">25+</p>
                  <p className="text-sm text-muted-foreground">Countries Reached</p>
                </div>
              </div>
            </section>
            
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold font-display text-eco-green-dark mb-6">
                Join Our Mission
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-eco-green/5 p-6 rounded-lg text-center">
                  <Heart className="h-10 w-10 text-eco-green mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Donate</h3>
                  <p className="mb-4">
                    Your contribution helps us plant more trees and develop educational programs.
                  </p>
                  <a href="/donate" className="text-eco-green font-medium hover:underline">
                    Make a Donation →
                  </a>
                </div>
                
                <div className="bg-eco-green/5 p-6 rounded-lg text-center">
                  <Users className="h-10 w-10 text-eco-green mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Volunteer</h3>
                  <p className="mb-4">
                    Join us at tree planting events or help with educational initiatives.
                  </p>
                  <a href="/contact" className="text-eco-green font-medium hover:underline">
                    Become a Volunteer →
                  </a>
                </div>
                
                <div className="bg-eco-green/5 p-6 rounded-lg text-center">
                  <Globe className="h-10 w-10 text-eco-green mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Partner with Us</h3>
                  <p className="mb-4">
                    Schools, organizations, and businesses can partner with us on projects.
                  </p>
                  <a href="/contact" className="text-eco-green font-medium hover:underline">
                    Explore Partnerships →
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default About;
