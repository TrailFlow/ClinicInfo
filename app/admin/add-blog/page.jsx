"use client";

import { useMemo, useState } from "react";

export const dynamic = "force-dynamic";

export default function AddBlogAdminPage() {
  const [password, setPassword] = useState("");
  const [jsonText, setJsonText] = useState(
    JSON.stringify(
      {
        title: "",
        slug: "",
        content: "",
        image: "",
        date: "",
      },
      null,
      2,
    ),
  );
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsed = useMemo(() => {
    try {
      return { ok: true, value: JSON.parse(jsonText) };
    } catch (e) {
      return { ok: false, error: e?.message || "Invalid JSON" };
    }
  }, [jsonText]);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!password.trim()) {
      setStatus({ type: "error", message: "Password is required." });
      return;
    }

    if (!parsed.ok) {
      setStatus({ type: "error", message: `JSON error: ${parsed.error}` });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/add-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, entry: parsed.value }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setStatus({
          type: "error",
          message: data?.error || "Request failed. Please try again.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: `Saved. New post slug: ${data?.slug || "(unknown)"}`,
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.message || "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-[900px] px-5 py-12 md:py-20">
      <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
        <h1 className="text-3xl font-bold text-[#001f42] md:text-4xl">
          Admin — Add Blog
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
          Paste a blog entry as JSON and submit. This tool updates the server’s
          JSON data file. Keep your admin password private.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
          <div>
            <label className="text-sm font-semibold text-slate-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-700 outline-none transition focus:border-clinic-300"
              placeholder="Enter admin password"
              autoComplete="current-password"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700" htmlFor="json">
              Blog JSON
            </label>
            <textarea
              id="json"
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={14}
              className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-[13px] leading-relaxed text-slate-700 outline-none transition focus:border-clinic-300"
              spellCheck={false}
            />
            <p className="mt-2 text-xs text-slate-500">
              Required keys: title, slug, content, image, date.
            </p>
            {!parsed.ok ? (
              <p className="mt-2 text-sm text-rose-600">{parsed.error}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-[#001f42] px-6 py-4 text-sm font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting…" : "Submit"}
          </button>

          {status.type !== "idle" ? (
            <div
              className={`rounded-xl p-4 text-sm ${
                status.type === "success"
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-rose-50 text-rose-800"
              }`}
            >
              {status.message}
            </div>
          ) : null}
        </form>
      </div>
    </main>
  );
}
