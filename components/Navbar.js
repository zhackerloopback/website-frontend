import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../lib/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const linkClass = (path) =>
    `text-sm px-3 py-1 rounded-full ${
      router.pathname === path
        ? "bg-sky-500/20 text-sky-300"
        : "text-slate-300 hover:bg-slate-800"
    }`;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          Gourav<span className="text-sky-400">.dev</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>

          {user && (
            <>
              <Link href="/dashboard" className={linkClass("/dashboard")}>
                Dashboard
              </Link>
              <Link
                href="/posts/new"
                className="text-sm px-3 py-1 rounded-full bg-sky-500 hover:bg-sky-600 text-slate-950 font-medium"
              >
                + New Post
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link href="/login" className={linkClass("/login")}>
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm px-3 py-1 rounded-full bg-sky-500 hover:bg-sky-600 text-slate-950 font-medium"
              >
                Sign up
              </Link>
            </>
          )}
          {user && (
              <span className="text-xs text-slate-400 mr-2">
                Logged in as <span className="text-sky-300 font-medium">{user.name}</span>
              </span>
          )}

        </nav>
      </div>
    </header>
  );
}
