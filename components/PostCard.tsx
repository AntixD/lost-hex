import Link from "next/link";
import { Post } from "../types";
import { forwardRef } from "react";

interface PostCardProps {
  post: Post;
}

const PostCard = forwardRef<HTMLDivElement, PostCardProps>(function PostCard(
  { post }: PostCardProps,
  ref
) {
  const user = post.user;

  return (
    <div className="border rounded-2xl shadow-sm mt-4 bg-white" ref={ref}>
      <div className="flex items-start space-x-4 p-4">
        <Link href={`/profile/${post.userId}`}>
          <img
            width={40}
            height={40}
            src="/avatar.png"
            alt={`${user.firstName} ${user.lastName}'s avatar`}
            className="w-10 h-10 rounded-full transition-opacity duration-300 hover:opacity-80"
          />
        </Link>
        <div>
          <Link href={`/profile/${post.userId}`}>
            <h4 className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-black after:left-0 after:bottom-[2px] after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left">
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
      <div className="ml-[72px]">
        <div className="mt-2">
          <p className="body-medium -mt-4 pr-6">{post.body}</p>
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
        <div className="flex items-center space-x-6 px-4 py-2 mb-2">
          <span className="flex items-center gap-x-1 body-medium">
            <img width={16} height={16} alt="like" src="/icon.png" />
            {post.reactions.likes}
          </span>
          <span className="flex items-center gap-x-1 body-medium">
            <img width={16} height={16} alt="dislike" src="/icon (2).png" />
            {post.reactions.dislikes}
          </span>
          <span className="flex items-center gap-x-1 body-medium">
            <img width={16} height={16} alt="views" src="/icon (1).png" />
            {post.views}
          </span>
        </div>
      </div>
    </div>
  );
});

export default PostCard;
