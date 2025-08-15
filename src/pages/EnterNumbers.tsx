import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Send, History, CheckCircle2, Sparkles } from "lucide-react";
import { parseNumbers } from "../utils/parseNumbers";

/* ---- local helpers (no external deps) ---- */
type NodeT = { value: number; left?: NodeT | null; right?: NodeT | null };
type TreeJSON = { value: number; left: TreeJSON | null; right: TreeJSON | null };

function buildBST(values: number[]): NodeT | null {
  const insert = (root: NodeT | null, v: number): NodeT => {
    if (!root) return { value: v };
    if (v === root.value) return root;
    if (v < root.value) root.left = insert(root.left ?? null, v);
    else root.right = insert(root.right ?? null, v);
    return root;
  };
  let r: NodeT | null = null;
  for (const n of values) if (Number.isFinite(n)) r = insert(r, n);
  return r;
}
function toJSONTree(n: NodeT | null): TreeJSON | null {
  return n ? { value: n.value, left: toJSONTree(n.left ?? null), right: toJSONTree(n.right ?? null) } : null;
}

export default function EnterNumbers() {
  const nav = useNavigate();
  const [numbersRaw, setNumbersRaw] = useState("");
  const [balanced, setBalanced] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const nums = useMemo(() => parseNumbers(numbersRaw), [numbersRaw]);

  useEffect(() => {
    document.title = "BST Visualizer — Enter Numbers";
  }, []);

  const normalize = () => setNumbersRaw(nums.join(", "));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nums.length === 0) {
      alert("Please enter at least one integer.");
      return;
    }

    // Save to localStorage for Previous Trees
    const id = (crypto as any).randomUUID?.() ?? String(Date.now());
    const json = toJSONTree(buildBST(nums));
    const entry = {
      id,
      createdAt: new Date().toISOString(),
      numbers: nums,
      balanced,
      json,
    };
    const prev = JSON.parse(localStorage.getItem("trees") || "[]");
    prev.unshift(entry);
    localStorage.setItem("trees", JSON.stringify(prev.slice(0, 100)));

    // tiny toast state
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1200);

    // Navigate to processor (keeps your original flow)
    const search = new URLSearchParams({
      numbers: nums.join(","),
      balanced: String(balanced),
    }).toString();
    nav(`/process-numbers?${search}`);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-8">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          Enter Numbers
        </h1>
        <p className="text-slate-600">
          Paste or type integers. We’ll build a BST, save it locally, and let you revisit
          it anytime.
        </p>
      </header>

      {/* Card */}
      <section className="rounded-3xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm">
        <form onSubmit={onSubmit} className="grid gap-4 md:gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Numbers (comma/space separated)</span>
            <textarea
              name="numbers"
              rows={4}
              placeholder="e.g. 8, 3, 10, 1, 6"
              required
              value={numbersRaw}
              onChange={(e) => setNumbersRaw(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-sm"
            />
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="balanced"
              checked={balanced}
              onChange={(e) => setBalanced(e.target.checked)}
              className="size-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            Build a balanced BST too (bonus)
          </label>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 active:scale-[0.98] transition"
              title="Process and save"
            >
              <Send className="size-4" />
              Submit
            </button>

            <button
              type="button"
              onClick={normalize}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:shadow-sm active:scale-[0.98] transition"
              title="Format the numbers neatly"
            >
              <Sparkles className="size-4" />
              Normalize
            </button>

            <Link
              to="/previous-trees"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:shadow-sm active:scale-[0.98] transition"
              title="See your saved trees"
            >
              <History className="size-4" />
              Show Previous
            </Link>

            {justSaved && (
              <span className="inline-flex items-center gap-2 text-emerald-600 text-sm ml-auto">
                <CheckCircle2 className="size-4" />
                Saved
              </span>
            )}
          </div>

          {/* Live stats */}
          <div className="text-xs text-slate-500">
            Live preview: {nums.length} number{nums.length === 1 ? "" : "s"}
            {nums.length > 0 ? ` → [${nums.slice(0, 30).join(", ")}${nums.length > 30 ? "…" : ""}]` : ""}
          </div>
        </form>
      </section>
    </main>
  );
}
