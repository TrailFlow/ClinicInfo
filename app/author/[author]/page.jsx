import { notFound } from "next/navigation";
import BlogArchive from "@/components/BlogArchive";
import {
  getAuthorBySlug,
  getAuthors,
  getPaginatedAuthorPosts,
  POSTS_PER_PAGE,
} from "@/lib/data";

export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return getAuthors().map((author) => ({
    author: author.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { author: authorSlug } = await params;
  const author = getAuthorBySlug(authorSlug);

  if (!author) {
    return {
      title: "Author Not Found",
    };
  }

  return {
    title: `Author name: ${author.name}`,
    description: `Read ClinicInfo posts by ${author.name}.`,
  };
}

export default async function AuthorPage({ params }) {
  const { author: authorSlug } = await params;
  const author = getAuthorBySlug(authorSlug);

  if (!author) {
    notFound();
  }

  const { posts, totalPages, currentPage } = getPaginatedAuthorPosts(
    author.slug,
    1,
    POSTS_PER_PAGE,
  );

  return (
    <BlogArchive
      posts={posts}
      currentPage={currentPage}
      totalPages={totalPages}
      label={`Author name: ${author.name}`}
      firstPagePath={`/author/${author.slug}`}
      pagedPathPrefix={`/author/${author.slug}/page`}
      showAvatar
    />
  );
}
