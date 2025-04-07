
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useState } from "react";

const ProfileHeader = () => {
  const [user] = useState({
    name: "Jane Doe",
    username: "jane_environmental",
    avatarUrl: "",
  });

  return (
    <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-start gap-6">
      <div className="relative">
        <Avatar className="h-24 w-24">
          {user.avatarUrl ? (
            <AvatarImage src={user.avatarUrl} alt={user.name} />
          ) : (
            <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
          )}
        </Avatar>
        <Button 
          size="sm" 
          variant="secondary" 
          className="absolute bottom-0 right-0 rounded-full p-1 h-8 w-8"
        >
          <Camera className="h-4 w-4" />
          <span className="sr-only">Upload avatar</span>
        </Button>
      </div>
      
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-muted-foreground">@{user.username}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
