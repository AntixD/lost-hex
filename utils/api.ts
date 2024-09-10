"use server";

import { Post, User } from "../types";

const BASE_URL = "https://dummyjson.com";

const PAGE_SIZE = 5;

const fetchUserById = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const getSuggestedPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${BASE_URL}/posts?limit=50`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();

    let posts = Array.isArray(data.posts) ? data.posts : [];

    if (posts.length === 0) {
      console.warn("No posts found in getSuggestedPosts");
      return [];
    }
    posts = posts.sort(
      (a: Post, b: Post) => b.reactions.likes - a.reactions.likes
    );

    const topPosts = posts.slice(0, 2);

    const postsWithUsers = await Promise.all(
      topPosts.map(async (post: Post) => {
        if (!post.userId) {
          console.warn("Post does not have a userId:", post);
          return post;
        }
        try {
          const user = await fetchUserById(post.userId);
          return {
            ...post,
            user,
          };
        } catch (error) {
          console.error("Error fetching user:", error);
          return post;
        }
      })
    );

    return postsWithUsers;
  } catch (error) {
    console.error("Error fetching suggested posts:", error);
    throw error;
  }
};

export const getWhoToFollow = async (): Promise<User[]> => {
  try {
    const usersResponse = await fetch(`${BASE_URL}/users?limit=100`);
    const usersData = await usersResponse.json();
    const users: User[] = usersData.users;

    const usersWithPosts = await Promise.all(
      users.map(async (user) => {
        try {
          const postsResponse = await fetch(
            `${BASE_URL}/users/${user.id}/posts`
          );
          const postsData = await postsResponse.json();
          const userPostsCount = postsData.total || postsData.posts.length;
          return { ...user, postsCount: userPostsCount };
        } catch (error) {
          console.error("Error fetching user posts:", error);
          return user;
        }
      })
    );

    return usersWithPosts
      .sort((a, b) => (b.postsCount || 0) - (a.postsCount || 0))
      .slice(0, 4);
  } catch (error) {
    console.error("Error fetching users to follow:", error);
    throw error;
  }
};

export const getPostsByPage = async (page: number): Promise<Post[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const postsResponse = await fetch(`${BASE_URL}/posts`, {
      next: { revalidate: 3600 },
    });

    const posts = (await postsResponse.json()).posts as Post[];

    const filteredPosts = posts.slice(PAGE_SIZE * page, PAGE_SIZE * (page + 1));

    return await Promise.all(
      filteredPosts.map(async (post) => {
        try {
          const userResponse = await fetch(`${BASE_URL}/users/${post.userId}`, {
            next: { revalidate: 3600 },
          });

          const user = (await userResponse.json()) as User;

          return {
            ...post,
            user,
          };
        } catch (error) {
          console.error("Error fetching user for post:", error);
          return post;
        }
      })
    );
  } catch (error) {
    console.error("Error fetching posts by page:", error);
    throw error;
  }
};

export const getUserById = async (
  id: number
): Promise<{ user: User; posts: Post[] }> => {
  try {
    const userResponse = await fetch(`${BASE_URL}/users/${id}`);
    const user: User = await userResponse.json();

    const postsResponse = await fetch(`${BASE_URL}/posts/user/${id}`);
    const postsData = await postsResponse.json();

    const posts = Array.isArray(postsData.posts)
      ? postsData.posts.map((post: Post) => ({ ...post, user }))
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
  } catch (error) {
    console.error("Error fetching user and posts:", error);
    throw error;
  }
};
