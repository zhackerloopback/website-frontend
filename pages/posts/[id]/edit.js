// client/pages/posts/[id]/edit.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePosts } from "../../../lib/postsContext";
import { useAuth } from "../../../lib/AuthContext";
import api from "../../../lib/api";

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;

  const { getPost, updatePost } = usePosts();
  const { user, loadingAuth } = useAuth();

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    tags: ""
  });
  const [loadingPost, setLoadingPost] = useState(true);
  const [saving, setSaving] = useState(false);

  // Auth guard
  useEffect(() => {
    if (!loadingAuth && !user) {
      router.push("/login");
    }
  }, [loadingAuth, user, router]);

  // Load post data
  useEffect(() => {
    if (!id) return;

    const fillFromPost = (p) => {
      setForm({
        title: p.title || "",
        summary: p.summary || "",
        content: p.content || "",
        tags: Array.isArray(p.tags) ? p.tags.join(", ") : ""
      });
    };

    const localPost = getPost(id);
    if (localPost) {
      fillFromPost(localPost);
      setLoadingPost(false);
    } else {
      (async () => {
        try {
          const res = await api.get(`/posts/${id}`);
          fillFromPost(res.data);
        } catch (err) {
          console.error("Fetch single post error:", err);
        } finally {
          setLoadingPost(false);
        }
      })();
    }
  }, [id, getPost]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const tagsArray = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      await updatePost(id, {
        title: form.title,
        summary: form.summary,
        content: form.content,
        tags: tagsArray
      });

      router.push("/dashboard");
    } catch (err) {
      console.error("Update post error:", err);
      alert("Post update karte time error aa gaya, console check karo.");
    } finally {
      setSaving(false);
    }
  };

  if (loadingAuth || loadingPost) {
    return <p className="text-sm text-slate-400">Loading...</p>;
  }

  if (!user) {
    return (
      <p className="text-sm text-slate-400">
        Redirecting to login...
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold mb-2">Edit Post</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs mb-1">Summary</label>
          <input
            name="summary"
            value={form.summary}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs mb-1">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={8}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs mb-1">
            Tags <span className="text-slate-500">(comma separated)</span>
          </label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="personal, learning, update"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-sm font-medium text-slate-950"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
