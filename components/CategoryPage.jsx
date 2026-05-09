"use client";

import { useMemo, useState } from "react";
import PostCard from "@/components/PostCard";
import AdSlot from "@/components/AdSlot";
import { sortPosts } from "@/lib/utils";
import { categories } from "@/lib/categories";

const sortOptions = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "az", label: "A-Z" },
];

export default function CategoryPage({ slug, posts }) {
  const [sortBy, setSortBy] = useState("latest");

  const sortedPosts = useMemo(() => sortPosts(posts, sortBy), [posts, sortBy]);
  const meta = categories[slug] || {
    label: slug,
    description: "",
    gradient: "from-slate-50 to-white",
    emoji: "📚",
  };

  return (
    <main className="bg-[var(--bg-secondary)]">
      <section
        className="border-b border-[var(--border)] category-header"
        style={{ background: meta.gradient }}
      >
        <div className="container px-4 py-10">
          <div className="flex flex-col gap-2">
            <span className="text-3xl">{meta.emoji}</span>
            <h1 className="text-3xl font-bold">{meta.label}</h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {posts.length} articles about {meta.description}
            </p>
          </div>
        </div>
      </section>

      <section className="container px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`pill text-sm ${
                  sortBy === option.value
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--bg-primary)] text-[var(--text-secondary)]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {sortedPosts.length === 0 ? (
          <div className="card mt-8 p-10 text-center">
            <p className="text-lg font-semibold">
              Coming soon! Articles dropping soon.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 fade-up">
            {sortedPosts.map((post, index) => (
              <div key={post.id} className="contents">
                <PostCard post={post} index={index} />
                {(index + 1) % 6 === 0 &&
                  index !== sortedPosts.length - 1 && (
                    <div className="sm:col-span-2 lg:col-span-3">
                      <AdSlot position={`category-feed-${(index + 1) / 6}`} />
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
