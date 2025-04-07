
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileForm from "@/components/profile/ProfileForm";
import ChildrenList from "@/components/profile/ChildrenList";

const Profile = () => {
  return (
    <div className="container mx-auto py-8">
      <ProfileHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-1">
          <ProfileStats />
        </div>
        
        <div className="md:col-span-2">
          <ProfileForm />
        </div>
      </div>
      
      <div className="mt-10">
        <ChildrenList />
      </div>
    </div>
  );
};

export default Profile;
