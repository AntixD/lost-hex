import Link from "next/link";
import { getUserById } from "../../../utils/api";
import { User, Post } from "../../../types";
import PostCard from "../../../components/PostCard"; // Import PostCard component
import Image from "next/image";

interface UserProfileProps {
  params: { id: string };
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { user, posts }: { user: User; posts: Post[] } = await getUserById(
    Number(params.id)
  ); // Fetch user and posts

  return (
    <div className="container mx-auto p-4">
      {/* Back Arrow */}
      <div className="mb-4">
        <Link
          href="/"
          className="flex items-center text-blue-500 hover:underline"
        >
          &larr; Back to Posts
        </Link>
      </div>

      {/* Profile Card */}
      <div className="bg-white border rounded-lg shadow-sm p-6">
        {/* Avatar and User Info */}
        <div className="flex items-center space-x-6 mb-6">
          <Image
            width={80}
            height={80}
            src="/avatar.png"
            alt={`${user.firstName} ${user.lastName}'s avatar`}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-500">@{user.username}</p>
            <p className="text-gray-500 flex items-center">
              <span>
                {user.address.city}, {user.address.country}
              </span>
            </p>
            <p className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-sm font-semibold inline-block mt-2">
              {user.company.department}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-8 mb-4">
          <div className="text-center">
            <h2 className="text-xl font-bold">{user.totalPosts}</h2>
            <p className="text-gray-500">Posts</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold">{user.totalLikes}</h2>
            <p className="text-gray-500">Likes</p>
          </div>
        </div>

        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
            Follow
          </button>
          <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 transition">
            Message
          </button>
        </div>
      </div>

      {/* User's Posts */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Posts</h2>
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} /> // Use PostCard to render posts
          ))}
        </div>
      ) : (
        <p>This user has no posts.</p>
      )}
    </div>
  );
}
