"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PostCard from "@/components/PostCard";
import AdSlot from "@/components/AdSlot";
import { categories } from "@/lib/categories";
import Pagination from "@/components/Pagination";

const categoryOptions = [
  "all",
  "medical",
  "technology",
  "finance",
  "lifestyle",
  "business",
];
const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzYwJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyNFMEU3RkYnIC8+PC9zdmc+";

function getTrending(posts) {
  return [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);
}

export default function HomePage({
  posts,
  pagePosts,
  totalPages = 1,
  currentPage = 1,
  totalCount,
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const allPosts = posts;
  const gridPosts = pagePosts || posts;
  const total = totalCount ?? allPosts.length;

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return gridPosts;
    return gridPosts.filter((post) => post.category === activeCategory);
  }, [gridPosts, activeCategory]);

  const heroPost = allPosts[0] || null;
  const displayedPosts = filteredPosts;
  const trending = getTrending(allPosts);

  return (
    <main className="bg-[var(--bg-secondary)]">


      <section className="container px-4">
        <AdSlot position="home-top" />
      </section>

      <section className="container px-4 pt-10">
        <div className="flex flex-wrap gap-3">
          {categoryOptions.map((slug) => {
            const label =
              slug === "all" ? "All" : categories[slug]?.label?.split(" ")[0];
            const active = activeCategory === slug;
            return (
              <button
                key={slug}
                onClick={() => setActiveCategory(slug)}
                className={`pill text-sm ${
                  active
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--bg-primary)] text-[var(--text-secondary)]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-[var(--text-muted)]">
          Showing {Math.min(10, filteredPosts.length)} of {total} articles
          {activeCategory !== "all"
            ? ` in ${categories[activeCategory]?.label || activeCategory}`
            : ""}
        </p>
      </section>

      <section className="container px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <div
              key={activeCategory}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 fade-up"
            >
              {displayedPosts.slice(0, 10).map((post, index) => (
                <div key={post.id} className="contents">
                  <PostCard post={post} priority={index < 2} index={index} />
                  {(index + 1) % 6 === 0 &&
                    index !== displayedPosts.length - 1 && (
                      <div className="sm:col-span-2 lg:col-span-3">
                        <AdSlot position={`in-feed-${(index + 1) / 6}`} />
                      </div>
                    )}
                </div>
              ))}
            </div>

            <div className="mt-8 lg:hidden">
              <div className="card p-6">
                <h3 className="text-lg font-bold">Newsletter</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  Get 4-5 fresh articles daily in your inbox.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-[var(--radius-button)] border border-[var(--border)] px-3 py-2 text-sm"
                  />
                  <button className="button-primary px-4 py-2 text-sm">
                    Subscribe
                  </button>
                </div>
                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>

          <aside className="hidden lg:flex lg:flex-col lg:gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold">🔥 Trending This Week</h3>
              <div className="mt-4 space-y-4">
                {trending.map((post, idx) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-light)] text-xs font-bold text-[var(--accent)]">
                      {idx + 1}
                    </div>
                    <div className="relative h-10 w-14 overflow-hidden rounded-md bg-[var(--bg-secondary)]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <span className="line-clamp-2 text-sm text-[var(--text-secondary)]">
                      {post.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-bold">📂 Browse Categories</h3>
              <div className="mt-4 space-y-3">
                {Object.entries(categories).map(([slug, meta]) => (
                  <Link
                    key={slug}
                    href={`/category/${slug}`}
                    className="flex items-center justify-between text-sm text-[var(--text-secondary)]"
                  >
                    <span>{meta.label}</span>
                    <span className="badge bg-[var(--accent-light)] text-[var(--accent)]">
                      {allPosts.filter((post) => post.category === slug).length}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-bold">✉️ Newsletter</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Get 4-5 fresh articles daily in your inbox.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-[var(--radius-button)] border border-[var(--border)] px-3 py-2 text-sm"
                />
                <button className="button-primary px-4 py-2 text-sm">
                  Subscribe
                </button>
              </div>
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                No spam. Unsubscribe anytime.
              </p>
            </div>

            <AdSlot variant="sidebar" position="sidebar-1" />
          </aside>
        </div>
      </section>

      <div className="pb-16">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          firstPagePath="/"
          pagedPathPrefix="/page"
        />
      </div>
    </main>
  );
}
