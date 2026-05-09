import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import AdSlot from "@/components/AdSlot";

export default function BlogArchive({
  posts,
  currentPage,
  totalPages,
  label,
  intro,
  firstPagePath = "/",
  pagedPathPrefix = "/page",
  showAvatar = false,
}) {
  return (
    <main className="bg-[var(--bg-secondary)]">
      <section id="blog" className="container px-4 pb-14 pt-10">
        {label || showAvatar ? (
          <div className="mb-8 flex items-center justify-between gap-6">
            <h1 className="text-3xl font-bold">{label}</h1>
            {showAvatar ? (
              <div className="hidden h-16 w-16 rounded-full bg-[var(--bg-secondary)] sm:block" />
            ) : null}
          </div>
        ) : (
          <h1 className="sr-only">Latest Health & Clinic Articles</h1>
        )}

        {intro ? <div className="mb-8">{intro}</div> : null}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <div key={post.id} className="contents">
              <BlogCard post={post} priority={index < 2} index={index} />
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          firstPagePath={firstPagePath}
          pagedPathPrefix={pagedPathPrefix}
        />
      </section>
    </main>
  );
}
