import BlogArchive from "@/components/BlogArchive";
import { getPaginatedPosts, POSTS_PER_PAGE } from "@/lib/data";

export const revalidate = 60;

export const metadata = {
  title: "clinic",
  description: "Clinic category archive."
};

export default function ClinicCategoryPage() {
  const { posts, totalPages, currentPage } = getPaginatedPosts(
    1,
    POSTS_PER_PAGE
  );

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
