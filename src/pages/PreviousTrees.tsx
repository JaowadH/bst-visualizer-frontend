import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronDown, ChevronRight, Trash2, Copy, RefreshCw, History } from "lucide-react";

type SavedTree = {
  id: string;
  createdAt: string;
  numbers: number[];
  balanced?: boolean;
  // json may be absent on older entries; we compute on demand
  json?: any;
};

export default function PreviousTrees() {
  const nav = useNavigate();
  const [items, setItems] = React.useState<SavedTree[]>([]);
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    document.title = "BST Visualizer — Previous Trees";
    const data = safeRead();
    setItems(data);
  }, []);

  const toggleOpen = (id: string) => {
    setOpenId((cur) => (cur === id ? null : id));
  };

  const clearAll = () => {
    if (!confirm("Clear all saved trees?")) return;
    localStorage.removeItem("trees");
    setItems([]);
    setOpenId(null);
  };

  const deleteOne = (id: string) => {
    const next = items.filter((x) => x.id !== id);
    localStorage.setItem("trees", JSON.stringify(next));
    setItems(next);
    if (openId === id) setOpenId(null);
  };

  const rerun = (it: SavedTree) => {
    const params = new URLSearchParams({
      numbers: (it.numbers ?? []).join(","),
      balanced: String(Boolean(it.balanced)),
    }).toString();
    nav(`/process-numbers?${params}`);
  };

  const copyJson = async (id: string, json: any) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(json, null, 2));
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1200);
    } catch {
      // no-op
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-8">
      <header className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <History className="size-5 text-indigo-600" />
          <h1 className="text-2xl font-bold tracking-tight">Previous Trees</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/enter"
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:shadow-sm active:scale-[0.98] transition"
          >
            Enter New
          </Link>
          <button
            onClick={clearAll}
            className="rounded-xl bg-rose-600 text-white px-3 py-2 text-sm font-semibold hover:bg-rose-500 active:scale-[0.98] transition"
            title="Remove all saved trees"
          >
            Clear All
          </button>
        </div>
      </header>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
          No saved trees yet. Submit one from{" "}
          <Link className="text-indigo-600 font-medium hover:underline" to="/enter">
            Enter Numbers
          </Link>
          .
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((it) => {
            const isOpen = openId === it.id;
            const json = it.json ?? computeJson(it.numbers);
            const numsLabel =
              it.numbers.length > 12
                ? `${it.numbers.slice(0, 12).join(", ")}… (+${it.numbers.length - 12})`
                : it.numbers.join(", ");

            return (
              <li key={it.id} className="rounded-2xl border border-slate-200 bg-white hover:shadow-md transition">
                {/* Row */}
                <button
                  onClick={() => toggleOpen(it.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                  title="Click to expand"
                >
                  {isOpen ? (
                    <ChevronDown className="size-4 text-slate-500" />
                  ) : (
                    <ChevronRight className="size-4 text-slate-500" />
                  )}
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900">
                      {new Date(it.createdAt).toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">
                      {it.numbers.length} number{it.numbers.length === 1 ? "" : "s"} • {numsLabel}
                      {it.balanced ? " • balanced" : ""}
                    </div>
                  </div>
                </button>

                {/* Expandable content */}
                {isOpen && (
                  <div className="px-4 pb-4">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <button
                        onClick={() => rerun(it)}
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-3 py-2 text-sm font-semibold hover:bg-indigo-500 active:scale-[0.98] transition"
                        title="Open this tree in the processor"
                      >
                        <RefreshCw className="size-4" />
                        Re-run
                      </button>
                      <button
                        onClick={() => copyJson(it.id, json)}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 active:scale-[0.98] transition"
                        title="Copy JSON to clipboard"
                      >
                        <Copy className="size-4" />
                        {copiedId === it.id ? "Copied!" : "Copy JSON"}
                      </button>
                      <button
                        onClick={() => deleteOne(it.id)}
                        className="inline-flex items-center gap-2 rounded-xl bg-rose-600 text-white px-3 py-2 text-sm font-semibold hover:bg-rose-500 active:scale-[0.98] transition ml-auto"
                        title="Delete this saved tree"
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </button>
                    </div>

                    <div className="rounded-xl bg-slate-950 text-slate-100 text-xs p-3 overflow-auto max-h-72">
                      <pre className="whitespace-pre-wrap">{JSON.stringify(json, null, 2)}</pre>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

/* ---------- helpers ---------- */

function safeRead(): SavedTree[] {
  try {
    const raw = localStorage.getItem("trees");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Ensure minimal shape
    return parsed
      .map((x: any) => ({
        id: String(x?.id ?? Date.now() + Math.random()),
        createdAt: String(x?.createdAt ?? new Date().toISOString()),
        numbers: Array.isArray(x?.numbers) ? x.numbers.map(Number).filter(Number.isFinite) : [],
        balanced: Boolean(x?.balanced),
        json: x?.json,
      }))
      .filter((x: SavedTree) => x.numbers.length > 0);
  } catch {
    return [];
  }
}

type NodeT = { value: number; left?: NodeT | null; right?: NodeT | null };
type TreeJSON = { value: number; left: TreeJSON | null; right: TreeJSON | null };

function computeJson(values: number[]): TreeJSON | null {
  // Build a simple BST then serialize to JSON
  const insert = (root: NodeT | null, v: number): NodeT => {
    if (!root) return { value: v };
    if (v === root.value) return root;
    if (v < root.value) root.left = insert(root.left ?? null, v);
    else root.right = insert(root.right ?? null, v);
    return root;
  };
  let root: NodeT | null = null;
  for (const n of values) if (Number.isFinite(n)) root = insert(root, n);

  const toJSON = (n: NodeT | null): TreeJSON | null =>
    n ? { value: n.value, left: toJSON(n.left ?? null), right: toJSON(n.right ?? null) } : null;

  return toJSON(root);
}
