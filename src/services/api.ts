import axios from "axios";

/**
 * Prefer env, but fall back to Render backend.
 * This removes the need to bake a build-time variable.
 */
export const API_BASE =
  (import.meta.env.VITE_API_BASE as string) ??
  "https://bst-visualizer-backend.onrender.com/api";

console.log("API BASE =", API_BASE);

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

/**
 * POST first (typical for create/process),
 * and if the server replies 405, auto-fallback to GET with query params.
 */
export async function createTree(numbers: number[], balanced: boolean) {
  try {
    const res = await api.post("/trees", { numbers, balanced });
    return res.data;
  } catch (err: any) {
    if (err?.response?.status === 405) {
      const qs = new URLSearchParams({
        numbers: numbers.join(","),
        balanced: String(balanced),
      }).toString();
      const res = await api.get(`/trees?${qs}`);
      return res.data;
    }
    throw err;
  }
}
