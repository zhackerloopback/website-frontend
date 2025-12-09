import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <article className="border border-slate-800 rounded-2xl p-5 bg-slate-900/40 hover:bg-slate-900/80 transition">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-400">
          {post.createdAt || "Today"}
        </span>
        <div className="flex gap-1 flex-wrap">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-slate-800 text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Link href={`/posts/${post._id}`}>
        <h2 className="text-lg font-semibold mb-1 hover:text-sky-300">
          {post.title}
        </h2>
      </Link>

      <p className="text-sm text-slate-300 line-clamp-2 mb-3">
        {post.summary}
      </p>

      <Link
        href={`/posts/${post._id}`}
        className="text-xs text-sky-400 hover:underline"
      >
        Read more →
      </Link>
    </article>
  );
}
