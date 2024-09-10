"use client"; // Mark this as a client component for infinite scroll
import { useState, useEffect } from "react";
import { Post } from "../types";
import PostCard from "./PostCard";
import { getRecentPosts } from "../utils/api";

export default function RecentPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newPosts = await getRecentPosts(skip, 5);
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
        setSkip((prevSkip) => prevSkip + 5);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMorePosts();

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {loading && (
        <div className="flex justify-center mt-4">
          <div className="loader">Loading...</div>{" "}
        </div>
      )}
      {!hasMore && !loading && (
        <p className="text-center mt-4">No more posts to show.</p>
      )}
    </div>
  );
}
