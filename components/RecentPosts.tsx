"use client"; // Mark this as a client component for infinite scroll
import { useState, useEffect } from "react";
import { Post } from "../types";
import PostCard from "./PostCard";
import { getRecentPosts } from "../utils/api";

export default function RecentPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [skip, setSkip] = useState(0); // For pagination
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // To check if there are more posts

  const loadMorePosts = async () => {
    if (!hasMore) return; // If no more posts, stop the loading

    setLoading(true);
    const newPosts = await getRecentPosts(skip); // Fetch the next set of posts
    if (newPosts.length === 0) {
      setHasMore(false); // Stop loading if no more posts
    } else {
      setPosts((prev) => [...prev, ...newPosts]);
      setSkip(skip + 5); // Increment the skip for the next batch
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMorePosts(); // Initial load of posts

    const handleScroll = () => {
      // Detect if the user has reached the bottom of the page
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMorePosts(); // Load more posts if user reaches bottom
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [skip]); // Depend on skip to ensure new posts are loaded when it changes

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {loading && <p>Loading more posts...</p>}
      {!hasMore && <p>No more posts to show.</p>}
    </div>
  );
}
