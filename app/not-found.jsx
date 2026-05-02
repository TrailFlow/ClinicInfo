import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-clinic-700">
        404
      </p>
      <h1 className="mt-3 text-4xl font-bold text-ink">Article not found</h1>
      <p className="mt-4 text-slate-600">
        The article may have moved, or the URL may need a quick check.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-clinic-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-clinic-700"
      >
        View all articles
      </Link>
    </main>
  );
}
