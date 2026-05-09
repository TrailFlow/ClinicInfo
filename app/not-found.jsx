import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
        404
      </p>
      <h1 className="mt-3 text-4xl font-bold text-[var(--text-primary)]">
        Article not found
      </h1>
      <p className="mt-4 text-[var(--text-secondary)]">
        The article may have moved, or the URL may need a quick check.
      </p>
      <Link
        href="/"
        className="button-primary mt-8 inline-flex px-5 py-3 text-sm"
      >
        View all articles
      </Link>
    </main>
  );
}
