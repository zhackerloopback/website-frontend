import Link from "next/link";
import { useRouter } from "next/router";
import { usePosts } from "../lib/postsContext";
import { useAuth } from "../lib/AuthContext";

export default function Dashboard() {
  const router = useRouter();
  const { user, loadingAuth } = useAuth();
  const { posts = [], loading = false, deletePost } = usePosts();

  if (loadingAuth) {
    return <p className="text-sm text-slate-400">Checking auth...</p>;
  }

  if (!user) {
    router.push("/login");
    return <p className="text-sm text-slate-400">Redirecting...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <Link
          href="/posts/new"
          className="text-xs px-3 py-1 rounded-full bg-sky-500 hover:bg-sky-600 text-slate-950 font-medium"
        >
          + New Post
        </Link>
      </div>

      <p className="text-xs text-slate-400 mb-2">
        Ye dashboard sabhi posts show kar raha hai.  
        Yaha se tum direct edit / delete kar sakte ho.
      </p>

      {loading ? (
        <p className="text-sm text-slate-400">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-slate-400">Abhi koi post nahi hai.</p>
      ) : (
        <div className="border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/80">
              <tr className="text-left text-xs text-slate-400">
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2 hidden md:table-cell">Author</th>
                <th className="px-4 py-2 hidden md:table-cell">Date</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post._id}
                  className="border-t border-slate-800 hover:bg-slate-900/60"
                >
                  <td className="px-4 py-2">
                    <Link
                      href={`/posts/${post._id}`}
                      className="hover:text-sky-300"
                    >
                      {post.title}
                    </Link>
                  </td>

                  <td className="px-4 py-2 text-xs text-slate-400 hidden md:table-cell">
                    {post.user?.name || "Unknown"}
                  </td>

                  <td className="px-4 py-2 text-xs text-slate-400 hidden md:table-cell">
                    {post.createdAt?.slice(0, 10)}
                  </td>

                  <td className="px-4 py-2 text-xs flex gap-2 justify-end">
                    <Link
                      href={`/posts/${post._id}/edit`}
                      className="px-2 py-1 rounded-full bg-slate-800 hover:bg-slate-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePost(post._id)}
                      className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
