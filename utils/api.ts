"use server";

import { Post, User } from "../types";

const BASE_URL = "https://dummyjson.com";

const fetchUserById = async (id: number): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  return await response.json();
};

export const getSuggestedPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts?limit=10`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await response.json();

  const posts = Array.isArray(data.posts) ? data.posts.slice(0, 2) : [];

  if (posts.length === 0) {
    console.warn("No posts found in getSuggestedPosts");
    return [];
  }

  const postsWithUsers = await Promise.all(
    posts.map(async (post: Post) => {
      if (!post.userId) {
        console.warn("Post does not have a userId:", post);
        return post;
      }
      const user = await fetchUserById(post.userId);
      return {
        ...post,
        user,
      };
    })
  );

  return postsWithUsers;
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

export const getRecentPosts = async (skip = 0, limit = 5): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts?limit=${limit}&skip=${skip}`);
  const data = await response.json();

  const posts = Array.isArray(data.posts) ? data.posts : [];

  // Optionally, you can fetch user details here if needed, or return posts directly
  const postsWithUsers = await Promise.all(
    posts.map(async (post: Post) => {
      const userResponse = await fetch(`${BASE_URL}/users/${post.userId}`);
      const user = await userResponse.json();
      return {
        ...post,
        user,
      };
    })
  );

  return postsWithUsers;
};

export const getUserById = async (
  id: number
): Promise<{ user: User; posts: Post[] }> => {
  const userResponse = await fetch(`https://dummyjson.com/users/${id}`);
  const user: User = await userResponse.json();

  const postsResponse = await fetch(`https://dummyjson.com/posts/user/${id}`);
  const postsData = await postsResponse.json();

  // Ensure posts is an array and attach user data to each post
  const posts = Array.isArray(postsData.posts)
    ? postsData.posts.map((post: Post) => ({ ...post, user })) // Attach user data to each post
    : [];

  return {
    user: {
      ...user,
      totalPosts: posts.length,
      totalLikes: posts.reduce(
        (total: number, post: Post) => total + (post.reactions?.likes || 0),
        0
      ),
    },
    posts,
  };
};
