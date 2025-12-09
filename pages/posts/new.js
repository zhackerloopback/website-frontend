import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { usePosts } from "../../lib/postsContext";
import { useAuth } from "../../lib/AuthContext";

export default function NewPost() {
  const router = useRouter();
  const { addPost } = usePosts();
  const { user, loadingAuth } = useAuth();

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    tags: ""
  });
  const [saving, setSaving] = useState(false);

  // Auth guard – agar login nahi hai to login page pe bhej do
  useEffect(() => {
    if (!loadingAuth && !user) {
      router.push("/login");
    }
  }, [loadingAuth, user, router]);

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

      await addPost({
        title: form.title,
        summary: form.summary,
        content: form.content,
        tags: tagsArray
      });

      router.push("/dashboard");
    } catch (err) {
      console.error("Create post error:", err);
      alert("Post create karte time error aa gaya, console check karo.");
    } finally {
      setSaving(false);
    }
  };

  if (loadingAuth) {
    return (
      <div className="text-sm text-slate-400">
        Checking auth...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-sm text-slate-400">
        Redirecting to login...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div>
        <h1 className="text-xl font-semibold mb-2">New Post</h1>
        <p className="text-xs text-slate-400">
          (Auth protected) — sirf login hone ke baad hi naya post bana sakte ho.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Eg: Mera naya learning update"
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
            placeholder="Short overview of the post..."
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
            placeholder="Yaha detail me likh sakte ho jo bhi share karna hai..."
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

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-sm font-medium text-slate-950"
        >
          {saving ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
}
