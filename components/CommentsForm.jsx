"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

const COMMENTS_UPDATED_EVENT = "clinic-comments-updated";

export default function CommentsForm({ postSlug, postTitle }) {
  const storageKey = useMemo(
    () => `ClinicInfo-comments:${postSlug}`,
    [postSlug],
  );
  const [error, setError] = useState("");

  const commentsSnapshot = useSyncExternalStore(
    (onStoreChange) => {
      function handleStorageChange(event) {
        if (event.type === "storage" && event.key !== storageKey) {
          return;
        }

        onStoreChange();
      }

      window.addEventListener("storage", handleStorageChange);
      window.addEventListener(COMMENTS_UPDATED_EVENT, handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener(COMMENTS_UPDATED_EVENT, handleStorageChange);
      };
    },
    () => localStorage.getItem(storageKey) || "[]",
    () => "[]",
  );

  const comments = useMemo(() => {
    try {
      const savedComments = JSON.parse(commentsSnapshot);
      return Array.isArray(savedComments) ? savedComments : [];
    } catch {
      return [];
    }
  }, [commentsSnapshot]);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const comment = String(formData.get("comment") || "").trim();

    if (!name || !email || !comment) {
      setError("Please fill name, email, and comment.");
      return;
    }

    const newComment = {
      id: Date.now(),
      name,
      email,
      comment,
      createdAt: new Date().toISOString(),
    };
    const nextComments = [...comments, newComment];

    setError("");
    localStorage.setItem(storageKey, JSON.stringify(nextComments));
    window.dispatchEvent(new Event(COMMENTS_UPDATED_EVENT));
    event.currentTarget.reset();

    requestAnimationFrame(() => {
      document
        .getElementById(`comment-${newComment.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  return (
    <section className="mt-12 border-t border-slate-200 pt-10">
      <h2 className="text-2xl font-bold leading-snug text-[#001f42]">
        {comments.length} thoughts on &quot;{postTitle}&quot;
      </h2>

      {comments.length > 0 ? (
        <ol className="mt-8 grid gap-6">
          {comments.map((item) => (
            <li
              key={item.id}
              id={`comment-${item.id}`}
              className="flex gap-4 border-b border-slate-200 pb-6"
            >
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-[#dce8f5] text-xl font-bold text-[#005bb7]"
                aria-hidden="true"
              >
                {item.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-bold text-[#001f42]">{item.name}</p>
                  <time
                    className="text-sm font-semibold text-[#005bb7]"
                    dateTime={item.createdAt}
                  >
                    {formatCommentDate(item.createdAt)}
                  </time>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-[17px] leading-7 text-[#001f42]">
                  {item.comment}
                </p>
                <p className="mt-4 text-[15px] font-semibold text-[#005bb7]">
                  Your comment is awaiting moderation.
                </p>
              </div>
            </li>
          ))}
        </ol>
      ) : null}

      <div className="mt-10 rounded-2xl bg-[#f7fbfa] p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-[#001f42]">Leave a comment</h3>
        <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-[#001f42]">
              Name
              <input
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#005bb7] focus:ring-4 focus:ring-blue-100"
                type="text"
                name="name"
                placeholder="Your name"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[#001f42]">
              Email
              <input
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#005bb7] focus:ring-4 focus:ring-blue-100"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-semibold text-[#001f42]">
            Comment
            <textarea
              className="min-h-36 rounded-xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-[#005bb7] focus:ring-4 focus:ring-blue-100"
              name="comment"
              placeholder="Share your thoughts"
              required
            />
          </label>
          {error ? (
            <p className="text-sm font-semibold text-red-600">{error}</p>
          ) : null}
          <button
            className="w-fit rounded-full bg-[#16886b] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#126f58]"
            type="submit"
          >
            Submit comment
          </button>
        </form>
      </div>
    </section>
  );
}

function formatCommentDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}
