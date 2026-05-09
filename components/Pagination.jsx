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
    <nav className="mt-12 flex justify-center" aria-label="Pagination">
      <div className="flex items-center gap-2">
        {currentPage > 1 ? (
          <Link
            href={getPath(currentPage - 1)}
            className="flex items-center gap-2 rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)]"
          >
            Previous
          </Link>
        ) : (
          <span className="flex items-center gap-2 rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm font-semibold text-[var(--text-muted)]">
            Previous
          </span>
        )}

        <div className="hidden items-center gap-2 sm:flex">
          {pages.map((page, index) => {
            if (page === "...") {
              return (
                <span key={`dots-${index}`} className="px-2 text-[var(--text-muted)]">
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;
            return isActive ? (
              <span
                key={page}
                className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-sm font-semibold text-white"
              >
                {page}
              </span>
            ) : (
              <Link
                key={page}
                href={getPath(page)}
                className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--bg-primary)] text-sm font-semibold text-[var(--text-secondary)]"
              >
                {page}
              </Link>
            );
          })}
        </div>

        <div className="sm:hidden">
          <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-sm font-semibold text-white">
            {currentPage}
          </span>
        </div>

        {currentPage < totalPages ? (
          <Link
            href={getPath(currentPage + 1)}
            className="flex items-center gap-2 rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)]"
          >
            Next
          </Link>
        ) : (
          <span className="flex items-center gap-2 rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm font-semibold text-[var(--text-muted)]">
            Next
          </span>
        )}
      </div>
    </nav>
  );
}
