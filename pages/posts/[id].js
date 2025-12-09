// client/pages/posts/[id].js
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePosts } from "../../lib/postsContext";
import api from "../../lib/api";

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { getPost } = usePosts();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Try context first, nahi mila to API se laa lo
  useEffect(() => {
    if (!id) return;

    const localPost = getPost(id);
    if (localPost) {
      setPost(localPost);
      setLoading(false);
    } else {
      (async () => {
        try {
          const res = await api.get(`/posts/${id}`);
          setPost(res.data);
        } catch (err) {
          console.error("Get post error:", err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, getPost]);

  if (loading) {
    return <p className="text-sm text-slate-400">Loading post...</p>;
  }

  if (!post) {
    return (
      <div className="text-sm text-slate-400">
        Post not found.{" "}
        <Link href="/dashboard" className="text-sky-400">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-400 mb-1">
            {post.createdAt?.slice(0, 10)}
          </p>
          <h1 className="text-2xl font-bold mb-1">{post.title}</h1>
          <p className="text-sm text-slate-300">{post.summary}</p>
        </div>
        <div className="flex flex-col items-end gap-2 text-xs">
          <span className="text-slate-400">
            by{" "}
            <span className="text-sky-300">
              {post.user?.name || "Unknown"}
            </span>
          </span>
          <Link
            href="/dashboard"
            className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 hover:bg-slate-800"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-4 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">
        {post.content}
      </div>
    </article>
  );
}
