export interface Post {
  id: number;
  userId: number;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  user: User;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  postsCount?: number;
  address: {
    city: string;
    state: string;
    country: string;
  };
  company: {
    department: string;
  };
  posts: Post[]; // array of posts
  totalPosts?: number;
  totalLikes?: number;
}
