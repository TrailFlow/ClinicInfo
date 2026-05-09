"use client";

import { useState } from "react";

export const dynamic = "force-dynamic";

export default function AddBlogAdminPage() {
  const [password, setPassword] = useState("");
  const [jsonFile, setJsonFile] = useState(null);
  const [zipFile, setZipFile] = useState(null);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadingImages, setIsDownloadingImages] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [uploadKey, setUploadKey] = useState(0);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!password.trim()) {
      setStatus({ type: "error", message: "Password is required." });
      return;
    }

    if (!jsonFile) {
      setStatus({ type: "error", message: "Please upload a JSON file." });
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("password", password);
      formData.append("jsonFile", jsonFile);
      if (zipFile) {
        formData.append("imageZip", zipFile);
      }

      const res = await fetch("/api/add-blog", {
        method: "POST",
        body: formData,
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
        message: data?.message || "Saved successfully.",
      });
      setPassword("");
      setJsonFile(null);
      setZipFile(null);
      setUploadKey((prev) => prev + 1);
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.message || "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function loadPosts() {
    setStatus({ type: "idle", message: "" });
    if (!password.trim()) {
      setStatus({ type: "error", message: "Password is required." });
      return;
    }

    setIsLoadingList(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, action: "list" }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setStatus({
          type: "error",
          message: data?.error || "Failed to load blogs.",
        });
        return;
      }

      setPosts(Array.isArray(data?.posts) ? data.posts : []);
      setSelectedSlug("");
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.message || "Network error. Please try again.",
      });
    } finally {
      setIsLoadingList(false);
    }
  }

  async function downloadJson() {
    setStatus({ type: "idle", message: "" });
    if (!password.trim()) {
      setStatus({ type: "error", message: "Password is required." });
      return;
    }

    setIsDownloading(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, action: "download" }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setStatus({
          type: "error",
          message: data?.error || "Download failed.",
        });
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "blogs.json";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.message || "Network error. Please try again.",
      });
    } finally {
      setIsDownloading(false);
    }
  }

  async function downloadImagesZip() {
    setStatus({ type: "idle", message: "" });
    if (!password.trim()) {
      setStatus({ type: "error", message: "Password is required." });
      return;
    }

    setIsDownloadingImages(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, action: "download-images" }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setStatus({
          type: "error",
          message: data?.error || "Download failed.",
        });
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "images.zip";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.message || "Network error. Please try again.",
      });
    } finally {
      setIsDownloadingImages(false);
    }
  }

  async function deletePost() {
    setStatus({ type: "idle", message: "" });
    if (!password.trim()) {
      setStatus({ type: "error", message: "Password is required." });
      return;
    }

    if (!selectedSlug) {
      setStatus({ type: "error", message: "Please select a blog to remove." });
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          action: "delete",
          slug: selectedSlug,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setStatus({
          type: "error",
          message: data?.error || "Delete failed.",
        });
        return;
      }

      setStatus({ type: "success", message: "Blog removed." });
      setPosts((prev) => prev.filter((post) => post.slug !== selectedSlug));
      setSelectedSlug("");
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.message || "Network error. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-sm backdrop-blur md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                Admin Console
              </span>
              <h1 className="mt-4 font-serif text-3xl font-semibold text-[#001f42] md:text-4xl">
                Blog Management
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Upload a JSON file and optional image ZIP. Designed for mobile
                and desktop admins.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-8 grid gap-5" noValidate>
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:p-6">
              <div className="grid gap-5 md:grid-cols-3">
                <div className="md:col-span-1">
                  <label
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-700 outline-none transition focus:border-[var(--accent)]"
                    placeholder="Enter admin password"
                    autoComplete="current-password"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
                    htmlFor="jsonFile"
                  >
                    Blog JSON File
                  </label>
                  <input
                    key={`json-${uploadKey}`}
                    id="jsonFile"
                    type="file"
                    accept="application/json,.json"
                    onChange={(e) => setJsonFile(e.target.files?.[0] || null)}
                    className="mt-3 w-full rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-700 outline-none transition focus:border-[var(--accent)]"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    Required per post: title, slug, content, image, date.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <label
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
                  htmlFor="zipFile"
                >
                  Images ZIP (optional)
                </label>
                <input
                  key={`zip-${uploadKey}`}
                  id="zipFile"
                  type="file"
                  accept=".zip,application/zip"
                  onChange={(e) => setZipFile(e.target.files?.[0] || null)}
                  className="mt-3 w-full rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-700 outline-none transition focus:border-[var(--accent)]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full rounded-2xl bg-[#001f42] px-6 py-4 text-sm font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting…" : "Submit"}
              </button>
            </div>
          </form>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3">
                <div>
                  <h2 className="text-base font-semibold text-[#001f42]">
                    Download JSON
                  </h2>
                  <p className="text-sm text-slate-600">
                    Get the current blogs.json file.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={downloadJson}
                  disabled={isDownloading}
                  className="w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-[#001f42] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDownloading ? "Downloading…" : "Download JSON"}
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3">
                <div>
                  <h2 className="text-base font-semibold text-[#001f42]">
                    Download Images ZIP
                  </h2>
                  <p className="text-sm text-slate-600">
                    Download uploaded images from /images/uploads.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={downloadImagesZip}
                  disabled={isDownloadingImages}
                  className="w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-[#001f42] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDownloadingImages ? "Downloading…" : "Download Images"}
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm md:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-[#001f42]">
                    Remove Blog
                  </h2>
                  <p className="text-sm text-slate-600">
                    Select a post to delete.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={loadPosts}
                  disabled={isLoadingList}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-[#001f42] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoadingList ? "Loading…" : "Load"}
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <select
                  value={selectedSlug}
                  onChange={(e) => setSelectedSlug(e.target.value)}
                  onFocus={() => {
                    if (!password.trim()) {
                      setStatus({
                        type: "error",
                        message: "Password is required.",
                      });
                      return;
                    }
                    if (posts.length === 0 && !isLoadingList) {
                      loadPosts();
                    }
                  }}
                  onMouseDown={(e) => {
                    if (!password.trim()) {
                      e.preventDefault();
                      setStatus({
                        type: "error",
                        message: "Password is required.",
                      });
                    }
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-700 outline-none transition focus:border-[var(--accent)]"
                >
                  <option value="">Select a blog…</option>
                  {posts.map((post) => (
                    <option key={post.slug} value={post.slug}>
                      {post.title} ({post.slug})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={deletePost}
                  disabled={isDeleting}
                  className="w-full rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeleting ? "Removing…" : "Remove"}
                </button>
              </div>
            </div>
          </div>

          {status.type !== "idle" ? (
            <div
              className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
                status.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-rose-200 bg-rose-50 text-rose-800"
              }`}
            >
              {status.message}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
