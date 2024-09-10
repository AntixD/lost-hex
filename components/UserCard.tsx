import { User } from "../types";
import Link from "next/link";
import Image from "next/image"; // For avatar

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link href={`/profile/${user.id}`}>
          <Image
            width={48}
            height={48}
            src="/avatar.png"
            alt={`${user.firstName} ${user.lastName}'s avatar`}
            className="w-12 h-12 rounded-full"
          />
        </Link>
        <div>
          <Link href={`/profile/${user.id}`}>
            <h4>
              {user.firstName} {user.lastName}
            </h4>
          </Link>
          <p className="body-small">@{user.username}</p>
        </div>
      </div>
      <button className="border border-tertiary text-tertiary px-4 py-1 rounded-full hover:border-hoverTertiary hover:text-hoverTertiary transition">
        Follow
      </button>
    </div>
  );
}
