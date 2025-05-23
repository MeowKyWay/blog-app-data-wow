export type Tag =
  | "History"
  | "Food"
  | "Pets"
  | "Health"
  | "Fashion"
  | "Exercise"
  | "Others";

export const tags: Tag[] = [
  "History",
  "Food",
  "Pets",
  "Health",
  "Fashion",
  "Exercise",
  "Others",
];

// For list view
export type PostListItem = {
  id: string;
  tag: Tag;
  title: string;
  content: string;
  ownerId: string;
  owner: {
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  commentsCount: number; // Only count here
};

// For detail view
export type FullPost = {
  id: string;
  tag: string;
  title: string;
  content: string;
  ownerId: string;
  owner: {
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
};

export type Comment = {
  id: string;
  content: string;
  postId: string;
  ownerId: string;
  owner: {
    username: string;
  };
  createdAt: string;
  updatedAt: string;
};
