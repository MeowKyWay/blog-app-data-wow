import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { FullPost, PostListItem } from "../lib/type";

const fetchPosts = async () => {
  console.log("[Posts] Fetching...");
  const res = await api.get("/posts");
  return res.data as PostListItem[];
};

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
}

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const res = await api.get(`/posts/${id}`);
      return res.data as FullPost;
    },
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
