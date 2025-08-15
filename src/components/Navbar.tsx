import { Link, NavLink } from "react-router-dom";
import { Github } from "lucide-react";

const BACKEND_GITHUB = "https://github.com/JaowadH/bst-visualizer-backend.git"; 

export default function Navbar() {
  const base =
    "text-sm px-3 py-2 rounded-xl transition select-none";
  const hover =
    "hover:bg-white/70 hover:shadow-sm active:scale-[0.98]";
  const active = "bg-white/80 shadow-sm";
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${base} ${hover} ${isActive ? active : ""}`;

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
        <Link to="/" className="inline-flex items-center gap-2 group">
          <span className="h-8 w-8 grid place-items-center rounded-xl bg-indigo-600 text-white font-bold">
            B
          </span>
          <span className="font-semibold tracking-tight text-slate-900 group-hover:text-indigo-700 transition">
            BST Visualizer
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-1">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/enter" className={linkClass}>
            Enter Numbers
          </NavLink>
          <NavLink to="/previous-trees" className={linkClass}>
            Previous Trees
          </NavLink>

          <a
            href={BACKEND_GITHUB}
            target="_blank"
            rel="noreferrer"
            className={`${base} ${hover} border border-slate-300 bg-white inline-flex items-center gap-2`}
            title="Open backend GitHub repo"
          >
            <Github className="size-4" />
            Backend Repo
          </a>
        </nav>
      </div>
    </header>
  );
}
