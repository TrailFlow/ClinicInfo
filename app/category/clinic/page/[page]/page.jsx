import { notFound } from "next/navigation";
import BlogArchive from "@/components/BlogArchive";
import {
  getPaginatedPosts,
  getTotalPages,
  POSTS_PER_PAGE
} from "@/lib/data";

export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  const totalPages = getTotalPages(POSTS_PER_PAGE);

  return Array.from({ length: totalPages - 1 }, (_, index) => ({
    page: String(index + 2)
  }));
}

export async function generateMetadata({ params }) {
  const { page } = await params;

  return {
    title: `clinic - Page ${page}`,
    description: `Clinic category archive page ${page}.`
  };
}

export default async function ClinicCategoryPagedPage({ params }) {
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

  const { posts, currentPage } = getPaginatedPosts(pageNumber, POSTS_PER_PAGE);

  return (
    <BlogArchive
      posts={posts}
      currentPage={currentPage}
      totalPages={totalPages}
      label="clinic"
      firstPagePath="/category/clinic"
      pagedPathPrefix="/category/clinic/page"
    />
  );
}
