import { notFound } from "next/navigation";
import AuthorPage from "@/components/AuthorPage";
import {
  getAuthorBySlug,
  getAuthors,
  getPaginatedAuthorPosts,
  getPostsByAuthor,
  POSTS_PER_PAGE,
} from "@/lib/data";

export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return getAuthors().flatMap((author) => {
    const totalPages = Math.ceil(
      getPostsByAuthor(author.slug).length / POSTS_PER_PAGE,
    );

    return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
      author: author.slug,
      page: String(index + 2),
    }));
  });
}

export async function generateMetadata({ params }) {
  const { author: authorSlug, page } = await params;
  const author = getAuthorBySlug(authorSlug);

  if (!author) {
    return {
      title: "Author Not Found",
    };
  }

  return {
    title: `${author.name} — Page ${page} | ClinicInfo`,
    description: `Read page ${page} of ClinicInfo posts by ${author.name}.`,
  };
}

export default async function AuthorPagedPage({ params }) {
  const { author: authorSlug, page } = await params;
  const author = getAuthorBySlug(authorSlug);
  const pageNumber = Number(page);

  if (!author) {
    notFound();
  }

  const totalPages = Math.ceil(
    getPostsByAuthor(author.slug).length / POSTS_PER_PAGE,
  );

  if (
    !Number.isInteger(pageNumber) ||
    pageNumber < 2 ||
    pageNumber > totalPages
  ) {
    notFound();
  }

  const allPosts = getPostsByAuthor(author.slug);
  const { posts } = getPaginatedAuthorPosts(author.slug, pageNumber, POSTS_PER_PAGE);

  return <AuthorPage author={author} posts={allPosts} pagePosts={posts} />;
}
