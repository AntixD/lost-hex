// /app/profile/[id]/page.tsx
import { getUserById } from "../../../utils/api";
import { User, Post } from "../../../types";

interface UserProfileProps {
  params: { id: string }; // Next.js passes route params automatically
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { user, posts }: { user: User; posts: Post[] } = await getUserById(
    Number(params.id)
  ); // Fetch user and posts

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">
        {user.firstName} {user.lastName}
      </h1>
      <p>@{user.username}</p>
      <p>
        {user.address.city}, {user.address.country}
      </p>
      <p>{user.company.department}</p>
      <p>Total Posts: {user.totalPosts}</p>
      <p>Total Likes: {user.totalLikes}</p>

      <h2 className="text-2xl font-bold mt-6">Posts</h2>
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <div key={post.id} className="border p-4 mb-4 rounded">
              <p>{post.body}</p>
              <div className="flex items-center mt-2">
                <span>👍 {post.reactions.likes}</span>
                <span className="ml-4">👎 {post.reactions.dislikes}</span>
                <span className="ml-4">👁️ {post.views}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>This user has no posts.</p>
      )}
    </div>
  );
}
