import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="fixed inset-0 -z-10 opacity-40 pointer-events-none">
        <div className="absolute -top-24 -left-10 h-72 w-72 rounded-full bg-sky-500 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500 blur-3xl" />
      </div>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      <footer className="border-t border-slate-800 mt-8 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} My Personal Space • Built with Next.js
      </footer>
    </div>
  );
}
