
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface TreeCardProps {
  id: string;
  species: string;
  location: string;
  plantedDate: string;
  childName?: string;
  imageUrl: string;
  status: 'healthy' | 'needs-attention' | 'unknown';
}

const TreeCard = ({
  id,
  species,
  location,
  plantedDate,
  childName,
  imageUrl,
  status,
}: TreeCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500/80';
      case 'needs-attention':
        return 'bg-amber-500/80';
      default:
        return 'bg-gray-400/80';
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48">
        <img 
          src={imageUrl} 
          alt={`${species} tree`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={`${getStatusColor()} text-white`}>
            {status === 'healthy' ? 'Healthy' : status === 'needs-attention' ? 'Needs Attention' : 'Unknown'}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-display text-lg font-semibold">{species}</h3>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Planted:</span>
            <span>{new Date(plantedDate).toLocaleDateString()}</span>
          </div>
          
          {childName && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Dedicated to:</span>
              <span className="font-medium">{childName}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Link to={`/trees/${id}`} className="w-full">
          <Button variant="outline" className="w-full border-eco-green text-eco-green hover:bg-eco-green hover:text-white">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TreeCard;
