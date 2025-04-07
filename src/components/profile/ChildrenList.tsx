
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import AddChildDialog from "./AddChildDialog";

type Child = {
  id: string;
  name: string;
  age: number;
  treesPlanted: number;
};

const ChildrenList = () => {
  const [children, setChildren] = useState<Child[]>([
    {
      id: "1",
      name: "Emma Doe",
      age: 10,
      treesPlanted: 5,
    },
    {
      id: "2",
      name: "Liam Doe",
      age: 8,
      treesPlanted: 4,
    },
    {
      id: "3",
      name: "Sophia Doe",
      age: 6,
      treesPlanted: 3,
    },
  ]);

  const [isAddChildOpen, setIsAddChildOpen] = useState(false);

  const handleAddChild = (child: Omit<Child, "id">) => {
    const newChild = {
      ...child,
      id: `${Date.now()}`, // Simple ID generation
    };
    setChildren([...children, newChild]);
    setIsAddChildOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Children</h2>
        <Button onClick={() => setIsAddChildOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Child
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children.map((child) => (
          <Card key={child.id}>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <Avatar>
                <AvatarFallback>{child.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{child.name}</CardTitle>
                <CardDescription>{child.age} years old</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm">Trees planted:</span>
                <Badge variant="secondary">{child.treesPlanted}</Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="default" size="sm">
                View Trees
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AddChildDialog
        open={isAddChildOpen}
        onOpenChange={setIsAddChildOpen}
        onAddChild={handleAddChild}
      />
    </>
  );
};

export default ChildrenList;
