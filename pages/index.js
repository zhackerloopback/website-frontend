import PostCard from "../components/PostCard";
import { usePosts } from "../lib/postsContext";

export default function Home() {
  const { posts, loading } = usePosts();

  return (
    <div className="space-y-10">
      {/* Hero / Intro */}
      <section className="grid md:grid-cols-[2fr,1.3fr] gap-6 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-sky-400 mb-3">
            Personal Website / Digital Garden
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Hey, I&apos;m <span className="text-sky-400">Gourav</span> 👋
          </h1>
          <p className="text-sm md:text-base text-slate-300 mb-3">
            Ye mera personal space hai jahan main apni learnings, experiments,
            projects aur life updates likhta hoon. Ek jagah jaha sab cheezein
            documented aur trackable rahen.
          </p>
          <p className="text-xs text-slate-400">
            Niche latest posts dikh rahe hain. Dashboard se main sab manage
            karta hoon (add / edit / delete).
          </p>
        </div>

        <div className="border border-slate-800 rounded-2xl p-4 bg-slate-900/70 backdrop-blur">
          <h2 className="text-sm font-semibold mb-2">Now Playing</h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Mode</span>
              <span className="font-semibold text-emerald-400">Building</span>
            </div>
            <div className="flex justify-between">
              <span>Focus</span>
              <span>Web Dev, Security, Personal Brand</span>
            </div>
            <div className="flex justify-between">
              <span>Entries</span>
              <span className="font-semibold">{posts.length} posts</span>
            </div>
          </div>
        </div>
      </section>

      {/* About / Skills section */}
      <section className="grid md:grid-cols-3 gap-4">
        <div className="card bg-slate-900/70 border border-slate-800">
          <h3 className="text-sm font-semibold mb-2">About</h3>
          <p className="text-xs text-slate-300">
            Short intro about you yaha likh sakta hai – kaun ho, kya seekh rahe
            ho, currently kis type ke projects pe kaam chal raha hai.
          </p>
        </div>
        <div className="card bg-slate-900/70 border border-slate-800">
          <h3 className="text-sm font-semibold mb-2">Current Stack</h3>
          <p className="text-xs text-slate-300">
            Next.js • Node.js • MongoDB • Tailwind • Security / Bug Bounty
            interest etc.
          </p>
        </div>
        <div className="card bg-slate-900/70 border border-slate-800">
          <h3 className="text-sm font-semibold mb-2">What I share here</h3>
          <p className="text-xs text-slate-300">
            Notes, blog posts, progress logs, weekly reviews, new ideas, random
            thoughts – basically mera digital brain dump.
          </p>
        </div>
      </section>

      {/* Posts List */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold tracking-wide text-slate-200">
            Latest Posts
          </h2>
        </div>

        {loading ? (
          <p className="text-sm text-slate-400">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-slate-400">
            Abhi koi post nahi hai. Pehla post create karne ke liye top right
            corner me <span className="text-sky-400">+ New Post</span> dabao.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
