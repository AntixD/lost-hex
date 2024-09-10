import Link from "next/link";
import { Post } from "../types";
import Image from "next/image";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const user = post.user;

  return (
    <div className="border rounded-2xl shadow-sm p-4 mb-6 bg-white">
      <div className="flex items-start space-x-4">
        <Link href={`/profile/${post.userId}`}>
          <Image
            width={48}
            height={48}
            src="/avatar.png"
            alt={`${
              user ? `${user.firstName} ${user.lastName}` : "Anonymous"
            }'s avatar`}
            className="w-12 h-12 rounded-full"
          />
        </Link>
        <div>
          <Link href={`/profile/${post.userId}`}>
            <h4>
              {user ? (
                <>
                  {user.firstName} {user.lastName}
                </>
              ) : (
                "Anonymous User"
              )}
            </h4>
          </Link>
          <p className="body-small">@{user?.username || "anonymous"}</p>
        </div>
      </div>

      <div className="pl-16">
        <div className="mt-2">
          <p className="body-medium">{post.body}</p>
        </div>
        <div className="mt-2">
          {post.tags &&
            post.tags.map((tag, index) => (
              <span key={index} className="text-tertiary mr-2 body-small">
                #{tag}
              </span>
            ))}
        </div>
      </div>
      <div className="flex justify-between items-center border-t border-gray-200 mt-4 pt-2">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-x-1 body-medium">
            <Image width={16} height={16} alt="like" src="/icon.png" />
            {post.reactions.likes}
          </span>
          <span className="flex items-center gap-x-1 body-medium">
            <Image width={16} height={16} alt="dislike" src="/icon (2).png" />
            {post.reactions.dislikes}
          </span>
          <span className="flex items-center gap-x-1 body-medium">
            <Image width={16} height={16} alt="views" src="/icon (1).png" />
            {post.views}
          </span>
        </div>
      </div>
    </div>
  );
}
