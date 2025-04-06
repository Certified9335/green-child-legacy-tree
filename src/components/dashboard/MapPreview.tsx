
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MapPreview = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Tree Map</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-64 bg-eco-sky/30">
          {/* In a real implementation, this would be an actual map component */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBzdHJva2U9IiM0RDlGNEYiIHN0cm9rZS1vcGFjaXR5PSIuMSIgZD0iTS41IDMwaDU5bS01OS41IDBWLjVoNjB2NTloLTYweiIvPjxjaXJjbGUgZmlsbD0iIzRENUY0RiIgZmlsbC1vcGFjaXR5PSIuMSIgY3g9IjMwIiBjeT0iMzAiIHI9IjIiLz48L2c+PC9zdmc+')]"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Arbor-Living-knowledge.svg/1200px-Arbor-Living-knowledge.svg.png" 
              alt="Map placeholder"
              className="w-24 h-24 mb-4 opacity-80"
            />
            <p className="text-eco-green-dark mb-4">View all planted trees on the interactive map</p>
            <Link to="/map">
              <Button className="bg-eco-green hover:bg-eco-green-dark text-white">
                Open Full Map
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapPreview;
