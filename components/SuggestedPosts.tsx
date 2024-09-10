import { Post } from "../types";
import PostCard from "./PostCard";

interface SuggestedPostsProps {
  posts: Post[];
}

export default function SuggestedPosts({ posts }: SuggestedPostsProps) {
  return (
    <div>
      <h2 className="mt-8">Suggested Posts</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
