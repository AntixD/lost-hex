import { Post, User } from "../types";
import SuggestedPosts from "../components/SuggestedPosts";
import WhoToFollow from "../components/WhoToFollow";
import RecentPosts from "../components/RecentPosts";
import { getSuggestedPosts, getWhoToFollow } from "../utils/api";

export default async function FeedPage() {
  let suggestedPosts: Post[] | null = null;
  let whoToFollow: User[] = [];
  let errorMessage = "";
  let isLoading = true;

  try {
    suggestedPosts = await getSuggestedPosts();
    whoToFollow = await getWhoToFollow();
  } catch (error) {
    errorMessage = (error as Error).message;
    console.error("Error fetching data:", error);
  } finally {
    isLoading = false;
  }

  if (errorMessage) {
    return (
      <>
        <h3 className="w-full flex items-center justify-center h-14 border-b border-slate-200 shadow-[0_1px_3px_rgba(26,26,26,0.08)]">
          Feed
        </h3>
        <div className="container mx-auto grid grid-cols-1 gap-8 mt-8">
          <div className="text-center">
            <div className="text-xl font-bold">Error loading posts</div>
            <p>We’re so sorry but it’s for the test.</p>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">Error loading users</div>
            <p>We’re so sorry but it’s for the test.</p>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <h3 className="w-full flex items-center justify-center h-14 border-b border-slate-200 shadow-[0_1px_3px_rgba(26,26,26,0.08)]">
          Feed
        </h3>
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          <p className="ml-4 text-lg">Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <h3 className="w-full flex items-center justify-center h-14 border-b border-slate-200 shadow-[0_1px_3px_rgba(26,26,26,0.08)]">
        Feed
      </h3>
      <div className="px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="col-span-2">
            {suggestedPosts && <SuggestedPosts posts={suggestedPosts} />}
            <WhoToFollow users={whoToFollow} />
            <RecentPosts />
          </div>
        </div>
      </div>
    </>
  );
}
