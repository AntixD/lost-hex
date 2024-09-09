import { User } from "../types";
import Link from "next/link";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="border p-4 mb-4 rounded flex items-center justify-between">
      <div>
        <Link href={`/profile/${user.id}`}>
          <h3 className="font-bold text-lg cursor-pointer">
            {user.firstName} {user.lastName}
          </h3>
        </Link>
        <p className="text-sm text-gray-500">@{user.username}</p>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Follow
      </button>
    </div>
  );
}
