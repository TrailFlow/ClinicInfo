"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/categories";
import blogs from "@/data/blogs.json";

const categoryOrder = ["all", ...Object.keys(categories)];

function getCategoryLabel(slug) {
  if (slug === "all") return "All Categories";
  return categories[slug]?.label || slug;
}

function getRecentTag(index) {
  if (index === 0) return "Latest";
  if (index <= 2) return "New";
  return "Recent";
}

export default function SearchModal({
  isOpen,
  onClose,
  initialCategory = "all",
}) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [recentSearches, setRecentSearches] = useState([]);
  const router = useRouter();

  const recentArticles = blogs
    .slice()
    .sort((left, right) => {
      const leftTime = new Date(left.isoDate || left.date || 0).getTime();
      const rightTime = new Date(right.isoDate || right.date || 0).getTime();
      return rightTime - leftTime;
    })
    .slice(0, 6);

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setSelectedCategory(initialCategory);
    setQuery("");
  }, [isOpen, initialCategory]);

  const visibleArticles = recentArticles.filter(
    (post) => selectedCategory === "all" || post.category === selectedCategory,
  );

  const addRecentSearch = (term) => {
    if (!term.trim()) return;
    const updated = [
      term.trim(),
      ...recentSearches.filter((s) => s !== term.trim()),
    ].slice(0, 3);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    addRecentSearch(query);
    const url =
      selectedCategory === "all"
        ? `/search?q=${encodeURIComponent(query)}`
        : `/search?q=${encodeURIComponent(query)}&category=${selectedCategory}`;
    router.push(url);
    setQuery("");
    onClose();
  };

  const handleRecentSearch = (term) => {
    setQuery(term);
    const url = `/search?q=${encodeURIComponent(term)}&category=${selectedCategory}`;
    router.push(url);
    onClose();
  };

  const handleArticleClick = (post) => {
    onClose();
    router.push(`/blog/${post.slug}`);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-start justify-center px-3 py-3 sm:px-4 sm:py-6">
        <div className="mx-auto flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] shadow-lg max-h-[calc(100vh-1.5rem)] sm:max-h-[calc(100vh-3rem)]">
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search articles, topics..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
                />
                <svg
                  className="absolute right-3 top-3.5 h-5 w-5 text-[var(--text-muted)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m21 21-4.35-4.35m1.85-5.65a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                  />
                </svg>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[var(--text-secondary)]">
                    Showing {getCategoryLabel(selectedCategory)}
                  </p>
                  <span className="rounded-full bg-[var(--bg-secondary)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
                    Click a category to filter
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {categoryOrder.map((slug) => {
                    const isActive = selectedCategory === slug;
                    return (
                      <button
                        key={slug}
                        type="button"
                        onClick={() => setSelectedCategory(slug)}
                        className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-[var(--accent)] text-white"
                            : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border)]"
                        }`}
                      >
                        {getCategoryLabel(slug)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[var(--text-secondary)]">
                    Recent articles
                  </p>
                  {selectedCategory !== "all" ? (
                    <button
                      type="button"
                      onClick={() => setSelectedCategory("all")}
                      className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
                    >
                      View all
                    </button>
                  ) : null}
                </div>

                {visibleArticles.length > 0 ? (
                  <div className="space-y-2">
                    {visibleArticles.map((post, index) => {
                      const tag = getRecentTag(index);
                      return (
                        <button
                          key={post.slug}
                          type="button"
                          onClick={() => handleArticleClick(post)}
                          className="flex w-full items-start gap-3 rounded-lg border border-transparent px-3 py-3 text-left hover:border-[var(--border)] hover:bg-[var(--bg-primary)]"
                        >
                          <div className="mt-0.5 rounded-full bg-[var(--accent-light)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)]">
                            {tag}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-2 font-medium text-[var(--text-primary)]">
                              {post.title}
                            </p>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
                              <span>{getCategoryLabel(post.category)}</span>
                              <span>•</span>
                              <span>{post.date}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--text-secondary)]">
                    No recent articles found for this category.
                  </p>
                )}
              </div>
            </form>

            {recentSearches.length > 0 && !query && (
              <div className="mt-4 border-t border-[var(--border)] pt-4">
                <p className="mb-3 text-sm font-semibold text-[var(--text-secondary)]">
                  Recent Searches
                </p>
                <div className="space-y-2">
                  {recentSearches.map((search, i) => (
                    <button
                      key={i}
                      onClick={() => handleRecentSearch(search)}
                      className="flex w-full items-center gap-2 rounded px-2 py-2 text-left hover:bg-[var(--bg-secondary)]"
                    >
                      <svg
                        className="h-4 w-4 text-[var(--text-muted)]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <span className="text-[var(--text-secondary)]">
                        {search}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
