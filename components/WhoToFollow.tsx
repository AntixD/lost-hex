import { User } from "../types";
import UserCard from "./UserCard"; // The component we just created

interface WhoToFollowProps {
  users: User[];
}

export default function WhoToFollow({ users }: WhoToFollowProps) {
  return (
    <div className="mt-8">
      <h2>Who to follow</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
