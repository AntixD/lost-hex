"use client";

import { useState, useEffect, useMemo } from "react";
import { Post } from "../types";
import PostCard from "./PostCard";
import { getPostsByPage } from "../utils/api";
import { useInView } from "react-intersection-observer";

export default function RecentPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const pageCount = useMemo(() => posts.length / 5, [posts]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedAll, setHasLoadedAll] = useState(false);
  const { ref, inView } = useInView();

  const loadPosts = async () => {
    if (hasLoadedAll) return;

    setIsLoading(true);

    const newPosts = await getPostsByPage(pageCount);

    if (newPosts) {
      setPosts([...posts, ...newPosts]);
    } else {
      setHasLoadedAll(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (inView) {
      loadPosts();
    }
  }, [inView]);

  return (
    <div className="mt-8">
      <h2>Recent Posts</h2>
      {posts.map((post, index) => {
        if (index === posts.length - 1) {
          return <PostCard key={post.id} post={post} ref={ref} />;
        }

        return <PostCard key={post.id} post={post} />;
      })}

      {isLoading && (
        <div className="flex justify-center items-center mt-6">
          <div className="custom-spinner w-5 h-5 rounded-full"></div>
        </div>
      )}

      {hasLoadedAll && (
        <p className="text-center mt-4">No more posts to show.</p>
      )}
    </div>
  );
}
