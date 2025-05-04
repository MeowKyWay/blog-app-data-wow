import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { FullPost, PostListItem } from "../lib/type";

const fetchPosts = async () => {
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
