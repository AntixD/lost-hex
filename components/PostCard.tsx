import Link from "next/link";
import { Post } from "../types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const user = post.user;

  return (
    <div className="border p-4 mb-4 rounded">
      <Link href={`/profile/${post.userId}`}>
        <h3 className="font-bold text-lg">
          {user ? (
            <>
              {user.firstName} {user.lastName}
            </>
          ) : (
            "Anonymous User"
          )}
        </h3>
      </Link>
      <p>{post.body}</p>
      <div className="flex items-center mt-2">
        <span>👍 {post.reactions.likes}</span>
        <span className="ml-4">👎 {post.reactions.dislikes}</span>
        <span className="ml-4">👁️ {post.views}</span>
      </div>
    </div>
  );
}
