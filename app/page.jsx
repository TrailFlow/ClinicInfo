import BlogArchive from "@/components/BlogArchive";
import { getPaginatedPosts, POSTS_PER_PAGE } from "@/lib/data";

export const revalidate = 60;

export default function Home() {
  const { posts, totalPages, currentPage } = getPaginatedPosts(
    1,
    POSTS_PER_PAGE
  );

  return (
    <BlogArchive
      posts={posts}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
