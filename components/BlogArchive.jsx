import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import TopAdUnit from "@/components/TopAdUnit";

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
    <main className="bg-[#edf4fb]">
      <section
        id="blog"
        className="mx-auto max-w-[1300px] px-4 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8"
      >
        {label || showAvatar ? (
          <div className="mb-9 flex items-center justify-between gap-6 bg-white px-8 py-7 sm:px-10">
            <h1 className="text-3xl font-semibold leading-tight text-[#001f42] sm:text-4xl">
              {label}
            </h1>
            {showAvatar ? (
              <div className="hidden h-20 w-20 shrink-0 rounded-full bg-[#c9c9c9] sm:block">
                <div className="mx-auto mt-8 h-8 w-8 rounded-full bg-white" />
                <div className="mx-auto mt-1 h-9 w-14 rounded-t-full bg-white" />
              </div>
            ) : null}
          </div>
        ) : (
          <h1 className="sr-only">Latest Health & Clinic Articles</h1>
        )}

        {intro ? <div className="mb-9">{intro}</div> : null}

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {posts.map((post, index) => (
            <div key={post.id} className="contents">
              <BlogCard post={post} priority={index < 2} />
              {/* Insert Ad after every 3rd post */}
              {(index + 1) % 3 === 0 && index !== posts.length - 1 && (
                <div className="sm:col-span-2 lg:col-span-3">
                  <TopAdUnit pId="8620071569452620" slotId="7601032301" />
                </div>
              )}
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
