import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Layers, History, Database, ChevronRight } from "lucide-react";

const BACKEND_GITHUB = "https://github.com//sdat-s4-sprint-backend"; // change if needed

export default function Home() {
  useEffect(() => {
    document.title = "BST Visualizer — Home"; // shows in the browser tab
  }, []);

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 pt-10 md:pt-16 pb-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Build, View, and Save <span className="text-indigo-600">Binary Search Trees</span>
            </h1>
            <p className="mt-3 md:mt-4 text-slate-600 max-w-2xl">
              Paste a list of numbers, get a clean tree. Click previous trees to revisit their JSON. Explore the backend
              API and project repository.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/enter"
                className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 active:scale-[0.98] transition"
              >
                Enter Numbers <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/previous-trees"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:shadow-sm active:scale-[0.98] transition"
              >
                View Previous <History className="size-4" />
              </Link>
              <a
                href={BACKEND_GITHUB}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:shadow-sm active:scale-[0.98] transition"
                title="Open backend GitHub repo"
              >
                Backend Repo <Github className="size-4" />
              </a>
            </div>
          </div>

          <div className="flex-1 w-full">
            {/* Decorative preview card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 mb-2">Quick Start</div>
              <ol className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2"><span className="size-5 grid place-items-center rounded-md bg-indigo-600 text-white text-[11px]">1</span> Go to <span className="font-semibold">Enter Numbers</span>.</li>
                <li className="flex items-center gap-2"><span className="size-5 grid place-items-center rounded-md bg-indigo-600 text-white text-[11px]">2</span> Paste values like <code className="px-1 rounded bg-slate-100">8, 3, 10, 1, 6</code>.</li>
                <li className="flex items-center gap-2"><span className="size-5 grid place-items-center rounded-md bg-indigo-600 text-white text-[11px]">3</span> Submit to view and save your tree.</li>
              </ol>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-slate-500">Your trees are saved locally for quick access.</div>
                <Link to="/previous-trees" className="group inline-flex items-center gap-1 text-indigo-600 text-sm font-semibold hover:underline">
                  See Previous <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <FeatureCard
            icon={<Layers className="size-5" />}
            title="Clean Tree Layout"
            desc="Readable, static SVG tree. Click nodes on detail pages to inspect JSON."
            to="/enter"
          />
          <FeatureCard
            icon={<History className="size-5" />}
            title="Previous Trees"
            desc="Every submission is saved locally. Click any entry to expand JSON."
            to="/previous-trees"
          />
          <FeatureCard
            icon={<Database className="size-5" />}
            title="Backend API"
            desc="Want the data layer? Jump to the repository and explore endpoints."
            href={BACKEND_GITHUB}
          />
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, desc, to, href }: { icon: React.ReactNode; title: string; desc: string; to?: string; href?: string }) {
  const common = "block rounded-2xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm hover:shadow-md active:scale-[0.99] transition";
  if (to) {
    return (
      <Link to={to} className={common}>
        <div className="flex items-center gap-3">
          <div className="size-9 grid place-items-center rounded-xl bg-indigo-50 text-indigo-700">{icon}</div>
          <div>
            <div className="font-semibold text-slate-900">{title}</div>
            <div className="text-sm text-slate-600">{desc}</div>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={common}>
      <div className="flex items-center gap-3">
        <div className="size-9 grid place-items-center rounded-xl bg-indigo-50 text-indigo-700">{icon}</div>
        <div>
          <div className="font-semibold text-slate-900">{title}</div>
          <div className="text-sm text-slate-600">{desc}</div>
        </div>
      </div>
    </a>
  );
}
