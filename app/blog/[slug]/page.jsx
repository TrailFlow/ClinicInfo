import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommentsForm from "@/components/CommentsForm";
import AdsenseAd from "@/components/AdsenseAd";
import AdSlot from "@/components/AdSlot";
import {
  getPostBySlug,
  getPostNavigation,
  getAllPosts,
  getRelatedPosts,
} from "@/lib/data";

export const revalidate = 60;

const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzYwJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyNFMEU3RkYnIC8+PC9zdmc+";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.isoDate,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 720,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = getPostNavigation(post.slug);
  const relatedPosts = getRelatedPosts(post.slug, 3);

  return (
    <main className="bg-[var(--bg-primary)]">
      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-semibold text-[var(--accent)] transition hover:text-[var(--accent-hover)]"
        >
          Back to articles
        </Link>

        <header className="mt-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
            {post.category}
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-[var(--text-primary)] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm font-medium text-[var(--text-secondary)]">
            By{" "}
            {post.authorSlug ? (
              <Link
                href={`/author/${post.authorSlug}`}
                className="font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]"
              >
                {post.author}
              </Link>
            ) : (
              post.author
            )}{" "}
            · {post.date}
          </p>
        </header>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--bg-secondary)] shadow-sm">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <AdsenseAd pId="8620071569452620" slotId="7601032301" />

        {/* Content with In-Article Ad */}
        <div className="mt-12 max-w-none text-lg leading-[1.8] text-[var(--text-secondary)] [&_h2]:mt-14 [&_h2]:mb-6 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-[var(--text-primary)] [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-[var(--text-primary)] [&_p]:mb-6 [&_a]:font-medium [&_a]:text-[var(--accent)] hover:[&_a]:text-[var(--accent-hover)] [&_a]:underline [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_hr]:my-10 [&_hr]:border-[var(--border)] [&_strong]:font-semibold [&_strong]:text-[var(--text-primary)]">
          {(() => {
            const segments = post.content
              .split("</p>")
              .filter(Boolean)
              .map((segment) => `${segment}</p>`);

            if (segments.length > 3) {
              const head = segments.slice(0, 3).join("");
              const tail = segments.slice(3).join("");
              return (
                <>
                  <div dangerouslySetInnerHTML={{ __html: head }} />
                  <div className="my-8">
                    <AdSlot position="post-paragraph-3" />
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: tail }} />
                </>
              );
            }

            return <div dangerouslySetInnerHTML={{ __html: post.content }} />;
          })()}
        </div>

        <AdsenseAd pId="8620071569452620" slotId="7601032301" />

        <div className="my-8">
          <AdSlot position="before-footer" />
        </div>

        <nav
          className="mt-12 grid gap-3 border-t border-[var(--border)] pt-8 sm:grid-cols-2 sm:gap-4"
          aria-label="Article navigation"
        >
          <NavigationLink label="Previous" post={previous} align="left" />
          <NavigationLink label="Next" post={next} align="right" />
        </nav>

        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-[var(--border)] pt-12 pb-12">
            <h2 className="mb-8 text-2xl font-bold text-[var(--text-primary)]">
              More Articles You Might Like
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm transition-colors hover:border-[var(--accent)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-[var(--bg-secondary)]">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">
                      {relatedPost.category}
                    </p>
                    <h3 className="line-clamp-2 text-sm font-bold leading-tight text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <AdsenseAd pId="8620071569452620" slotId="7601032301" />

        {/* <div className="mt-8 border-t border-slate-100 pt-12">
          <CommentsForm postSlug={post.slug} postTitle={post.title} />
        </div> */}
      </article>
    </main>
  );
}

function NavigationLink({ label, post, align }) {
  if (!post) {
    return <div className="hidden sm:block" />;
  }

  const isNext = label === "Next";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 ${
        align === "right" ? "flex-row-reverse text-right" : ""
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bg-card)] shadow-sm ring-1 ring-[var(--border)] group-hover:bg-[var(--accent)] group-hover:text-white group-hover:ring-[var(--accent)]">
        {isNext ? (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        ) : (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
          {label}
        </span>
        <p className="mt-1 line-clamp-1 text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] sm:text-base">
          {post.title}
        </p>
      </div>
    </Link>
  );
}
