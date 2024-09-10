import { User } from "../types";
import Link from "next/link";
import Button from "./Button";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link href={`/profile/${user.id}`}>
          <img
            width={40}
            height={40}
            src="/Avatar.png"
            alt={`${user.firstName} ${user.lastName}'s avatar`}
            className="w-10 h-10 rounded-full transition-opacity duration-300 hover:opacity-80"
          />
        </Link>
        <div>
          <Link href={`/profile/${user.id}`}>
            <h4 className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-black after:left-0 after:bottom-[2px] after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left">
              {user.firstName} {user.lastName}
            </h4>
          </Link>
          <p className="body-small">@{user.username}</p>
        </div>
      </div>
      <Button title="Follow" variant="two" />
    </div>
  );
}
