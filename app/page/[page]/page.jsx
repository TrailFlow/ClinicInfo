import { notFound } from "next/navigation";
import HomePage from "@/components/HomePage";
import { getAllPosts, getTotalPages, POSTS_PER_PAGE } from "@/lib/data";

export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  const totalPages = getTotalPages(POSTS_PER_PAGE);

  return Array.from({ length: totalPages - 1 }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }) {
  const { page } = await params;

  return {
    title: `ClinicInfo - Page ${page}`,
    description: `Read clinic and hospital articles on page ${page}.`,
  };
}

export default async function BlogPage({ params }) {
  const { page } = await params;
  const pageNumber = Number(page);
  const totalPages = getTotalPages(POSTS_PER_PAGE);

  if (
    !Number.isInteger(pageNumber) ||
    pageNumber < 2 ||
    pageNumber > totalPages
  ) {
    notFound();
  }

  const allPosts = getAllPosts().sort(
    (a, b) => new Date(b.isoDate) - new Date(a.isoDate),
  );
  const start = (pageNumber - 1) * POSTS_PER_PAGE;
  const pagePosts = allPosts.slice(start, start + POSTS_PER_PAGE);

  return (
    <HomePage
      posts={allPosts}
      pagePosts={pagePosts}
      totalPages={totalPages}
      currentPage={pageNumber}
      totalCount={allPosts.length}
    />
  );
}
