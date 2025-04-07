
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          One Tree One Child
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
          Join our mission to create a greener future by planting a tree for every child. 
          Track your trees, measure your environmental impact, and connect with a community of like-minded individuals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/dashboard">
              Get Started
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/about">
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
