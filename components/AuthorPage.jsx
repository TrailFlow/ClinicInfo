"use client";

import { useMemo, useState } from "react";
import PostCard from "@/components/PostCard";
import { categories } from "@/lib/categories";
import { sortPosts } from "@/lib/utils";

const sortOptions = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
];

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function AuthorPage({ author, posts, pagePosts }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const allPosts = posts;
  const gridPosts = pagePosts || posts;

  const authorCategories = useMemo(() => {
    const set = new Set(allPosts.map((post) => post.category));
    return ["all", ...Array.from(set)];
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return gridPosts;
    return gridPosts.filter((post) => post.category === activeCategory);
  }, [gridPosts, activeCategory]);

  const sortedPosts = useMemo(
    () => sortPosts(filteredPosts, sortBy),
    [filteredPosts, sortBy],
  );

  const mostPopular = useMemo(
    () => sortPosts(allPosts, "popular")[0],
    [allPosts],
  );

  return (
    <main className="bg-[var(--bg-secondary)]">
      <section className="container px-4 pt-10">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent-light)] text-xl font-bold text-[var(--accent)]">
                {getInitials(author.name)}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{author.name}</h1>
                <p className="text-sm text-[var(--text-secondary)]">
                  {author.role || "Contributor"}
                </p>
              </div>
            </div>
            <div className="text-sm text-[var(--text-muted)]">
              📝 {allPosts.length} Articles · 📂{" "}
              {authorCategories
                .filter((c) => c !== "all")
                .map((c) => categories[c]?.label?.split(" ")[0] || c)
                .join(", ")}
              · 🗓 Since {author.joinedYear || 2024}
            </div>
          </div>
          <p className="mt-4 text-sm text-[var(--text-secondary)]">
            {author.bio ||
              "Expert contributor at ClinicInfo covering health and wellness topics."}
          </p>
        </div>
      </section>

      <section className="container px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {authorCategories.map((slug) => (
              <button
                key={slug}
                onClick={() => setActiveCategory(slug)}
                className={`pill text-sm ${
                  activeCategory === slug
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--bg-primary)] text-[var(--text-secondary)]"
                }`}
              >
                {slug === "all"
                  ? "All Articles"
                  : categories[slug]?.label?.split(" ")[0]}
              </button>
            ))}
          </div>
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

        {mostPopular ? (
          <div className="mt-8 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-sm">
            <span className="badge bg-[var(--accent-light)] text-[var(--accent)]">
              ⭐ Most Popular
            </span>
            <div className="mt-4">
              <PostCard post={mostPopular} />
            </div>
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 fade-up">
          {sortedPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
