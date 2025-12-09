// client/lib/postsContext.js
import { createContext, useContext, useEffect, useState } from "react";
import api from "./api"; // 👈 ye import must hai

const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Saare posts laao (home + dashboard)
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/posts");
      setPosts(res.data || []);
    } catch (err) {
      console.error("fetchPosts error:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (postData) => {
    try {
      const res = await api.post("/posts", postData);
      const newPost = res.data;
      setPosts((prev) => [newPost, ...prev]);
    } catch (err) {
      console.error("addPost error:", err);
      alert(
        err?.response?.data?.message || "Post create karte time error aa gaya."
      );
    }
  };

  const updatePost = async (id, updatedData) => {
    try {
      const res = await api.put(`/posts/${id}`, updatedData);
      const updated = res.data;
      setPosts((prev) => prev.map((p) => (p._id === id ? updated : p)));
    } catch (err) {
      console.error("updatePost error:", err);
      alert(
        err?.response?.data?.message || "Post update karte time error aa gaya."
      );
    }
  };

  const deletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("deletePost error:", err);
      alert(
        err?.response?.data?.message || "Post delete karte time error aa gaya."
      );
    }
  };

  const getPost = (id) => posts.find((p) => p._id === id) || null;

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        addPost,
        updatePost,
        deletePost,
        getPost,
        refetch: fetchPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => useContext(PostsContext);
