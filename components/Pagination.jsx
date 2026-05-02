import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
  firstPagePath = "/",
  pagedPathPrefix = "/page"
}) {
  if (totalPages <= 1) {
    return null;
  }

  const getPath = (page) =>
    page === 1 ? firstPagePath : `${pagedPathPrefix}/${page}`;

  // Smart page range logic
  const getPages = () => {
    const range = [];
    const delta = 1; // Numbers around current page

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    range.unshift(1);

    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }
    
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  const pages = getPages();

  return (
    <nav className="mt-16 mb-8 px-4" aria-label="Pagination">
      <div className="mx-auto flex max-w-fit items-center justify-center gap-1.5 sm:gap-2">
        {/* Previous Button */}
        {currentPage > 1 ? (
          <Link
            href={getPath(currentPage - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-300 hover:border-clinic-500 hover:bg-clinic-50 hover:text-clinic-600 sm:w-auto sm:px-4 sm:gap-2"
            title="Previous Page"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline text-sm font-bold">Previous</span>
          </Link>
        ) : (
          <span className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-300 sm:w-auto sm:px-4 sm:gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline text-sm font-bold text-slate-300">Previous</span>
          </span>
        )}

        {/* Page Numbers */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {pages.map((page, index) => {
            if (page === "...") {
              return (
                <span key={`dots-${index}`} className="w-6 text-center text-slate-400">
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;

            return isActive ? (
              <span
                key={page}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-clinic-500 text-sm font-bold text-white shadow-sm shadow-clinic-100 ring-1 ring-clinic-500"
              >
                {page}
              </span>
            ) : (
              <Link
                key={page}
                href={getPath(page)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition-all duration-300 hover:border-clinic-300 hover:bg-clinic-50 hover:text-clinic-600"
              >
                {page}
              </Link>
            );
          })}
        </div>

        {/* Next Button */}
        {currentPage < totalPages ? (
          <Link
            href={getPath(currentPage + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-300 hover:border-clinic-500 hover:bg-clinic-50 hover:text-clinic-600 sm:w-auto sm:px-4 sm:gap-2"
            title="Next Page"
          >
            <span className="hidden sm:inline text-sm font-bold">Next</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <span className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-300 sm:w-auto sm:px-4 sm:gap-2">
            <span className="hidden sm:inline text-sm font-bold text-slate-300">Next</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        )}
      </div>
    </nav>
  );
}
