import { Post, User } from "../types";

const BASE_URL = "https://dummyjson.com";

export const getSuggestedPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts?limit=10`);
  const data = await response.json();
  return data.posts
    .sort((a: Post, b: Post) => b.reactions.likes - a.reactions.likes)
    .slice(0, 2);
};

export const getWhoToFollow = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users?limit=20`);
  const data = await response.json();
  return data.users
    .sort((a: User, b: User) => {
      const aPostsLength = a.posts ? a.posts.length : 0;
      const bPostsLength = b.posts ? b.posts.length : 0;
      return bPostsLength - aPostsLength;
    })
    .slice(0, 4);
};

export const getRecentPosts = async (skip = 0): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts?limit=5&skip=${skip}`);
  const data = await response.json();
  return data.posts;
};

export const getUserById = async (
  id: number
): Promise<{ user: User; posts: Post[] }> => {
  const userResponse = await fetch(`https://dummyjson.com/users/${id}`);
  const user: User = await userResponse.json();

  const postsResponse = await fetch(`https://dummyjson.com/posts/user/${id}`);
  const postsData = await postsResponse.json();

  // Ensure posts is an array
  const posts = Array.isArray(postsData.posts) ? postsData.posts : [];

  return {
    user: {
      ...user,
      totalPosts: posts.length,
      totalLikes: posts.reduce(
        (total: number, post: Post) => total + (post.reactions?.likes || 0),
        0
      ),
    },
    posts, // Return the user's posts along with the user data
  };
};
