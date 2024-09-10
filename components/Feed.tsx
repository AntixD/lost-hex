import { Post, User } from "../types";
import SuggestedPosts from "./SuggestedPosts";
import WhoToFollow from "./WhoToFollow";
import RecentPosts from "./RecentPosts";

interface FeedProps {
  suggestedPosts: Post[];
  whoToFollow: User[];
}

export default function Feed({ suggestedPosts, whoToFollow }: FeedProps) {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Feed</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <SuggestedPosts posts={suggestedPosts} />

          <RecentPosts />
        </div>

        <div>
          <WhoToFollow users={whoToFollow} />
        </div>
      </div>
    </div>
  );
}
