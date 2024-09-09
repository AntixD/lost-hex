// /app/page.tsx
import { Post, User } from "../types";
import SuggestedPosts from "../components/SuggestedPosts";
import WhoToFollow from "../components/WhoToFollow";
import RecentPosts from "../components/RecentPosts";
import { getSuggestedPosts, getWhoToFollow } from "../utils/api";

export default async function FeedPage() {
  // Fetch data directly in the server component
  const suggestedPosts: Post[] = await getSuggestedPosts();
  const whoToFollow: User[] = await getWhoToFollow();

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          {/* Suggested Posts Section */}
          <SuggestedPosts posts={suggestedPosts} />

          {/* Recent Posts Section */}
          <RecentPosts />
        </div>

        <div>
          {/* Who to Follow Section */}
          <WhoToFollow users={whoToFollow} />
        </div>
      </div>
    </div>
  );
}
