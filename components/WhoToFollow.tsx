import { User } from "../types";
import UserCard from "./UserCard";

interface WhoToFollowProps {
  users: User[];
}

export default function WhoToFollow({ users }: WhoToFollowProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Who to Follow</h2>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
