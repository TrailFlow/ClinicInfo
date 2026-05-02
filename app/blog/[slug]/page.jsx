import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommentsForm from "@/components/CommentsForm";
import AdsenseAd from "@/components/AdsenseAd";
import {
  getPostBySlug,
  getPostNavigation,
  getAllPosts,
  getRelatedPosts,
} from "@/lib/data";

export const revalidate = 60;

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
    <main className="bg-white">
      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-semibold text-clinic-700 transition hover:text-clinic-500"
        >
          Back to articles
        </Link>

        <header className="mt-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-clinic-700">
            {post.category}
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm font-medium text-slate-600">
            By {post.author} · {post.date}
          </p>
        </header>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-clinic-50 shadow-card">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <AdsenseAd pId="8620071569452620" slotId="7601032301" />

        {/* Content with In-Article Ad */}
        <div className="mt-12 max-w-none text-lg leading-[1.8] text-slate-700 [&_h2]:mt-14 [&_h2]:mb-6 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-[#001f42] [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-[#001f42] [&_p]:mb-6 [&_a]:font-medium [&_a]:text-[#005bb7] hover:[&_a]:text-[#001f42] [&_a]:underline [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_hr]:my-10 [&_hr]:border-slate-200 [&_strong]:font-semibold [&_strong]:text-slate-900">
          {(() => {
            const paragraphs = post.content.split("</p>");
            if (paragraphs.length > 4) {
              const mid = Math.floor(paragraphs.length / 2);
              const firstHalf = paragraphs.slice(0, mid).join("</p>") + "</p>";
              const secondHalf = paragraphs.slice(mid).join("</p>");
              return (
                <>
                  <div dangerouslySetInnerHTML={{ __html: firstHalf }} />
                  <div className="my-8">
                    <AdsenseAd pId="8620071569452620" slotId="7601032301" />
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: secondHalf }} />
                </>
              );
            }
            return <div dangerouslySetInnerHTML={{ __html: post.content }} />;
          })()}
        </div>

        <AdsenseAd pId="8620071569452620" slotId="7601032301" />

        <nav
          className="mt-12 grid gap-3 border-t border-slate-100 pt-8 sm:grid-cols-2 sm:gap-4"
          aria-label="Article navigation"
        >
          <NavigationLink label="Previous" post={previous} align="left" />
          <NavigationLink label="Next" post={next} align="right" />
        </nav>

        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-slate-100 pt-12 pb-12">
            <h2 className="text-2xl font-bold text-ink mb-8">
              More Articles You Might Like
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:border-clinic-500 hover:shadow-md"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-50">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-clinic-700/70 mb-2">
                      {relatedPost.category}
                    </p>
                    <h3 className="text-sm font-bold leading-tight text-ink group-hover:text-clinic-600 line-clamp-2">
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
      className={`group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:border-clinic-200 hover:bg-clinic-50/80 ${
        align === "right" ? "flex-row-reverse text-right" : ""
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 group-hover:bg-clinic-500 group-hover:text-white group-hover:ring-clinic-500">
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
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-clinic-700/50">
          {label}
        </span>
        <p className="mt-1 line-clamp-1 text-sm font-semibold text-ink group-hover:text-clinic-700 sm:text-base">
          {post.title}
        </p>
      </div>
    </Link>
  );
}
