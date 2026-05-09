import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/categories";

const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzYwJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyNFMEU3RkYnIC8+PC9zdmc+";

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function PostCard({ post, priority = false, index = 0 }) {
  const meta = categories[post.category] || { label: post.category };
  const authorHref = post.authorSlug ? `/author/${post.authorSlug}` : null;

  return (
    <article
      className="card flex h-full flex-col overflow-hidden fade-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-[180px] overflow-hidden sm:h-[200px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="flex h-full flex-col gap-4 p-5">
        <Link
          href={`/category/${post.category}`}
          className="category-badge badge inline-flex w-fit items-center gap-2"
          style={{ background: "var(--accent-light)", color: meta.color }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: meta.color }}
          />
          {meta.label || post.category}
        </Link>

        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="line-clamp-2 text-base font-bold text-[var(--text-primary)] sm:text-lg">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-[var(--text-secondary)]">
            {post.excerpt}
          </p>
        </Link>

        <div className="mt-auto flex items-center justify-between">
          {authorHref ? (
            <Link
              href={authorHref}
              className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-light)] text-[11px] font-semibold text-[var(--accent)]">
                {getInitials(post.author)}
              </div>
              <span>
                {post.author} · {post.date}
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-light)] text-[11px] font-semibold text-[var(--accent)]">
                {getInitials(post.author)}
              </div>
              <span>
                {post.author} · {post.date}
              </span>
            </div>
          )}
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-semibold text-[var(--accent)]"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}
