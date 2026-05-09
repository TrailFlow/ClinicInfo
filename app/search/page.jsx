import { notFound } from "next/navigation";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/data";
import { categories } from "@/lib/categories";

export const metadata = {
  title: "Search Results",
  description: "Search articles on ClinicInfo",
};

export default function SearchPage({ searchParams }) {
  const query = searchParams.q?.toLowerCase() || "";
  const selectedCategory = searchParams.category || "all";

  if (!query) {
    return (
      <main className="container space-y-8 px-4 py-8 sm:py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
            Search Articles
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Enter a search term to find articles
          </p>
        </div>
      </main>
    );
  }

  const allPosts = getAllPosts();
  const filtered = allPosts.filter((post) => {
    const matchesQuery =
      query &&
      (post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query));

    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  const categoryLabel =
    selectedCategory === "all"
      ? "All Categories"
      : categories[selectedCategory]?.label || selectedCategory;

  return (
    <main className="container space-y-8 px-4 py-8 sm:py-12">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
          Search Results
        </h1>
        <p className="mt-2 text-[var(--text-secondary)]">
          {filtered.length} article{filtered.length !== 1 ? "s" : ""} found for
          "<strong>{query}</strong>" in {categoryLabel}
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-[var(--text-muted)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
            />
          </svg>
          <h2 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
            No articles found
          </h2>
          <p className="mt-2 text-[var(--text-secondary)]">
            Try adjusting your search or browse our categories
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {Object.entries(categories)
              .slice(0, 5)
              .map(([slug, meta]) => (
                <Link
                  key={slug}
                  href={`/category/${slug}`}
                  className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] transition-colors"
                >
                  {meta.label}
                </Link>
              ))}
          </div>
        </div>
      )}
    </main>
  );
}
