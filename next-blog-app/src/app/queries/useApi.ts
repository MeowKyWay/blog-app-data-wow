import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Comment, FullPost, PostListItem } from "../lib/type";

const fetchPosts = async () => {
  console.log("[Posts] Fetching...");
  const res = await api.get("/posts");
  return res.data as PostListItem[];
};

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 30,
  });
}

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ["posts", String(id)],
    queryFn: async () => {
      console.log("[Posts] Fetching post...");
      const res = await api.get(`/posts/${id}`);
      return res.data as FullPost;
    },
    staleTime: 1000 * 60 * 30,
  });
};

const createPost = async (post: {
  tag: string;
  title: string;
  content: string;
  ownerId: number;
}) => {
  console.log("[Posts] Creating post...");
  const res = await api.post("/posts", post);
  return res.data as PostListItem;
};

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData<PostListItem[]>(["posts"], (oldPosts) => {
        if (!oldPosts) return [newPost];
        return [newPost, ...oldPosts]; // Add new post to the top
      });
    },
  });
}

const createComment = async (comment: {
  content: string;
  postId: string;
  ownerId: number;
}) => {
  console.log("[Posts] Creating comment...");
  const res = await api.post("/comments", comment);
  return res.data as Comment;
};

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: (newComment) => {
      queryClient.setQueryData<FullPost>(
        ["posts", String(newComment.postId)],
        (oldPost) => {
          if (!oldPost) return oldPost;
          return {
            ...oldPost,
            comments: [newComment, ...oldPost.comments],
          };
        }
      );
      queryClient.setQueryData<PostListItem[]>(["posts"], (oldPosts) =>
        oldPosts?.map((post) =>
          post.id === newComment.postId
            ? { ...post, commentCount: post.commentsCount + 1 }
            : post
        )
      );
    },
  });
}

const updatePost = async (post: {
  id: string;
  tag: string;
  title: string;
  content: string;
}) => {
  console.log("[Posts] Updating post...");
  const res = await api.patch(`/posts/${post.id}`, post);
  return res.data as PostListItem;
};

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData<FullPost>(
        ["posts", String(updatedPost.id)],
        (oldPost) => {
          if (!oldPost) return oldPost;
          return {
            ...oldPost,
            ...updatedPost,
          };
        }
      );
      queryClient.setQueryData<PostListItem[]>(["posts"], (oldPosts) =>
        oldPosts?.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );
    },
  });
}
