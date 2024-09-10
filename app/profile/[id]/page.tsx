import Link from "next/link";
import { getUserById } from "../../../utils/api";
import { User, Post } from "../../../types";
import PostCard from "../../../components/PostCard";
import UserProfileDetails from "../../../components/UserProfileDetails";

interface UserProfileProps {
  params: { id: string };
}

export default async function UserProfile({ params }: UserProfileProps) {
  let user: User | null = null;
  let posts: Post[] = [];
  let errorMessage = "";
  let isLoading = true;

  try {
    const data = await getUserById(Number(params.id));
    user = data.user;
    posts = data.posts;
  } catch (error) {
    errorMessage = (error as Error).message;
    console.error("Error fetching user data:", error);
  } finally {
    isLoading = false;
  }

  if (errorMessage) {
    return (
      <>
        <div className="w-full relative flex items-center justify-center h-14 border-b border-slate-200 shadow-[0_1px_3px_rgba(26,26,26,0.08)]">
          <Link
            href="/"
            className="absolute left-4 flex items-center text-blue-500 hover:underline"
          >
            <img width={6} height={12} alt="back" src="/Icon (4).png" />
          </Link>
          <h3 className="text-center">Profile</h3>
        </div>
        <div className="flex flex-col items-center justify-center mt-12">
          <div className="text-xl font-bold">User not found</div>
          <p>We’re so sorry but it’s for the test.</p>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <div className="w-full relative flex items-center justify-center h-14 border-b border-slate-200 shadow-[0_1px_3px_rgba(26,26,26,0.08)]">
          <Link
            href="/"
            className="absolute left-4 flex items-center text-blue-500 hover:underline"
          >
            <img width={6} height={12} alt="back" src="/Icon (4).png" />
          </Link>
          <h3 className="text-center">Profile</h3>
        </div>

        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          <p className="ml-4 text-lg">Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full relative flex items-center justify-center h-14 border-b border-slate-200 shadow-[0_1px_3px_rgba(26,26,26,0.08)]">
        <Link
          href="/"
          className="absolute left-4 flex items-center text-blue-500 hover:underline"
        >
          <img width={6} height={12} alt="back" src="/Icon (4).png" />
        </Link>
        <h3 className="text-center">Profile</h3>
      </div>

      <div className="container mx-auto pt-10 px-4">
        <div className="mt-4 md:mt-0">
          {user && <UserProfileDetails user={user} />}
        </div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Posts</h2>
        {posts.length > 0 ? (
          <div className="mb-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p>This user has no posts.</p>
        )}
      </div>
    </>
  );
}
