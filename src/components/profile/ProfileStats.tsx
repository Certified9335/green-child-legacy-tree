
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, ThumbsUp, Users } from "lucide-react";

const ProfileStats = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Impact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
            <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm font-medium">Trees Planted</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium">Children</p>
            <p className="text-2xl font-bold">3</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
            <ThumbsUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-medium">Likes Received</p>
            <p className="text-2xl font-bold">47</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileStats;
