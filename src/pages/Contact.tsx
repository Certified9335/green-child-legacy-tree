import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Spinner } from '@/components/ui/spinner';
import { submitContactForm, ContactMessage } from '@/services/contactService';
import { useAuth } from '@/contexts/AuthContext';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

const Contact = () => {
  const { user, profile } = useAuth();
  const [name, setName] = useState(profile?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [contactType, setContactType] = useState<ContactMessage['type']>('individual');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      return;
    }
    
    try {
      setLoading(true);
      
      const result = await submitContactForm({
        name,
        email,
        phone,
        message,
        type: contactType
      });
      
      if (result) {
        setName(profile?.full_name || '');
        setEmail(user?.email || '');
        setPhone('');
        setMessage('');
        
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-display text-eco-green-dark mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions? Want to get involved? We'd love to hear from you!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label>I am contacting as a:</Label>
                    <RadioGroup 
                      value={contactType} 
                      onValueChange={(value) => setContactType(value as ContactMessage['type'])}
                      className="flex flex-col space-y-2 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="individual" id="individual" />
                        <Label htmlFor="individual">Individual</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="volunteer" id="volunteer" />
                        <Label htmlFor="volunteer">Potential Volunteer</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sponsor" id="sponsor" />
                        <Label htmlFor="sponsor">Potential Sponsor</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="donor" id="donor" />
                        <Label htmlFor="donor">Potential Donor</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-eco-green hover:bg-eco-green-dark"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Spinner size="sm" />
                        Sending...
                      </span>
                    ) : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-eco-green/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-eco-green mt-1" />
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-muted-foreground">
                        45 Ngong Road, Karen<br />
                        Nairobi, 00200<br />
                        Kenya
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-eco-green mt-1" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">
                        <a href="mailto:info@onetreeonechild.org" className="hover:underline hover:text-eco-green">
                          info@onetreeonechild.org
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-eco-green mt-1" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-muted-foreground">
                        <a href="tel:+254722123456" className="hover:underline hover:text-eco-green">
                          +254 722 123 456
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-eco-green mt-1" />
                    <div>
                      <div className="font-medium">Office Hours</div>
                      <div className="text-muted-foreground">
                        Monday - Friday: 8am - 5pm<br />
                        Saturday: 9am - 1pm<br />
                        Sunday: Closed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-2xl font-bold mb-4">How You Can Help</h2>
                <p className="text-muted-foreground mb-4">
                  There are many ways to get involved with our mission:
                </p>
                
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-eco-green">•</span>
                    <span>Volunteer for tree planting events</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-eco-green">•</span>
                    <span>Sponsor a tree or a planting event</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-eco-green">•</span>
                    <span>Make a tax-deductible donation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-eco-green">•</span>
                    <span>Become a corporate partner</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-eco-green">•</span>
                    <span>Share our mission on social media</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Contact;
