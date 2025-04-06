
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TreeStatsProps {
  totalTrees: number;
  co2Absorbed: number; // in kg
  childrenConnected: number;
  treesAddedThisMonth: number;
}

const TreeStats = ({
  totalTrees,
  co2Absorbed,
  childrenConnected,
  treesAddedThisMonth,
}: TreeStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Trees Planted
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <span className="text-3xl font-bold text-eco-green-dark">{totalTrees}</span>
            <span className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
              +{treesAddedThisMonth} this month
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            CO2 Absorbed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-eco-green-dark">
            {co2Absorbed} <span className="text-base font-normal">kg</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Equivalent to {(co2Absorbed / 12).toFixed(1)} car trips
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Children Connected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-eco-green-dark">
            {childrenConnected}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Creating lifelong bonds with nature
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Environmental Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-eco-green-dark">
            🌎
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Contributing to a greener future
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreeStats;
