import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createTree } from "../services/api";

export default function ProcessNumbers() {
  const [params] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const numbers = useMemo(
    () =>
      (params.get("numbers") || "")
        .split(/[, ]+/)
        .map(Number)
        .filter(Number.isFinite),
    [params]
  );

  const balanced = params.get("balanced") === "true";

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        setData(null);
        const result = await createTree(numbers, balanced);
        setData(result);
      } catch (e: any) {
        setError(e?.message || "Request failed");
      }
    })();
  }, [numbers.join(","), balanced]);

  return (
    <main className="mx-auto max-w-4xl p-4">
      <div className="text-slate-600">
        Processing<br />
        <span className="text-slate-800 font-medium">
          Input numbers: {numbers.join(", ")} | Balanced: {String(balanced)}
        </span>
      </div>

      {error && <div className="mt-3 text-rose-600">Error: {error}</div>}

      {data && (
        <pre className="mt-4 rounded-xl bg-slate-950 text-slate-100 text-xs p-3 overflow-auto">
{JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}
