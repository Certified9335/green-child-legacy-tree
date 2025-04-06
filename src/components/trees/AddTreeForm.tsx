
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const treeSpecies = [
  'Oak',
  'Maple',
  'Pine',
  'Birch',
  'Cedar',
  'Willow',
  'Cherry',
  'Apple',
  'Fir',
  'Redwood',
  'Other'
];

const AddTreeForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!date) {
      toast.error("Please select a planting date");
      return;
    }
    
    setIsLoading(true);
    
    // This would be replaced with actual API call in the real implementation
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Tree added successfully!');
      setIsLoading(false);
      // Reset form would happen here
    } catch (error) {
      console.error('Error adding tree:', error);
      toast.error('Failed to add tree. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border">
      <h2 className="text-2xl font-display font-bold text-eco-green-dark mb-6">
        Register a New Tree
      </h2>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Tree Details</h3>
            
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="species">Tree Species</Label>
                <Select disabled={isLoading} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select species" />
                  </SelectTrigger>
                  <SelectContent>
                    {treeSpecies.map(species => (
                      <SelectItem key={species} value={species.toLowerCase()}>
                        {species}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="location">Location Description</Label>
                <Input 
                  id="location"
                  placeholder="e.g., Backyard, Community Garden"
                  disabled={isLoading}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="date">Planting Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={isLoading}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date > new Date()}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Additional Information</h3>
            
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="child-name">Dedicated to (Optional)</Label>
                <Input 
                  id="child-name"
                  placeholder="Child's name"
                  disabled={isLoading}
                />
                <p className="text-sm text-muted-foreground">
                  Name of the child this tree is dedicated to
                </p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes"
                  placeholder="Any additional information about the tree"
                  rows={4}
                  disabled={isLoading}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="image">Tree Photo</Label>
                <div className="mt-1 flex items-center">
                  <label className="block">
                    <span className="sr-only">Choose photo</span>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={isLoading}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-eco-green-light file:text-eco-green-dark hover:file:bg-eco-green-light/80"
                    />
                  </label>
                </div>
                
                {selectedImage && (
                  <div className="mt-2">
                    <img 
                      src={selectedImage} 
                      alt="Selected tree" 
                      className="h-32 w-auto object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6 flex justify-end">
          <Button 
            type="submit" 
            className="bg-eco-green hover:bg-eco-green-dark text-white"
            disabled={isLoading}
          >
            {isLoading ? "Registering Tree..." : "Register Tree"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTreeForm;
