// /app/page.tsx
import { Post, User } from "../types";
import SuggestedPosts from "../components/SuggestedPosts";
import WhoToFollow from "../components/WhoToFollow";
import RecentPosts from "../components/RecentPosts";
import { getSuggestedPosts, getWhoToFollow } from "../utils/api";

export default async function FeedPage() {
  const suggestedPosts: Post[] = await getSuggestedPosts();
  const whoToFollow: User[] = await getWhoToFollow();

  return (
    <>
      <h3 className="w-full flex items-center justify-center h-14 border-b border-slate-200 shadow-[0_1px_3px_rgba(26,26,26,0.08)]">
        Feed
      </h3>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-1 gap-8">
        <div className="col-span-2">
          <SuggestedPosts posts={suggestedPosts} />
          <WhoToFollow users={whoToFollow} />
          <RecentPosts />
        </div>
      </div>
    </>
  );
}
