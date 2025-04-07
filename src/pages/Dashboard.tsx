
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Trees</CardTitle>
            <CardDescription>Manage and track your planted trees</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You have 0 trees planted so far.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/add-tree">Plant a Tree</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Environmental Impact</CardTitle>
            <CardDescription>Your contribution to the environment</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Track your environmental impact as you plant more trees.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link to="/impact">View Impact</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your account</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Update your profile and preferences</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link to="/profile">View Profile</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
